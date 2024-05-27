import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Vino } from '../vino.model';
import { VinoService } from '../vino.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Tipo } from 'src/app/tipo/tipo.model';

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
              this.vino = new Vino(
                response[0]['Id'],
                response[0]['Nombre'],
                response[0]['Precio'],
                response[0]['Region'],
                { 
                  id: response[0]['TipoId'], 
                  nombre: response[0]['TipoNombre'], 
                  descripcion: response[0]['TipoDescripcion']
                },
                response[0]['Bodega'],
                response[0]['Anada'],
                response[0]['Alergenos'],
                response[0]['Graduacion'],
                response[0]['BreveDescripcion'],
                response[0]['Capacidad'],
                response[0]['Stock'],
                '',
                null
              );
              console.log(this.vino);
              console.log(response);
              
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
