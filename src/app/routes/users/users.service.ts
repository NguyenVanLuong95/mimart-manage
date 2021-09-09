import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {
    
  }
  getUserList(){
    return this.http.get<any>(`${environment.serverUrl.api}/search-users`);
  }
}
