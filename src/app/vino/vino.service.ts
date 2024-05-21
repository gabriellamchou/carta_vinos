import { Injectable, OnInit } from '@angular/core';
import { Vino } from './vino.model';
import { UvaService } from '../uva/uva.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VinoService {

  private listaVinos: Vino[] = [
    new Vino(
      1,
      'Ultreia Saint Jacques 2021',
      11.7,
      'Bierzo',
      'Tinto',
      'Raúl Pérez Viticultor',
      2021,
      'Sulfitos',
      13.0,
      'El Ultreia Saint Jacques es uno de los mejores vinos del Bierzo y de toda España. Por muy poco dinero nos permite conocer el trabajo de un maestro como Raúl Pérez, descubrir la frutosidad y el frescor de la variedad mencía y adentrarnos en una denominación que el tiempo situará entre las más grandes, lugar que merece.',
      0.75,
      null,
      'https://cdn.vinissimus.com/img/unsafe/keep/plain/local:///prfmtgrande/vi/ultsj20_anv800_1662703943.png',
      [
        {
          'uva': this.uvaService.getUva(2)!,
          'porcentaje': 100
        }
      ]
    ),
    new Vino(
      2,
      'PSI 2021',
      11.7,
      'Ribera del Duero',
      'Tinto',
      'Dominios de Pingus',
      2021,
      'Sulfitos',
      14.0,
      'Sin duda, un vino magnífico para adentrarse en el universo personal de Peter Sisseck, uno de los elaboradores que más ha hecho por la denominación ribereña en los últimos tiempos. Un vino con el que este gran enólogo busca ofrecer un perfil de vino más fresco y frutal, sin la concentración que caracteriza a sus codiciados Flor de Pingus y Pingus.',
      0.75,
      null,
      'https://cdn.vinissimus.com/img/unsafe/keep/plain/local:///prfmtgrande/vi/psiv21m_anv800.png',
      [
        {
          'uva': this.uvaService.getUva(3)!,
          'porcentaje': 90
        },
        {
          'uva': this.uvaService.getUva(4)!,
          'porcentaje': 10
        }
      ]
    )
  ];

  constructor(
    private uvaService: UvaService,
    private http: HttpClient
  ) { }

  pruebaGet() {
    return this.http
      .get(
        `${environment.apiUrl}prueba-get`
      )
  }

  getListaVinos() {
    return this.listaVinos;
  }

  getVino(id: number) {
    return this.listaVinos.find(
      (vino) => vino.id === id
    );
  }

  addVino(vino: Vino) {
    this.listaVinos.push(vino);
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
