import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
onClickBook(index: number) {
  console.log(this.books[index])
}
  books!: Book[]
  booksToDisplay!: Book[]
  constructor(private BookService:BookService){}
  ngOnInit(): void {
    this.books=this.BookService.books;
    console.log(this.books)
    this.booksToDisplay=[...this.books];
  }

  onBooksSearch(books: string) {
    this.booksToDisplay = this.books.filter(book => book.title.includes(books))
  }
}
