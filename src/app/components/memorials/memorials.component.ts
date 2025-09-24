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

  orders: any[] = [];
  selectedOrder: any = null;

  page = 1;
  limit = 10;
  total = 0;

  statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

  constructor(
    private service: MemorialService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadMemorials()
  }

  loadMemorials() {
    const query: any = {
      page: this.page,
      limit: this.limit
    };

    if (this.selectedStatus) query.status = this.selectedStatus;
    if (this.orderNumber) query.orderNumber = this.orderNumber;
    if (this.selectedDate) {
      query.createdDate = `${this.selectedDate.year}-${String(this.selectedDate.month).padStart(2, '0')}-${String(this.selectedDate.day).padStart(2, '0')}`;
    }

    this.service.getOrderList(query).subscribe({
      next: (res: any) => {
        this.orders = res.data;
        this.total = res.meta.total;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  openDetailModal(content: TemplateRef<any>, order: any) {
    this.selectedOrder = order;
    this.modalService.open(content, { size: 'lg', backdrop: 'static' });
  }

  resetFilters() {
    this.selectedDate = null;
    this.selectedStatus = '';
    this.orderNumber = '';
    this.page = 1;
    this.loadMemorials();
  }

  pageChange(newPage: number) {
    this.page = newPage;
    this.loadMemorials();
  }
}
