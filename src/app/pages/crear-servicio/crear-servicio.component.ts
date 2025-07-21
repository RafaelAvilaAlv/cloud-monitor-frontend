import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-servicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-servicio.component.html',
})
export class CrearServicioComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.formulario = this.fb.group({
      name: ['', Validators.required],
      cloud: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  registrarServicio() {
    const userId = Number(localStorage.getItem('user_id'));
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire('Error', 'Token no encontrado. Inicia sesión nuevamente.', 'error');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const servicio = {
      name: this.formulario.value.name,
      cloud: this.formulario.value.cloud,
      url: this.formulario.value.url,
      user_id: userId
    };

    console.log('Servicio a enviar:', servicio);

    this.http.post('http://localhost:8080/services', servicio, { headers }).subscribe({
      next: (res: any) => {
        console.log('Respuesta al crear servicio:', res);

        const serviceId = res.ID;  // Corrección: usar ID mayúscula

        if (!serviceId) {
          Swal.fire('Error', 'No se recibió el ID del servicio creado', 'error');
          return;
        }

        const log = {
  ServiceID: serviceId,  // Mayúscula en S y I
  message: 'Servicio creado',
  level: 'INFO',
  timestamp: new Date().toISOString()
};


        this.http.post('http://localhost:8080/logs', log, { headers }).subscribe({
          next: () => {
            console.log('Log creado correctamente');
            Swal.fire('Éxito', 'Servicio y log creados correctamente', 'success');
            this.router.navigate(['/dashboard-usuario']);
          },
          error: (err) => {
            console.error('Error al crear el log:', err);
            Swal.fire('Error', 'No se pudo crear el log del servicio', 'error');
            this.router.navigate(['/dashboard-usuario']);
          }
        });
      },
      error: (err) => {
        console.error('Error al registrar servicio:', err);
        Swal.fire('Error', 'No se pudo registrar el servicio', 'error');
      }
    });
  }
}
