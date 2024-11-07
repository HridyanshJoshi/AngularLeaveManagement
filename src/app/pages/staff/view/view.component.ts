import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { finalize, map, take } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  userId: any;
  staffUser: User;
  imgUrl: String = environment.imageUrl;
  loader: boolean = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private _common: CommonService
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe((p) => {
      this.viewStaff(p.id);
    });
  }

  viewStaff(id: any) {
    this._common
      .getUser(id)
      .pipe(
        take(1),
        finalize(() => (this.loader = false))
      )
      .subscribe((res) => {
        console.log('ressta', res);
        
        this.staffUser = res;
      });
  }

  gotoStaff() {
    this.router.navigate(['staff']);
  }
}
