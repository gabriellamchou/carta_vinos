import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VinoComponent } from './vino/vino.component';
import { HeaderComponent } from './header/header.component';
import { VinoListComponent } from './vino/vino-list/vino-list.component';
import { VinoEditComponent } from './vino/vino-edit/vino-edit.component';
import { VinoNewComponent } from './vino/vino-new/vino-new.component';
import { VinoDetailComponent } from './vino/vino-detail/vino-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    VinoComponent,
    HeaderComponent,
    VinoListComponent,
    VinoEditComponent,
    VinoNewComponent,
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
