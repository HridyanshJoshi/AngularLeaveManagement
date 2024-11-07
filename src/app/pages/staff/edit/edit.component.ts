import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    role: [null, Validators.required],
    name: [null, Validators.required],
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    dept: [null],
    password: [null, Validators.required],
    profile: '',
  });
  roles = ['HOD', 'Staff'];
  department = ['Science', 'Commerce', 'BAF', 'BMM', 'IT', 'B.ED'];
  registerloading = false;
  submitted = false;
  error = '';
  User: any;
  constructor(
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((p) => {
      this.getUser(p.id);
    });
  }

  getUser(id) {
    this.commonService.getUser(id).subscribe((res) => {
      console.log('editres', res);
      const { name, username, phone, role, email, dept, password } = res;
      this.registerForm.patchValue({
        name,
        username,
        phone,
        role,
        email,
        dept,
        password,
      });
    });
  }

  registerSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.registerloading = true;
    this.commonService
      .createUser(this.registerForm.value)
      .pipe(take(1))
      .subscribe({
        next: (v) => {
          console.log(v);
          Swal.fire({
            position: 'top-end',
            text: 'Successfully Registered',
            showConfirmButton: false,
            timer: 1500,
          });
          this.submitted = false;
          this.registerForm.reset();
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => (this.registerloading = false),
      });
  }
}
