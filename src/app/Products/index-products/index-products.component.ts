import { Component, OnInit, NgModule  } from '@angular/core';
import { ProductsService, Product } from '../../services/products.service';
import { RouterLink, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';  
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [  NgFor, CommonModule, FormsModule ],
  templateUrl: './index-products.component.html',
  styleUrls: ['./index-products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: Product = this.resetForm();
    isEditing = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }




  //Reset form
  resetForm(): Product {
    return {
      productId: 0,
      productName: '',
      categoryId: 0,
      supplierId: 0,
      quantity: 0,
      price: 0,
      unit: '',
      description: '',
      isActive: true,
      createdDate:new Date,
      modifiedDate: new Date
    };
  }
 
// Open modal (for add/edit)
  openModal(editProduct?: Product) {
    if (editProduct) {
      this.productForm = { ...editProduct };
      this.isEditing = true;
    } else {
      this.productForm = this.resetForm();
      this.isEditing = false;
    }
    const modal = document.getElementById('productModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  

   // Save (Add or Update)
  saveProduct() {
    if (this.isEditing) {
      this.productsService.update(this.productForm.productId, this.productForm)
        .subscribe(() => {
          this.loadProducts();
          this.closeModal();
        });
    } else {
      this.productsService.create(this.productForm).subscribe(() => {
        this.loadProducts();
        this.closeModal();
      });
    }
  }
// Delete product
  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.delete(id).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    }
  }
}
