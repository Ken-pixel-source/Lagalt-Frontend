import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent implements OnInit{


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

  onLoginClick() {
    keycloak.login()
  }

  showToken
  () {
    console.log(keycloak.token)

  }

  onLogoutClick() {
    keycloak.logout()
  }
}
