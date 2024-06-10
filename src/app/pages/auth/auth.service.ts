import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    userLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, email:'', username:''});

    constructor(private http: HttpClient) { }

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

    registro(username: string, email: string, password: string) {
        return this.http.post<{
            id: number,
            username: string,
            nickname: string,
            rol: string
        }>(
            `${environment.authUrl}registro`,
            {
                nickname: username,
                username: email,
                password: password
            }
        )
            .pipe(
                catchError(errorRes => {
                    let errorMsg = 'Se ha producido un error desconocido';
                    if (errorRes.status === 400) {
                        errorMsg = "Ya existe una cuenta con el email introducido";
                    }
                    return throwError(errorMsg);
                })
            )
    }

    login(email: string, password: string) {
        return this.http.post(
            `${environment.authUrl}login`,
            {
                username: email,
                password: password
            }
        )
            .pipe(
                tap( userData => {
                    // this.currentUserData.next(userData);
                    this.userLogged.next(true);
                }),
                catchError(errorRes => {
                    console.log(errorRes);
                    
                    let errorMsg = 'Se ha producido un error desconocido';
                    if (errorRes.status === 400) {
                        errorMsg = "Credenciales erróneas";
                    }
                    return throwError(errorMsg);
                })
            )
    }

    get userLoggedChanged(): Observable<boolean>{
        return this.userLogged.asObservable();
    }

}