import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Token, User } from './interface';
import { guest } from './user';
import { baseUrl } from '@shared/constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$ = new BehaviorSubject<User>(guest);

  private userReq$ = this.http.get<User>('/me');

  constructor(private http: HttpClient, private token: TokenService) {
    this.token
      .change()
      .pipe(switchMap(() => (this.check() ? this.userReq$ : of(guest))))
      .subscribe(user => {
        this.user$.next(Object.assign({}, guest, user))
      });

    this.token
      .refresh()
      .pipe(switchMap(() => this.refresh()))
      .subscribe();
  }

  check() {
    return this.token.valid();
  }

  //login mặc định của ng-matero
  //API call login đang làm: http://202.92.6.183:8080/authenticate
  // login(email: string, password: string, rememberMe = false) {
  //   return this.http.post<Token>('/auth/login', { email, password, remember_me: rememberMe }).pipe(
  //     tap(token => this.token.set(token)),
  //     map(() => this.check())
  //   );
  // }

  login(body) {
    return this.http.post<any>(`${baseUrl.baseUrl}/authenticate`, body).pipe(tap(token=>this.token.set(token.listData[0].token))
    ,map(()=>this.check()))
  }

  refresh() {
    return this.http.post<Token>('/auth/refresh', {}).pipe(
      tap(token => this.token.set(token, true)),
      map(() => this.check())
    );
  }

  logout() {
    return this.http.post('/auth/logout', {}).pipe(
      tap(() => this.token.clear()),
      map(() => !this.check())
    );
  }

  user() {
    return this.user$.pipe(share());
  }
}
