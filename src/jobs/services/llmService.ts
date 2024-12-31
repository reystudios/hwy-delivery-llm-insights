import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is not set");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const queryLLM = async (prompt: string): Promise<string> => {
  if (!prompt.trim()) {
    throw new Error("Empty prompt provided");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed from gpt-4 to gpt-3.5-turbo
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error("No response content from OpenAI");
    }

    return response.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
    throw new Error("Unknown error occurred while querying OpenAI");
  }
};
