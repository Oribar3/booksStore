import { Component, ElementRef, Injectable, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})


export class BookComponent implements OnInit {
   @Input() book:Book={} as Book;
   @ViewChild('modal', { static: true }) modelEF!: ElementRef;
   


   ngOnInit(): void {
   }
  constructor(private cartService:CartService, private router: Router){}

  onClickBook() {
    const modal: HTMLElement = this.modelEF.nativeElement;
    modal.classList.toggle('show');
  }
  

  addBookToCart(){
    this.cartService.addNewBook(this.book.id).subscribe({
      next: (res) => { res==true ?? this.cartService.cartData?this.cartService.cartData.push(this.book):this.cartService.cartData=[this.book];
        ; },
      error: (err) => {err.status===401?this.addBookToCartAnonymus():console.log(err)},
    })
  }

  addBookToCartAnonymus(){
    this.cartService.cartData?this.cartService.cartData.push(this.book):this.cartService.cartData=[this.book];
    console.log(this.cartService.cartData)
  }



}
