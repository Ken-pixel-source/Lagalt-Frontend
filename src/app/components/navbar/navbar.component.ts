import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  imageSrc = 'assets/images/lagaltlogo.png'  
  imageAlt = 'bilde av logo'
  profileSrc = 'assets/images/profile.png'
  profileAlt = 'bilde av profilbilde'
}
