import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staff: any[] = [];
  staffLoading: boolean = false;
  sortorder: boolean;
  prop: any;
  searchName: string = '';
  tempStaff: any[];
  page = 1;
  pageSize = 5;
  constructor(private _common: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff() {
    this.staffLoading = true;
    this._common
      .getUsers()
      .pipe(
        take(1),
        map((res) => {
          return res.filter((r: { role: string }) => r.role == 'Staff');
        })
      )
      .subscribe({
        next: (v) => {
          this.staff = v;
          this.tempStaff = [...this.staff];
          this.refreshStaffList();
          
        },
        error: (e) => {
          console.error(e);
          Swal.fire({
            position: 'top-end',
            text: 'Something went wrong',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        complete: () => (this.staffLoading = false),
      });
  }

  viewStaff(user: any) {
    this.router.navigate(['staff/' + user.id]);
  }

  deleteStaff(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._common
          .deleteUser(user.id)
          .pipe(take(1))
          .subscribe((res) => {
            this.getStaff();
            Swal.fire('Deleted!', 'This user has been deleted.', 'success');
          });
      }
    });
  }

  searchLeave() {
    if (this.searchName) {
      this.staff = this.tempStaff.filter((v: { name: string }) => {
        return v.name.toLowerCase().match(this.searchName.toLowerCase());
      });
    } else {
      this.refreshStaffList();
    }
  }

  sort(prop: any) {
    this.prop = prop;
    this.sortorder = !this.sortorder;
    const sortType = typeof this.staff[0][prop];
    console.log('sortType', sortType);

    this.staff.sort((a: any, b: any) => {
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

  refreshStaffList() {
    this.staff = this.tempStaff
      .map((country, i) => ({ ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

}
