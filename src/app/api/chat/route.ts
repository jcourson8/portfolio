import { anthropic } from '@ai-sdk/anthropic';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { getProjects } from '@/actions/getProjects';
import { getFormattedProjects } from '@/actions/getFormatedProject';
import { NextRequest } from 'next/server';

const model = anthropic('claude-3-haiku-20240307');

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const stream = await streamText({
      model,
      messages,
      system: `You are an AI assistant representing James Courson's professional portfolio...`,
      tools: {
        getProjects: tool({
          description: 'Get all projects from the portfolio database',
          parameters: z.object({}),
          execute: async () => {
            try {
              const projects = await getProjects();
              return { projects };
            } catch (error) {
              console.error('Error fetching projects:', error);
              throw new Error('Failed to fetch projects');
            }
          },
        }),
        getFormattedProjects: tool({
          description: 'Get a concise text summary of all portfolio projects',
          parameters: z.object({}),
          execute: async () => {
            try {
              const formattedProjects = await getFormattedProjects();
              return { summary: formattedProjects };
            } catch (error) {
              console.error('Error fetching formatted projects:', error);
              throw new Error('Failed to fetch formatted projects');
            }
          },
        }),
      },
      maxSteps: 3,
    });

    return stream.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}