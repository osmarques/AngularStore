import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private apiUrl = 'https://localhost:7000/api/products';

  constructor(private http: HttpClient) { }

  checkBackendHealth(): Observable<boolean> {
    return this.http.get(this.apiUrl).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}