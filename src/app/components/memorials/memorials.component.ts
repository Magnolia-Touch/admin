import { CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemorialService } from './service/memorial.service';

@Component({
  selector: 'app-memorials',
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './memorials.component.html',
  styleUrl: './memorials.component.css'
})
export class MemorialsComponent implements OnInit {
  selectedDate: NgbDateStruct | null = null;
  selectedStatus = '';
  orderNumber = '';

  memorials: any[] = [];
  selectedMemorial: any = null;

  page = 1;
  limit = 10;
  total = 0;
  totalPages: number = 1;

  loading: boolean = false;

  statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

  constructor(
    private service: MemorialService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadMemorials()
  }

  loadMemorials() {
    this.loading = true;
    const query: any = { page: this.page, limit: this.limit };

    // if (this.selectedStatus) query.is_paid = this.selectedStatus === 'paid';
    if (this.orderNumber) query.search = this.orderNumber;
    // if (this.selectedDate) {
    //   query.createdAt = `${this.selectedDate.year}-${String(this.selectedDate.month).padStart(2, '0')}-${String(this.selectedDate.day).padStart(2, '0')}`;
    // }

    this.service.getMemorialList(query).subscribe({
      next: (res: any) => {
        this.memorials = res.data;
        this.total = res.meta.total;
        this.limit = res.meta.limit;
        this.page = res.meta.page;
        this.totalPages = res.meta.totalPages;  // <--- new property
      },
      error: (err) => console.error(err),
      complete: () => this.loading = false
    });
  }

  openDetailModal(content: TemplateRef<any>, order: any) {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    this.selectedMemorial = order;
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
  }

  resetFilters() {
    // this.selectedDate = null;
    // this.selectedStatus = '';
    this.orderNumber = '';
    this.page = 1;
    this.loadMemorials();
  }

  pageChange(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) return;
    this.page = newPage;
    this.loadMemorials();
  }

  pagesArray(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
