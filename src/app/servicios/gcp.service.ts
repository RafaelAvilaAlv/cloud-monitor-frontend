import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GcpService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getGCPInstances(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/cloud/gcp/instances`, { headers });
  }
}
