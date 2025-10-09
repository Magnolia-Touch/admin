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
  totalPages: number = 1;

  loading: boolean = false;

  constructor(
    private service: MemorialService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.loading = true;
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
        this.totalPages = res.meta.totalPages;
        this.filteredServices = this.services;
      },
      error: (err) => console.error(err),
      complete: () => this.loading = false
    });
  }

  resetFilters() {
    this.selectedStatus = '';
    this.selectedDate = null;
    this.firstCleaningDate = null;
    this.loadServices();
  }

  pageChange(newPage: any) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    this.loadServices();
  }

  pagesArray(): (number | string)[] {
    const totalPages = this.totalPages;
    const currentPage = this.page;
    const maxVisible = 5; // Show up to 5 pages at a time
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      // If few pages, show all
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisible - 1);

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
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
