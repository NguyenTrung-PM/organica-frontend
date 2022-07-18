import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'organica-frontend';
    isLoading?: boolean = true;

    constructor(private loadingService: LoadingService) {}

    ngOnInit() {
        this.loadingService.isLoading.subscribe((_x) => {
            setTimeout(() => {
                this.isLoading = _x;
            }, 0);
        });
    }
}
