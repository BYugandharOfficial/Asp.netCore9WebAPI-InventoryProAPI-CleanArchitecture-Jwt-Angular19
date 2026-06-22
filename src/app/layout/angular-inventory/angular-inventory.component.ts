import { Component,OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Category, CategoriesService } from '../../services/categories.service';
import { Product, ProductsService } from '../../services/products.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../../login/login.component';
import { CommonModule } from '@angular/common';





@Component({
  selector: 'app-angular-inventory',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule ],
  templateUrl: './angular-inventory.component.html',
  styleUrl: './angular-inventory.component.css'
})
export class AngularInventoryComponent {
 currentDateTime: Date = new Date();

 

 
   products : Product[] = [];
   categories : Category[] = [];
   userName: string  = '';

 

 constructor(
    
    private productsService: ProductsService,
    private categoriesServies : CategoriesService,
    private authService: AuthService,
    private router: Router
  ) {}
   
  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}

   ngOnInit(): void {
    this.userName = localStorage.getItem('userName') || '';{
       this.userName = 'Admin';
    }

  {
  setInterval(() => {
    this.currentDateTime = new Date();
  }, 1000);
 }


    // Load products
    this.productsService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error fetching products:', err)
    });
    
   // Load categories
   this.categoriesServies.getCategories().subscribe({
    next: (data) => this.categories = data,
    error: (err) => console.error('Error fetching categories:', err)
   })



 }
}




    
    
  


