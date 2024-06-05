import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { VinoService } from '../vino.service';
import { Uva } from 'src/app/uva/uva.model';
import { UvaService } from 'src/app/uva/uva.service';
import { environment } from 'src/environments/environment';
import { Bodega } from 'src/app/bodega/bodega.model';
import { BodegaService } from 'src/app/bodega/bodega.service';
import { Region } from 'src/app/region/region.model';
import { RegionService } from 'src/app/region/region.service';
import { Tipo } from 'src/app/tipo/tipo.model';
import { TipoService } from 'src/app/tipo/tipo.service';

@Component({
  selector: 'app-vino-edit',
  templateUrl: './vino-edit.component.html',
  styleUrls: ['./vino-edit.component.css']
})
export class VinoEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  heading = 'Nuevo vino';
  vinoForm!: FormGroup;
  listaUvas!: Uva[];
  listaRegiones!: Region[];
  listaBodegas!: Bodega[];
  listaTipos!: Tipo[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private vinoService: VinoService,
    private uvaService: UvaService,
    private regionService: RegionService,
    private bodegaService: BodegaService,
    private tipoService: TipoService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          if (params['id'] != null) {
            this.id = +params['id'];
            this.editMode = true;
            this.heading = 'Editar vino';
          }
          this.initForm();
        }
      )

    this.uvaService.findAllUvas().subscribe({
      next: (response) => {
        this.listaUvas = response.lista_uvas;
      },
      error: (err) => {
        console.error('Error obteniendo uvas: ', err);
      }
    });

    this.regionService.findAllRegiones().subscribe({
      next: (response) => {
        this.listaRegiones = response.lista_regiones;
      },
      error: (err) => {
        console.error('Error obteniendo regiones: ', err);
      }
    });

    this.bodegaService.findAllBodegas().subscribe({
      next: (response) => {
        this.listaBodegas = response.lista_bodegas;
      },
      error: (err) => {
        console.error('Error obteniendo bodegas: ', err);
      }
    });

    this.tipoService.findAllTipos().subscribe({
      next: (response) => {
        this.listaTipos = response.lista_tipos;
      },
      error: (err) => {
        console.error('Error obteniendo tipos: ', err);
      }
    });

  }

  private initForm() {
    this.vinoForm = this.fb.group({
      'id': [null],
      'nombre': ['', Validators.required],
      'region': [null, Validators.required],
      'tipo': [null, Validators.required],
      'bodega': [null, Validators.required],
      'anada': [null, Validators.required],
      'graduacion': [null, Validators.required],
      'precio': [null, Validators.required],
      'capacidad': null,
      'stock': null,
      'alergenos': ['', Validators.required],
      'breveDescripcion': ['', Validators.required],
      'imagenes': this.fb.group({
        'imgAnv': '',
        'imgRev': '',
        'imgDet': ''
      }),
      'uvas': this.fb.array([])
    });

    if (this.editMode) {
      this.vinoService.getVino(this.id)
        .subscribe({
          next: (response) => {
            const vinoRes = response.data;
            const imagenes = {
              imgAnv: vinoRes['Imagenes'][0],
              imgRev: vinoRes['Imagenes'][1],
              imgDet: vinoRes['Imagenes'][2]
            }
            while (this.vinoUvas.length !== 0) {
              this.vinoUvas.removeAt(0);
            }
            if (vinoRes['Uvas']) {
              for (const uva of vinoRes['Uvas']) {
                const formUvas = this.fb.group({
                  'id': [uva.Id, Validators.required],
                  'porcentaje': [uva.Porcentaje, [
                    Validators.required,
                    Validators.pattern(/\b([1-9]|[1-9][0-9]|100)\b/)
                  ]]
                });
                this.vinoUvas.push(formUvas);
              }
            }
            this.vinoForm.patchValue({
              'id': this.id,
              'nombre': vinoRes['Nombre'],
              'region': vinoRes['RegionId'],
              'tipo': vinoRes['TipoId'],
              'bodega': vinoRes['BodegaId'],
              'anada': vinoRes['Anada'],
              'graduacion': vinoRes['Graduacion'],
              'precio': vinoRes['Precio'],
              'capacidad': vinoRes['Capacidad'],
              'stock': vinoRes['Stock'],
              'alergenos': vinoRes['Alergenos'],
              'breveDescripcion': vinoRes['BreveDescripcion'],
              'imagenes': {
                'imgAnv': imagenes.imgAnv,
                'imgRev': imagenes.imgRev,
                'imgDet': imagenes.imgDet
              }
            });
          },
          error: (error) => {
            console.error('Error al obtener el vino:', error);
          }
        })
    }
  }

  onFileChange(event: any, imageType: string) {
    const file = event.target.files[0];
    if (file) {
      this.vinoForm.patchValue({
        imagenes: {
          [imageType]: file
        }
      });
    }
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    if (this.editMode) {
      this.vinoService.updateVino(this.id, this.vinoForm);
    } else {
      this.vinoService.addVino(this.vinoForm);
    }
    this.location.back();
  }

  onAddUva() {
    (<FormArray>this.vinoForm.get('uvas')).push(
      this.fb.group({
        'id': new FormControl(null, Validators.required),
        'porcentaje': new FormControl(null, [
          Validators.required,
          Validators.pattern(/\b([1-9]|[1-9][0-9]|100)\b/)
        ])
      })
    )
  }

  onDeleteUva(index: number) {
    (<FormArray>this.vinoForm.get('uvas')).removeAt(index);
  }

  get vinoUvas() {
    return this.vinoForm.controls['uvas'] as FormArray;
  }

  get controls() {
    return (<FormArray>this.vinoForm.get('uvas')).controls;
  }
}
