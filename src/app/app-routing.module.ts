import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { CartComponent } from './components/cart/cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {path: 'homepage' , component:HomepageComponent},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'admin-signup', component: SignupFormComponent },
  { path: 'admin', component: AdminComponent , canActivate: [AdminGuard]},
  { path: 'account', redirectTo: 'account', pathMatch: 'full' },
  { path: 'cart', component: CartComponent},
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
 { path: '**', component:NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
