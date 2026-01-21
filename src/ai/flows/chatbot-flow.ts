'use server';
/**
 * @fileOverview A general knowledge chatbot flow.
 *
 * - generalChat - A function that handles general user queries.
 * - GeneralChatInput - The input type for the generalChat function.
 * - GeneralChatOutput - The return type for the generalChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneralChatInputSchema = z.string();
export type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const GeneralChatOutputSchema = z.string();
export type GeneralChatOutput = z.infer<typeof GeneralChatOutputSchema>;

export async function generalChat(input: GeneralChatInput): Promise<GeneralChatOutput> {
  const result = await generalChatFlow(input);
  return result;
}

const generalChatFlow = ai.defineFlow(
  {
    name: 'generalChatFlow',
    inputSchema: GeneralChatInputSchema,
    outputSchema: GeneralChatOutputSchema,
  },
  async (query) => {
    const result = await ai.generate({
      system: `You are a helpful and friendly assistant for the DMMC church.
      Answer the user's question concisely and politely.
      If the question is clearly about the church, try to answer it based on general knowledge you might have, but always gently guide them to check the official website for the most accurate and specific details.
      For questions not related to the church, provide a helpful, general answer.
      Maintain a friendly, welcoming, and slightly informal tone. Use emojis where appropriate to seem more personable.`,
      prompt: query,
    });

    return result.text;
  }
);
