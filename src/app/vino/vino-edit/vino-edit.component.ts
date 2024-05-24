import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { VinoService } from '../vino.service';
import { Uva } from 'src/app/uva/uva.model';
import { UvaService } from 'src/app/uva/uva.service';
import { Vino } from '../vino.model';

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
    private uvaService: UvaService,
    private http: HttpClient
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
      'id': [null, Validators.required],
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

    if (this.editMode) {
      let vino: Vino;
      this.http.get<{
        'Id' : number,
        'Nombre' : string,
        'Precio' : number,
        'Tipo' : string,
        'Region' : string,
        'Bodega' : string,
        'Anada' : number,
        'Alergenos' : string,
        'Graduacion' : number,
        'BreveDescripcion' : string,
        'Capacidad' : number,
        'Stock' : number | null
      }[]>(
        `${environment.apiUrl}vinos/${this.id}`
      )
        .subscribe({
          next: (response) => {
            vino = new Vino(
              response[0]['Id'],
              response[0]['Nombre'],
              response[0]['Precio'],
              response[0]['Region'],
              response[0]['Tipo'],
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
            nombre = vino.nombre;
            region = vino.region!;
            tipo = vino.tipo!;
            bodega = vino.bodega!;
            anada = vino.anada;
            graduacion = vino.graduacion;
            precio = vino.precio;
            capacidad = vino.capacidad;
            stock = vino.stock;
            alergenos = vino.alergenos;
            descripcion = vino.breveDescripcion;
            imagen = vino.imagen!;
            if (vino['uvas']) {
              for (const uva of vino.uvas) {
                const formUvas = this.fb.group({
                  'uva': [uva.uva, Validators.required],
                  'porcentaje': [uva.porcentaje, [
                    Validators.required,
                    Validators.pattern(/\b([1-9]|[1-9][0-9]|100)\b/)
                  ]]
                })
                this.vinoUvas.push(formUvas);
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
        })
    }
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    const newVino = this.vinoForm.value;
    if (this.editMode) {
      this.vinoService.updateVino(this.id, newVino);
    } else {
      this.vinoService.addVino(this.vinoForm);
    }
    // this.router.navigate(['..'], { relativeTo: this.route });
  }

  onAddUva() {
    (<FormArray>this.vinoForm.get('uvas')).push(
      this.fb.group({
        'uva': new FormControl(null, Validators.required),
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
