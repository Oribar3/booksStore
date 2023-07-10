import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {

  allow:boolean=false;
  constructor(private router: Router, private AuthService:AuthService) {}

  async canActivate(): Promise<boolean> {
    try {
      const res = await new Promise<boolean>((resolve, reject) => {
        this.AuthService.isAdmin().subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
      });
      this.allow = res;
      return this.allow;
    } catch (err) {
      console.log(err);
      this.allow = false;
      return false;
    }
  }
}
