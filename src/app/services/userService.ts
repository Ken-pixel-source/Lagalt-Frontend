import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/app/enviroment/enviroments';
import { User, UserDetail } from '../models/user';
import { PortfolioProject } from '../models/portofolio';
import { Project } from '../models/projects';


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
    getUserById(userId: string): Observable<User> {
      return this.http.get<User>(`${this.userApiUrl}/${userId}`);
    }

    getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
    }
    addUserSkills(userId: string, SkillName: string) {
      return this.http.post(`${this.userApiUrl}/${userId}/skills`, { SkillName });
    }


    getSkillsByUserId(userId: string): Observable<number[]> {
      return this.http.get<number[]>(`${this.userApiUrl}/${userId}/skills`);
    }

    addPortfolio(userId: string, portfolio: PortfolioProject): Observable<any> {
      return this.http.post<any>(`${this.userApiUrl}/${userId}/portfolioprojects`, portfolio);
    }

    getUserPortfolios(userId: string): Observable<PortfolioProject[]> {
      return this.http.get<PortfolioProject[]>(`${this.userApiUrl}/${userId}/portfolioprojects`);
    }

    getUserDetailById(userId: string): Observable<UserDetail> {
      return this.http.get<UserDetail>(`https://lagalt.azurewebsites.net/api/v1/users/${userId}`);
    }



    getUserOwnedProjects(userId: string): Observable<Project[]> {
      return this.http.get<Project[]>(`${this.userApiUrl}/${userId}/ownerprojects`);
    }

        updateUserDetails(userId: string, description: string, education: string): Observable<any> {
        const body = {
            description: description,
            education: education,
        };

        return this.http.put<any>(`${this.userApiUrl}/${userId}`, body);
    }

  }
