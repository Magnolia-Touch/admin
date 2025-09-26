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
  pages: number[] = [];

  constructor(
    private service: AccountsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAccounts()
  }

  loadAccounts() {
    const query = `?page=${this.page}?limit=${this.limit}${this.searchName ? `&search=${this.searchName}` : ''}`;
    this.service.getAllUsers(query).subscribe({
      next: (res: any) => {
        this.accounts = res.data;
        this.totalPages = res.lastPage;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error: (err: any) => console.error(err)
    });
  }

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.loadAccounts();
  }

  goToDetail(customer: any) {    
    this.router.navigate(['/accountdetail'], { state: { customer } });
  }

}
