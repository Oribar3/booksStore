import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService{
  cartData: Book[] =[];
  discount:number=0;
  cartValue!: number;
  cartClicked:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);;


  private basePath = 'https://localhost:7167/api/Cart';

  constructor(private http: HttpClient) {
    this.cartClicked.next(false);
  }

  public updateDiscount(newDiscount:number){
    this.discount=newDiscount;
  }
   public getBooksInCart() {
    this.cartClicked.next(true);

    return this.http.get<Book[]>(this.basePath)
    
  }
  
  public addNewBook( bookId:number){
    this.cartClicked.next(true);
    return this.http.post(`${this.basePath}/${bookId}`,{})
  }

  public deleteBook ( bookId:number){
    this.cartClicked.next(true);
    return this.http.delete(`${this.basePath}/${bookId}`);
  }

  public setDiscount (discount:number){
    return this.http.post(`https://localhost:7167/api/admin/set-discount/${discount}`,{})
  }

  public getDiscount (){
    return this.http.get<number>('https://localhost:7167/api/admin/get-discount')
  }

}