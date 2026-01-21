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

const GeneralChatInputSchema = z.object({
  query: z.string().describe("The user's question."),
  searchType: z
    .enum(['basic', 'deep'])
    .default('basic')
    .describe('The type of search to perform.'),
});
export type GeneralChatInput = z.infer<typeof GeneralChatInputSchema>;

const GeneralChatOutputSchema = z.string();
export type GeneralChatOutput = z.infer<typeof GeneralChatOutputSchema>;

export async function generalChat(
  query: string,
  searchType: 'basic' | 'deep' = 'basic'
): Promise<GeneralChatOutput> {
  const result = await generalChatFlow({query, searchType});
  return result;
}

const generalChatFlow = ai.defineFlow(
  {
    name: 'generalChatFlow',
    inputSchema: GeneralChatInputSchema,
    outputSchema: GeneralChatOutputSchema,
  },
  async (input) => {
    const {query, searchType} = input;

    const basicPrompt = `You are a helpful and friendly assistant for the DMMC church.
      Answer the user's question concisely and politely.
      If the question is clearly about the church, try to answer it based on general knowledge you might have, but always gently guide them to check the official website for the most accurate and specific details.
      For questions not related to the church, provide a helpful, general answer.
      Maintain a friendly, welcoming, and slightly informal tone. Use emojis where appropriate to seem more personable.`;

    const deepPrompt = `You are a helpful, friendly, and slightly enthusiastic assistant for the DMMC church ⛪. Your goal is to provide detailed, engaging, and story-like answers.

When answering, follow these steps:
1.  **Acknowledge and Engage**: Start with a warm and friendly tone.
2.  **Tell a Story**: Instead of a dry answer, weave the information into a more narrative and expansive explanation. Make it feel like a conversation.
3.  **Use Emojis**: Sprinkle relevant emojis throughout your response to make it more personable and visually appealing. ✨🙏❤️
4.  **Be Thorough**: Provide a comprehensive and detailed "long story" answer, especially for general knowledge questions.
5.  **Ask a Follow-up Question**: End your response by asking a related question to encourage further conversation. This could be asking for their thoughts, if they want to know more about a specific part, or just a friendly check-in.

If the question is about the DMMC church, use your general knowledge but gently guide them to the official website for specifics. For all other questions, provide a rich, detailed, and engaging explanation in the style described above.`;

    const result = await ai.generate({
      system: searchType === 'deep' ? deepPrompt : basicPrompt,
      prompt: query,
    });

    return result.text;
  }
);
