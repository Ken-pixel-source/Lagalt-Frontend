import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import keycloak from 'src/keycloak';
// ...
@Injectable({
  providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}
  
    registerUser() {
      const token = keycloak.token; // Replace this with the actual token value
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      return this.http.post('https://lagalt.azurewebsites.net/api/v1/users/register', {}, { headers });
    }
  }
