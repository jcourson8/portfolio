'use server'

import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { Message } from '@/types';

const model = anthropic('claude-3-haiku-20240307');

export async function sendMessage(message: string, conversationId: string) {
  try {
    const stream = await streamText({
      model,
      messages: [{ role: 'user', content: message }],
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    throw error;
  }
}