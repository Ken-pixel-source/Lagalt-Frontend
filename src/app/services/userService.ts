import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/enviroment/enviroments';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
  })
  export class UserService {
    private userApiUrl = environment.projectUsers;
  
    constructor(private readonly http: HttpClient) {}
  
    registerUser() {
      return this.http.post(`${this.userApiUrl}/register`, {});
    }
  
    // retrieve user details by their ID
    getUserById(userId: string) {
      return this.http.get(`${this.userApiUrl}/${userId}`);
    }
    getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
    }
    addUserSkills(userId: string, SkillName: string) {
      return this.http.post(`${this.userApiUrl}/${userId}/skills`, { SkillName });
    }
  }
