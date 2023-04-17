import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MusicComponent } from './music/music.component';
import { StoreComponent } from './store/store.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimeagoModule } from 'ngx-timeago';
import { MomentModule } from 'ngx-moment';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductListComponent } from './product-list/product-list.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MiniPlayerComponent } from './mini-player/mini-player.component';
// import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { MatMenuModule } from '@angular/material/menu';
import { LimitedDealCardComponent } from './limited-deal-card/limited-deal-card.component';
import { LyricAnalysisCardComponent } from './lyric-analysis-card/lyric-analysis-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { ArtistsComponent } from './artists/artists.component';
import { BlogAndPodcastComponent } from './blog-and-podcast/blog-and-podcast.component';
import { MusicEventConcertPromotionComponent } from './music-event-concert-promotion/music-event-concert-promotion.component';
import { PromoteYourLessonsComponent } from './promote-your-lessons/promote-your-lessons.component';
import { FilterByCategoryPipe } from './filter-by-category.pipe';
// import { CategoryTitles } from './components/product/category-titles.interface';










@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    MusicComponent,
    StoreComponent,
    NewsComponent,
    LoginComponent,
    CartComponent,
    ProfileComponent,
    FooterComponent,
    ProductListComponent,
    RegistrationComponent,
    MiniPlayerComponent,
    LimitedDealCardComponent,
    LyricAnalysisCardComponent,
    DashboardComponent,
    VerifyEmailComponent,
    UserProfileComponent,
    ProductComponent,
    CheckoutComponent,
    ArtistCardComponent,
    ArtistsComponent,
    ArtistCardComponent,
    ArtistsComponent,
    BlogAndPodcastComponent,
    MusicEventConcertPromotionComponent,
    PromoteYourLessonsComponent,
    FilterByCategoryPipe
    
    // NewsfeedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MomentModule,
    HttpClientModule,
    FormsModule,
    TimeagoModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
