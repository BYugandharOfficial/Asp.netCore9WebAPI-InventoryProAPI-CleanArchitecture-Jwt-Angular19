import { RouterModule, Routes } from '@angular/router';
import { AngularInventoryComponent } from './layout/angular-inventory/angular-inventory.component';
import { ProductsComponent } from './Products/index-products/index-products.component';
import { Component, NgModule } from '@angular/core';
import { CategoriesComponent } from './Categories/index-categories/index-categories.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes : Routes = [
    
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    

{
    path: 'Dashboard',
    component: AngularInventoryComponent,
    children: [
      
      { path: '', component: DashboardComponent },
      { path: 'api/Product', component: ProductsComponent },
      { path: 'api/Category', component: CategoriesComponent }
    ]
  }

];

    