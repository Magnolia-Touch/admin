import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from './service/accounts.service';
import { Router } from '@angular/router';
import { AlertService } from '../../shared/alert/service/alert.service';
import { ConfirmationService } from '../../shared/confirmation-modal/service/confirmation.service';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  searchName = '';
  accounts: any[] = [];
  page = 1;
  limit = 10;
  totalPages = 1;
  loading = false;

  constructor(
    private service: AccountsService,
    private router: Router,
    private alertService: AlertService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.loadAccounts()
  }

  loadAccounts() {
    this.loading = true;
    this.service.getAllUsers(this.page, this.limit, this.searchName).subscribe({
      next: (res: any) => {
        this.accounts = res.data;
        this.totalPages = res.lastPage;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err)
        this.loading = false;
      }
    });
  }

  changePage(p: any) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.loadAccounts();
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

  goToDetail(customer: any) {
    this.router.navigate(['/accountdetail'], { state: { customer } });
  }

  async toggleStatus(customer: any) {
    const newStatus = !customer.isActive;
    const buttonElement = document.activeElement as HTMLElement;
    buttonElement.blur();

    const confirmed = await this.confirmationService.confirm({
      title: 'Change Account Status',
      message: `Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} this account?`,
      confirmText: 'Yes',
      cancelText: 'No'
    });

    if (confirmed) {
      this.service.updateUserStatus(customer._id, { isActive: newStatus }).subscribe({
        next: (res: any) => {
          this.alertService.showAlert({
            message: 'Status Updated',
            type: 'success',
            autoDismiss: true,
            duration: 4000
          });
        },
        error: (err) => {
          console.error('Failed to update status', err);
          this.alertService.showAlert({
            message: err.error.message || 'Updation failed. Try again.',
            type: 'error',
            autoDismiss: true,
            duration: 4000
          });
        }
      });
    }
  }

}
