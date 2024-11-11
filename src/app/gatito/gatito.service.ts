import { Injectable } from '@angular/core';  
import { Observable } from 'rxjs';  
import { HttpClient } from "@angular/common/http";  

@Injectable({  
  providedIn: 'root',  
})  
export class GatitoService {  

  private url: string = 'http://localhost:8080/api/gatitos';  
  constructor(private http: HttpClient) { }  

  findAll(): Observable<any[]> {  
    return this.http.get<any[]>('http://localhost:8080/api/gatitos');  
  }  

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);  
  }  

  create(registro: any): Observable<any> {   
    return this.http.post<any>(this.url, registro);  
  }  

  update(registro: any): Observable<any> {   
    return this.http.put<any>(`${this.url}/${registro.id}`, registro);  
  }  

  remove(id: number): Observable<void> {  
    return this.http.delete<void>(`${this.url}/${id}`);  
  }  
}

