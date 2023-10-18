import { Component, OnInit} from '@angular/core';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit {
  ngOnInit(): void {
  }
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
