import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-profile-component',
  standalone: true,
  imports: [],
  templateUrl: './view-profile-component.html',
  styleUrl: './view-profile-component.css',
})
export class ViewProfileComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() username!: string;
  @Input() role!: string;
  @Input() name!: string;
  @Input() address!: string;

  ngOnInit(): void {
    // Lấy dữ liệu từ state
    const state = history.state;
    this.username = state.username || '';
    this.role = state.role || '';
    this.name = state.name || '';
    this.address = state.address || '';
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
