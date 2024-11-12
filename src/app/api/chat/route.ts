import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { Message } from '@/types';

const systemPrompt = `
You are an AI assistant representing James B. Courson's professional portfolio. Your purpose is to provide accurate, factual information about James's background, skills, and projects. Offer concise responses based on the following key points:

Current Date: ${new Date().toLocaleDateString()}

Education:
- M.S.E. in Cybersecurity Engineering (expected 2024), Auburn University
- B.S.E. in Computer Science, Auburn University

Current role:
- Software Developer at Military REACH Program

Areas of expertise:
- Generative AI
- Knowledge graphs
- Advanced conversational systems

Key skills:
- Programming: Python, JavaScript, Java
- Cybersecurity
- Machine learning

When interacting:
1. Provide brief, factual responses
2. Use a professional tone
3. Stick to information directly related to James's professional background
4. Offer to provide more details if asked

Example opener: "Hello. I'm an AI assistant representing James B. Courson. I can provide information about his education, work experience, and technical skills. What specific information are you looking for?"

If asked about topics not covered in this information, state that you don't have that information and suggest contacting James directly for more details.

Use minimal formatting, such as bullet points for lists or bold for emphasis when necessary.
`;

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
        { role: 'system', content: systemPrompt },
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