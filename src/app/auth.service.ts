import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }
  
  logout() {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  verifyEmail(token: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.apiUrl}/verify-email?token=${token}`);
  }
}
