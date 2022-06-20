import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
    @Input() product!: Product;
    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {}
    chooseProduct(id: number) {
        this.router.navigate(['product', id]);
    }
}