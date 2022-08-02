import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CartProduct, Product } from 'src/app/shared/interface';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private URL_ORDERS_API = 'http://localhost:8080/api/orders';

    cartProducts: CartProduct[] = [];
    countProductSubject = new BehaviorSubject<number>(0);
    countProduct = this.countProductSubject.asObservable();

    constructor(private httpClient: HttpClient, private authService: AuthenticationService, private router: Router) {}




    //==================API=================
    getCurrentByUserId(id: number): Observable<any> {
        let URL = `${this.URL_ORDERS_API}/${id}`;
        return this.httpClient.get<any>(URL);
    }

    getNow(productId: number, userId: number): Observable<any> {
        let URL = `${this.URL_ORDERS_API}/${productId}/${userId}`;
        return this.httpClient.get<any>(URL);
    }

    getHistoryByUserId(id: number): Observable<any> {
        let URL = `${this.URL_ORDERS_API}/history/${id}`;
        return this.httpClient.get<any>(URL);
    }

    updateItem(itemId: number, cartItem: any) {
        let URL = `${this.URL_ORDERS_API}/${itemId}`;
        return this.httpClient.put<any>(URL, cartItem);
    }

    removeItem(itemId: number) {
        let URL = `${this.URL_ORDERS_API}/${itemId}`;
        return this.httpClient.delete<any>(URL);
    }

    addItem(userId: number, cartItem: any) {
        let URL = `${this.URL_ORDERS_API}/add/${userId}`;
        return this.httpClient.post<any>(URL, cartItem);
    }

}
