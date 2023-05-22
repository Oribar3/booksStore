import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BooksSearchComponent } from './components/books-search/books-search.component';
import { BooksComponent } from './components/books/books.component';
import { BookComponent } from './components/book/book.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    BooksSearchComponent,
    BooksComponent,
    BookComponent,
    CartComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  
  ],
  providers: [BooksSearchComponent],
  bootstrap: [AppComponent],
  exports:[BooksSearchComponent]
})
export class AppModule { }
