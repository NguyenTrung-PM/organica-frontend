import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from 'src/app/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private URL_PRODUCTS_API = 'http://localhost:8081/api/products';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private httpClient: HttpClient) {}

    getAllProducts(): Observable<Product[]> {
        let URL = this.URL_PRODUCTS_API;
        return this.httpClient.get<Product[]>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    getProductById(id: number): Observable<Product> {
        let URL = `${this.URL_PRODUCTS_API}/${id}`;
        return this.httpClient.get<Product>(URL, this.httpOptions).pipe(catchError(this.handleError));
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
