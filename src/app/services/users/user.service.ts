import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private URL_USERS_API = 'http://localhost:8080/api/users';

    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<any> {
        let URL = this.URL_USERS_API;
        return this.httpClient.get<any>(URL).pipe(catchError(this.handleError));
    }

    getById(id: number): Observable<any> {
        let URL = `${this.URL_USERS_API}/${id}`;
        return this.httpClient.get<any>(URL).pipe(catchError(this.handleError));
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
