import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { User } from '../models/user';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;
  constructor(
    private router: Router,
    private http: HttpClient,
    private _common: CommonService
  ) {
    this.userSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user') || '{}')
    );
    this.user = this.userSubject.asObservable();
  }
  public get userValue(): User {
    return this.userSubject.value;
  }
  login(username: string, password: string) {
    return this._common.getUsers().pipe(
      take(1),
      map((u) => {
        //as dummy data filtering from all users.
        const loggeduser = u.find(
          (f: { username: string; password: string }) =>
            f.username == username && f.password == password
        );
        // store user details and dummy jwt token in local storage to keep user logged in between page refreshes
        if (loggeduser) {
          localStorage.setItem('user', JSON.stringify(loggeduser));
          this.userSubject?.next(loggeduser);
          return loggeduser;
        } else {
          return null;
        }
      })
    );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}