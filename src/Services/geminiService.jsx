import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateWithGemini = async (prompt, type) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const contextPrompts = {
      title: `Generate a catchy and engaging title for a ${type} post about: "${prompt}". Make it concise and attention-grabbing. Only return the title without quotes.`,
      content: `Write engaging content for a ${type} post about: "${prompt}". Make it informative, well-structured, and suitable for a community notice board. Keep it concise but comprehensive.`,
      description: `Write a clear and informative description for a ${type} about: "${prompt}". Make it engaging and provide all necessary details. Keep it concise but complete.`
    };

    const finalPrompt = contextPrompts[type] || contextPrompts.content;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};