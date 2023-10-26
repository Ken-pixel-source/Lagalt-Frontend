export type Project = {
    projectId: number;
    name: string;
    description: string;
    imageUrl: string;
    ownerId: string;
    projectStatusId: number | null;
    projectTypeId: number | null;
    users: any[];
    updates: any[];
    milestones: any[];
    tags: Tags[];
    projectRequests: any[];
  }

export type ProjectType ={
  projectTypeId: number;
  projectTypeName: string;
  projects: Project[];
}

  export interface ProjectResponse{
    projects: Project[]
}

export interface Tags {
  tagId: number;
  tagName: string;
  projects: Project[];
}

export interface TagsCreate {
  TagName: string;
}


export interface ProjectUsers {
  projectId: number;
  ownerId: string;
  users: any[];
}
