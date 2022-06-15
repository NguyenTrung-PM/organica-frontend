import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { District, Province } from 'src/app/shared/province-interface';

@Injectable({
    providedIn: 'root',
})
export class ProvinceService {
    private URL_PROVINCE_API = 'https://cors-anywhere.herokuapp.com/https://provinces.open-api.vn/api/';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private httpClient: HttpClient) {}

    getAllProvince(): Observable<Province[]> {
        const URL = `${this.URL_PROVINCE_API}p`;
        return this.httpClient.get<Province[]>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    getDistrictByCodeProvince(code: number): Observable<Province> {
        const URL = `${this.URL_PROVINCE_API}p/${code}?depth=2`;
        return this.httpClient.get<Province>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    getDistrictByCodeDistrict(code: number): Observable<District> {
        const URL = `${this.URL_PROVINCE_API}d/${code}?depth=2`;
        return this.httpClient.get<District>(URL, this.httpOptions).pipe(catchError(this.handleError));
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
