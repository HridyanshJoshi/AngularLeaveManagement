import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  status: boolean = false;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}
  clickEvent() {
    this.status = !this.status;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authenticationService.logout();
      }
    });
  }
}
