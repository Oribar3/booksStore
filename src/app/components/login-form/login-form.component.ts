import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{
   @ViewChild('form') form!: NgForm;
   name!: string;
   email!: string
   password!: string;
   constructor(private router: Router, private loginService: LoginService){}

   ngOnInit(){

   }
  onSubmit(){
    this.loginService.signin(this.name,this.email,this.password)
    
  }

}
