import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  Form: FormGroup;
  books: Observable<Book[]> = new Observable<Book[]>;
  show: boolean = false;
  buttonContent: string = "";
  error: string = "";
  bookToUpdate: Book | undefined;
  isEditing: boolean = false;
  allBooks!:Book[];


  constructor(private BookService: BookService, private fb: FormBuilder, private CartService: CartService, private router: Router) {
    this.books = BookService.books;
    this.books.subscribe({next: (res)=>{this.allBooks=res}})
    this.Form = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      image: [''],
    });
  }

  ngOnInit() {      

   
  }

  redirectToPersonalAccount() {
    this.router.navigate(['/account']);

  }
  showForm() {
    this.show = true;
    this.error = "";

  }

  switchToEditMode() {
    this.isEditing == true ? this.isEditing = false : this.isEditing = true;
  }



  updateTable() {
    location.reload();
  }
  deleteBook(bookId: number) {
    this.BookService.deleteBook(bookId).subscribe({
      next: (res) => { console.log(res); alert('a new book removed succesfully'); this.updateTable() },
      error: (err) => { console.log(err), this.error = err.toString() },
    }
    )
  }
  addNewBook() {
    const val = this.Form.value;

    if (val.title && val.description && val.price && val.image) {
      this.BookService.addNewBook(val.title, val.description, val.price, val.image)
        .subscribe(
          {
            next: (res) => {
              console.log(res);
              alert('a new book added succesfully');
              this.updateTable();
            }, error: (err) => {
              this.error = err;
              console.log(err)
            }

          })
    }
    else
      this.error = "enter all the required details"
  }
}

