import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Vino } from '../vino.model';
import { VinoService } from '../vino.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.http.get<any[]>(
          `${environment.apiUrl}vinos/${this.id}`
        )
          .subscribe({
            next: (response) => {
              const vinoRes = response[0];
              this.vino = new Vino(
                vinoRes['Id'],
                vinoRes['Nombre'],
                vinoRes['Precio'],
                { 
                  id: vinoRes['RegionId'], 
                  nombre: vinoRes['RegionNombre'], 
                  pais: vinoRes['RegionPais'], 
                  descripcion: vinoRes['RegionDescripcion']
                },
                { 
                  id: vinoRes['TipoId'], 
                  nombre: vinoRes['TipoNombre'], 
                  descripcion: vinoRes['TipoDescripcion']
                },
                { 
                  id: vinoRes['BodegaId'], 
                  nombre: vinoRes['BodegaNombre'], 
                  descripcion: vinoRes['BodegaDescripcion']
                },
                vinoRes['Anada'],
                vinoRes['Alergenos'],
                vinoRes['Graduacion'],
                vinoRes['BreveDescripcion'],
                vinoRes['Capacidad'],
                vinoRes['Stock'],
                {
                  imgAnv: vinoRes['Imagenes'][0],
                  imgRev: vinoRes['Imagenes'][1],
                  imgDet: vinoRes['Imagenes'][2],
                },
                null
              );
              console.log(vinoRes);
              
            }
        })
      }
    );
  }

  onDeleteVino() {
    this.http
      .delete(
        `${environment.apiUrl}vinos/${this.id}/eliminar`
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.vinoService.deleteVino(this.id);
          this.router.navigate(['..'], {relativeTo: this.route})
        }
      )
  }

}
