import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {}

  login(credenciales: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credenciales).pipe(
      tap(res => {
        if (res.token) {
          // ✅ Guardar token
          localStorage.setItem('token', res.token);

          // ✅ Decodificar token para obtener el ID del usuario
          const decoded: any = jwtDecode(res.token);
          console.log('Token decodificado:', decoded);

          // ✅ Guardar el ID en localStorage
          if (decoded.id) {
            localStorage.setItem('id', decoded.id.toString());
          }
        }
      })
    );
  }
registro(usuario: { nombre: string; email: string; password: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/register`, usuario);
}

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }

  obtenerRol(): string | null {
    const token = this.obtenerToken();
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.rol || null;
  }

  obtenerIdUsuario(): number | null {
    const token = this.obtenerToken();
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    return decoded.id || null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id'); // ✅ Elimina también el ID
    this.router.navigate(['/login']);
  }
}
