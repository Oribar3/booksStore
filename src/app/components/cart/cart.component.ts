import { ConditionalExpr } from '@angular/compiler';
import { Component, Output } from '@angular/core';
import { BehaviorSubject, Subscription, SubscriptionLike, map, tap } from 'rxjs';
import { Book } from 'src/app/models/book';
import { CartService } from 'src/app/services/cart.service';
import { EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
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
  cartValSubsciption!: Subscription;
  discount: number = 0;
  beforeDiscountCartValue: number = 0;
  cartItems: CartItem[] = [];

  @Output() closeTheCart = new EventEmitter<boolean>();


  constructor(private cartService: CartService) {
    this.cartService.getAllCart();
    this.cartService.beforeDiscountCartValue.asObservable().subscribe({
      next: (res) => this.beforeDiscountCartValue = res
    })
    this.cartService.discount.asObservable().subscribe({
      next: (res) => this.discount = res / 100 * this.beforeDiscountCartValue
    })
    this.cartValSubsciption = this.cartService._cartValueSub.asObservable().subscribe({
      next: (newVal) => { this.cartValue = newVal },
      error: (err) => { console.log(err) },
    })
    this.cartService.cartItemsSub.asObservable().subscribe({
      next: (res) => this.cartItems = res
    })
  }
  ngOnInit(): void {
    this.isUser = localStorage.getItem('token') !== null ? true : false;
  }
  addBookToCart(book: Book) {
    this.cartService.addNewBook(book.id).subscribe({
      next: (res) => {
        res == true ?? this.cartService.cartData ? this.cartService.cartData.push(book) : this.cartService.cartData = [book];
        ; console.log(localStorage.getItem('token'))
      },
      error: (err) => { err.status === 401 ? this.addBookToCartAnonymus(book) : console.log(err); },
      complete: () => { this.cartService.getAllCart(); }
    })

  }
  deleteAllCart() {
    this.cartService.deleteAllCart().subscribe({
      next: (res) => {
        if (res) {
          this.cartService.cartData = [];
          this.cartService.cartItemsSub.next([])
          this.cartService.getAllCart()
        }
      }
    })
    this.cartService.cartData = [];
    this.cartService.cartItemsSub.next([])
    this.cartService.getAllCart()

  }
  addBookToCartAnonymus(book: Book) {
    this.cartService.cartData ? this.cartService.cartData.push(book) : this.cartService.cartData = [book]; console.log(this.cartService.cartData);
    this.cartService.getAllCart()
  }
  closeCart() {
    this.closeTheCart.emit(false);
  }

  removeBookFromCart(book: Book) {
    this.cartService.deleteBook(book.id).subscribe({
      next: (res) => { res == true ?? this.cartService.cartData ? this.cartService.cartData.splice(this.cartService.cartData.findIndex(a => a == book), 1) : this.cartService.cartData = [book]; },
      error: (err) => { err.status === 401 ? this.removeBookFromCartAnonymus(book) : console.log(err) },
      complete: () => this.cartService.getAllCart()

    })
  }

  removeBookFromCartAnonymus(book: Book) {
    this.cartService.cartData ? this.cartService.cartData.splice(this.cartService.cartData.findIndex(a => a == book), 1) : this.cartService.cartData = [book];
    this.cartService.getAllCart();
  }
}
