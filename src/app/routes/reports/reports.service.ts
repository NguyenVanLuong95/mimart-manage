import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '@shared/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) { }

  getListStories(): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/store-list`);
  }

  getReport(id, startDate, endDate): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/monthly-report/${id}`);
  }
}
