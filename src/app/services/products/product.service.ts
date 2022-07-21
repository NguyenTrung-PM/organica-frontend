import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Content, Group, Image, Product } from 'src/app/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private URL_PRODUCTS_API = 'http://localhost:8080/api/products';
    private URL_CATEGORY_API = 'http://localhost:8080/api/categories';
    private URL_GROUPS_API = 'http://localhost:8080/api/groups';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };
    constructor(private httpClient: HttpClient) {}

    getAllProducts(size?: number): Observable<Content> {
        let URL = `${this.URL_PRODUCTS_API}?size=${size}`;
        return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    getAllByCategory(id: number, size?: number): Observable<Content> {
        let URL = `${this.URL_CATEGORY_API}/${id}/products?size=${size}`;
        return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    getProductsDisplay(): Observable<Content> {
        let URL = this.URL_PRODUCTS_API;
        return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    // getAllProducts(): Observable<Content> {
    //     let URL = this.URL_PRODUCTS_API;
    //     return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
    // }
    getProductById(id: number): Observable<Product> {
        let URL = `${this.URL_PRODUCTS_API}/${id}`;
        return this.httpClient.get<Product>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    getImageById(id: number): Observable<Content> {
        let URL = `${this.URL_PRODUCTS_API}/${id}/images`;
        return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    getDescribeById(id: number): Observable<Content> {
        let URL = `${this.URL_PRODUCTS_API}/${id}/describes`;
        return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    //loadMorebySize
    loadMoreProductsBySize(size?: number): Observable<Content> {
        let URL = `${this.URL_PRODUCTS_API}?size=${size}`;
        return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
    } //loadProductByCategory

    // loadProductsByCategory(id: number): Observable<Content> {
    //     let URL = `${this.URL_PRODUCTS_API}?size=`;
    //     return this.httpClient.get<Content>(URL, this.httpOptions).pipe(catchError(this.handleError));
    // }
    //groups

    getAllGroups(): Observable<Group[]> {
        let URL = this.URL_GROUPS_API;
        return this.httpClient.get<Group[]>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }

    getByDiscount(size?: number, page?: number): Observable<any[]> {
        let URL = `${this.URL_PRODUCTS_API}/discount?size=${size}&page=${page}`;
        return this.httpClient.get<Group[]>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
    deleteById(id: number) {
        let URL = `${this.URL_PRODUCTS_API}/${id}`;
        return this.httpClient.delete<Product>(URL, this.httpOptions).pipe(catchError(this.handleError));
    }
    add(product: Product) {
        let URL = this.URL_PRODUCTS_API;
        return this.httpClient.post<Product>(URL, product, this.httpOptions).pipe(catchError(this.handleError));
    }
    edit(product: Product) {
        let URL = `${this.URL_PRODUCTS_API}/${product.id}`;
        return this.httpClient.put<Product>(URL, product, this.httpOptions).pipe(catchError(this.handleError));
    }
}
