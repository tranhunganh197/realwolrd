import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  user: any;
  token: any;
  userData: any = new ReplaySubject(1);
  currentUser: Observable<any> = this.userData.asObservable();
  tokenData: any = new ReplaySubject(1);
  currentToken: Observable<any> = this.tokenData.asObservable();
  dataParam: any = new ReplaySubject(1);
  currentParam: any = this.dataParam.asObservable();
  urlBase = 'http://localhost:3000'

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }),
    };
  }

  signup(user: any) {
    return this.http
      .post(`${this.urlBase}/api/users`, user)

  }

  setUser(user: any) {
    this.user = user;
  }

  signin(user: any) {
    return this.http
      .post(`${this.urlBase}/api/users/login`, user)

  }

  settingsUser(user: any) {
    return this.http.put(`${this.urlBase}/api/user`, user, this.getHttpOptions());
  }

  getUser() {
    if (localStorage.getItem('token')) {
      return this.http.get(`${this.urlBase}/api/user`, this.getHttpOptions());
    } else {
      return this.currentUser;
    }
  }

  getProfile(username: string) {
    return this.http.get(
      `${this.urlBase}/api/profiles/` + username, this.getHttpOptions()
    );
  }

  pushParam(param: string) {
    this.dataParam.next(param);
  }

  follow(username: string) {
    return this.http.post(`${this.urlBase}/api/profiles/${username}/follow`, {}, this.getHttpOptions())
  }

  unfollow(username: string) {
    return this.http.delete(`${this.urlBase}/api/profiles/${username}/follow`, this.getHttpOptions())
  }
}
