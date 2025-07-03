import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../mock-data/mock-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission-manager-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './permission-manager-component.html',
  styleUrl: './permission-manager-component.css',
})
export class PermissionManagerComponent implements OnInit {
roles = ['admin', 'user'];
  permissions: { [key: string]: string[] } = {};
  availablePermissions: string[] = [];
  showAssignForm = false;
  selectedRole = '';
  selectedPermission = '';

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPermissions();
    this.availablePermissions = this.mockDataService.getAllPermissions();
  }

  loadPermissions() {
    this.roles.forEach((role) => {
      this.permissions[role] = this.mockDataService.getRolePermissions(role);
    });
  }

  startAssignPermission(role: string) {
    this.selectedRole = role;
    this.selectedPermission = this.availablePermissions[0] || '';
    this.showAssignForm = true;
  }

  assignPermission() {
    if (this.selectedRole && this.selectedPermission) {
      this.mockDataService.assignPermission(
        this.selectedRole,
        this.selectedPermission
      );
      this.loadPermissions();
      this.showAssignForm = false;
      // Update currentUser permissions if their role is affected
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      if (currentUser.role === this.selectedRole) {
        currentUser.permissions = this.mockDataService.getPermissions(
          this.selectedRole
        );
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    }
  }

  unassignPermission(role: string, permission: string) {
    if (
      confirm(`Bạn có chắc muốn xóa quyền ${permission} khỏi vai trò ${role}?`)
    ) {
      this.mockDataService.unassignPermission(role, permission);
      this.loadPermissions();
      // Update currentUser permissions if their role is affected
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      if (currentUser.role === role) {
        currentUser.permissions = this.mockDataService.getPermissions(role);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    }
  }

  cancelAssign() {
    this.showAssignForm = false;
    this.selectedRole = '';
    this.selectedPermission = '';
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
