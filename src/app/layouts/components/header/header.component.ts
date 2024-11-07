import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  clickEvent() {
    this.toggleMenu?.next(true);
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
