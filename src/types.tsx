import { Message as AIMessage } from 'ai';

export interface Conversation {
    id: string;
    messages: AIMessage[];
}

// Re-export the Message type if needed elsewhere in your app
export type Message = AIMessage;