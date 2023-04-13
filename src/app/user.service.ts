import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${userId}`);
  }

  updateUserProfile(userId: number, updatedProfileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${userId}`, updatedProfileData);
  }
}
