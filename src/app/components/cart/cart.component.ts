import { ConditionalExpr } from '@angular/compiler';
import { Component, Output } from '@angular/core';
import { BehaviorSubject, Subscription, SubscriptionLike, map, tap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { CartService } from 'src/app/services/cart.service';
import { EventEmitter} from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent {
  cartData!: Book[];
  transformdCartData!: Book[];
  isUser: boolean = false;
  cartValue: number = 0;
  cartValSubsciption!:Subscription;
  discount:number=0;
  beforeDiscountCartValue:number=0;
  @Output() closeTheCart = new EventEmitter<boolean>();


  constructor(private cartService: CartService) {
    this.getAllCart();
    this.cartService.beforeDiscountCartValue.asObservable().subscribe({
      next: (res)=> this.beforeDiscountCartValue=res
    })
    this.cartService.discount.asObservable().subscribe({
      next: (res)=> this.discount=res/100*this.beforeDiscountCartValue
    })
    this.cartValSubsciption=this.cartService._cartValueSub.asObservable().subscribe({
      next: (newVal)=>{this.cartValue=newVal},
      error: (err)=>{console.log(err)},
    })
    
  }

  ngOnInit(): void {
    this.isUser=localStorage.getItem('token')!==null?true:false;
  }

  closeCart(){
      this.closeTheCart.emit(false);
  }

  refreshCartData() {
    for (let item of this.cartService.cartItems) {
      for (let i = 0; i < item.amount; i++) {
        this.cartService.getBookById(item.bookId).subscribe({
          next: (res) => { this.cartService.cartData.push(res);console.log(res)},
          error: (err)=>{ console.log(err)},
          complete:()=>this.cartService.updateCartValue()
        })
      }
    }
    this.cartData=this.cartService.cartData;
  }




  getAllCart() {
    this.cartService.getBooksInCart().subscribe({
      next: (res) => { this.cartService.cartItems = res; },
      error: (err) => { err.status == 401 ? this.cartData = this.cartService.cartData : console.log(err) },
      complete: ()=>this.refreshCartData()
    })
  }



  removeBookFromCart(book: Book) {
    this.cartService.deleteBook(book.id).subscribe({
      next: (res) => { res == true ?? this.cartService.cartData ? this.cartService.cartData.splice(this.cartService.cartData.findIndex(a => a == book), 1) : this.cartService.cartData = [book];},
      error: (err) => { err.status === 401 ? this.removeBookFromCartAnonymus(book) : console.log(err) },
      complete: ()=> this.cartService.updateCartValue()
      
    })
  }

  removeBookFromCartAnonymus(book: Book) {
    this.cartService.cartData ? this.cartService.cartData.splice(this.cartService.cartData.findIndex(a => a == book), 1) : this.cartService.cartData = [book];
    this.cartService.updateCartValue()
  }
}
