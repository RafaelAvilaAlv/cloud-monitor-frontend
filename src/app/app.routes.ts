import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';

//import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUsuarioComponent } from './dashboard-usuario/dashboard-usuario.component';
import { CrearServicioComponent } from './pages/crear-servicio/crear-servicio.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)},
 // {path: 'dashboard-admin',loadComponent: () => import('./dashboard-admin/dashboard-admin.component').then(m => m.DashboardAdminComponent)},
  {path: 'dashboard-usuario',loadComponent: () => import('./dashboard-usuario/dashboard-usuario.component').then(m => m.DashboardUsuarioComponent)},
  {path: 'crear-servicio', component: CrearServicioComponent},
  {path: '**',redirectTo: 'login'}
];

export const appRoutingProviders = [
  provideRouter(routes)
];
