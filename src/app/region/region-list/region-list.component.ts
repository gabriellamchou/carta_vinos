import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegionService } from '../region.service'

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {

  listaRegiones: any;

  constructor(
    private regionService: RegionService,
    private router: Router) { }

  ngOnInit(): void {
    this.regionService.findAllRegiones()
      .subscribe({
        next: (response) => {
        this.listaRegiones = response.lista_regiones;
        this.regionService.regionesChanged
          .subscribe(() => {
            this.listaRegiones = response.lista_regiones;
          })
      }});
  }

  onDeleteTipo(id: number) {
    this.regionService.deleteRegion(id);
  }

}
