export interface User {
  userId: string;
  userName: string;
  password: string;
  description?: string;
  education?: string;
  projects: number[];
  skills: number[];
  portfolioProjects: number[];
  updates: number[];
  userReviews: number[];
  projectRequests: number[];
  messages: number[];
}


export interface UserProfile {
  userId: string;
  userName: string;
  description: string;
  education: string;
  projects: number[];
  skills: number[];
  portfolioProjects: number[];
  userReviews: number[];
}


 export interface skills {
  skillId: number;
  skillName: string;
}
