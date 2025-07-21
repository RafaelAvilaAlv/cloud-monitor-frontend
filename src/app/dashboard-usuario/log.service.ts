import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Log {
  ID?: number;
  ServiceID: number;
  Message: string;
  Level: string;
  Timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private baseUrl = 'http://localhost:8080/logs'; // ajusta si tu endpoint es diferente

  constructor(private http: HttpClient) {}

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.baseUrl);
  }
getLogsByServiceId(serviceId: number): Observable<Log[]> {
  return this.http.get<Log[]>(`http://localhost:8080/logs?service_id=${serviceId}`);
}

  getLogById(id: number): Observable<Log> {
    return this.http.get<Log>(`${this.baseUrl}/${id}`);
  }

  createLog(log: Log): Observable<Log> {
    return this.http.post<Log>(this.baseUrl, log);
  }

  updateLog(id: number, log: Log): Observable<Log> {
    return this.http.put<Log>(`${this.baseUrl}/${id}`, log);
  }

  deleteLog(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
