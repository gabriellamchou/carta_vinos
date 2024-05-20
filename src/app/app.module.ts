import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VinoListComponent } from './vino/vino-list/vino-list.component';
import { VinoEditComponent } from './vino/vino-edit/vino-edit.component';
import { VinoDetailComponent } from './vino/vino-detail/vino-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VinoListComponent,
    VinoEditComponent,
    VinoDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
