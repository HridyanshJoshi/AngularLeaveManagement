import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add auth header with jwt if account is logged in and request is to the api url
    const account = this.authenticationService.userValue;
    const isLoggedIn = localStorage.getItem('token');
    
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && account) {
        request = request.clone({
            setHeaders: { Authorization: `Bearer ${isLoggedIn}` }
        });
    }

    return next.handle(request);
  }
}
