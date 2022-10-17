import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Furniture } from '../models/furniture';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.apiUrl = baseUrl + 'inventory';

  }

  getInventory() {
    return this.http.get<Furniture[]>(this.apiUrl);
  }


}
