import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    role: [null, Validators.required],
    name: [null, Validators.required],
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    dept: [null],
    password: [null, Validators.required],
    profile: [null, Validators.required],
  });
  roles = ['HOD', 'Staff'];
  department = ['Science', 'Commerce', 'BAF', 'BMM', 'IT', 'B.ED'];
  registerloading = false;
  submitted = false;
  error = '';
  User: any;
  constructor(private fb: FormBuilder, private commonService: CommonService) {}

  ngOnInit(): void {}

  getUser() {
    this.commonService.getUser('');
  }

  registerSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    console.log('form', this.registerForm.value);
    // return;
    

    this.registerloading = true;
    this.commonService
      .createUser(this.registerForm.value)
      .pipe(take(1))
      .subscribe({
        next: (v) => {
          Swal.fire({
            text: 'Successfully Registered',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          this.submitted = false;
          this.registerForm.reset();
        },
        error: (e) => {
          this.registerloading = false;
          Swal.fire({
            text: 'Something went wrong',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000,
          });
        },
        complete: () => (this.registerloading = false),
      });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log('file', event);
    
    const allowedType = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedType.includes(file.type)) {
      this.registerForm.patchValue({
        profile: file,
      });
    } else {
      this.registerForm.setErrors({
        filetype: 'Please select jpeg, png or jpg',
      });
    }
  }
}
