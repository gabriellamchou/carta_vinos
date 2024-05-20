import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Vino } from '../vino.model';
import { VinoService } from '../vino.service';

@Component({
  selector: 'app-vino-detail',
  templateUrl: './vino-detail.component.html',
  styleUrls: ['./vino-detail.component.css']
})
export class VinoDetailComponent implements OnInit {

  vino!: Vino;
  id!: number;

  constructor(
    private vinoService: VinoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.vino = this.vinoService.getVino(this.id)!;
      }
    );
  }

}
