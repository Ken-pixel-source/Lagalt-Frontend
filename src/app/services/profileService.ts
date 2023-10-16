import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  getUserDetails(userId: number) {
    return this.http.get(`${this.BASE_URL}/users/${userId}`);
  }

  getUserSkills(userId: number) {
    return this.http.get(`${this.BASE_URL}/todos?userId=${userId}&_limit=6`);
  }

  getUserPortfolio(userId: number) {
    return this.http.get(`${this.BASE_URL}/photos?albumId=${userId}&_limit=6`);
  }

  getUserJoinedProjects(userId: number) {
    return this.http.get(`${this.BASE_URL}/posts?userId=${userId}&_limit=6`);
  }

}
