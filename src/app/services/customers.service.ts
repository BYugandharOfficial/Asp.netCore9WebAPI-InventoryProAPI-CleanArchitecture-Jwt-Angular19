import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Customer {
  customerId: number;
  customerName: string;
  phoneNumber: string;
  email: string;
  address: string;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
@Injectable({
  providedIn: 'root'
})
export class CustomersService {
//private apiUrl = 'https://localhost:7255/api/Customers';
private apiUrl = 'https://localhost:7284/api/Customer';
  constructor(private http: HttpClient) { }

  // GET All Customers
  getCustomers(): Observable<Customer[]> {
 return this.http.get<Customer[]>(this.apiUrl);
}

  // Get by Id
  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  // Create
  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  // Update
  update(id: number, customer: Customer): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, customer);
  }

  // Delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

