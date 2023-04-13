import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
      action: ['login']
    });
  }

  onSubmit() {
  if (this.loginForm.valid) {
    const { email, password, rememberMe } = this.loginForm.value;
    const isLogin = this.loginForm.value.action === 'login';

    const apiUrl = `${environment.apiUrl}/${isLogin ? 'login' : 'signup'}`;

    const body = { email, password };

    this.http.post(apiUrl, body).subscribe(
      (response: any) => {
        console.log(response);

        if (isLogin) {
          // Store the token in the local storage
          localStorage.setItem('authToken', response.user.token);

          this.authService.isAuthenticated();
          this.router.navigate(['/profile']);
        } else {
          // Redirect to the login page after successful signup
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error(error);
        // Handle errors during login or signup
      }
    );
  }
}



  switchAction() {
    const newAction = this.loginForm.value.action === 'login' ? 'signup' : 'login';
    this.loginForm.patchValue({ action: newAction });
  }
}
