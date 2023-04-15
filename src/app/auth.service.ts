import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }
  // Add this getter in your AuthService
get currentUser(): any {
  return this.currentUserSubject.value;
}


login(credentials: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
    tap((response) => {
      console.log('Login response:', response);
      localStorage.setItem('authToken', response.token);
      this.setCurrentUser(response.user); // Set the current user from the response object
    })
  );
}





  setCurrentUser(user: any): void {
  console.log('Setting current user:', user);
  this.currentUserSubject.next(user);
}

  logout() {
    localStorage.removeItem('authToken');
    this.setCurrentUser(null);
  }

  getUserDisplayName(): string {
    const currentUser = this.currentUserSubject.value;
    return currentUser ? currentUser.displayName : '';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  verifyEmail(token: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.apiUrl}/verify-email?token=${token}`);
  }
  
  getUserInfo(): Observable<any> {
  const token = localStorage.getItem('authToken');
  console.log('Token:', token);
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(`${this.apiUrl}/user`, {headers}).pipe(
    tap((userInfo) => {
      console.log('Fetched user info:', userInfo);
    })
  );
}

}
