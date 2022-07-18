import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loading: LoadingService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        this.loading.setLoading(true);
        return next.handle(request).pipe(
            finalize(() => {
                // setTimeout(() => {
                this.loading.setLoading(false);
                // }, 500)
            }),
        );
    }
}
