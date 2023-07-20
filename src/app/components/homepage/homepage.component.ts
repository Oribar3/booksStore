import { AfterContentChecked, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent{
  isCartShown:BehaviorSubject<boolean>=new BehaviorSubject(false);
  
  constructor(private cartService:CartService, authService:AuthService){
    authService._accountClicked.next(false);
    this.cartService._cartClicked.subscribe({
      next:(res)=>{this.isCartShown.next(res);}
    })
  }

  closeCart(isOpen: boolean) {
    this.isCartShown.next(isOpen)
  }

}