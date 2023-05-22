import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

private cartSubject: BehaviorSubject<Book[]|null> = new BehaviorSubject<Book[]|null>(null);
cartData$ = this.cartSubject.asObservable();
setNewDataCart(book: Book) {
  let myBooks= this.cartSubject.getValue()
  if(myBooks) myBooks.push(book)
  else myBooks = [book];
  this.cartSubject.next(myBooks);
}
}