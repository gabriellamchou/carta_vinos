import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Uva } from '../uva.model';
import { UvaService } from '../uva.service';

@Component({
  selector: 'app-uva-detail',
  templateUrl: './uva-detail.component.html',
  styleUrls: ['./uva-detail.component.scss']
})
export class UvaDetailComponent implements OnInit {

  uva!: Uva;
  id!: number;

  constructor(
    private uvaService: UvaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.uvaService.getUva(this.id)
          .subscribe({
            next: (response) => {
              const uvaRes = response.data;
              this.uva = new Uva(
                uvaRes['id'],
                uvaRes['nombre'],
                uvaRes['descripcion'],
                0,
                uvaRes['acidez'],
                uvaRes['dulzor'],
                uvaRes['cuerpo'],
                uvaRes['taninos'],
                uvaRes['abv'],
              );
            }
          });
      }
    );
  }

  onDeleteUva() {
    this.uvaService.deleteUva(this.id);
    this.uvaService.uvasChanged
      .subscribe(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
  }
}
