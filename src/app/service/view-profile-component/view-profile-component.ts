import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-profile-component.html',
  styleUrls: ['./view-profile-component.css'],
})
export class ViewProfileComponent implements OnInit {
  @Input() username!: string;
  @Input() role!: string;
  @Input() name!: string;
  @Input() address!: string;
  @Input() showProfile!: boolean;
  @Output() profileUpdated = new EventEmitter<{
    name: string;
    address: string;
  }>();
  @Output() closeProfile = new EventEmitter<void>(); // Sự kiện đóng component
  editMode = false;
  editedName = '';
  editedAddress = '';
  originalName = ''; // Lưu giá trị ban đầu
  originalAddress = ''; // Lưu giá trị ban đầu

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Khởi tạo giá trị từ @Input()
    this.username = this.username || '';
    this.role = this.role || '';
    this.name = this.name || '';
    this.address = this.address || '';
    this.editedName = this.name;
    this.editedAddress = this.address;
    this.originalName = this.name; // Lưu giá trị ban đầu
    this.originalAddress = this.address; // Lưu giá trị ban đầu
  }

  toggleEditMode() {
    if (this.editMode) {
      // Khi nhấn "Hủy" hoặc "Lưu"
      if (
        this.editedName !== this.originalName ||
        this.editedAddress !== this.originalAddress
      ) {
        // Chỉ cập nhật nếu có thay đổi
        this.name = this.editedName;
        this.address = this.editedAddress;

        const currentUser = JSON.parse(
          localStorage.getItem('currentUser') || '{}'
        );
        currentUser.name = this.name;
        currentUser.address = this.address;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        this.profileUpdated.emit({ name: this.name, address: this.address });
      } else {
        // Khôi phục giá trị ban đầu nếu hủy
        this.editedName = this.originalName;
        this.editedAddress = this.originalAddress;
      }
    }
    this.editMode = !this.editMode;
  }

  goBack() {
    this.closeProfile.emit(); // Phát sự kiện để đóng component
    this.router.navigate(['/dashboard']);
  }
}
