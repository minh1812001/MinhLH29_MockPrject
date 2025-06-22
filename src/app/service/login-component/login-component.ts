import { Component } from '@angular/core';
import { MockDataService } from '../../mock-data/mock-data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private mockDataService: MockDataService,
    private router: Router
  ) {}

  onLogin() {
    const users = this.mockDataService.getUsers();
    const user = users.find(
      (u) => u.username === this.username && u.password === this.password
    );

    if (user) {
      const permissions = this.mockDataService.getPermissions(user.role);
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          username: user.username,
          role: user.role,
          permissions,
        })
      );
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }
}
