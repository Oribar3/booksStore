import { Injectable, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { User } from '../models/user';
import { Subject } from 'rxjs/internal/Subject';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class BookService implements OnInit{

  private _myUser: User|undefined
  private _books: Book[] = []
  private _booksSubject = new Subject <Book[]>()
  booksData = this._booksSubject.asObservable()
  private _cart:Book[]=[]

  ngOnInit(){
  }
  constructor() {
    this._books.push({
      title:'alice in the wonderland',
      price: 40,
      image: new Image (10,10 )
    })
    this._books.push ({
      title:'ori in the wonderland',
      price: 40,
      image: new Image (10,10 )
    })
   }
  get myUser() {
    return { ...this._myUser }
  }

  get books() {
    return [...this._books]
  }

  addBookToCart(book: Book) {
    this._cart.push (book)
}
}