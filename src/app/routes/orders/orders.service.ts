import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '@shared/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) { }
  getListNewOrders(params = {}): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/new-orders`, { params });
  }
  getListShippingOrders(params = {}): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/process-orders`, { params });
  }
  getListShippedOrders(params = {}): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/done-orders`, { params });
  }
  getListCanceledOrders(params = {}): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/cancel-orders`, { params });
  }
  onSend(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/process-order/${id}`);
  }
  onSendComplete(id: number): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/complete-order/${id}`);
  }
  viewBill(id: Number): any {
    return this.http.get(`${baseUrl.baseUrl}/api/billing-preview/${id}`, {responseType:'blob'});
  }
}
