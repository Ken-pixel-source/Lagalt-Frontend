export interface Message {
    messageId: number;
    subject: string;
    parentId?: number; 
    parent?: Message;
    messageContent: string;
    imageUrl: string;
    timestamp: Date;
    userId?: string; 
    user?: User;
    projectId?: number;
    project?: Project; 
    replies?: Message[];
  }
  
  // Also add interfaces for User and Project if they aren't defined elsewhere:
  export interface User {
    // Include fields for the User model
  }
  
  export interface Project {
    // Include fields for the Project model
  }
  