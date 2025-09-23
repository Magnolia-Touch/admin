import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AccountsService } from './service/accounts.service';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, FormsModule, NgbDatepickerModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit {
  locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  serviceTypes = ['Cemetery Cleaning', 'Memorial'];

  selectedLocation = '';
  selectedCustomer = '';
  selectedServiceType = '';
  selectedDate: NgbDateStruct | null = null;

  allAccounts!: any[];

  customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      location: "New York",
      service: "Cemetery Cleaning",
      nextServiceDate: "2025-08-20"
    },
    {
      id: 2,
      name: "Mary Smith",
      email: "mary.smith@example.com",
      location: "Los Angeles",
      service: "Memorial",
      nextServiceDate: "2025-08-25"
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      location: "Chicago",
      service: "Cemetery Cleaning",
      nextServiceDate: "2025-09-02"
    },
    {
      id: 4,
      name: "Patricia Brown",
      email: "patricia.brown@example.com",
      location: "Houston",
      service: "Memorial",
      nextServiceDate: "2025-09-10"
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      location: "Phoenix",
      service: "Cemetery Cleaning",
      nextServiceDate: "2025-09-15"
    }
  ];

  constructor(
    private service: AccountsService
  ) { }

  ngOnInit(): void {
    this.loadAccounts()
  }

  loadAccounts() {
    this.service.getAllUsers(1, 12).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  selectLocation(location: string) {
    this.selectedLocation = location;
  }

  selectCustomer(customer: string) {
    this.selectedCustomer = customer;
  }

  selectServiceType(type: string) {
    this.selectedServiceType = type;
  }

  filteredCustomers() {
    return this.customers.filter(c => {
      const matchesLocation = !this.selectedLocation || c.location === this.selectedLocation;
      const matchesCustomer = !this.selectedCustomer || c.name === this.selectedCustomer;
      const matchesServiceType = !this.selectedServiceType || c.service === this.selectedServiceType;

      let matchesDate = true;
      if (this.selectedDate) {
        const serviceDate = new Date(c.nextServiceDate);
        matchesDate =
          serviceDate.getFullYear() === this.selectedDate.year &&
          serviceDate.getMonth() + 1 === this.selectedDate.month &&
          serviceDate.getDate() === this.selectedDate.day;
      }

      return matchesLocation && matchesCustomer && matchesServiceType && matchesDate;
    });
  }

  resetFilters() {
    this.selectedLocation = '';
    this.selectedCustomer = '';
    this.selectedServiceType = '';
    this.selectedDate = null;
  }

}
