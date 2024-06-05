import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VinoListComponent } from './vino/vino-list/vino-list.component';
import { VinoEditComponent } from './vino/vino-edit/vino-edit.component';
import { VinoDetailComponent } from './vino/vino-detail/vino-detail.component';
import { UvaDetailComponent } from './uva/uva-detail/uva-detail.component';
import { UvaEditComponent } from './uva/uva-edit/uva-edit.component';
import { UvaListComponent } from './uva/uva-list/uva-list.component';
import { TipoDetailComponent } from './tipo/tipo-detail/tipo-detail.component';
import { TipoEditComponent } from './tipo/tipo-edit/tipo-edit.component';
import { TipoListComponent } from './tipo/tipo-list/tipo-list.component';
import { RegionDetailComponent } from './region/region-detail/region-detail.component';
import { RegionEditComponent } from './region/region-edit/region-edit.component';
import { RegionListComponent } from './region/region-list/region-list.component';
import { BodegaListComponent } from './bodega/bodega-list/bodega-list.component';
import { BodegaEditComponent } from './bodega/bodega-edit/bodega-edit.component';
import { BodegaDetailComponent } from './bodega/bodega-detail/bodega-detail.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  // Vinos
  { path: '', component: VinoListComponent },
  { path: 'vinos', component: VinoListComponent },
  { path: 'vinos/nuevo', component: VinoEditComponent },
  { path: 'vinos/:id', component: VinoDetailComponent },
  { path: 'vinos/:id/editar', component: VinoEditComponent },
  // Uvas
  { path: 'uvas', component: UvaListComponent },
  { path: 'uvas/nueva', component: UvaEditComponent },
  { path: 'uvas/:id', component: UvaDetailComponent },
  { path: 'uvas/:id/editar', component: UvaEditComponent },
  // Tipos
  { path: 'tipos', component: TipoListComponent },
  { path: 'tipos/nuevo', component: TipoEditComponent },
  { path: 'tipos/:id', component: TipoDetailComponent },
  { path: 'tipos/:id/editar', component: TipoEditComponent },
  // Regiones
  { path: 'regiones', component: RegionListComponent },
  { path: 'regiones/nueva', component: RegionEditComponent },
  { path: 'regiones/:id', component: RegionDetailComponent },
  { path: 'regiones/:id/editar', component: RegionEditComponent },
  // Bodegas
  { path: 'bodegas', component: BodegaListComponent },
  { path: 'bodegas/nueva', component: BodegaEditComponent },
  { path: 'bodegas/:id', component: BodegaDetailComponent },
  { path: 'bodegas/:id/editar', component: BodegaEditComponent },
  // Auth
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
