import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';
import { Leave } from '../leave';
@Component({
  selector: 'app-my-leave',
  templateUrl: './my-leave.component.html',
  styleUrls: ['./my-leave.component.scss'],
})
export class MyLeaveComponent implements OnInit {
  leaveList: boolean = true;
  leaves: any[];
  templeave: any[];
  user: any;
  leaveLoading: boolean = false;
  page = 1;
  pageSize = 5;
  constructor(
    private _common: CommonService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
    this.getAppliedLeaves();
  }
  getAppliedLeaves() {
    this.leaveLoading = true;
    this._common
      .getLeaves()
      .pipe(
        take(1),
        map((res) => {
          return res.filter((v: { user: any }) => v.user == this.user?.id);
        })
      )
      .subscribe({
        next: (r) => {
          this.leaves = r;
          this.templeave = r;
          this.loadLeave();
          console.log('r', r);
        },
        error: (err) => {
          console.log('err', err);
        },
        complete: () => {
          this.leaveLoading = false;
        },
      });
  }
  loadLeave() {
    this.leaves = this.templeave
      .map((country, i) => ({ ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  onAction(item: Leave, action: String) {
    debugger
    this.router.navigate(['leave/apply-for-leave', action, item.id])
  }
}