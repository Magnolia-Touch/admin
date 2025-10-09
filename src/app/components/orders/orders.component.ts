import { Component, OnInit } from '@angular/core';
import { OrdersService } from './service/orders.service';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../../shared/alert/service/alert.service';
import { ConfirmationService } from '../../shared/confirmation-modal/service/confirmation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
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
  trackingInput!: any
  statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'];

  constructor(
    private service: OrdersService,
    private modalService: NgbModal,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
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

  openTrackingModal(content: any, order: any) {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    this.selectedOrder = order;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  addTrackingDetails(trackingInput: string) {
    if (!trackingInput || !this.selectedOrder) return;

    const payload = { tracking_details: trackingInput };
    this.service.addTrackingDetails(payload, this.selectedOrder.id).subscribe({
      next: (res: any) => {
        this.alertService.showAlert({
          message: 'Tracking details added successfully',
          type: 'success',
          autoDismiss: true,
          duration: 4000
        });
        this.loadOrders();
        this.trackingInput = '';
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error('Failed to add tracking details', err);
        this.alertService.showAlert({
          message: err.error?.message || 'Failed to add tracking details. Try again.',
          type: 'error',
          autoDismiss: true,
          duration: 4000
        });
      }
    });
  }

  statusClass(status: string) {
    switch (status.toLowerCase()) {
      case 'pending': return 'text-warning';
      case 'processing': return 'text-primary';
      case 'shipped': return 'text-info';
      case 'delivered': return 'text-success';
      case 'cancelled': return 'text-danger';
      case 'refunded': return 'text-muted';
      default: return '';
    }
  }

  openStatusModal(content: any, order: any) {
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    this.selectedOrder = { ...order };
    this.modalService.open(content, { size: 'md', centered: true });
  }

  updateStatus(order: any) {
    if (!order) return;

    this.service.updateOrderStatus(order.id, order.status).subscribe({
      next: (res: any) => {
        this.alertService.showAlert({
          message: 'Order status updated successfully',
          type: 'success',
          autoDismiss: true,
          duration: 4000
        });
        this.loadOrders();
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error('Failed to update order status', err);
        this.alertService.showAlert({
          message: err.error?.message || 'Failed to update status. Try again.',
          type: 'error',
          autoDismiss: true,
          duration: 4000
        });
      }
    });
  }

  deleteOrder(order: any) {
    if (!order) return;

    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    this.confirmationService.confirm({
      title: 'Delete Order',
      message: `Are you sure you want to delete order ${order.orderNumber}?`,
      confirmText: 'Yes',
      cancelText: 'No'
    }).then((confirmed) => {
      if (!confirmed) return;

      this.service.deleteOrder(order.id).subscribe({
        next: () => {
          this.alertService.showAlert({
            message: 'Order deleted successfully',
            type: 'success',
            autoDismiss: true,
            duration: 4000
          });
          this.loadOrders();
        },
        error: (err) => {
          console.error('Failed to delete order', err);
          this.alertService.showAlert({
            message: err.error?.message || 'Deletion failed. Try again.',
            type: 'error',
            autoDismiss: true,
            duration: 4000
          });
        }
      });
    });
  }

}
