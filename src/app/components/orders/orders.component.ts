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
  pages: number[] = [];
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
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    })
  }

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.loadOrders();
  }

  openDetailModal(content: any, order: any) {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    this.selectedOrder = order;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

}
