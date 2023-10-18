import { Component, OnInit } from '@angular/core';
import keycloak from 'src/keycloak';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/userService';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  constructor(private userService: UserService) {}
  ngOnInit() {


    
    this.userService.registerUser().subscribe(
      (response) => {
        // User registration successful, handle the response
      },
      (error) => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }

}
