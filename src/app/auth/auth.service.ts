import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {}

    findAll(): Observable<User[]> {
        return this.http.get<User[]>(
            `${environment.authUrl}usuarios`
        )
    }

    findById(id: number): Observable<User> {
        return this.http.get<User>(
            `${environment.authUrl}usuarios/${id}`
        )
    }

}