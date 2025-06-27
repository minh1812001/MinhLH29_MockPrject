import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './service/login-component/login-component';
import { PermissionGuard } from './permission-guard/permission-guard';
import { DashboardComponent } from './service/dashboard-component/dashboard-component';
import { ViewProfileComponent } from './service/view-profile-component/view-profile-component';
import { RegisterComponent } from './service/register-component/register-component';
import { UserListComponent } from './service/user-list-component/user-list-component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
 {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'view' }, // Basic access to dashboard
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'view-profile',
    component: ViewProfileComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'view' }, // All logged-in users can view profiles
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'manage_users' }, // All logged-in users can view profiles
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
