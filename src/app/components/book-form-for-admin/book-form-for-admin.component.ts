import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-form-for-admin',
  templateUrl: './book-form-for-admin.component.html',
  styleUrls: ['./book-form-for-admin.component.scss']
})
export class BookFormForAdminComponent {
  @Input() book!: Book;
  Form!: FormGroup;
  bookToUpdate!:Book;
  edit:boolean=false
  constructor(private fb: FormBuilder, private bookService:BookService){
  }
  ngOnInit(){
    this.Form = this.fb.group({
      title: [this.book.title],
      description: [this.book.description],
      price:  [this.book.price],
      image:  [this.book.image],
    });
  }

  updateABook(book: Book) {
    const val = this.Form.value;
    this.bookToUpdate = book;
    console.log(val.value)
    var title = val.title !== "" ? val.title : this.bookToUpdate?.title;
    var description = val.description !== "" ? val.description : this.bookToUpdate?.description;
    var image = val.image !== "" ? val.image : this.bookToUpdate?.image;
    var price = val.price !== "" ? val.price : this.bookToUpdate?.price;
    if (this.bookToUpdate !== undefined)
      this.bookService.updateBook(title, description, price, image, this.bookToUpdate.id).subscribe({
        next: (res) => { console.log(res); alert('your book has just updated!'); this.updateTable() },
        error: (err) => { console.log(err) }

      })
  }
  switchToEditMode(){
    this.edit==true?this.edit=false:this.edit=true;
  }
  updateTable() {
    location.reload();
  }

}
