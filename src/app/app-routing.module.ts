import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VinoListComponent } from './vino/vino-list/vino-list.component';
import { VinoEditComponent } from './vino/vino-edit/vino-edit.component';
import { VinoNewComponent } from './vino/vino-new/vino-new.component';
import { VinoDetailComponent } from './vino/vino-detail/vino-detail.component';

const routes: Routes = [
  { path: 'vinos', component: VinoListComponent },
  { path: 'vinos/:id', component: VinoDetailComponent },
  { path: 'vinos/:id/editar', component: VinoEditComponent },
  { path: 'vinos/nuevo', component: VinoNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
