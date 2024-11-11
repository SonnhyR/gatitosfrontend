import { Component, OnInit } from '@angular/core';  
import { GatitoService } from './gatito.service';  
import { ActivatedRoute } from '@angular/router';  
import { FormsModule, NgForm } from '@angular/forms';  
import { CommonModule } from '@angular/common'; // Importa CommonModule  

@Component({  
  selector: 'gatito',  
  standalone: true,  
  imports: [FormsModule, CommonModule], // Añade CommonModule aquí  
  templateUrl: './gatito.component.html',  
  styleUrls: ['./gatito.component.css'],  
})  
export class GatitoComponent implements OnInit {  
  
  gatitoData: any = {};   
  gatitos: any[] = [];  // Arreglo para almacenar la lista de gatitos  
  isEditMode: boolean = false;  
  gatitoId: number | null = null;  

  constructor (  
    private route: ActivatedRoute,  
    private service: GatitoService  
  ) { }  

  ngOnInit(): void {  
    this.route.paramMap.subscribe(params => {  
      this.gatitoId = +params.get('id')!;  
      if (this.gatitoId) {  
        this.isEditMode = true;  
        this.loadGatito(this.gatitoId);  
      }  
    });  
    this.loadGatitos(); // Cargar la lista de gatitos al iniciar  
  }  

  loadGatito(id: number): void {  
    this.service.findById(id).subscribe(  
      (gatito: any) => {  
        this.gatitoData = gatito;  
      },  
      error => {  
        console.error('Error al cargar el gatito', error);  
      }  
    );  
  }  

  loadGatitos(): void {  
    this.service.findAll().subscribe(  
      (gatitos: any[]) => {  
        this.gatitos = gatitos;  // Asignar la lista de gatitos  
      },  
      error => {  
        console.error('Error al cargar la lista de gatitos', error);  
      }  
    );  
  }  

  onSubmit(gatitoForm: NgForm): void {  
    if (gatitoForm.valid) {   
      if (this.isEditMode) {  
        this.service.update(this.gatitoData).subscribe(  
          response => {  
            console.log('Gatito actualizado', response);  
            this.onClear(gatitoForm);  
            this.loadGatitos(); // Recargar la lista después de la actualización  
          },  
          error => {  
            console.error('Error al actualizar el gatito', error);  
          }  
        );  
      } else {  
        this.service.create(this.gatitoData).subscribe(  
          response => {  
            console.log('Gatito creado', response);  
            this.onClear(gatitoForm);  
            this.loadGatitos(); // Recargar la lista después de la creación  
          },  
          error => {  
            console.error('Error al crear el gatito', error);  
          }  
        );  
      }  
    }  
  }  

  onClear(gatitoForm: NgForm): void {  
    this.gatitoData = {};  
    this.isEditMode = false;   
    gatitoForm.reset();  
    gatitoForm.resetForm();  
  }  
  
  remove(id: number): void {  
    if (confirm('¿Estás seguro de que deseas eliminar este gatito?')) {  
      this.service.remove(id).subscribe(  
        () => {  
          console.log('Gatito eliminado');  
          this.loadGatitos(); // Recargar la lista después de la eliminación  
        },  
        error => {  
          console.error('Error al eliminar el gatito', error);  
        }  
      );  
    }  
  }  
}