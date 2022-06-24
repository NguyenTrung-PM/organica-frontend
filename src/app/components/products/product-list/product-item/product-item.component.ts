import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/products/product.service';
import { Image, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
    @Input() product!: Product;
    constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {}
    chooseProduct(id: number) {
        this.router.navigate(['product', id]);
    }
}
