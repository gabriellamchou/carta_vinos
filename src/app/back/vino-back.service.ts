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
    private http: HttpClient,
    private vinoService: VinoService
  ) { }

  vinoSave(vino: Vino): Observable<Vino> {
    return this.http
      .post<Vino>(
        `${environment.apiUrl}vino`,
        vino
      )
  }

}
