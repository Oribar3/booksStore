import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, importProvidersFrom } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { Book } from 'src/app/models/book';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})

export class CartComponent {
  cartData!: Book[];
  isUser: boolean=false;
  discount:number=0;
  cartValue!:number;


  constructor(private cartService: CartService) { 
    this.discount=cartService.discount;
    this.cartData=this.cartService.cartData;
    this.refreshCartValue();

  }

  ngOnInit(): void {
    this.refreshCartValue();
 
  }


  refreshCartValue(){
    if (this.cartService.cartData) {
      if (this.cartService.cartValue==undefined) 
         this.cartService.cartValue=0;
      for (let book of this.cartService.cartData) {
        this.cartService.cartValue += book.price;
      }
    }
    this.decrement();
  }
  getAllCart() {
    this.cartService.getBooksInCart().subscribe({
      next: (res) => { this.cartData=res;console.log(this.cartData)},
      error: (err) => {err.status==401?this.cartData=this.cartService.cartData:console.log(err)},
    })
  }

  decrement ():void{
    this.isUser =  localStorage.getItem('token') !== null;
    if(this.isUser && this.discount!==0)
       this.cartService.cartValue = this.cartService.cartValue - (this.cartService.cartValue * (this.discount/100))
  }

  removeBookFromCart(book:Book){
    this.cartService.deleteBook(book.id).subscribe({
      next: (res) => {res==true??  this.cartService.cartData?this.cartService.cartData.splice(this.cartService.cartData.findIndex(a=>a==book),1):this.cartService.cartData=[book]; },
      error: (err) => {err.status===401?this.removeBookFromCartAnonymus(book):console.log(err)},
    })
  }

  removeBookFromCartAnonymus(book:Book){
    this.cartService.cartData?this.cartService.cartData.splice(this.cartService.cartData.findIndex(a=>a==book),1):this.cartService.cartData=[book];
  }
}
