import { User } from './user';
import { Project } from './projects';

export interface Message {
    messageId: number;
    subject: string;
    parentId: number; 
    parent: Message | null;
    messageContent: string;
    imageUrl: string | null;
    timestamp: Date | string;
    userId: string | number; 
    user: User | null;
    projectId: number | null;
    project: Project | null; 
    replies: Message[] | null;
  }

  export interface MessageCreate {
    subject: string | null;
    messageContent: string;
    imageUrl: string | null;
  }