import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  status: boolean = false;
  user: any;
  total: number;
  imgUrl: string = environment.imageUrl;
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.user = this.authenticationService.userValue;
  }

  clickEvent() {
    this.status = !this.status;
  }
}
