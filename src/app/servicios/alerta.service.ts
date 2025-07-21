import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alerta {
  id?: number;
  service_id: number;
  message: string;
  active: boolean;
  tipo: string;
  severidad: string;
  fecha: string; // ISO string, ej: '2025-07-20T03:00:00Z'
}

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  private apiUrl = 'http://localhost:8080/alerts';

  constructor(private http: HttpClient) {}

  obtenerAlertas(): Observable<Alerta[]> {
    return this.http.get<Alerta[]>(this.apiUrl);
  }

  crearAlerta(alerta: Alerta): Observable<Alerta> {
    return this.http.post<Alerta>(this.apiUrl, alerta);
  }

  

  obtenerAlertaPorId(id: number): Observable<Alerta> {
    return this.http.get<Alerta>(`${this.apiUrl}/${id}`);
  }

  actualizarAlerta(id: number, alerta: Alerta): Observable<Alerta> {
    return this.http.put<Alerta>(`${this.apiUrl}/${id}`, alerta);
  }

  eliminarAlerta(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
