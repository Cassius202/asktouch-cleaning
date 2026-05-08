// app/api/chat/route.ts
import Groq from "groq-sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { getSystemPrompt } from "@/constants/systemPrompt";
import { BookingData } from "@/constants/types";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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

async function callGroq(
  systemPrompt: string,
  history: HistoryMessage[],
  prompt: string
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      ...history.map(m => ({
        role: m.role === "model" ? "assistant" as const : "user" as const,
        content: m.parts[0].text
      })),
      { role: "user", content: prompt.trim() }
    ],
    temperature: 0.6,
  });

  return completion.choices[0]?.message?.content || "";
}

async function callGemini(
  systemPrompt: string,
  history: HistoryMessage[],
  prompt: string
): Promise<string> {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: history.map(m => ({
      role: m.role, // Gemini uses "user" | "model" natively
      parts: m.parts,
    })),
  });

  const result = await chat.sendMessage(prompt.trim());
  return result.response.text();
}

function extractJson(rawResponse: string): { cleanText: string; jsonData: any } {
  let cleanText = rawResponse;
  let jsonData = null;

  const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
  const match = rawResponse.match(jsonRegex);

  if (match) {
    try {
      jsonData = JSON.parse(match[1]);
      cleanText = rawResponse.replace(jsonRegex, "").trim();
    } catch (e) {
      console.error("JSON parse failed (code block):", e);
    }
  }

  if (!jsonData) {
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        jsonData = JSON.parse(jsonMatch[0]);
        cleanText = rawResponse.replace(jsonMatch[0], "").trim();
      } catch (e) {}
    }
  }

  if (!cleanText || cleanText.trim() === "") {
    cleanText = "How can I help you with that?";
  }

  return { cleanText, jsonData };
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
    let usedFallback = false;

    // ── PRIMARY: GROQ ──
    try {
      rawResponse = await callGroq(currentSystemPrompt, cleanHistory, prompt);
    } catch (groqErr: any) {
      console.error("[Groq failed, switching to Gemini]", groqErr.message);
      usedFallback = true;

      // ── FALLBACK: GEMINI ──
      try {
        rawResponse = await callGemini(currentSystemPrompt, cleanHistory, prompt);
      } catch (geminiErr: any) {
        console.error("[Gemini also failed]", geminiErr.message);
        return NextResponse.json({
          text: "I'm currently helping other customers. Please try again in a moment!",
          jsonData: null,
        });
      }
    }

    const { cleanText, jsonData } = extractJson(rawResponse);

    console.log(`[Provider]: ${usedFallback ? "Gemini (fallback)" : "Groq (primary)"}`);
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