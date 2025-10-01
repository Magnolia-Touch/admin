import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  counts!: any;

  constructor(
    private service: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadCounts()
  }

  loadCounts() {
    const today = new Date().toISOString().split('T')[0];
    this.service.getCounts(today).subscribe({
      next: (res: any) => {
        this.counts = res;
      },
      error: (err) => {
        console.error('Error loading counts:', err);
      }
    });
  }
}
