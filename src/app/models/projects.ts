export type Project = {
    projectId: number;
    name: string;
    description: string;
    ownerId: number;
    projectStatusId: number | null;
    projectTypeId: number | null;
    users: any[]; // You can replace 'any' with a user model if needed
    updates: any[]; // You can replace 'any' with an update model if needed
    milestones: any[]; // You can replace 'any' with a milestone model if needed
    tags: any[]; // You can replace 'any' with a tag model if needed
    projectRequests: any[]; // You can replace 'any' with a project request model if needed
  }
export type ProjectType ={
  projectTypeId: number;
  projectTypeName: string;
  projects: Project[];
}
  export interface ProjectResponse{ 
    projects: Project[]
}