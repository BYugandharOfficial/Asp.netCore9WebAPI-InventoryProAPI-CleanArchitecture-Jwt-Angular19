import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';  
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Customer, CustomersService } from '../../services/customers.service';
import {  OnInit } from '@angular/core';

@Component({
  selector: 'app-index-customers',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './index-customers.component.html',
  styleUrl: './index-customers.component.css'
})
export class IndexCustomersComponent implements OnInit {
customers: Customer[] = [];
customerForm: Customer = this.resetForm();
  isEditing = false;

constructor(private customersService : CustomersService){}

  ngOnInit(): void { 
    this.loadCustomers();
  }


loadCustomers(): void {
    this.customersService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (err) => {
        console.error('Error fetching customers', err);
      }
    });
  }


addcustomer(): void {
    
  }
deleteCustomer(id: number): void {
    if (confirm('Are you sure to delete this customer?')) {
      this.customersService.delete(id).subscribe(() => this.loadCustomers());
    }
  }


  // Edit
  editCustomer(customer: Customer): void {
    
  }

  // Update
  updateCustomer(): void {
    
  }

  // Reset form
  resetForm(): Customer {
    return {
      customerId: 0,
      customerName: '',
      phoneNumber: '',
      email: '',
      address: '',
      isActive: true,
      createdDate:new Date,
      updatedDate: new Date
    };
  }
// Open modal (for add/edit)
  openModal(editCustomer?: Customer) {
    if (editCustomer) {
      this.customerForm = { ...editCustomer };
      this.isEditing = true;
    } else {
      this.customerForm = this.resetForm();
      this.isEditing = false;
    }
    const modal = document.getElementById('customerModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  // Save (Add or Update)
  saveCustomer() {
    if (this.isEditing) {
      this.customersService.update(this.customerForm.customerId, this.customerForm)
        .subscribe(() => {
          this.loadCustomers();
          this.closeModal();
        });
    } else {
      this.customersService.create(this.customerForm).subscribe(() => {
        this.loadCustomers();
        this.closeModal();
      });
    }
  }
// Delete customer
  deleteCustomers(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customersService.delete(id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('customerModal');
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    }
  }
}



