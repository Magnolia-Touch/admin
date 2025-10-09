import { Component, OnInit } from '@angular/core';
import { OrdersService } from './service/orders.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: any = [];
  page = 1;
  limit = 10;
  totalPages = 1;
  loading = false;
  selectedOrder: any = null;

  constructor(
    private service: OrdersService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    this.loading = true;
    this.service.getAllOrders(this.page, this.limit).subscribe({
      next: (res: any) => {
        this.orders = res.data;
        this.totalPages = res.meta.totalPages;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }

  changePage(p: any) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.loadOrders();
  }

    pagesArray(): (number | string)[] {
    const total = this.totalPages;
    const current = this.page;
    const maxVisible = 5;
    const pages: (number | string)[] = [];

    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      let start = Math.max(1, current - 2);
      let end = Math.min(total, start + maxVisible - 1);

      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }

      for (let i = start; i <= end; i++) pages.push(i);

      if (end < total) {
        if (end < total - 1) pages.push('...');
        pages.push(total);
      }
    }

    return pages;
  }

  openDetailModal(content: any, order: any) {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    this.selectedOrder = order;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

}
