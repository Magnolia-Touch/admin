import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgbDatepickerModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  counts!: any;
  revenue!: any;
  chart!: Chart;
  loadingCounts: boolean = true;
  loadingRevenue: boolean = true;

  startDate!: NgbDateStruct;
  endDate!: NgbDateStruct;
  filterType: string = 'year';
  serviceType: string = 'all';

  constructor(
    private service: DashboardService
  ) { }

  ngOnInit(): void {
    this.loadCounts()
    this.loadRevenue();
  }

  loadCounts() {
    this.loadingCounts = true;
    const today = new Date().toISOString().split('T')[0];
    this.service.getCounts(today).subscribe({
      next: (res: any) => {
        this.counts = res;
        this.loadingCounts = false;
      },
      error: (err) => {
        console.error('Error loading counts:', err);
        this.loadingCounts = false;
      }
    });
  }

  loadRevenue() {
    this.loadingRevenue = true;
    let start: string | undefined;
    let end: string | undefined;

    if (this.filterType === 'range') {
      if (!this.startDate || !this.endDate) return;
      start = `${this.startDate.year}-${this.startDate.month.toString().padStart(2, '0')}-${this.startDate.day.toString().padStart(2, '0')}`;
      end = `${this.endDate.year}-${this.endDate.month.toString().padStart(2, '0')}-${this.endDate.day.toString().padStart(2, '0')}`;
    }

    this.service.getRevenue(this.filterType, this.serviceType, start, end).subscribe({
      next: (res: any) => {
        this.revenue = res;
        this.renderChart();
        this.loadingRevenue = false;
      },
      error: (err) => {
        console.error('Error loading revenue:', err)
        this.loadingRevenue = false;
      }
    });
  }

  renderChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.revenue.labels,
        datasets: this.revenue.datasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Revenue Overview'
          }
        }
      }
    };

    this.chart = new Chart('revenueChart', config);
  }

  onFilterChange() {
    if (this.filterType !== 'range') {
      this.startDate = undefined!;
      this.endDate = undefined!;
    }
    this.loadRevenue();
  }

  onDateChange() {
    if (this.filterType === 'range') {
      if (!this.startDate || !this.endDate) {
        alert('Please select both start and end dates');
        return;
      }
      this.loadRevenue();
    }
  }

}
