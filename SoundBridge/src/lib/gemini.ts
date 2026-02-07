import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function getBatchCompatibility(currentUser: any, profiles: any[]) {
  const prompt = `Strictly compare this User: ${JSON.stringify(currentUser)} with these Candidates: ${JSON.stringify(profiles)}. Score 1-100 based on exact genre sub-type overlap. Be highly critical: give scores above 80 only for perfect matches. Return ONLY a JSON array of objects with "uid", "insight" (max 5 words), and "score" (number).`;
  try {
    const result = await model.generateContent(prompt);
    return JSON.parse(result.response.text().replace(/```json|```/g, ""));
  } catch (e) {
    console.error(e);
    return [];
  }
}
