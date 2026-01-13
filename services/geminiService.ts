
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Endpoint, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askAiAboutEndpoint = async (endpoint: Endpoint, query: string, history: ChatMessage[] = []): Promise<string> => {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        role: 'user',
        parts: [{ 
          text: `You are a senior API documentation assistant for the "Nexus Core API". 
          Context of the current endpoint:
          Method: ${endpoint.method}
          Path: ${endpoint.path}
          Summary: ${endpoint.summary}
          Description: ${endpoint.description}
          Parameters: ${JSON.stringify(endpoint.parameters)}
          
          Previous conversation history:
          ${history.map(h => `${h.role}: ${h.content}`).join('\n')}
          
          User Query: ${query}
          
          Provide a helpful, technical, and concise answer. If asked for code, provide a clean snippet in JavaScript/Node.js or cURL.`
        }]
      }
    ],
    config: {
      temperature: 0.7,
      topP: 0.9,
    }
  });

  const response = await model;
  return response.text || "I'm sorry, I couldn't process that request.";
};

export const generateClientCode = async (endpoint: Endpoint, language: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a production-ready client code snippet for the following API endpoint in ${language}. 
    Endpoint: ${endpoint.method} ${endpoint.path}
    Description: ${endpoint.description}
    Parameters: ${JSON.stringify(endpoint.parameters)}
    
    Include error handling and clean comments. Return only the code block without markdown backticks if possible, or well-formatted markdown.`,
  });
  
  return response.text || "// Failed to generate code";
};
