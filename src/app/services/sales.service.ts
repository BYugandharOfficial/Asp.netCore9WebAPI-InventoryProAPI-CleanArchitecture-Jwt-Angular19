import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Sale {
  saleId: number;
  saleNumber: number;
  customerId: number;
  saleDate: Date;
  totalAmount: number;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
@Injectable({
  providedIn: 'root'
})

export class SalesService {
//private apiUrl = 'https://localhost:7255/api/Sales';
private apiUrl = 'https://localhost:7284/api/Sale';
  constructor(private http: HttpClient) { }

  // GET All Sales
  getSales(): Observable<Sale[]> {
 return this.http.get<Sale[]>(this.apiUrl);
}

  // Get by Id
  getById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/${id}`);
  }

  // Create
  create(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(this.apiUrl, sale);
  }

  // Update
  update(id: number, sale: Sale): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, sale);
  }

  // Delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


