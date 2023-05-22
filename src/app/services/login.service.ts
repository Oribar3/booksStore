import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult } from '../models/api-result';
import { User } from '../models/user';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private _token!: string
  private _isUserLogged = new Subject<boolean>()
  isUserLogged = this._isUserLogged.asObservable()

  constructor(private http: HttpClient, private router: Router) { }
  private _myUser: User | undefined
  
  get token() {
    return this._token
  }

  private setMyUser(name: string,email:string, password: string,token:string) {
    this._myUser = { name,email, password,token }
    this._isUserLogged.next(true)
  }


  signup(userName: string, email: string, password: string) {
    this.http.post<ApiResult>(
      environment.FIREBASE_SIGNUP,
      { email, password, returnSecureToken: true }
    ).subscribe(
      (res) => {

        this._token = res.idToken
        this.setMyUser(userName, email, password, res.idToken)
        this.router.navigate(['/homepage'])
      }
    )
  }
  signin(userName: string, email: string, password: string) {
    this.http.post<ApiResult>(
      environment.FIREBASE_SIGNIN,
      { email, password, returnSecureToken: true }
    ).subscribe(
      (res) => {
        this._token = res.idToken
        this.setMyUser(userName, email, password, res.idToken)
        this.router.navigate(['/homepage'])
      }
    )
  }

  logout() {
    this._token = ""
    this._myUser = undefined
    this._isUserLogged.next(false)
    this.router.navigate(['/homepage'])
  }
}
