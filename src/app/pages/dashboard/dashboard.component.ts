import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  staffCount: any;
  user: any;
  leaveCount: any;

  constructor(
    private _common: CommonService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
    this.getStaffCount();
    this.getLeaveCount();
  }

  getStaffCount() {
    this._common
      .getUsers()
      .pipe(
        take(1),
        map((r) => {
          return r.filter(
            (fr: { role: string; dept: string }) =>
              fr.role == 'Staff' && fr.dept == this.user?.dept
          );
        })
      )
      .subscribe((res) => (this.staffCount = res.length));
  }

  getLeaveCount() {
    this._common
      .getLeaves()
      .pipe(
        take(1),
        map((r) => {
          return r.filter((v: { dept: string }) => v.dept == this.user?.dept);
        })
      )
      .subscribe((r) => {
        console.log('leaveCount', r);

        this.leaveCount = r.length;
      });
  }
}
