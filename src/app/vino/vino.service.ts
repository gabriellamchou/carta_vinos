import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Vino } from './vino.model';
import { UvaService } from '../uva/uva.service';
import { environment } from 'src/environments/environment';
import { VinoBackService } from '../back/vino-back.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VinoService {

  vinosChanged = new Subject<Vino[]>();

  private listaVinos: Vino[] = []

  constructor(
    private uvaService: UvaService,
    private http: HttpClient
  ) { }

  findAllVinos() {
    return this.http
      .get<{ 'lista_vinos': [] }>(
        `${environment.apiUrl}vinos`
      )
      .subscribe({
        next: (response) => {
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
                  imgAnv: '',
                  imgRev: '',
                  imgDet: '',
                },
                null
              )
            );
          }
          this.setListaVinos(responseVinos);
        }
      })
  }

  pruebaGet() {
    return this.http
      .get(
        `${environment.apiUrl}prueba-get`
      )
  }

  getListaVinos() {
    return this.listaVinos;
  }

  setListaVinos(vinos: Vino[]) {
    this.listaVinos = vinos;
    this.vinosChanged.next(this.listaVinos);
  }

  getVino(id: number) {
    return this.listaVinos.find(
      (vino) => vino.id === id
    );
  }

  addVino(vinoForm: FormGroup<any>) {
    const form = new FormData();
    const formData = vinoForm.value;
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    })
    this.http.post(
      `${environment.apiUrl}vinos/nuevo`,
        form
    )
    .subscribe(
      response => console.log(response)
    )
  }

  updateVino(id: number, modVino: Vino) {
    this.http.put(
      `${environment.apiUrl}vinos/${id}/editar`,
      modVino
    )
    .subscribe(
      response => console.log(response)
    )
  }

  deleteVino(id: number) {
    const index = this.listaVinos.indexOf(this.getVino(id)!);
    this.listaVinos.splice(index, 1);
  }
}
