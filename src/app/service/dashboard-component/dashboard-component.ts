import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViewProfileComponent } from '../view-profile-component/view-profile-component';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, ViewProfileComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  constructor(private router: Router) {}
  username = JSON.parse(localStorage.getItem('currentUser') || '{}').username;
  role = JSON.parse(localStorage.getItem('currentUser') || '{}').role;
  name = JSON.parse(localStorage.getItem('currentUser') || '{}').name;
  address = JSON.parse(localStorage.getItem('currentUser') || '{}').address;
  showPopup = false;
  showProfile = false;

  viewProfileList() {
    console.log('Xem danh sách hồ sơ');
  }

  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  onViewProfile() {
    this.router.navigate(['/view-profile'], {
      state: {
        username: this.username,
        role: this.role,
        name: this.name,
        address: this.address,
      },
    });
  }
}
