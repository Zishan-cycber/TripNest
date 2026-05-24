import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is missing in .env file");
}

const ai = new GoogleGenAI({
  apiKey: API_KEY,
});

export async function generateTripWithAI(DYNAMIC_PROMPT) {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: [],
    });

    const response = await chat.sendMessage({
      message: DYNAMIC_PROMPT,
    });

    let textResponse = response.text || "";

    // remove markdown code blocks safely
    textResponse = textResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // safe JSON parse (prevents crash)
    try {
      return JSON.parse(textResponse);
    } catch (err) {
      console.log("RAW AI RESPONSE:", textResponse);
      throw new Error("AI returned invalid JSON");
    }
  } catch (error) {
    console.error("Error generating trip:", error);
    throw error;
  }
}


























