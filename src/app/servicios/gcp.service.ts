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


  createInstance(instanceName: string): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  // ✅ URL ajustada para coincidir con el backend
  return this.http.post(`${this.apiUrl}/gcp/instance/${instanceName}`, {}, { headers });
}

stopInstance(instanceName: string): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  // ✅ También ajustado a la ruta registrada
  return this.http.post(`${this.apiUrl}/gcp/instance/${instanceName}/stop`, {}, { headers });
}

}
