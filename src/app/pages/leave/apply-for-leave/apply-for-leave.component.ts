import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';
import { map, Observable, switchMap, take } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Leave } from '../leave';
@Component({
  selector: 'app-apply-for-leave',
  templateUrl: './apply-for-leave.component.html',
  styleUrls: ['./apply-for-leave.component.scss'],
})
export class ApplyForLeaveComponent implements OnInit {
  user: any;
  addLeaveloading: boolean = false;
  addLeaveForm: FormGroup = this.fb.group({
    from: [null, Validators.required],
    to: [null, Validators.required],
    reason: ['', Validators.required],
    status: '',
  });
  addLeaveSubmitted: boolean = false;
  date = new Date();
  today: NgbDateStruct = {
    day: this.date.getDate(),
    month: this.date.getMonth() + 1,
    year: this.date.getFullYear(),
  };
  leaveObs: Observable<string>;
  leaveId: string;
  action: string = '';
  constructor(
    private fb: FormBuilder,
    private _common: CommonService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
    this.action = this.route.snapshot.url[1]?.path;
    // this.leaveObs = ;
    this.route.params.pipe(map((p) => p.id)).subscribe((v) => {
      this.leaveId = v;
      this.edit();
    });
  }
  edit() {
    if (this.action == 'edit' || this.action == 'view') {
      this._common.getLeave(this.leaveId).subscribe((v) => {
        this.addLeaveForm.patchValue({
          from: this._common.dateToNgb(v.from),
          to: this._common.dateToNgb(v.to),
          reason: v.reason,
        });
      });
    }
  }
  onEditSubmit(pl: Leave) {
    this._common
      .updateLeave(pl, this.leaveId)
      .pipe(take(1))
      .subscribe({
        next: (v) => {
          console.log(v);
          Swal.fire({
            position: 'top-end',
            text: 'Leave Submitted Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.addLeaveSubmitted = false;
          this.addLeaveForm.reset();
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => (this.addLeaveloading = false),
      });
  }
  onLeaveSubmit() {
    this.addLeaveSubmitted = true;
    if (!this.addLeaveForm.valid) {
      return;
    }
    let v = this.addLeaveForm.value;
    v['from'] = this._common.ngbTodate(v.from).toISOString();
    v['to'] = this._common.ngbTodate(v.to).toISOString();
    const pl: Leave = {
      ...v,
      user: this.user?.id,
      name: this.user?.name,
      phone: this.user?.phone,
      dept: this.user?.dept,
    };
    this.addLeaveloading = true;
    if (this.action == 'edit') {
      this.onEditSubmit(pl);
    } else {
      this._common
        .addLeave(pl)
        .pipe(take(1))
        .subscribe({
          next: (v) => {
            console.log(v);
            Swal.fire({
              position: 'top-end',
              text: 'Leave Submitted Successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            this.addLeaveSubmitted = false;
            this.addLeaveForm.reset();
          },
          error: (e) => {
            console.error(e);
          },
          complete: () => (this.addLeaveloading = false),
        });
    }
  }
}