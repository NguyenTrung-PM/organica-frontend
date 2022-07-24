import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    @Input() products: Product[] = [];
    @Input() totalElements!: number;
    @Input() itemsPerPage!: number;
    @Input() currentPage!: number;
    constructor(private router: Router) {}
    ngOnInit(): void {}
    pageChange(event: any) {
        this.currentPage = event;

        this.router.navigate(['products'], { queryParams: { page: event } });
    }
    pageChanged(event: any) {}
}
