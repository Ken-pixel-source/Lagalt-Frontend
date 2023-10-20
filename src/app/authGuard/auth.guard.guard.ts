import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import keycloak from 'src/keycloak';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // If the user is authenticated and trying to access the login or landing page, redirect them to their profile.
      if (keycloak.authenticated && (state.url === '/' || state.url === '/login')) {
        this.router.navigate(['/profile']);

        return false;
      }

      // If the user is authenticated and trying to access another page, let them.
      if (keycloak.authenticated) {
        return true;
      }

      alert("You must be logged in to access this page.");
      keycloak.login();
      return false
  }
}