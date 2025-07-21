import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AlertaService, Alerta } from '../servicios/alerta.service';
import { ServicioService } from '../servicios/servicio.service';
import { MetricService } from './metric.service';
import { Metric } from './metric.model';        // ✅ nuevo
import { Router } from '@angular/router';
import { LogService } from './log.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard-usuario.component.html',
  styleUrls: ['./dashboard-usuario.component.css']
})
export class DashboardUsuarioComponent implements OnInit {
  formularioAlerta!: FormGroup;
  alertas: Alerta[] = [];
  servicios: any[] = [];
  metrics: Metric[] = []; // ✅ nuevo
  mostrarFormularioAlerta: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertaService: AlertaService,
    private servicioService: ServicioService,
    private metricService: MetricService, // ✅ nuevo
     private logService: LogService, // ✅ nuevo
    public router: Router
  ) {}

  ngOnInit(): void {
    const fechaAhora = new Date().toISOString().substring(0, 16);

    this.formularioAlerta = this.fb.group({
      service_id: [null, Validators.required],
      message: ['', Validators.required],
      tipo: ['caida', Validators.required],
      severidad: ['media', Validators.required],
      fecha: [fechaAhora, Validators.required],
      active: [true]
    });

    this.obtenerAlertas();
    this.obtenerServicios();
    this.obtenerMetricas(); // ✅ nuevo
  }

  toggleFormularioAlerta(): void {
    this.mostrarFormularioAlerta = !this.mostrarFormularioAlerta;
  }

  obtenerAlertas(): void {
    this.alertaService.obtenerAlertas().subscribe({
      next: (data) => this.alertas = data,
      error: (err) => console.error('❌ Error al obtener alertas:', err)
    });
  }
  servicioSeleccionado: number | null = null;
logs: any[] = [];
mostrarMensajeError = false;

cargarLogsPorServicio(): void {
  this.mostrarMensajeError = false;

  if (!this.servicioSeleccionado) {
    this.mostrarMensajeError = true;
    return;
  }

  this.logService.getLogsByServiceId(this.servicioSeleccionado).subscribe({
    next: (data) => {
      this.logs = data;
      console.log('📄 Logs cargados:', data);
    },
    error: (err) => {
      console.error('❌ Error al cargar logs:', err);
      this.logs = [];
    }
  });
}



  obtenerServicios(): void {
    this.servicioService.obtenerServiciosUsuario().subscribe({
      next: (data) => {
        console.log('Servicios recibidos:', data);
        this.servicios = data;
      },
      error: (err) => console.error('❌ Error al obtener servicios:', err)
    });
  }

  obtenerMetricas(): void {
    this.metricService.getMetrics().subscribe({
      next: (data) => {
        console.log('📊 Métricas recibidas:', data);
        this.metrics = data;
      },
      error: (err) => console.error('❌ Error al obtener métricas:', err)
    });
  }

  crearAlerta(): void {
    if (this.formularioAlerta.invalid) {
      this.formularioAlerta.markAllAsTouched();
      return;
    }

    const serviceIdNum = Number(this.formularioAlerta.value.service_id);
    console.log('Service ID a enviar:', serviceIdNum);

    if (!serviceIdNum || serviceIdNum <= 0) {
      alert('Por favor, selecciona un servicio válido.');
      return;
    }

    const alertaParaCrear: Omit<Alerta, 'id'> = {
      service_id: serviceIdNum,
      message: this.formularioAlerta.value.message,
      tipo: this.formularioAlerta.value.tipo,
      severidad: this.formularioAlerta.value.severidad,
      fecha: new Date(this.formularioAlerta.value.fecha).toISOString(),
      active: this.formularioAlerta.value.active
    };

    this.alertaService.crearAlerta(alertaParaCrear).subscribe({
      next: (nuevaAlerta) => {
        this.alertas.push(nuevaAlerta);
        this.formularioAlerta.reset({
          service_id: null,
          message: '',
          tipo: 'caida',
          severidad: 'media',
          fecha: new Date().toISOString().substring(0, 16),
          active: true
        });
      },
      error: (err) => {
        console.error('❌ Error al crear alerta:', err);
        alert('Ocurrió un error al crear la alerta.');
      }
    });
  }
}
