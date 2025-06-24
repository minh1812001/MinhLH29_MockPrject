import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewProfileComponent } from '../view-profile-component/view-profile-component';
import { UserListComponent } from '../user-list-component/user-list-component';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, ViewProfileComponent, UserListComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  constructor(private router: Router) {
    this.refreshData();
  }
  username = JSON.parse(localStorage.getItem('currentUser') || '{}').username;
  role = JSON.parse(localStorage.getItem('currentUser') || '{}').role;
  name = JSON.parse(localStorage.getItem('currentUser') || '{}').name;
  address = JSON.parse(localStorage.getItem('currentUser') || '{}').address;
  showPopup = false;
  showProfile = false;
  showUserList = false;
  onViewProfileList() {
        this.showUserList = !this.showUserList;
// Mở danh sách người dùng
    this.showProfile = false; // Đóng profile nếu đang mở
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onViewProfile() {
    this.refreshData();
    this.showUserList = false;
    this.showProfile = !this.showProfile;
  }
  refreshData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.username = currentUser.username || '';
    this.role = currentUser.role || '';
    this.name = currentUser.name || 'Tên mẫu';
    this.address = currentUser.address || 'Địa chỉ mẫu';
  }

  onProfileUpdated(updatedData: { name: string; address: string }) {
    this.name = updatedData.name;
    this.address = updatedData.address;
    this.refreshData(); // Đảm bảo đồng bộ với localStorage
  }
  onCloseProfile() {
    this.showProfile = false; // Ẩn component khi nhận sự kiện đóng
  }
  onCloseListUser() {
    this.showUserList = false;
  }
}
