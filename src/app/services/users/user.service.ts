import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Content, Role, User2 } from 'src/app/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private URL_USERS_API = 'http://localhost:8080/api/users';
    private URL_ROLES_API = 'http://localhost:8080/api/roles';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<Content> {
        let URL = this.URL_USERS_API;
        return this.httpClient.get<Content>(URL).pipe(catchError(this.handleError));
    }
    getRolesAll(): Observable<Role[]> {
        let URL = this.URL_ROLES_API;
        return this.httpClient.get<Role[]>(URL).pipe(catchError(this.handleError));
    }
    getById(id: number): Observable<User2> {
        let URL = `${this.URL_USERS_API}/${id}`;
        return this.httpClient.get<User2>(URL).pipe(catchError(this.handleError));
    }
    edit(user: User2) {
        let URL = `${this.URL_USERS_API}/${user.id}`;
        return this.httpClient.put<User2>(URL, user, this.httpOptions).pipe(catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
