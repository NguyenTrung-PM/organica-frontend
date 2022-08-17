import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SignatureService {
    private URL_PRODUCTS_API = 'http://localhost:8080/api';

    constructor(private httpClient: HttpClient) {}

    getHashValue(userId: number): Observable<any> {
        let URL = `${this.URL_PRODUCTS_API}/hashValue/${userId}`;
        return this.httpClient.get<any>(URL);
    }

    check(userId: number, signature: any): Observable<any> {
        let URL = `${this.URL_PRODUCTS_API}/check/${userId}`;
        return this.httpClient.post<any>(URL, signature);
    }
}
