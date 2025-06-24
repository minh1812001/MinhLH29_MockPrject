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
      // Nếu là user, chỉ hiển thị thông tin của chính mình
      // const currentUser = allUsers.find(
      //   (user) => user.role === this.role
      // );
      // this.users = currentUser ? [currentUser] : [];
      this.users = allUsers.filter((user) => user.role === this.role);
    } else if (this.role === 'admin') {
      // Nếu là admin, hiển thị tất cả người dùng
      this.users = [...allUsers];
    }
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

  removeUser(user: any, event: Event) {
    event.stopPropagation();
    if (user) {
      // Kiểm tra nếu người dùng đang cố xóa chính mình
      if (user.username === this.currentUsername) {
        alert('Bạn không thể xóa chính mình!');
        return;
      }
      if (confirm(`Bạn có chắc muốn xóa người dùng ${user.username}?`)) {
        this.mockDataService.removeUser(user.username);
        this.loadUsers();
        this.selectedUser = null;
      }
    }
  }
  goBack() {
    this.onCloseListUser.emit(); // Phát sự kiện để đóng component
    this.router.navigate(['/dashboard']);
  }
}
