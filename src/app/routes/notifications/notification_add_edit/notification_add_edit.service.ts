import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '@shared/constant';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotificationAddEditService {
  constructor(private http: HttpClient) { }
  onSave(body): Observable<any> {
    return this.http.post<any>(`${baseUrl.baseUrl}/api/notifycation`, body);
  }
}
