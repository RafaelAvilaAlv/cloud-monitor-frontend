import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Metric } from './metric.model';

@Injectable({
  providedIn: 'root'
})
export class MetricService {
  private apiUrl = 'http://localhost:8080/metrics'; // cambia si tu backend corre en otro puerto

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<Metric[]> {
    return this.http.get<Metric[]>(this.apiUrl);
  }
}
