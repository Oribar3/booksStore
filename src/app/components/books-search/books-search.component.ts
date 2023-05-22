import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss']
})
export class BooksSearchComponent implements OnInit {
  @Output() books_to_display = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

  onInput(event:any) {
    this.books_to_display.emit(event.target.value)
  }
}
