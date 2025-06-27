import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { MockDataService } from '../mock-data/mock-data.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const permissions = currentUser.permissions || [];
    const expectedPermission = route.data['permission']; // Define required permission in route

    if (!expectedPermission || permissions.includes(expectedPermission)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
