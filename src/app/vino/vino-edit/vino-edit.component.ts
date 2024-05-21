import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { VinoService } from '../vino.service';
import { Uva } from 'src/app/uva/uva.model';
import { UvaService } from 'src/app/uva/uva.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private vinoService: VinoService,
    private fb: FormBuilder,
    private uvaService: UvaService
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
    this.listaUvas = this.uvaService.getListaUvas();
  }

  private initForm() {
    let nombre: string = "";
    let region: string = "";
    let bodega: string = "";
    let anada: number | null = null;
    let graduacion: number | null = null;
    let precio: number | null = null;
    let capacidad: number | null = null;
    let stock: number | null = null;
    let alergenos: string = "";
    let descripcion: string = "";

    if (this.editMode) {
      const vino = this.vinoService.getVino(this.id)!;
      nombre = vino.nombre;
      region = vino.region;
      bodega = vino.bodega;
      anada = vino.anada;
      graduacion = vino.graduacion;
      precio = vino.precio;
      capacidad = vino.capacidad;
      stock = vino.stock;
      alergenos = vino.alergenos;
      descripcion = vino.breveDescripcion;
    }

    this.vinoForm = this.fb.group({
      'id': new FormControl(this.id),
      'nombre': new FormControl(nombre),
      'region': new FormControl(region),
      'bodega': new FormControl(bodega),
      'anada': new FormControl(anada),
      'graduacion': new FormControl(graduacion),
      'precio': new FormControl(precio),
      'capacidad': new FormControl(capacidad),
      'stock': new FormControl(stock),
      'alergenos': new FormControl(alergenos),
      'descripcion': new FormControl(descripcion)
    });
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    console.log(this.vinoForm);
  }

  get vinoUvas() {
    return this.vinoForm.controls['uvas'] as FormArray;
  }

  get controls() {
    return (<FormArray>this.vinoForm.get('uvas')).controls;
  }

}
