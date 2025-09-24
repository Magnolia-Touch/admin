import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MemorialService } from '../memorials/service/memorial.service';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cleaning',
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './cleaning.component.html',
  styleUrl: './cleaning.component.css'
})
export class CleaningComponent implements OnInit {

  services: any[] = [];
  filteredServices: any[] = [];
  cleaningStatuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

  selectedStatus: string = '';
  selectedDate: any = null; // Created Date
  firstCleaningDate: any = null;

  selectedService: any;

  page: number = 1;
  limit: number = 10;
  total: number = 0;

  constructor(
    private service: MemorialService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    const params: any = {
      status: this.selectedStatus,
      createdDate: this.selectedDate ? this.formatDate(this.selectedDate) : '',
      firstCleaningDate: this.firstCleaningDate ? this.formatDate(this.firstCleaningDate) : '',
      page: this.page,
      limit: this.limit
    };

    this.service.getCleaningServices(params).subscribe({
      next: (res: any) => {
        this.services = res.data;
        this.total = res.meta.total;
        this.filteredServices = this.services; // Can apply additional front-end filtering if needed
      },
      error: (err) => console.error(err)
    });
  }

  resetFilters() {
    this.selectedStatus = '';
    this.selectedDate = null;
    this.firstCleaningDate = null;
    this.loadServices();
  }

  pageChange(newPage: number) {
    if (newPage < 1 || newPage > Math.ceil(this.total / this.limit)) return;
    this.page = newPage;
    this.loadServices();
  }

  openDetailModal(content: any, service: any) {
    this.selectedService = service;
    this.modalService.open(content, { size: 'lg' });
  }

  private formatDate(date: any): string {
    if (!date) return '';
    if (date.year && date.month && date.day) {
      return `${date.year}-${('0' + date.month).slice(-2)}-${('0' + date.day).slice(-2)}`;
    }
    return new Date(date).toISOString().split('T')[0];
  }

}
