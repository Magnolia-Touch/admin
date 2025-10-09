import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from './service/accounts.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAccounts()
  }

  loadAccounts() {
    this.loading = true;
    const query = `?page=${this.page}?limit=${this.limit}${this.searchName ? `&search=${this.searchName}` : ''}`;
    this.service.getAllUsers(query).subscribe({
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

}
