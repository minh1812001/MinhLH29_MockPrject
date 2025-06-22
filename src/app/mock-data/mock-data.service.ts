import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private users = [
    {
      username: 'admin',
      password: 'admin123',
      role: 'admin',
      name: 'Admin',
      address: '123 Main St',
    },
    {
      username: 'user',
      password: 'user123',
      role: 'user',
      name: 'user',
      address: '123 Main St',
    },
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
