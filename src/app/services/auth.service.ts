import { Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private basePath = 'https://localhost:7167/api/Account';

  private _token: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >('');

  token: Observable<string | null> = this._token.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  
  isAnonymusClient(errStatus: number) {
    if (errStatus == 401) return true;
    return false;
  }

  storeToken(token: string): void {
    console.log(token)
    localStorage.setItem('token', token);
  }

  login(Email: string, Password: string) {
    const body = { Email: Email, Password: Password };
    return this.http.post(`${this.basePath}/log-in`, body, {responseType: 'text'})
  }

  signup(Name: string, Email: string, Password: string, ConfirmPassword: string) {
    const body = { Name: Name, Email: Email, Password: Password, ConfirmPassword: ConfirmPassword }
    return this.http.post(`${this.basePath}/sign-up`, body)
  }

  signupAdmin(Name: string, Email: string, Password: string, ConfirmPassword: string) {
    const body = { Name: Name, Email: Email, Password: Password, ConfirmPassword: ConfirmPassword }
    return this.http.post(`https://localhost:7167/api/Admin/sign-up`, body)
  }

  updateUserProperty(property: string, newVal: string) {
    const body = { property: property, newVal: newVal }
    return this.http.patch(`${this.basePath}/myAccount`, body,{responseType: 'text'})
  }

  updateUserPassword(oldPassword: string, newPassword: string) {
    const body = { oldPassword: oldPassword, newPassword: newPassword }
    return this.http.patch(`${this.basePath}/myAccount/password`, body)
  }



}
