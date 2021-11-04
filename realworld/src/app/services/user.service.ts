import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ) { }

  user:any;
  userData:any = new ReplaySubject();
  currentUser : Observable<any> = this.userData.asObservable();
  tokenData:any = new ReplaySubject();
  currentToken : Observable<any> = this.tokenData.asObservable();

  signup(user:any) {
    this.http.post('http://localhost:3000/api/users',user)
  }

  signin(user:any) {
    this.http.post('http://localhost:3000/api/users/login',user).subscribe(data => {
      this.setUser(data);
      this.userData.next(this.user?.user);
      this.tokenData.next(this.user?.user?.token);
    })
  }

  settingsUser(user:any) {
    this.http.post('http://localhost:3000/api/users',user);
  }

  setUser(user:any) {
    this.user = user;
  }
}
