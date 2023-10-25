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

  requestToJoinProject(projectId: string): Observable<any> {
    const url = `${this.projectUrl}/${projectId}/requests`;
    return this.httpClient.post(url, null);
  }

  acceptJoinRequest(projectId: string, requestId: string): Observable<any> {
    const url = `${this.projectUrl}/projects/${projectId}/requests/${requestId}/accept`;
    return this.httpClient.post<any>(url, {});  // Assuming this is a POST request
  }

  getUsersByProjectId(id: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.projectUrl}/${id}/users`);
  }


  deleteJoinRequest(projectId: string, requestId: string): Observable<any> {
    const url = `${this.projectUrl}/${projectId}/requests/${requestId}`;
    return this.httpClient.delete<any>(url);
  }



  getRequestToJoinProject(projectId: string): Observable<any[]> {
    const url = `${this.projectUrl}/${projectId}/requests`;
    return this.httpClient.get<any[]>(url);
  }

}
