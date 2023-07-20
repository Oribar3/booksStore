import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  account!: "Log-in" | "Account";
  unsignUser: boolean = true;
  user: boolean = false;
  admin: boolean = false;
  _account: BehaviorSubject<'unsignUser'|'user'|'admin'>= new BehaviorSubject<'unsignUser'|'user'|'admin'>('unsignUser');

  constructor(public router: Router, private cartService: CartService, private authService: AuthService) {
    this.account = "Log-in"
    this.authService._accountClicked.asObservable().subscribe({
      next: (res) => {
        this.accountListConvert();
        if (res) document.getElementById('accountList')?.classList.add('accountListShown');
        else
          document.getElementById('accountList')?.classList.remove('accountListShown')
      },
      error: (err) => { console.log(err) },
    });
    
  }

  openCart() {
    this.cartService._cartClicked.next(true);
  }
  openAccount() {
    this.authService._accountClicked.getValue() == true ? this.authService._accountClicked.next(false) : this.authService._accountClicked.next(true)
    this.changeTopOfOpenPages();
  }
  changeTopOfOpenPages() {
    document.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 20) {
        document.getElementById('accountList')?.classList.add('scrolled');
      }
      else
        document.getElementById('accountList')?.classList.remove('scrolled');


    });
  }
  accountListConvert(){
    this.authService.isAdmin().subscribe({
      next: (res) => {
        if (res) {
          this.unsignUser = false;
          this.user = false;
          this.admin = true;
        }
        else {
          this.unsignUser = false;
          this.user = true;
          this.admin = false;
        }
      },
      error: (err) => {
        console.log(err)      
        this.unsignUser = true;
        this.user = false;
        this.admin = false;
      },

    })
  }
}

