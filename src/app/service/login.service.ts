import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public loginStatusSubject = new Subject<boolean>();
  // Get Current user details
  public getCurrentUser() {
    return this.http.get(`${environment.baseUrl}/current-user`);
  }

  // generate token
  public generateToken(loginData: any) {
    return this.http.post(`${environment.baseUrl}/generate-token`, loginData);
  }

  // set Token
  public loginUser(token: any) {
    localStorage.setItem('token', JSON.stringify(token));
    return true;
  }

  // check Logged in
  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  //  to logout user
  public logout() {
    localStorage.clear();
    return true;
  }

  //  to get token
  public getToken() {
    let token: any = localStorage.getItem('token');
    return JSON.parse(token);
  }

  //  to save user details
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //  to get user details

  public getUser() {
    let user: any = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  //  to get user role
  public getUserRole() {
    let user = this.getUser();
    if (user) {
      return user.authorities[0].authority;
    }
  }
}
