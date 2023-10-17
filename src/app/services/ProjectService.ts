import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project, ProjectResponse, ProjectType } from '../models/projects';
import { environment } from '../enviroment/enviroments';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and injectable throughout the app
})
export class ProjectService {
  private projectUrl = environment.projectUrl;
  private projectTypeUrl = environment.projectTypeUrl
  constructor(private readonly httpClient: HttpClient) {
    
  }

  
  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.projectUrl);
  }
  getProjectById(id: string): Observable<Project | undefined> {
    const url = `${this.projectUrl}/${id}`; // Replace with the actual API endpoint
    return this.httpClient.get<Project>(url);
  }
  getProjectType(): Observable<ProjectType[]> {
    return this.httpClient.get<ProjectType[]>(this.projectTypeUrl);
  }
}
