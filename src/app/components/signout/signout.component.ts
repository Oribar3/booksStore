import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent {

  constructor(private router: Router) { this.logout()}

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["/login"])
  }
}
