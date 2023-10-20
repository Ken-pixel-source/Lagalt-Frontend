import { User } from './user';
import { Project } from './projects';

export interface Message {
    messageId: number;
    subject: string;
    //parentId: number; 
    //parent: Message | null;
    messageContent: string;
    imageUrl: string;
    timestamp: string | null;
    creatorId: string | null; 
    //user: User | null;
    projectId: number;
    //project: Project | null; 
    replies: Message[] | null;
  }

  export interface MessageCreate {
    subject: string;
    messageContent: string;
    imageUrl: string;
  }