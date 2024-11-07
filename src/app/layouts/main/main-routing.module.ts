import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'staff',
        loadChildren: () =>
          import('../../pages/staff/staff.module').then((m) => {
            return m.StaffModule;
          }),
      },
      {
        path: 'leave',
        loadChildren: () =>
          import('../../pages/leave/leave.module').then((m) => {
            return m.LeaveModule;
          }),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
