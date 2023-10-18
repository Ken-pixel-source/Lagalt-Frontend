import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/enviroment/enviroments';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userApiUrl = environment.projectUsers; // using projectUsers endpoint for user-related operations

  constructor(private http: HttpClient) {}

  registerUser() {
    return this.http.post(`${this.userApiUrl}/register`, {});
  }
}
