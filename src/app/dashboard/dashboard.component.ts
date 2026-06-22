import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  totalProducts = 0;
  totalCategories = 0;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {

    this.productService.getProducts().subscribe((data: any) => {
      this.totalProducts = data.length;
    });

    this.categoryService.getCategories().subscribe((data: any) => {
      this.totalCategories = data.length;
    });

  }
}
