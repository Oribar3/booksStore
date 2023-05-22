import { Component, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private cartData!: Book[]|null;
  
  constructor(private cartService: CartService) {}

  getCartData(){
    if(this.cartData)
     return [...this.cartData];
    else return null;
  }

  ngOnInit() {
    this.cartService.cartData$.subscribe(data => {
      if(data) this.cartData=data;
  })
  }
}
