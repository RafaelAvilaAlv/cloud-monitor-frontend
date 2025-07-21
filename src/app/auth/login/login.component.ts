import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup;
  formularioRegistro: FormGroup;
  mensajeError: string = '';
  mensajeRegistroError: string = '';
  mostrarRegistro: boolean = false; // controla despliegue del formulario registro

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });

    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  iniciarSesion() {
    if (this.formularioLogin.invalid) return;

    const credenciales = {
      email: this.formularioLogin.value.correo,
      password: this.formularioLogin.value.contrasena
    };

    this.authService.login(credenciales).subscribe({
      next: (res) => {
        const token = res.token;
        localStorage.setItem('token', token);

        const decoded: any = jwtDecode(token);
        if (decoded.user_id) {
          localStorage.setItem('user_id', decoded.user_id);
        }

        this.router.navigate(['/dashboard-usuario']);
      },
      error: () => {
        this.mensajeError = 'Credenciales inválidas';
      }
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
        alert('¡Registro exitoso! Ahora puede iniciar sesión.');
        this.formularioRegistro.reset();
        this.mostrarRegistro = false; // oculta el formulario al registrar
      },
      error: () => {
        this.mensajeRegistroError = 'Error al registrar. Intente con otro correo.';
      }
    });
  }
}
