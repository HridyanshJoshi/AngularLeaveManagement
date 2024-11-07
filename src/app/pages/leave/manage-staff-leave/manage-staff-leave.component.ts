import { Component, OnInit } from '@angular/core';
import { map, take, zip } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';
@Component({
  selector: 'app-manage-staff-leave',
  templateUrl: './manage-staff-leave.component.html',
  styleUrls: ['./manage-staff-leave.component.scss']
})
export class ManageStaffLeaveComponent implements OnInit {
  leaves: any;
  searchName: string = '';
  templeave: any;
  prop: any;
  sortorder: boolean;
  leaveLoading: boolean = false;
  page = 1;
  pageSize = 5;
  constructor(
    private _common: CommonService,
    private authenticationService: AuthenticationService
  ) {}
  ngOnInit(): void {
    this.getLeaveWithUserName();
  }
  getLeaveWithUserName() {
    this.leaveLoading = true;
    const user$ = this._common.getUsers();
    const leave$ = this._common.getLeaves();
    zip(user$, leave$)
      .pipe(
        map(([user, leave]) => {
          for (let key of leave) {
            const matchId = user.find((x: { id: string }) => x.id == key.user);
            matchId.name;
            console.log(matchId.name);
          }
          return leave;
        })
      )
      .subscribe({
        next: (res) => {
          this.leaves = res;
          this.templeave = [...this.leaves];
          this.refreshCountries();
        },
        error: (err) => {
          console.log('err', err);
        },
        complete: () => {
          this.leaveLoading = false;
        },
      });
  }
  actionLeave(item: any, action: string) {
    const approvePL = { ...item, status: action };
    this._common
      .updateLeave(approvePL, item.id)
      .pipe(take(1))
      .subscribe((r) => {
        this.getLeaveWithUserName();
      });
  }
  searchLeave() {
    if (this.searchName) {
      this.leaves = this.templeave.filter((v: { name: string }) => {
        return v.name.toLowerCase().match(this.searchName.toLowerCase());
      });
    } else {
      this.leaves = this.templeave;
    }
  }
  sort(prop: any) {
    this.prop = prop;
    this.sortorder = !this.sortorder;
    const sortType = typeof this.leaves[0][prop];
    console.log('sortType', sortType);
    this.leaves.sort((a: any, b: any) => {
      let aprop;
      let bprop;
      switch (sortType) {
        case 'string':
          {
            aprop = a[prop].toUpperCase();
            bprop = b[prop].toUpperCase();
          }
          break;
        case 'number': {
          aprop = a[prop];
          bprop = b[prop];
        }
      }
      if (aprop < bprop) {
        return this.sortorder ? -1 : 1;
      }
      if (aprop > bprop) {
        return this.sortorder ? 1 : -1;
      }
      return 0;
    });
  }
  refreshCountries() {
    console.log('referesh');
    
    this.leaves = this.templeave
      .map((country, i) => ({ ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
}