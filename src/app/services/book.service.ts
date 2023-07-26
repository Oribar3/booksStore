import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BookService implements OnInit {
  books!: Observable<Book[]>;
  allBooks!:Book[];
  private basePath = 'https://localhost:7167/api/Books';

  ngOnInit() {
    this.books.subscribe({
      next:(res)=>{this.allBooks=res}
    })
  }

  constructor(private http: HttpClient) {
    this.books=this.getBooks();
  }
  public getBooks() {
    return this.http.get<Book[]>(this.basePath)
  }

  public getBooksByTitle(title: string): Observable<any> {
    return this.http.get(`${this.basePath}/title/${title}`)
  }

  public addNewBook(Title: string, Description: string, Price: string, Image: string): Observable<any> {
    const body = { Title: Title, Description: Description, Price: Price, Image: Image }
    return this.http.post(this.basePath, body)
  }
  public updateBook(Title: string, Description: string, Price: string, Image: string, bookId: number): Observable<any> {
    const body = { Title: Title, Description: Description, Price: Price , Image:Image}
    return this.http.put(`${this.basePath}/${bookId}`, body)
  }

  public updateBookByPatch(bookId: number, updatedBook: any): Observable<any> {
    return this.http.patch(`${this.basePath}/${bookId}`, updatedBook);
  }

  public deleteBook(bookId: number): Observable<any> {
    return this.http.delete(`${this.basePath}/${bookId}`)
  }
}
