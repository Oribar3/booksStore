import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  form: FormGroup;
  error:string="";
  
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

      this.form = this.fb.group({
        Email: ['', [Validators.required, Validators.email]],
        Password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')]]
      });
      
  }

  login() {
    const val = this.form.value;

    if (val.Email && val.Password) {
      this.authService.login(val.Email, val.Password)
        .subscribe({
          next:
            (response) => {
              this.authService.storeToken(response.toString());
              this.router.navigate(['/account']);
            },
          error: (err) => {
            console.log(err)
            this.error="one of the fileds is not correct"
          }
        })
    }
    else
    this.error="fill all the fileds"
  }

}
