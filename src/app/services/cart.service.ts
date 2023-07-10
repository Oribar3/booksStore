import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cartData: Book[] =[];
  cartItems:CartItem[]=[];
  discount:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartValue!: number;
  _cartValueSub:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  beforeDiscountCartValue:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  _cartClicked:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  private basePath = 'https://localhost:7167/api/Cart';
  isUser: boolean=false;

  constructor(private http: HttpClient) {
    this._cartClicked.next(false);
    this.updateCartValue();
  }

  public getBookById(bookId:number){
    return this.http.get<Book>(`https://localhost:7167/api/Books/id/${bookId}`)

  }
  public updateDiscount(newDiscount:number){
    this.discount.next(newDiscount);
  }
   public getBooksInCart() {
    this.cartClicked();
    return this.http.get<CartItem[]>(this.basePath)
    
  }
  
  cartClicked(){
    this._cartClicked.next(true);
  }

  updateCartValue(){
    this.cartValue=0;
    for (let book of this.cartData) {
      this.cartValue += book.price;
    }
    this.decrement()


  }
  decrement(): void {
    this.getDiscount().subscribe({
      next:(res)=>{this.discount.next(res)},
      error:(err)=>{console.log(err)},      
    })
    this.isUser = localStorage.getItem('token') !== null;
    this.beforeDiscountCartValue.next(this.cartValue);
    if (this.isUser && this.discount.getValue()!=0 ){
      this.cartValue = this.cartValue - (this.cartValue * (this.discount.getValue() / 100))
    }
    this._cartValueSub.next(this.cartValue);

  }

  public addNewBook( bookId:number){
    this.cartClicked();
    return this.http.post(`${this.basePath}/${bookId}`,{})
  }

  public deleteBook ( bookId:number){
    this.cartClicked();
    return this.http.delete(`${this.basePath}/${bookId}`);
  }

  public setDiscount (discount:number){
    return this.http.post(`https://localhost:7167/api/admin/set-discount/${discount}`,{})
  }

  public getDiscount (){
    return this.http.get<number>('https://localhost:7167/api/admin/get-discount')
  }

}