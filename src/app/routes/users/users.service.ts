import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '@shared/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) { }
  getListUsers(params = {}): Observable<any> {
    return this.http.get<any>(`${baseUrl.baseUrl}/api/search-users`, { params });
  }
}
