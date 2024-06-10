import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HeaderComponent } from './shared/header/header.component';
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
    TipoDetailComponent,
    RegionListComponent,
    RegionEditComponent,
    RegionDetailComponent,
    BodegaListComponent,
    BodegaEditComponent,
    BodegaDetailComponent,
    AuthComponent,
    HomeComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
