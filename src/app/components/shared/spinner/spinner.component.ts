import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/services/shared/spinner.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit, OnDestroy {
    @Input() isLoading?: boolean = false;
    constructor(private spinnerService: SpinnerService) {}

    ngOnInit(): void {}
    ngOnDestroy(): void {}
}
