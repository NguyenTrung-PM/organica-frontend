import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor(private authenService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${this.authenService.accessToken}`   
        })
      });
    return next.handle(authReq);
  }
}
