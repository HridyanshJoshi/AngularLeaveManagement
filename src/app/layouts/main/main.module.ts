import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { HeaderComponent } from '../components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StaffModule } from 'src/app/pages/staff/staff.module';
import { LeaveModule } from 'src/app/pages/leave/leave.module';

@NgModule({
  declarations: [
    MainComponent,
    SidebarComponent,
    DashboardComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    NgxSkeletonLoaderModule,
    NgbModule,
    ReactiveFormsModule,
    StaffModule,
    LeaveModule
  ],
})
export class MainModule {}
