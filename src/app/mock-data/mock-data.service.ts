import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' },
  ];

  getUsers() {
    return this.users;
  }

  getPermissions(role: string) {
    const permissions = {
      admin: ['view', 'edit', 'delete'],
      user: ['view'],
    };
    return (permissions as any)[role] || [];
  }
}
