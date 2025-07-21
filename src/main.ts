import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutingProviders } from './app/app.routes';
import { tokenInterceptor } from './app/interceptors/token.interceptor'; // OJO: minúscula

bootstrapApplication(AppComponent, {
  providers: [
    appRoutingProviders,
    provideHttpClient(
      withInterceptors([tokenInterceptor])
    )
  ]
}).catch(err => console.error(err));
