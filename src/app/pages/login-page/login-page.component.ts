import { Component } from '@angular/core';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent {

  onLoginClick(){
   keycloak.login();
    console.log(this.onLoginClick)
  }

}
