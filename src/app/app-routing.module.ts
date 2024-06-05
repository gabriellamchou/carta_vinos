import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VinoListComponent } from './vino/vino-list/vino-list.component';
import { VinoEditComponent } from './vino/vino-edit/vino-edit.component';
import { VinoDetailComponent } from './vino/vino-detail/vino-detail.component';
import { UvaDetailComponent } from './uva/uva-detail/uva-detail.component';
import { UvaEditComponent } from './uva/uva-edit/uva-edit.component';
import { UvaListComponent } from './uva/uva-list/uva-list.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
