export interface User {
  userId:            string;
  userName:          string;
  password:          string;
  description:       string;
  education:         string;
  projects:          number[];
  skills:            number[];
  portfolioProjects: number[];
  updates:           number[];
  userReviews:       number[];
  projectRequests:   number[];
  messages:          number[];
}
