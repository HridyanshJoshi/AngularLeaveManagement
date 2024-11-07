import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { StaffComponent } from './staff.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      { path: '', component: ListComponent, canActivate: [RoleGuard] },
      { path: 'add', component: AddComponent, canActivate: [RoleGuard] },
      { path: 'edit/:id', component: EditComponent },
      { path: 'view/:id', component: ViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule {}
