import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '@shared/constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductAddEditService {
  constructor(private http: HttpClient) { }
  onSave(body): Observable<any> {
    return this.http.post<any>(`${baseUrl.baseUrl}/api/product`, body);
  }

  onSaveEdit(body): Observable<any> {
    return this.http.put<any>(`${baseUrl.baseUrl}/api/product`, body);
  }

  getAllBuilding() {
    return this.http.get(`${baseUrl.baseUrl}/api/building-list`);
  }
}
