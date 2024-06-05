import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { VinoService } from '../vino.service';
import { Vino } from '../vino.model';

@Component({
  selector: 'app-vino-list',
  templateUrl: './vino-list.component.html',
  styleUrls: ['./vino-list.component.css']
})
export class VinoListComponent implements OnInit {
  listaVinos!: Vino[];

  constructor(
    private vinoService: VinoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.vinoService.findAllVinos();
    this.vinoService.vinosChanged
      .subscribe({
        next: (vinos) => {
          this.listaVinos = vinos;
        }
      })
  }

  onDeleteVino(id: number) {
    this.http
      .delete(
        `${environment.apiUrl}vinos/${id}/eliminar`
      )
      .subscribe(() => {
        this.vinoService.deleteVino(id);
      }
      )
  }

}
