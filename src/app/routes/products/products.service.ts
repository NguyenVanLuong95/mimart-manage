import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '@shared/constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) { }
  getListProducts(params = {}, id: Number): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/search-products/${id}`, { params });
  }
}
