import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MockDataService } from '../mock-data/mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const permissions = currentUser.permissions || [];
    if (permissions.includes('view')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
