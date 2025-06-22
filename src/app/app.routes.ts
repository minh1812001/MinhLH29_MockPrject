import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './service/login-component/login-component';
import { PermissionGuard } from './permission-guard/permission-guard';
import { DashboardComponent } from './service/dashboard-component/dashboard-component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PermissionGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
