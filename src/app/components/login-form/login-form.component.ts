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

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.form = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
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
          }
        })
    }
  }

}
