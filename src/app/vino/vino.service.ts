import { Injectable } from '@angular/core';
import { Vino } from './vino.model';

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
      null
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
      null
    )
  ];

  getListaVinos() {
    return this.listaVinos;
  }

  getVino(id: number) {
    return this.listaVinos.find(
      (vino) => vino.id === id
    );
  }

  constructor() { }
}
