import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts-detail',
  imports: [CommonModule],
  templateUrl: './accounts-detail.component.html',
  styleUrl: './accounts-detail.component.css'
})
export class AccountsDetailComponent implements OnInit {

  customer: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.customer = nav?.extras?.state?.['customer'];
  }

  ngOnInit(): void { 
    console.log(this.customer);
    
  }


}
