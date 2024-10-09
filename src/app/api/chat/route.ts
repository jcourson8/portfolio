import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { Message } from '@/types';

const model = anthropic('claude-3-haiku-20240307');

export async function POST(req: NextRequest) {
  const { messages, conversationId } = await req.json();

  try {
    const formattedMessages = messages.map((msg: Message) => ({
      role: msg.user_id === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    const stream = await streamText({
      model,
      messages: [
        { role: 'system', content: 'You are a helpful assistant that can answer questions about James Courson and his projects.' },
        ...formattedMessages
      ],
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}