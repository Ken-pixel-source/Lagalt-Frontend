import { Component } from '@angular/core';
import keycloak from 'src/keycloak';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent {
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
