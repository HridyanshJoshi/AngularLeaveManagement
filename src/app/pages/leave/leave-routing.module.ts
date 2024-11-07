import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyForLeaveComponent } from './apply-for-leave/apply-for-leave.component';
import { LeaveComponent } from './leave.component';

const routes: Routes = [
  { path: '', component: LeaveComponent },
  { path: 'apply-for-leave', component: ApplyForLeaveComponent },
  { path: 'apply-for-leave/edit/:id', component: ApplyForLeaveComponent },
  { path: 'apply-for-leave/view/:id', component: ApplyForLeaveComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveRoutingModule {}
