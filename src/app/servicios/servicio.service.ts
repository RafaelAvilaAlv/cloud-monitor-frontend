import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private apiURL = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  private obtenerCabecerasAutenticadas(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  obtenerServiciosUsuario(): Observable<any> {
    const headers = { headers: this.obtenerCabecerasAutenticadas() };
    return this.http.get(`${this.apiURL}/services`, headers);
  }
}
