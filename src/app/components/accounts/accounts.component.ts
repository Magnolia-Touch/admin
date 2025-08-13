import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
  locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  serviceTypes = ['Cemetery Cleaning', 'Memorial'];

  selectedLocation = '';
  selectedCustomer = '';
  selectedServiceType = '';
  selectedDate: string | null = null;

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
    return this.customers.filter(c =>
      (!this.selectedLocation || c.location === this.selectedLocation) &&
      (!this.selectedCustomer || c.name === this.selectedCustomer) &&
      (!this.selectedServiceType || c.service === this.selectedServiceType) &&
      (!this.selectedDate || c.nextServiceDate === this.selectedDate)
    );
  }

  resetFilters() {
    this.selectedLocation = '';
    this.selectedCustomer = '';
    this.selectedServiceType = '';
    this.selectedDate = null;
  }

}
