import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-profile-component.html',
  styleUrl: './view-profile-component.css',
})
export class ViewProfileComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() username!: string;
  @Input() role!: string;
  @Input() name!: string;
  @Input() address!: string;
  @Output() profileUpdated = new EventEmitter<{
    name: string;
    address: string;
  }>(); // Thông báo cập nhật dữ liệu
  editMode = false;
  editedName = this.name;
  editedAddress = this.address;
  toggleEditMode() {
    if (this.editMode) {
      // Lưu dữ liệu khi nhấn "Lưu"
      this.name = this.editedName;
      this.address = this.editedAddress;

      // Cập nhật vào UserService hoặc localStorage
      const currentUser = JSON.parse(
        localStorage.getItem('currentUser') || '{}'
      );
      currentUser.name = this.name;
      currentUser.address = this.address;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      // Thông báo cho component cha (nếu có)
      this.profileUpdated.emit({ name: this.name, address: this.address });
    }
    this.editMode = !this.editMode;
  }
  ngOnInit(): void {
    // Lấy dữ liệu từ state
    const state = history.state;
    this.username = state.username || '';
    this.role = state.role || '';
    this.name = state.name || '';
    this.address = state.address || '';
  }
  updateProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    currentUser.name = this.editedName;
    currentUser.address = this.editedAddress;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
