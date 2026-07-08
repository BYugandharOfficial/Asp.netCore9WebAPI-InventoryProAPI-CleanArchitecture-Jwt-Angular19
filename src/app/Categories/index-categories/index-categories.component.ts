import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '../../services/categories.service';
import { RouterLink, Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { FormsModule, NgForm } from '@angular/forms';  
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-index-categories',
  standalone: true,
  imports: [ NgFor, CommonModule, FormsModule],
  templateUrl: './index-categories.component.html',
  styleUrl: './index-categories.component.css'
})

export class CategoriesComponent implements OnInit{

categories: Category[] = [];
categoryForm: Category = this.resetForm();
  isEditing = false;


constructor(private categoriesService : CategoriesService){}

  ngOnInit(): void { 
    this.loadCategories();
  }


loadCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      }
    });
  }


addcategory(): void {
    
  }
deletecategory(id: number): void {
    if (confirm('Are you sure to delete this category?')) {
      this.categoriesService.delete(id).subscribe(() => this.loadCategories());
    }
  }


  // Edit
  editCategory(category: Category): void {
    
  }

  // Update
  updateCategory(): void {
    
  }

  // Reset form
  resetForm(): Category {
    return {
      categoryId: 0,
      categoryName: '',
      description: '',
      isActive: true,
      createdAt:new Date,
      updatedAt: new Date
    };
  }
// Open modal (for add/edit)
  openModal(editCategory?: Category) {
    if (editCategory) {
      this.categoryForm = { ...editCategory };
      this.isEditing = true;
    } else {
      this.categoryForm = this.resetForm();
      this.isEditing = false;
    }
    const modal = document.getElementById('categoryModal');
    if (modal) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  // Save (Add or Update)
  saveCategory() {
    if (this.isEditing) {
      this.categoriesService.update(this.categoryForm.categoryId, this.categoryForm)
        .subscribe(() => {
          this.loadCategories();
          this.closeModal();
        });
    } else {
      this.categoriesService.create(this.categoryForm).subscribe(() => {
        this.loadCategories();
        this.closeModal();
      });
    }
  }
// Delete category
  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoriesService.delete(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  // Close modal
  closeModal() {
    const modal = document.getElementById('categoryModal');
    if (modal) {
      const bootstrapModal = (window as any).bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    }
  }
}


