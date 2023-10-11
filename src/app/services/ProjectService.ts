import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/projects';
import { environment } from '../enviroment/enviroments';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and injectable throughout the app
})
export class ProjectService {
  private apiUrl = environment.projectUrl;
  constructor(private readonly httpClient: HttpClient) {
    
  }

  
  getProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.apiUrl);
  }
  getProjectById(id: string): Observable<Project | undefined> {
    const url = `${this.apiUrl}/${id}`; // Replace with the actual API endpoint
    return this.httpClient.get<Project>(url);
  }
}
