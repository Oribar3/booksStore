import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent {

  constructor(private CartService: CartService, private router:Router){

  }
  setNewDiscount(discount: string) {
    if (discount) {
      let val: number = parseInt(discount);
      this.CartService.setDiscount(val).subscribe({
        next: (res => { alert ('your discount for register members has just updated!');    
        this.router.navigate(['/']);
        ;this.getCurrentDiscount() }),
        error: (err => { console.log(err)})
      })
    }
  }
  getCurrentDiscount() {
    this.CartService.getDiscount().subscribe({
      next: (res => { this.CartService.updateDiscount(res) }),
      error: (err => { console.log(err) })
    })
  }
}
