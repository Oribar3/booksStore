import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
  signupForm: FormGroup;
  submitted:boolean = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
      this.submitted=false;
    this.signupForm = this.fb.group({
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
    });
  }

  signup() {
    const currentRoute = this.router.url;

    if (currentRoute != "/signup")
      this.adminSignup()
    else {

      const val = this.signupForm.value;

      if (val.Name && val.Email && val.Password && val.ConfirmPassword) {
        this.authService.signup(val.Name, val.Email, val.Password, val.ConfirmPassword).subscribe({
          next: (res) => { console.log(res), this.router.navigate(['/login']) },
          error: (err) => { console.log(err), alert("your sign up had failed, please try again") },
        })
      }
    }
    this.submitted=true
  }
  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
  
    if (control?.hasError('required')&&this.submitted==true) {
      return 'This field is required.';
    }
  
    return '';
  }

  adminSignup() {
    const val = this.signupForm.value;

    if (val.Name && val.Email && val.Password && val.ConfirmPassword) {
      this.authService.signupAdmin(val.Name, val.Email, val.Password, val.ConfirmPassword).subscribe({
        next: (res) => { console.log(res), this.router.navigate(['/login']) },
        error: (err) => { console.log(err), alert("your sign up had failed, please try again") },

      })
    }
  }
}
