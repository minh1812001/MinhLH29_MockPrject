import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './service/login-component/login-component';
import { PermissionGuard } from './permission-guard/permission-guard';
import { DashboardComponent } from './service/dashboard-component/dashboard-component';
import { ViewProfileComponent } from './service/view-profile-component/view-profile-component';
import { RegisterComponent } from './service/register-component/register-component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PermissionGuard],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'view-profile',
    component: ViewProfileComponent,
    canActivate: [PermissionGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
