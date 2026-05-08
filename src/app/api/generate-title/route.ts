import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a professional blog editor. 
Based on the content provided, generate 3 blog title and description pairs.
Tones: Professional, Nigerian conversational, or Persuasive.
Constraints:
- Each title must be under 10 words
- Each description must be 20-60 words, suitable as a meta description
- Title and description must match in tone and topic
Output Format: You must return valid JSON in the following format:
{ 
  "suggestions": [
    { "title": "title 1", "description": "description 1" },
    { "title": "title 2", "description": "description 2" },
    { "title": "title 3", "description": "description 3" }
  ]
}
Do not include any text other than the JSON object.`;

export async function POST(request: Request) {
  try {
    /**
     * STEP 1 — PARSE THE REQUEST BODY
     * Extract `content` from the JSON body sent by the client.
     * The client should send: { content: "blog text here..." }
     */
    const { content } = await request.json();

    /**
     * STEP 2 — VALIDATE THE INPUT
     * Reject the request early if content is missing or not a string.
     * This prevents unnecessary Groq API calls.
     */
    if (!content || typeof content !== 'string') {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    /**
     * STEP 3 — SANITIZE THE INPUT
     * Strip all HTML tags (e.g. <p>, <strong>) so the model only sees plain text.
     * Trim whitespace and cap at 4000 chars to stay within token limits.
     */
    const cleanText = content.replace(/<[^>]*>?/gm, '').trim().substring(0, 4000);

    let rawResponse = '';

    /**
     * STEP 4 — CALL THE GROQ API
     * - `groq` is instantiated once at module level using GROQ_API_KEY from .env.local
     * - Use a recent model (llama-3.3-70b-versatile) — older model names cause 503 failures
     * - `response_format: { type: 'json_object' }` instructs the model to return pure JSON
     * - `temperature: 0.7` adds some creativity without going off the rails
     * - Messages: system prompt sets the rules, user message provides the blog content
     */
    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: cleanText },
        ],
      });

      rawResponse = completion.choices[0]?.message?.content ?? '';
    } catch (groqErr: any) {
      console.error('[Groq Fail]', groqErr.message);
      return NextResponse.json(
        { error: 'AI service unavailable, please try again shortly' },
        { status: 503 }
      );
    }

    if (!rawResponse) {
      throw new Error('No content received from Groq');
    }

    /**
     * STEP 5 — PARSE THE RESPONSE (three-tier fallback)
     *
     * Tier 1 — Direct JSON.parse()
     * Works most of the time because response_format forces valid JSON.
     * Extracts the `suggestions` array from the response.
     *
     * Tier 2 — Regex extract then parse
     * For rare cases where the model wraps JSON in extra text.
     * Pulls out the first {...} block and tries to parse that.
     *
     * Tier 3 — Raw string fallback
     * If all parsing fails, return a single suggestion with the raw response
     * so the endpoint never crashes and always returns something.
     */
    let suggestions: { title: string; description: string }[] = [];
    try {
      const parsed = JSON.parse(rawResponse);
      suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [parsed.suggestions];
    } catch {
      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          suggestions = Array.isArray(parsed.suggestions) ? parsed.suggestions : [parsed.suggestions];
        } catch {
          suggestions = [{ title: rawResponse.trim(), description: '' }];
        }
      }
    }

    /**
     * STEP 6 — RETURN THE SUGGESTIONS
     * Send the suggestions array back to the client as JSON.
     * Client receives: { suggestions: [{ title, description }, ...] }
     */
    return NextResponse.json({ suggestions });
  } catch (e) {
    console.error('[API Error]', e);
    return NextResponse.json(
      { error: 'Failed to generate suggestions', details: e instanceof Error ? e.message : 'Unknown error' },
      { status: 500 }
    );
  }
}