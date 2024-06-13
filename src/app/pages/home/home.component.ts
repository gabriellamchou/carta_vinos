import { Component, OnInit } from '@angular/core';

import { Vino } from '../vinos/vino.model';
import { VinoService } from '../vinos/vino.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  vinosSemana: Vino[] = [];

  constructor(private vinoService: VinoService) { }

  ngOnInit(): void {
    this.vinoService.findAllVinos();
    this.vinoService.vinosChanged
      .subscribe({
        next: (vinos) => {
          this.vinosSemana = vinos.slice(-4);
        }
      });
  }

}
