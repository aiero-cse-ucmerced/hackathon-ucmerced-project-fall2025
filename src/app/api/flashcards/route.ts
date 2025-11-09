import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// IMPORTANT: Uses the server-side only variable GEMINI_API_KEY.
// Requires server restart if .env.local is changed.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

// Prompt designed to enforce JSON output for reliable parsing
const robustPromptTemplate = `
Generate flashcards based on the following topic or term. Provide a related term and its definition in a JSON format.
Your output must be either an array of objects: [{ "word": "term", "definition": "definition" }, ...] 
OR a single object: { "word": "term", "definition": "definition" }.
If you cannot generate a flashcard, respond with a polite, non-JSON message.
Topic: 
`;

export async function POST(request: Request) {
  try {
    const { topic } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const prompt = `${robustPromptTemplate}${topic}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // ✅ FIX: Declared flashcards as an array of the required object type
    let flashcards: { word: string; definition: string }[] = [];

    try {
      const parsedResponse = JSON.parse(text);
      
      if (Array.isArray(parsedResponse)) {
        flashcards = parsedResponse;
      } else if (parsedResponse && typeof parsedResponse === 'object' && parsedResponse.word && parsedResponse.definition) {
        // Handle single object response
        flashcards = [parsedResponse];
      }
      
      if (flashcards.length > 0) {
        // Successful generation: return the structured flashcard data
        return NextResponse.json({ flashcards });
      } else {
        // Model returned an empty array or an unparsable structure
        return NextResponse.json({ message: "The model returned a structured response, but no flashcards were found." });
      }

    } catch (jsonError) {
      // JSON.parse failed: model returned a plain text message (e.g., "I cannot do that.")
      return NextResponse.json({ message: text });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    // 500 Error: Most likely an issue with the API key or initialization
    const errorMessage = (error as Error).message || "Unknown error occurred.";
    
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}