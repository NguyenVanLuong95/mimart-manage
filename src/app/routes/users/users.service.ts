import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '@shared/constant';
import { Observable } from 'rxjs';

export interface RepoSearchList {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) { }
  getListUsers(params = {}): Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>(`${baseUrl.baseUrl}/api/search-users`, { params });
  }
}
