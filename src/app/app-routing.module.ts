import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './user/employee.component';
import { AuthComponent } from './auth/auth.component';
import { SharedComponent } from './Shared/shared.component';
import { LeaveComponent } from './leaves/leave.component';
import { LoginComponent } from './auth/component/login/login.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: EmployeeComponent,
    loadChildren: () => import('./user/employee.module').then((x) => x.EmployeeModule),
    canActivate: [authGuard], data: { role: 'admin' }
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: 'shared',
    component: SharedComponent,
    loadChildren: () => import('./Shared/shared.module').then((x) => x.SharedModule),
  },
  {
    path: 'leaves',
    component: LeaveComponent,
    loadChildren: () => import('./leaves/leaves.module').then((x) => x.LeavesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
