import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';  
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {  OnInit } from '@angular/core';
import { SalesService, Sale } from '../../services/sales.service';

@Component({
  selector: 'app-index-sales',
   standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './index-sales.component.html',
  styleUrl: './index-sales.component.css'
})

export class IndexSalesComponent implements OnInit {
sales: Sale[] = [];
saleForm: Sale = this.resetForm();
  isEditing = false;

constructor(private salesService : SalesService){}

  ngOnInit(): void { 
    this.loadSales();
  }


loadSales(): void {
    this.salesService.getSales().subscribe({
      next: (data) => {
        this.sales = data;
      },
      error: (err) => {
        console.error('Error fetching sales', err);
      }
    });
  }


addsale(): void {
    
  }
deletesale(id: number): void {
    if (confirm('Are you sure to delete this sale?')) {
      this.salesService.delete(id).subscribe(() => this.loadSales());
    }
  }


  // Edit
  editSale(sale: Sale): void {
    
  }

  // Update
  updateSale(): void {
    
  }

  // Reset form
  resetForm(): Sale {
    return {
      saleId: 0,
      saleNumber: 0,
      customerId: 0,
      saleDate: new Date,
      totalAmount: 0,
      isActive: true,
      createdDate:new Date,
      updatedDate: new Date
    };
  }
// Open modal (for add/edit)
  openModal(editSale?: Sale) {
    if (editSale) {
      this.saleForm = { ...editSale };
      this.isEditing = true;
    } else {
      this.saleForm = this.resetForm();
      this.isEditing = false;
    }
    const modal = document.getElementById('saleModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  // Save (Add or Update)
  saveSale() {
    if (this.isEditing) {
      this.salesService.update(this.saleForm.saleId, this.saleForm)
        .subscribe(() => {
          this.loadSales();
          this.closeModal();
        });
    } else {
      this.salesService.create(this.saleForm).subscribe(() => {
        this.loadSales();
        this.closeModal();
      });
    }
  }
// Delete sale
  deleteSales(id: number) {
    if (confirm('Are you sure you want to delete this sale?')) {
      this.salesService.delete(id).subscribe(() => {
        this.loadSales();
      });
    }
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('saleModal');
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    }
  }
}





