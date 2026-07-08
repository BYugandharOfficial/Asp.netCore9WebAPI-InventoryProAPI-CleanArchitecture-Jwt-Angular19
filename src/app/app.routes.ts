import { RouterModule, Routes } from '@angular/router';
import { AngularInventoryComponent } from './layout/angular-inventory/angular-inventory.component';
import { ProductsComponent } from './Products/index-products/index-products.component';
import { Component, NgModule } from '@angular/core';
import { CategoriesComponent } from './Categories/index-categories/index-categories.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexSuppliersComponent } from './Suppliers/index-suppliers/index-suppliers.component';
import { IndexCustomersComponent } from './Customers/index-customers/index-customers.component';
import { IndexSalesComponent } from './Sales/index-sales/index-sales.component';

export const routes : Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    

{
    path: 'Dashboard',
    component: AngularInventoryComponent,
    children: [
      
      { path: '', component: DashboardComponent },
      { path: 'api/Product', component: ProductsComponent },
      { path: 'api/Category', component: CategoriesComponent },
      { path: 'api/Supplier', component: IndexSuppliersComponent},
      { path: 'api/Customer', component: IndexCustomersComponent},
      { path: 'api/Sale', component: IndexSalesComponent}
    ]
  }

];

    