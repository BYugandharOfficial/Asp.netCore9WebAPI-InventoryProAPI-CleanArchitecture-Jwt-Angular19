import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  categoryId: number;
  categoryName: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
//private apiUrl = 'https://localhost:7255/api/Categories';
private apiUrl = 'https://localhost:7284/api/Category';
  constructor(private http: HttpClient) { }

  // GET All Categories
  getCategories(): Observable<Category[]> {
 return this.http.get<Category[]>(this.apiUrl);
}

  // Get by Id
  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  // Create
  create(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  // Update
  update(id: number, category: Category): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, category);
  }

  // Delete
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}