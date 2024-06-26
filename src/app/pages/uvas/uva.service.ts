import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Uva } from './uva.model';

@Injectable({
  providedIn: 'root'
})
export class UvaService {

  private listaUvas: Uva[] = [];
  uvasChanged = new Subject<void>();

  constructor(
    private http: HttpClient
  ) { }

  findAllUvas() {
    return this.http
      .get<{ 'lista_uvas': [] }>(
        `${environment.apiUrl}uvas`
      )
      .pipe(
        tap(response => this.listaUvas = response.lista_uvas)
      );
  }

  getListaUvas() {
    return this.listaUvas;
  }

  getUva(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}uvas/${id}`
    );
  }

  addUva(uvaForm: FormGroup) {
    const form = new FormData();
    const formData = uvaForm.value;
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    this.http.post(
      `${environment.apiUrl}uvas/nueva`,
      form
    )
      .subscribe({
        next: () => { 
          this.uvasChanged.next();
        },
        error: (error) => { console.error(error) }
      })
  }

  updateUva(id: number, modUva: FormGroup) {
    const formData = modUva.value;
    this.http.put(
      `${environment.apiUrl}uvas/${id}/editar`,
      formData
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.uvasChanged.next();
      }
    });
  }

  deleteUva(id: number) {
    this.http
      .delete(
        `${environment.apiUrl}uvas/${id}/eliminar`
      )
      .subscribe({
        next: () => {
          this.uvasChanged.next();
        }
      });
  }
}
