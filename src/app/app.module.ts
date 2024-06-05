import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VinoListComponent } from './vino/vino-list/vino-list.component';
import { VinoEditComponent } from './vino/vino-edit/vino-edit.component';
import { VinoDetailComponent } from './vino/vino-detail/vino-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UvaListComponent } from './uva/uva-list/uva-list.component';
import { UvaEditComponent } from './uva/uva-edit/uva-edit.component';
import { UvaDetailComponent } from './uva/uva-detail/uva-detail.component';
import { TipoListComponent } from './tipo/tipo-list/tipo-list.component';
import { TipoEditComponent } from './tipo/tipo-edit/tipo-edit.component';
import { TipoDetailComponent } from './tipo/tipo-detail/tipo-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VinoListComponent,
    VinoEditComponent,
    VinoDetailComponent,
    UvaListComponent,
    UvaEditComponent,
    UvaDetailComponent,
    TipoListComponent,
    TipoEditComponent,
    TipoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
