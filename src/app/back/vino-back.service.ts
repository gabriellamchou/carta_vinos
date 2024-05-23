import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { VinoService } from '../vino/vino.service';
import { Vino } from '../vino/vino.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VinoBackService {

  constructor(
    private http: HttpClient
  ) { }

  vinoSave(vino: Vino) {
    this.http
      .post<Vino>(
        `${environment.apiUrl}vinos/nuevo`,
        vino
      )
      .subscribe(
        response => console.log(response)
      )
  }

}
