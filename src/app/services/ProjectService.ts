import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectResponse } from '../models/projects';

@Injectable({
  providedIn: 'root' // Makes the service a singleton and injectable throughout the app
})
export class ProjectService {
  private apiUrl = 'https://lagalt.azurewebsites.net/api/v1/projects'
  constructor(private readonly httpClient: HttpClient) {

  }

  
  getProjects(): Observable<ProjectResponse> {
    return this.httpClient.get<ProjectResponse>(this.apiUrl);
  }
  
}
