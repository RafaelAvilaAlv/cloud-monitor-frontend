import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  registrarse() {
    if (this.formularioRegistro.invalid) return;

    const nuevoUsuario = {
      nombre: this.formularioRegistro.value.nombre,
      email: this.formularioRegistro.value.correo,
      password: this.formularioRegistro.value.contrasena
    };

    this.authService.registro(nuevoUsuario).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ahora puede iniciar sesión.',
          timer: 2500,
          showConfirmButton: false
        });

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2500);
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Registro fallido',
          text: 'Ya existe un usuario con ese correo.',
        });
      }
    });
  }
}
