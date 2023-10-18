import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showDropdown = false;
  showProfileDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  logout() {
    localStorage.removeItem('token');
  }
}
