import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { BodegaDetailComponent } from './pages/bodegas/bodega-detail/bodega-detail.component';
import { BodegaEditComponent } from './pages/bodegas/bodega-edit/bodega-edit.component';
import { BodegaListComponent } from './pages/bodegas/bodega-list/bodega-list.component';
import { HomeComponent } from './pages/home/home.component';
import { RegionDetailComponent } from './pages/regiones/region-detail/region-detail.component';
import { RegionEditComponent } from './pages/regiones/region-edit/region-edit.component';
import { RegionListComponent } from './pages/regiones/region-list/region-list.component';
import { TipoDetailComponent } from './pages/tipos/tipo-detail/tipo-detail.component';
import { TipoEditComponent } from './pages/tipos/tipo-edit/tipo-edit.component';
import { TipoListComponent } from './pages/tipos/tipo-list/tipo-list.component';
import { UvaDetailComponent } from './pages/uvas/uva-detail/uva-detail.component';
import { UvaEditComponent } from './pages/uvas/uva-edit/uva-edit.component';
import { UvaListComponent } from './pages/uvas/uva-list/uva-list.component';
import { VinoDetailComponent } from './pages/vinos/vino-detail/vino-detail.component';
import { VinoEditComponent } from './pages/vinos/vino-edit/vino-edit.component';
import { VinoListComponent } from './pages/vinos/vino-list/vino-list.component';

const routes: Routes = [
  // Home
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Vinos
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
  { path: 'auth', component: AuthComponent },
  // Otros
  { path: '**', redirectTo: '/vinos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
