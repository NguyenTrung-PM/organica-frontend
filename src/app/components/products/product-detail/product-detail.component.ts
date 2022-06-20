import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/services/products/product.service';
import { Product, Image } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    images!: Image[];
    id!: number;
    product!: Product;
    countProduct: number = 1;
    length!: number;
    responsiveOptions: any[] = [
        {
            breakpoint: '360px',
            numVisible: 3,
        },
        {
            breakpoint: '280px',
            numVisible: 2,
        },
    ];
    constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
        });
        this.productService.getProductById(this.id).subscribe((data) => {
            this.product = data;
            this.images = this.product.images;
            this.length = this.images.length;
        });
    }
    onChangeQuantity() {
        console.log(this.countProduct);
    }
}
