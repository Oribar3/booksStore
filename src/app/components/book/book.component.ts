import { Component, ElementRef, Injectable, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Book } from 'src/app/models/book';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})


export class BookComponent implements OnChanges {
   @Input() book!:Book;
   @ViewChild('modal', { static: true }) modelEF!: ElementRef;

   bookTitle!:string
   bookPrice!:number
   bookImage!:HTMLImageElement

   ngOnChanges(): void {
   this.bookTitle =this.book.title
    this.bookPrice=this.book.price
    this.bookImage=this.book.image
   }
  constructor(private cartService:CartService){}

  onClickBook(){
    const modal: HTMLElement = this.modelEF.nativeElement;
    modal.className=modal.className==="none"?'modal':'none';
  }
  addToCart(){
    this.cartService.setNewDataCart(this.book);
  }
}
