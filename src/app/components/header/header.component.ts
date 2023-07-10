import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  account!: "Log-in" | "Account";
  
  constructor(public router: Router, private cartService:CartService) { this.account = "Log-in" }
  
  openCart(){
    this.cartService._cartClicked.next(true);
  }

}
