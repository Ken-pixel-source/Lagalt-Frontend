import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroments';

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
    addUserSkills(userId: string, SkillName: string) {
      return this.http.post(`${this.userApiUrl}/${userId}/skills`, { SkillName });
    }
    
    
 
  }
  