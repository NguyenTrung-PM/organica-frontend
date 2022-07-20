import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { signUpData, User } from 'src/app/shared/interface';
import jwt_decode from 'jwt-decode';
@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private URL_SIGNIN_API = 'http://localhost:8080/api/auth/signin';
    private URL_SIGNUP_API = 'http://localhost:8080/api/auth/signup';
    public $userId = new BehaviorSubject<any>(null);
    public accessToken!: any;

    constructor(private httpClient: HttpClient) {}

    signIn(user: User) {
        let URL = this.URL_SIGNIN_API;
        this.httpClient
            .post<any>(URL, user)
            .toPromise()
            .then(
                (_data) => {
                    this.accessToken = _data.accessToken;
                    window.sessionStorage.setItem('token', _data.accessToken);
                    this.$userId.next(this.decodeToken());
                },
                (error) => {
                },
            );
    }

    signOut() {
        this.accessToken = null;
        window.sessionStorage.removeItem('token');
    }

    signUp(signUpData: signUpData): Observable<any> {
        let URL = `${this.URL_SIGNUP_API}`;
        return this.httpClient.post<any>(URL, signUpData);
    }

    decodeToken(): any {
        var decoded: any = jwt_decode(this.accessToken);
        return decoded.sub;
    }

    fetchToken() {
        this.accessToken = window.sessionStorage.getItem('token');
        if (this.accessToken) this.$userId.next(this.decodeToken());
    }
}
