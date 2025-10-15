import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Product, CreateProduct, UpdateProduct } from '../models/product.model';

interface Result<T> {
  success: boolean;
  data: T;
  error: string | null;
}

interface ResultVoid {
  success: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7000/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Result<Product[]>>(this.apiUrl).pipe(
      map(result => result?.data || []),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Result<Product>>(`${this.apiUrl}/${id}`).pipe(
      map(result => result?.data!),
      catchError(this.handleError)
    );
  }

  createProduct(product: CreateProduct): Observable<Product> {
    return this.http.post<Result<Product>>(this.apiUrl, product).pipe(
      map(result => result?.data!),
      catchError(this.handleError)
    );
  }

  updateProduct(id: number, product: UpdateProduct): Observable<void> {
    return this.http.put<ResultVoid>(`${this.apiUrl}/${id}`, product).pipe(
      map(() => void 0),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<ResultVoid>(`${this.apiUrl}/${id}`).pipe(
      map(() => void 0),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Tenta extrair mensagem específica da API
      if (error.error?.error) {
        errorMessage = error.error.error;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else {
        errorMessage = `Erro ${error.status}: ${error.statusText || 'Erro na requisição'}`;
      }
    }
    
    return throwError(() => errorMessage);
  }
}