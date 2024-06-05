import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { Vino } from './vino.model';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VinoService {

  vinosChanged = new Subject<Vino[]>();

  private listaVinos: Vino[] = []

  constructor(
    private http: HttpClient
  ) { }

  findAllVinos() {
    this.http
      .get<{ 'lista_vinos': [] }>(
        `${environment.apiUrl}vinos`
      )
      .pipe(
        map(response => {
          const responseVinos: Vino[] = [];
          for (const vino of response.lista_vinos) {
            responseVinos.push(
              new Vino(
                vino['Id'],
                vino['Nombre'],
                vino['Precio'],
                vino['Region'],
                {
                  id: vino['TipoId'],
                  nombre: vino['TipoNombre'],
                  descripcion: vino['TipoDescripcion']
                },
                {
                  id: vino['BodegaId'],
                  nombre: vino['BodegaNombre'],
                  descripcion: vino['BodegaDescripcion']
                },
                vino['Anada'],
                vino['Alergenos'],
                vino['Graduacion'],
                vino['BreveDescripcion'],
                vino['Capacidad'],
                vino['Stock'],
                {
                  imgAnv: null,
                  imgRev: null,
                  imgDet: null,
                },
                null
              )
            );
            this.listaVinos = responseVinos;
          }
        })
      )
      .subscribe(
        { next: () => this.vinosChanged.next(this.listaVinos)}
      );
  }

  getListaVinos() {
    return this.listaVinos;
  }

  getVino(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}vinos/${id}`
    )
  }

  addVino(vinoForm: FormGroup<any>) {
    const form = new FormData();
    const formData = vinoForm.value;
    Object.keys(formData).forEach((key) => {
      if (key !== 'imagenes' && key !== 'uvas') {
        form.append(key, formData[key]);
      } else if (key === 'imagenes') {
        Object.keys(formData[key]).forEach((imgKey) => {
          form.append(`imagenes[${imgKey}]`, formData[key][imgKey]);
        });
      } else if (key === 'uvas') {
        formData[key].forEach((uva: any, index: number) => {
          form.append(`uvas[${index}][id]`, uva.id);
          form.append(`uvas[${index}][porcentaje]`, uva.porcentaje);
        });
      }
    });
    this.http.post(
      `${environment.apiUrl}vinos/nuevo`,
      form
    )
      .subscribe({
        next: () => {  
          this.findAllVinos();
        },
        error: (error) => { console.error(error) }
      })
  }

  updateVino(id: number, modVino: FormGroup<any>) {
    const form = new FormData();
    const formData = modVino.value;

    // Añade todos los campos de texto al FormData
    Object.keys(formData).forEach((key) => {
      if (key !== 'imagenes' && key !== 'uvas') {
        form.append(key, formData[key]);
      } else if (key === 'imagenes') {
        Object.keys(formData[key]).forEach((imgKey) => {
          form.append(`imagenes[${imgKey}]`, formData[key][imgKey]);
        });
      } else if (key === 'uvas') {
        formData[key].forEach((uva: any, index: number) => {
          form.append(`uvas[${index}][id]`, uva.id);
          form.append(`uvas[${index}][porcentaje]`, uva.porcentaje);
        });
      }
    });

    this.http.post(
      `${environment.apiUrl}vinos/${id}/editar`,
      form
    )
    .subscribe({
      next: () => {
        this.findAllVinos();
      }
    });
  }

  deleteVino(id: number) {
    return this.http
      .delete(
        `${environment.apiUrl}vinos/${id}/eliminar`
      )
      .subscribe({
        next: () => {
          this.findAllVinos();
        }
      });
  }
}
