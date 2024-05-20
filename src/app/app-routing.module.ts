import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VinoListComponent } from './vino/vino-list/vino-list.component';
import { VinoEditComponent } from './vino/vino-edit/vino-edit.component';
import { VinoDetailComponent } from './vino/vino-detail/vino-detail.component';

const routes: Routes = [
  { path: '', component: VinoListComponent },
  { path: 'vinos', component: VinoListComponent },
  { path: 'vinos/nuevo', component: VinoEditComponent },
  { path: 'vinos/:id', component: VinoDetailComponent },
  { path: 'vinos/:id/editar', component: VinoEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
