import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment.prod.ts.component';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceTsComponent {
  private apiUrl = `${environment.apiUrl}/api/auth`; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Sign Up
  signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {
      username,
      email,
      password,
    });
  }

  // Sign In
  signIn(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password });
  }
}
