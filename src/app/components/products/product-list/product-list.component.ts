import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    @Input() products: Product[] = [];
    constructor() {}

    ngOnInit(): void {}
}
