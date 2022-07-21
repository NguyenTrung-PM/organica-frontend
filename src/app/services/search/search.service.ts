import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Content } from 'src/app/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private searchSubject = new BehaviorSubject<string>('');
    getValueSearchSubject = this.searchSubject.asObservable();

    URL_API_SEARCH = 'http://localhost:8080/api/products/search';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private httpClient: HttpClient) {}

    addValue(value: string) {
        this.searchSubject.next(value);
    }

    getValue(value: string) {
        const URL = `${this.URL_API_SEARCH}?name=${value}`;
        return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
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
