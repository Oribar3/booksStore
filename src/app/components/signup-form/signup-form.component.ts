import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      Name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')]],
      ConfirmPassword: ['',[Validators.required, ]],
    }, { validators: this.passwordMatchValidator });
  }
  
  passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const passwordControl = control.get('Password');
    const confirmPasswordControl = control.get('ConfirmPassword');
  
    if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  
    return null;
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
  if(this.submitted){
    if (control?.hasError('required')) {
      return controlName+' is required.';
    }
  
    if (control?.hasError('email')) {
      return 'This is not a valid email.';
    }

    if (control?.hasError('minlength')) {
      return 'The minimum length is 8 characters.';
    }
  
    if (control?.hasError('pattern')) {
      if(controlName== "Password") return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
      else 
      return 'Name should contain only letters'
    }
    if (control?.hasError('passwordMismatch')) {
      if(controlName== "ConfirmPassword") return 'Passwords must match.';

    }
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
