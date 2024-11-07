import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  mockapi = environment.mockapi;
  constructor(private http: HttpClient) {}

  dateToNgb(d) {
    let nd = new Date(d);
    const ngbDate = {
      day: nd.getDate(),
      month: nd.getMonth() + 1,
      year: nd.getFullYear(),
    };
    return ngbDate;
  }

  ngbTodate(d) {
   return new Date(d.year, d.month - 1, d.day);
  }

  createUser(data: User) {
    return this.http.post<any>(this.mockapi + 'users', data);
  }

  getUsers() {
    return this.http.get<any>(this.mockapi + 'users');
  }

  getUser(id: any) {
    return this.http.get<any>(this.mockapi + 'users/' + id);
  }

  deleteUser(id: any) {
    return this.http.delete<any>(this.mockapi + 'users/' + id);
  }

  addLeave(data: any) {
    return this.http.post<any>(this.mockapi + '/leave', data);
  }

  getLeaves() {
    return this.http.get<any>(this.mockapi + '/leave');
  }

  updateLeave(data: any, leaveId: any) {
    return this.http.put<any>(this.mockapi + '/leave/' + leaveId, data);
  }

  getLeave(id: String) {
    return this.http.get<any>(this.mockapi + '/leave/' + id);
  }
}