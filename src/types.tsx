export interface Message {
    id: string
    text: string
    user_id: string
    timestamp: number
  }
  
 export interface Conversation {
    id: string;
    messages: Message[];
  }