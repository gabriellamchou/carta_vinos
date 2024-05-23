import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Vino } from './vino.model';
import { UvaService } from '../uva/uva.service';
import { environment } from 'src/environments/environment';
import { VinoBackService } from '../back/vino-back.service';

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
                vino['Tipo'],
                vino['Bodega'],
                vino['Anada'],
                vino['Alergenos'],
                vino['Graduacion'],
                vino['BreveDescripcion'],
                vino['Capacidad'],
                vino['Stock'],
                '',
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

  addVino(vino: Vino) {
    // this.listaVinos.push(vino);
    this.http.post<Vino>(
      `${environment.apiUrl}vino`,
        vino
    )
    .subscribe(
      response => console.log(response)
    )
  }

  updateVino(id: number, newVino: Vino) {
    const target = this.getVino(id)!;
    Object.assign(target, newVino);
  }

  deleteVino(id: number) {
    const index = this.listaVinos.indexOf(this.getVino(id)!);
    this.listaVinos.splice(index, 1);
  }
}
