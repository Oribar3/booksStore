import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  @ViewChild('oldPassword') oldPassword!: ElementRef;
  @ViewChild('newPassword') newPassword!: ElementRef;
  @ViewChild('newName') newName!: ElementRef;
  @ViewChild('newEmail') newEmail!: ElementRef;
  constructor(private authService: AuthService, private router: Router) {
    console.log(localStorage.getItem('token'));
   }



  showUpdateInfo() {
    let elements = document.getElementsByClassName("none");
    let elementsArray = Array.from(elements);
    elementsArray.forEach((element) => {
      element.classList.remove("none");
      element.classList.add("show");
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(["/login"])
  }
  updateInfo() {
    let newName = this.newName.nativeElement.value;
    console.log(newName.value);
    if (newName != null && newName != undefined && newName!="") {
      this.authService.updateUserProperty("name", newName).subscribe({
        next: (res) => { console.log(res) , alert("your name has changed succefully"), this.router.navigate(["/"] )},
        error: (err) => { console.log(err) ,alert("your name has not changed succefully") },
      })
    }
    let newEmail = this.newEmail.nativeElement.value;
    console.log(newEmail);
    if (newEmail != null&& newEmail != undefined &&newEmail!="") {
      this.authService.updateUserProperty("email", newEmail).subscribe({
        next: (res) => {localStorage.setItem("token",res), alert("your email has changed succefully"), this.router.navigate(["/"])
      },
        error: (err) => { console.log(err),alert("your email has not changed succefully") },
      }
      );
    }
  }

  updatePassword() {
    let oldPass = this.oldPassword.nativeElement.value;
    console.log(oldPass);

    let newPass = this.newPassword.nativeElement.value;
    console.log(newPass);

    if (oldPass&&newPass)
       this.authService.updateUserPassword(oldPass,newPass).subscribe({
        next: (res) => { console.log(res) },
        error: (err) => { console.log(err) },
       })
  }
}
