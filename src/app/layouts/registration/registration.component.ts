import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  registerForm: FormGroup = this.fb.group({
    role: [null, Validators.required],
    name: [null, Validators.required, Validators.minLength(2)],
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [
      null,
      [Validators.required, Validators.pattern('^[0-9]{10}$')],
    ],
    dept: [null, Validators.required],
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
    private commonService: CommonService,
    private renderer: Renderer2
  ) {}
  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('body'), 'login-page');
  }
  registerSubmit() {
    this.submitted = true;
    console.log(this.registerForm);
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
          this.registerForm.reset();
        },
        error: (e) => {
          console.error(e);
        },
        complete: () => (this.registerloading = false),
      });
  }
  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('body'), 'login-page');
  }
}