import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockDataService } from '../../mock-data/mock-data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css',
})
export class RegisterComponent {
username: string = '';
  password: string = '';
  role: string = 'user';
  name: string = '';
  address: string = '';
  errorMessage: string = '';

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  onRegister() {
    const users = this.mockDataService.getUsers();
    if (users.find((u) => u.username === this.username)) {
      this.errorMessage = 'Tên đăng nhập đã tồn tại';
      return;
    }

    // Thêm người dùng mới vào MockDataService
    this.mockDataService.addUser({
      username: this.username,
      password: this.password,
      name: this.name,
      address: this.address,
      role: this.role,
    });

    console.log('Registered user:', this.username);
    this.router.navigate(['/login']);
  }
}
