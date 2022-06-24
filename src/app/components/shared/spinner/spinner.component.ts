import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/services/shared/spinner.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
    isLoading: boolean = false;
    private subscription!: Subscription;
    constructor(private spinnerService: SpinnerService) {}

    ngOnInit(): void {
        this.subscription = this.spinnerService.loadingStatus.subscribe((data) => {
            console.log(data);
            this.isLoading === data;
        });
    }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
