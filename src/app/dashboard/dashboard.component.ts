import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { SuppliersService } from '../services/suppliers.service';
import { Chart, registerables } from 'chart.js';
import { CustomersService } from '../services/customers.service';
import { SalesService } from '../services/sales.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  totalProducts = 0;
  totalCategories = 0;
  totalSuppliers = 0;
  totalCustomers = 0;

  categories: any[] = [];
  products: any[] = [];
  sales: any[] = [];
  chart: any;
  lineChart: Chart | undefined;

  constructor(
    private productService: ProductsService,
    private categoryService: CategoriesService,
    private supplierService: SuppliersService,
    private customerService: CustomersService,
    private salesService: SalesService
  ) { }

  ngOnInit(): void {

    this.loadCategories();
    this.loadProducts();
    this.loadSalesChart();

    this.supplierService.getSuppliers().subscribe((data: any[]) => {
      this.totalSuppliers = data.length;
    });
     this.customerService.getCustomers().subscribe((data: any[]) => {
      this.totalCustomers = data.length;
    });

  }

  loadCategories(): void {

    this.categoryService.getCategories().subscribe({
      next: (data: any[]) => {

        this.categories = data;
        this.totalCategories = data.length;

        console.log('Categories:', this.categories);

        this.loadPieChart();

      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  loadProducts(): void {

    this.productService.getProducts().subscribe({
      next: (data: any[]) => {

        this.products = data;
        this.totalProducts = data.length;

        console.log('Products:', this.products);

        this.loadPieChart();

      },
      error: (err) => {
        console.error(err);
      }
    });

  }

  loadPieChart(): void {

    if (this.categories.length === 0 || this.products.length === 0) {
      return;
    }

    const labels = this.categories.map(c => c.categoryName);

    //const values = this.categories.map(c =>
    const data = this.categories.map(c=> 
      this.products.filter(p => p.categoryId
        === c.categoryId).length
      );
     // )
    //)
   //   this.products.filter(p => p.categoryName === c.categoryName).length
   // );

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            '#36A2EB',
            '#FF6384',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#FF6560'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
        
      }
    });

  }

  createLineChart(labels: string[], data: number[]) {

  if (this.lineChart) {
    this.lineChart.destroy();
  }

  this.lineChart = new Chart('salesLineChart', {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Monthly Sales',
        data: data,
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54,162,235,0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      }
    }
  });

}
loadSalesChart(): void {

  this.salesService.getSales().subscribe({
    next: (sales) => {

      const monthlySales: { [key: string]: number } = {};

      sales.forEach(sale => {

        const month = new Date(sale.saleDate).toLocaleString('default', {
          month: 'short'
        });

        monthlySales[month] =
          (monthlySales[month] || 0) + sale.totalAmount;

      });

      const labels = Object.keys(monthlySales);
      const data = Object.values(monthlySales);

      this.createLineChart(labels, data);

    },
    error: (err) => {
      console.error(err);
    }
  });

}
}