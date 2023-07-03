import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books!: Book[];
  currentPage: number = 1;
  itemsPerPage: number = 10; // Number of items per page
  totalPages: number = 0;
  booksToDisplay!: Book[]; // Original array of books
  paginatedBooksToDisplay!: Book[]; // Array of books for the current page

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  onClickBook(index: number) {
    console.log(this.books[index]);
  }

  getAllBooks() {
    this.bookService.getBooks().subscribe({
      next: (res) => {
        this.books = [...res];
        this.booksToDisplay = [...this.books];
        this.totalPages = Math.ceil(this.booksToDisplay.length / this.itemsPerPage);
        this.updatePaginatedBooks();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onBooksSearch(books: string) {
    books=books.toLowerCase();
    this.booksToDisplay = this.books.filter((book) => book.title.toLocaleLowerCase().includes(books));
    this.totalPages = Math.ceil(this.booksToDisplay.length / this.itemsPerPage);
    this.updatePaginatedBooks();
  }

  // Function to update the paginated array based on the current page
  updatePaginatedBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedBooksToDisplay = this.booksToDisplay.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  // Function to navigate to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBooks();
    }
  }

  // Function to navigate to the next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedBooks();
    }
  }
}
