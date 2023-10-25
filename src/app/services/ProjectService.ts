import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectResponse, ProjectType, Tags } from '../models/projects';
import { environment } from '../enviroment/enviroments';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and injectable throughout the app
})
export class ProjectService {
  private projectUrl = environment.projectUrl;
  private projectTypeUrl = environment.projectTypeUrl;


  constructor(private readonly httpClient: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.projectUrl);
  }

  getProjectById(id: string): Observable<Project | undefined> {
    const url = `${this.projectUrl}/${id}`;
    return this.httpClient.get<Project>(url);
  }

  getProjectType(): Observable<ProjectType[]> {
    return this.httpClient.get<ProjectType[]>(this.projectTypeUrl);
  }

  getProjectTypeName(projectTypeId: number): Observable<string> {
    const url = `${this.projectTypeUrl}/${projectTypeId}`;
    return this.httpClient.get<ProjectType>(url).pipe(
      map((projectType: ProjectType) => projectType.projectTypeName)
    );
  }

  getProjectTags(id: string): Observable<Tags[]> {
    const url = `${this.projectUrl}/${id}/tags`;
    return this.httpClient.get<Tags[]>(url);
  }

  getProjectTagName(id: number, tagId: number): Observable<string> {
    const url = `${this.projectUrl}/${id}/tags/${tagId}`;
    return this.httpClient.get<ProjectType>(url).pipe(
      map((projectType: ProjectType) => projectType.projectTypeName)
    );
  }

  createProject(project: any ): Observable<any> {
    return this.httpClient.post(`${this.projectUrl}`, project);
  }

  checkIfRequestSent(projectId: string, userId: string): Observable<boolean> {
    return this.httpClient.get<any[]>(`${this.projectUrl}/${projectId}/requests`).pipe(
      map(requests => {
        return requests.some(request => request.userId === userId);
      })
    );
  }

  removeUserFromProject(projectId: string, userId: string): Observable<any> {
    const url = `${this.projectUrl}/${projectId}/users/remove/${userId}`;
    return this.httpClient.delete<any>(url);
  }



  requestToJoinProject(projectId: string): Observable<any> {
    const url = `${this.projectUrl}/${projectId}/requests`;
    return this.httpClient.post(url, null);
  }

  acceptJoinRequest(projectId: string, requestId: string): Observable<any> {
    const url = `${this.projectUrl}/projects/${projectId}/requests/${requestId}/accept`;
    return this.httpClient.post<any>(url, {});
  }

  getUsersByProjectId(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.projectUrl}/${id}/users`);
  }



  deleteJoinRequest(projectId: string, requestId: string): Observable<any> {
    const url = `${this.projectUrl}/${projectId}/requests/${requestId}`;
    return this.httpClient.delete<any>(url);
  }

  addRequirement(projectId: string, requirement: any): Observable<any> {
    const url = `${this.projectUrl}/${projectId}/requirements/add`;
    return this.httpClient.post(url, requirement);
  }


  getRequestToJoinProject(projectId: string): Observable<any[]> {
    const url = `${this.projectUrl}/${projectId}/requests`;
    return this.httpClient.get<any[]>(url);
  }

}
