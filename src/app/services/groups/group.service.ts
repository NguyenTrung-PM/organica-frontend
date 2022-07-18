import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    private URL_GROUPS_API = 'http://localhost:8080/api/groups';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private httpClient: HttpClient) {}

    getAll(): Observable<any> {
        let URL = `${this.URL_GROUPS_API}`;
        return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }

    getCategories(id: number): Observable<any> {
        let URL = `${this.URL_GROUPS_API}/${id}/categories`;
        return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
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
