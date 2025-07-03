import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../mock-data/mock-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.css',
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  selectedUser: any;
  currentUsername: string = '';
  role: string = '';
  editingRole: boolean = false;
  newRole: string = '';
  @Input() showUserList!: boolean;
  @Output() onCloseListUser = new EventEmitter<void>(); // Sự kiện đóng component
  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUsername = currentUser.username || '';
    this.role = currentUser.role || '';
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
  const allUsers = this.mockDataService.getUsers();
  if (this.role === 'user') {
    const currentUser = allUsers.find(
      (user) => user.username === this.currentUsername
    );
    this.users = currentUser ? [currentUser] : [];
  } else if (this.role === 'admin') {
    this.users = [...allUsers];
  }
}

  selectUser(user: any) {
    this.selectedUser = user;
  }
  toggleEditRole(user: any, event: Event) {
    event.stopPropagation();
    if (this.role !== 'admin') {
      alert('Bạn không có quyền sửa vai trò người dùng!');
      return;
    }
    if (user.username === this.currentUsername) {
      alert('Bạn không thể sửa vai trò của chính mình!');
      return;
    }
    if (this.editingRole && this.selectedUser?.username === user.username) {
      // Save the role change
      if (this.newRole && this.newRole !== user.role) {
        this.mockDataService.updateUser(user.username, {
          name: user.name,
          address: user.address,
          role: this.newRole,
        });
        // Update localStorage if the current user is being edited
        const currentUser = JSON.parse(
          localStorage.getItem('currentUser') || '{}'
        );
        if (currentUser.username === user.username) {
          currentUser.role = this.newRole;
          currentUser.permissions = this.mockDataService.getPermissions(
            this.newRole
          );
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
        this.loadUsers();
      }
      this.editingRole = false;
    } else {
      this.selectedUser = user;
      this.newRole = user.role;
      this.editingRole = true;
    }
  }
  onRoleChange(user: any) {
    // Optional: Can be used for additional logic when role changes in the dropdown
  }
  removeUser(user: any, event: Event) {
    event.stopPropagation();
    if (this.role !== 'admin') {
      alert('Bạn không có quyền xóa người dùng!');
      return;
    }
    if (user && confirm(`Bạn có chắc muốn xóa người dùng ${user.username}?`)) {
      if (user.username === this.currentUsername) {
        alert('Bạn không thể xóa chính mình!');
        return;
      }
      this.mockDataService.removeUser(user.username);
      this.loadUsers();
      this.selectedUser = null;
    }
  }
  managePermissions() {
    this.router.navigate(['/permissions']);
  }
  goBack() {
    this.onCloseListUser.emit(); // Phát sự kiện để đóng component
    this.router.navigate(['/dashboard']);
  }
}
