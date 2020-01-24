import { ViewEmployeeComponent } from './components/employee/view-employee/view-employee.component';

import { AuthGuard } from './auth.guard';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { DashboardComponent } from './components/employee/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'employee/:id', component: ViewEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'edit-employee/:id', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
