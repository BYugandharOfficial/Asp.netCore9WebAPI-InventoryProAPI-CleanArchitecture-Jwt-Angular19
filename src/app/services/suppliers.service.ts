import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Supplier {
  supplierId: number;
  supplierName: string;
  contactPerson: string;
  phoneNumber: number;
  email: string;
  address: string;
  isActive: boolean;
  createdDate: Date;
  modifiedDate: Date;
}
@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
//private apiUrl = 'https://localhost:7255/api/Products'; // Your API URL InventoryAPI
  private apiUrl = 'https://localhost:7284/api/Supplier';    // InventoryProAPI
  constructor(private http: HttpClient) {}

  

  
  // GET all products
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
    
  }

// Get by Id
 getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  //Create
    create(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, supplier);
  }

  //Update
    update(id: number, supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.apiUrl}/${id}`, supplier);
  }

  //delete
    delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
