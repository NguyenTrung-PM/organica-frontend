import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    private loadingSubject = new BehaviorSubject<Boolean>(false);
    loadingStatus = this.loadingSubject.asObservable();
    constructor() {}
    showSpinner() {
        this.loadingSubject.next(true);
    }
    hideSpinner() {
        this.loadingSubject.next(false);
    }
}
