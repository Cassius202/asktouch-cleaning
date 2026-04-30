// app/api/chat/route.ts
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { getSystemPrompt } from "@/constants/systemPrompt";
import { BookingData } from "@/constants/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

interface HistoryMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

function sanitizeHistory(history: HistoryMessage[]): HistoryMessage[] {
  if (!Array.isArray(history) || history.length === 0) return [];
  const limited = history.slice(-10);
  while (limited.length > 0 && limited[0].role !== "user") {
    limited.shift();
  }
  return limited.map(msg => ({
    ...msg,
    parts: msg.parts.map(part => ({
      text: part.text.replace(/```json[\s\S]*?```/g, "").trim()
    }))
  }));
}

export async function POST(req: Request) {
  try {
    const { prompt, history }: { prompt: string; history: HistoryMessage[] } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Invalid prompt" }, { status: 400 });
    }

    const currentSystemPrompt = getSystemPrompt();
    const cleanHistory = sanitizeHistory(history ?? []);

    let rawResponse = "";

    // ── Try Gemini ──
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        systemInstruction: currentSystemPrompt 
      });

      const chat = model.startChat({ history: cleanHistory });
      const result = await chat.sendMessage(prompt.trim());
      rawResponse = result.response.text();

    } catch (error: any) {
      console.error("[Gemini Fail]", error.message);

      // ── Fallback to Groq ──
      try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: currentSystemPrompt },
            ...cleanHistory.map(m => ({
              role: m.role === "model" ? "assistant" as const : "user" as const,
              content: m.parts[0].text
            })),
            { role: "user", content: prompt.trim() }
          ],
          temperature: 0.6,
        });

        rawResponse = completion.choices[0]?.message?.content || "";

      } catch (groqErr: any) {
        console.error("[Groq Fail]", groqErr.message);
        return NextResponse.json({
          text: "I'm currently helping other customers. Please try again in a moment!",
          jsonData: null
        });
      }
    }

    // ── EXTRACT JSON FROM RESPONSE ──
    let cleanText = rawResponse;
    let jsonData = null;

    // Remove the ```json ... ``` block and extract JSON
    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = rawResponse.match(jsonRegex);

    if (match) {
      try {
        jsonData = JSON.parse(match[1]);
        // Remove the JSON block from the text
        cleanText = rawResponse.replace(jsonRegex, "").trim();
      } catch (e) {
        console.error("JSON parse failed:", e);
      }
    }

    // If no JSON block found, try to find raw JSON object
    if (!jsonData) {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          jsonData = JSON.parse(jsonMatch[0]);
          cleanText = rawResponse.replace(jsonMatch[0], "").trim();
        } catch (e) {}
      }
    }

    // Final fallback
    if (!cleanText || cleanText === "") {
      cleanText = "How can I help you with that?";
    }

    console.log("Clean text:", cleanText);
    console.log("Extracted JSON:", jsonData);
 
    return NextResponse.json({
      text: cleanText,
      jsonData: jsonData as BookingData,
    });

  } catch (err) {
    console.error("[API Error]", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}