import { NgModule } from '@angular/core';  
import { RouterModule, Routes } from '@angular/router';  
import { GatitoComponent } from './gatito/gatito.component';

export const routes: Routes = [  
  { path: '', redirectTo: '/gatitos', pathMatch: 'full' },  
  { path: 'gatitos', component: GatitoComponent },  
  // Otras rutas pueden ir aquí  
];

