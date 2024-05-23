import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    let tipo: string = "";
    let bodega: string = "";
    let anada: number | null = null;
    let graduacion: number | null = null;
    let precio: number | null = null;
    let capacidad: number | null = null;
    let stock: number | null = null;
    let alergenos: string = "";
    let descripcion: string = "";
    let imagen: string = "";
    let vinoUvas = this.fb.array([]);

    this.vinoForm = this.fb.group({
      'id': new FormControl(this.id),
      'nombre': new FormControl(nombre),
      'region': new FormControl(region),
      'tipo': new FormControl(tipo),
      'bodega': new FormControl(bodega),
      'anada': new FormControl(anada),
      'graduacion': new FormControl(graduacion),
      'precio': new FormControl(precio),
      'capacidad': new FormControl(capacidad),
      'stock': new FormControl(stock),
      'alergenos': new FormControl(alergenos),
      'descripcion': new FormControl(descripcion),
      'imagen': new FormControl(imagen),
      'uvas': vinoUvas
    });

    if (this.editMode) {
      const vino = this.vinoService.getVino(this.id)!;
      nombre = vino.nombre;
      region = vino.region;
      tipo = vino.tipo;
      bodega = vino.bodega;
      anada = vino.anada;
      graduacion = vino.graduacion;
      precio = vino.precio;
      capacidad = vino.capacidad;
      stock = vino.stock;
      alergenos = vino.alergenos;
      descripcion = vino.breveDescripcion;
      imagen = vino.imagen;
      if (vino['uvas']) {
        for (const uva of vino.uvas) {
          const formUvas = this.fb.group({
            'uva' : [uva.uva, Validators.required],
            'porcentaje' : [uva.porcentaje, [
              Validators.required,
              Validators.pattern(/\b([1-9]|[1-9][0-9]|100)\b/)
            ]]
          })
          this.vinoUvas.push(formUvas);
        }
      }
    }
    this.vinoForm = this.fb.group({
      'id': [this.id, Validators.required],
      'nombre': [nombre, Validators.required],
      'region': [region, Validators.required],
      'tipo': [tipo, Validators.required],
      'bodega': [bodega, Validators.required],
      'anada': [anada, Validators.required],
      'graduacion': [graduacion, Validators.required],
      'precio': [precio, Validators.required],
      'capacidad': capacidad,
      'stock': stock,
      'alergenos': [alergenos, Validators.required],
      'breveDescripcion': [descripcion, Validators.required],
      'imagen': [imagen, Validators.required],
      'uvas': vinoUvas
    });
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    const newVino = this.vinoForm.value;
    if (this.editMode) {
      this.vinoService.updateVino(this.id, newVino);
    } else {
      this.vinoService.addVino(newVino);
    }
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  onAddUva() {
    (<FormArray>this.vinoForm.get('uvas')).push(
      this.fb.group({
        'uva': new FormControl(null, Validators.required),
        'porcentaje' : new FormControl(null, [
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
