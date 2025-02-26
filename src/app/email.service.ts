import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment.prod.ts.component';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = `${environment.apiUrl}/send-email`; // Use dynamic URL

  constructor(private http: HttpClient) {}

  sendEmail(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
