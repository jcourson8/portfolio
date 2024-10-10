export interface Message {
    id: string
    text: string
    user_id: string
    timestamp: number
    pending?: boolean;
  }
  
 export interface Conversation {
    id: string;
    messages: Message[];
  }