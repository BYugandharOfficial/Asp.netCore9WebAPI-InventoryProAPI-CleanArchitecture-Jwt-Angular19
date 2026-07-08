import { Component, OnInit, NgModule } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { SuppliersService, Supplier } from '../../services/suppliers.service';
import { NgModel } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';  
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './index-suppliers.component.html',
  styleUrl: './index-suppliers.component.css'
})

export class IndexSuppliersComponent implements OnInit {
suppliers: Supplier[] = [];
  supplierForm: Supplier = this.resetForm();
    isEditing = false;


constructor(private suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
      },
      error: (err) => {
        console.error('Error fetching suppliers', err);
      }
    });
  }




  //Reset form
  resetForm(): Supplier {
    return {
      supplierId: 0,
      supplierName: '',
      contactPerson: '',
      phoneNumber: 0,
      email: '',
      address: '',
      isActive: true,
      createdDate: new Date,
      modifiedDate: new Date
    };
  }
 
// Open modal (for add/edit)
  openModal(editSupplier?: Supplier) {
    if (editSupplier) {
      this.supplierForm = { ...editSupplier };
      this.isEditing = true;
    } else {
      this.supplierForm = this.resetForm();
      this.isEditing = false;
    }
    const modal = document.getElementById('supplierModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  

   // Save (Add or Update)
  saveSupplier() {
    if (this.isEditing) {
      this.suppliersService.update(this.supplierForm.supplierId, this.supplierForm)
        .subscribe(() => {
          this.loadSuppliers();
          this.closeModal();
        });
    } else {
      this.suppliersService.create(this.supplierForm).subscribe(() => {
        this.loadSuppliers();
        this.closeModal();
      });
    }
  }
// Delete product
  deleteSupplier(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.suppliersService.delete(id).subscribe(() => {
        this.loadSuppliers();
      });
    }
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('supplierModal');
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    }
  }
}


