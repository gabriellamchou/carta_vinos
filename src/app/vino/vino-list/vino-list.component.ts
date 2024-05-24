import { Component, OnInit } from '@angular/core';
import { VinoService } from '../vino.service';
import { Vino } from '../vino.model';

@Component({
  selector: 'app-vino-list',
  templateUrl: './vino-list.component.html',
  styleUrls: ['./vino-list.component.css']
})
export class VinoListComponent implements OnInit {
  listaVinos: Vino[] = [];

  constructor(
    private vinoService: VinoService
  ) { }

  ngOnInit(): void {
    // this.vinoService.pruebaGet().subscribe((response) => {
    //   console.log(response);
    // })
    this.vinoService.findAllVinos();
    this.vinoService.vinosChanged
      .subscribe({
        next: (vinos: Vino[]) => {
          this.listaVinos = vinos;
        }
      })
  }

  onDeleteVino(id: number) {
    this.vinoService.deleteVino(id);
  }

}
