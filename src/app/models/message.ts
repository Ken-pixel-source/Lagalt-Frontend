export interface Message {
    messageId: number;
    subject: string;
    messageContent: string;
    imageUrl: string;
    timestamp: string | null;
    creatorId: string; 
    projectId: number;
    replies: Message[] | null;
  }

  export interface MessageResponse {
    messages: Message[];
  }

  export interface MessageCreate {
    subject: string;
    messageContent: string;
    imageUrl: string;
  }