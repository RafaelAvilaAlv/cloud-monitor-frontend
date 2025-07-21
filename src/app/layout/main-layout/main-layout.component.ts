import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 👈 importa esto

@Component({
  selector: 'app-main-layout',
  standalone: true, // si estás usando standalone (seguro que sí)
  imports: [RouterOutlet], // 👈 agrega aquí el RouterOutlet
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {}
