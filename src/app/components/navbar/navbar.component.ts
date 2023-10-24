import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/userService';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private userService: UserService) {}

  showDropdown = false;
  showProfileDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

    toggleProfileDropdown() {
      this.showProfileDropdown = !this.showProfileDropdown;
    }

    isAuthenticated(): boolean {
      return !!keycloak.authenticated;
    }

    onLogoutClick() {
      keycloak.logout()
    }

   onLoginClick(){
    keycloak.login()
   }
}
