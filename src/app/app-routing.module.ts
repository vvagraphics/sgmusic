import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MusicComponent } from './music/music.component';
import { StoreComponent } from './store/store.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
// import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';




const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'music', component: MusicComponent },
  { path: 'store', component: StoreComponent },
  { path: 'news', component: NewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  // { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
