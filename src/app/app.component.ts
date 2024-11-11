import { Component } from '@angular/core';  
import { RouterOutlet } from '@angular/router';  
import { NavbarComponent } from './navbar/navbar.component';  
import { RouterModule } from '@angular/router'; // Agrega esto  

@Component({  
  selector: 'app-root',  
  standalone: true,  
  imports: [RouterOutlet, NavbarComponent, RouterModule], // Asegúrate de que RouterModule esté aquí  
  template: `  
    <navbar></navbar> <!-- Agrega el navbar aquí -->  
    <router-outlet></router-outlet> <!-- Esto es necesario para mostrar las rutas -->  
  `,  
})  
export class AppComponent {  
  title = 'gatito-app';  
}