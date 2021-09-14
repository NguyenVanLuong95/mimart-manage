import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '@shared/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) { }
  getListNotifications(params = {}): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/all-notifycations`, { params });
  }
}
