import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica si el usuario está autenticado en memoria
  if (authService.estaAutenticado()) {
    return true;
  } else {
    
    // Redirige al login si no está autenticado
    router.navigate(['/login']);
    return false;
  }
};
