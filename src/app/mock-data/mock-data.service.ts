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
      name: 'Admin Name',
      address: 'Admin Address',
    },
    {
      username: 'user',
      password: 'user123',
      role: 'user',
      name: 'User Name',
      address: 'User Address',
    },
    {
      username: 'user1',
      password: 'pass123',
      role: 'user',
      name: 'User One',
      address: '123 Street A',
    },
    {
      username: 'user2',
      password: 'pass456',
      role: 'user',
      name: 'User Two',
      address: '456 Street B',
    },
    {
      username: 'user3',
      password: 'pass789',
      role: 'user',
      name: 'User Three',
      address: '789 Street C',
    },
    {
      username: 'user4',
      password: 'pass101',
      role: 'user',
      name: 'User Four',
      address: '101 Street D',
    },
    {
      username: 'user5',
      password: 'pass202',
      role: 'user',
      name: 'User Five',
      address: '202 Street E',
    },
    {
      username: 'user6',
      password: 'pass303',
      role: 'user',
      name: 'User Six',
      address: '303 Street F',
    },
    {
      username: 'user7',
      password: 'pass404',
      role: 'user',
      name: 'User Seven',
      address: '404 Street G',
    },
    {
      username: 'user8',
      password: 'pass505',
      role: 'user',
      name: 'User Eight',
      address: '505 Street H',
    },
    {
      username: 'user9',
      password: 'pass606',
      role: 'user',
      name: 'User Nine',
      address: '606 Street I',
    },
    {
      username: 'user10',
      password: 'pass707',
      role: 'user',
      name: 'User Ten',
      address: '707 Street J',
    },
    {
      username: 'user11',
      password: 'pass808',
      role: 'user',
      name: 'User Eleven',
      address: '808 Street K',
    },
    {
      username: 'user12',
      password: 'pass909',
      role: 'user',
      name: 'User Twelve',
      address: '909 Street L',
    },
    {
      username: 'user13',
      password: 'pass1010',
      role: 'user',
      name: 'User Thirteen',
      address: '1010 Street M',
    },
  ];

  getUsers() {
    return [...this.users]; // Trả về bản sao để tránh thay đổi trực tiếp
  }

  getPermissions(role: string) {
    const permissions = {
      admin: ['view', 'edit', 'delete'],
      user: ['view'],
    };
    return (permissions as any)[role] || [];
  }
  removeUser(username: string) {
    const index = this.users.findIndex(user => user.username === username);
    if (index !== -1) {
      this.users.splice(index, 1); // Xóa người dùng khỏi mảng
    }
  }
}
