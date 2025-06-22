import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  imports: [],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  username = JSON.parse(localStorage.getItem('currentUser') || '{}').username;
}
