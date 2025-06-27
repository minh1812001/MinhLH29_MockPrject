import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-permission-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './permission-component.html',
  styleUrl: './permission-component.css',
})
export class PermissionComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
