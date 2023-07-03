import { AfterContentChecked, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent{
  isCartShown:boolean=false;
  
  constructor(private cartService:CartService){
    this.cartService.cartClicked.subscribe({next:(res)=>this.isCartShown=res})
  }

}
