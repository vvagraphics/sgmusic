import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
   this.loginForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required]],
  confirmPassword: ['', [Validators.required]], // Add required validator
  displayName: ['', [Validators.required]], // Add required validator
  rememberMe: [false],
  action: ['login'] // Add the action field
});

  }

onSubmit() {
  if (this.loginForm.valid) {
    const { email, password, displayName } = this.loginForm.value;
    const isLogin = this.loginForm.value.action === 'login';

    const apiUrl = `${environment.apiUrl}/${isLogin ? 'login' : 'signup'}`;

    const body = isLogin ? { email, password } : { email, password, displayName };

    this.http.post(apiUrl, body).subscribe(
      (response) => {
        console.log(response);
        
        // Handle successful login or signup
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
