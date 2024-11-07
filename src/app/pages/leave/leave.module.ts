import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveComponent } from './leave.component';
import { MyLeaveComponent } from './my-leave/my-leave.component';
import { ManageStaffLeaveComponent } from './manage-staff-leave/manage-staff-leave.component';
import { ApplyForLeaveComponent } from './apply-for-leave/apply-for-leave.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LeaveComponent,
    MyLeaveComponent,
    ManageStaffLeaveComponent,
    ApplyForLeaveComponent
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxSkeletonLoaderModule,
  ]
})
export class LeaveModule { }
