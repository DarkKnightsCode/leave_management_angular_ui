import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { ListLeaveComponent } from './list-leave/list-leave.component';
import { EditLeavesComponent } from './edit-leaves/edit-leaves.component';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { authGuard } from '../services/auth.guard';

const routes: Routes = [
  { path: 'apply-leave', component: ApplyLeaveComponent, canActivate: [authGuard], data: { role: 'user' } },
  { path: 'list-leaves/:empid', component: ListLeaveComponent },
  { path: 'edit-leaves/:empid', component: EditLeavesComponent, canActivate: [authGuard], data: { role: 'user' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }
