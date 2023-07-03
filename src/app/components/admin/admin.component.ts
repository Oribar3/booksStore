import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  books!: Observable<Book[]>;
  show: boolean = false;
  buttonContent: string = "";
  error: string = "";
  bookToUpdate:Book|undefined;

  constructor(private BookService: BookService, private fb: FormBuilder, private CartService: CartService,private router: Router) {
    this.books = BookService.books;
    this.Form = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      image: [''],
    });

  }
  ngOnInit(): void {

  }
  redirectToPersonalAccount(){
    this.router.navigate(['/account']);

  }
  showForm(action: "add" | "update") {
    this.buttonContent = action
    this.show = true;
    this.error="";
  }
  handleUpdateClickShow(book:Book){
    this.bookToUpdate=book;
    this.showForm('update');
  }

  setNewDiscount(discount: string) {
    if (discount) {
      let val: number = parseInt(discount);
      this.CartService.setDiscount(val).subscribe({
        next: (res => { this.getCurrentDiscount() }),
        error: (err => { console.log(err) })
      })
    }
  }

  getCurrentDiscount() {
    this.CartService.getDiscount().subscribe({
      next: (res => { this.CartService.updateDiscount(res) }),
      error: (err => { console.log(err) })
    })
  }
  updateBook() {
    console.log(this.bookToUpdate)
    const val = this.Form.value;
    var title = val.title!==""?val.title:this.bookToUpdate?.title;
    var description = val.description!==""?val.description:this.bookToUpdate?.description;
    var image = val.image!==""?val.image:this.bookToUpdate?.image;
    var price = val.price!==""?val.price:this.bookToUpdate?.price;
 if(this.bookToUpdate!==undefined)
    this.BookService.updateBook(title,description,price,image,this.bookToUpdate.id).subscribe({
      next: (res) => { console.log(res)},
      error: (err) => {console.log(err)},
    }
    )
  }
  deleteBook(bookId: number) {
    this.BookService.deleteBook(bookId).subscribe({
      next: (res) => { console.log(res) },
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
              console.log(res)
            }, error:(err)=>{
              this.error=err;
              console.log(err)
            }

          })
    }
    else
    this.error= "enter all the required details"
  }
}

