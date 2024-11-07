import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.authenticationService.userValue;
      if (user && Object.keys(user).length != 0) {
        // check if route is restricted by role
        if (user.role == 'Staff') {
          // role not authorised so redirect to home page
          this.router.navigate(['/']);
          return false;
        }
  
        // authorised so return true
        return true;
      }
  
      this.router.navigate(['/login']);
      return false;
  }
  
}
