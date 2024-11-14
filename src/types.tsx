import { Message as AIMessage } from 'ai';

export interface Conversation {
    id: string;
    messages: AIMessage[];
}

export type Message = AIMessage;