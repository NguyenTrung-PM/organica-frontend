import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-products-by-discount',
    templateUrl: './products-by-discount.component.html',
    styleUrls: ['./products-by-discount.component.scss'],
})
export class ProductsByDiscountComponent implements OnInit {
    products!: Product[] | any;
    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.initData();
    }
    initData() {
        this.productService.getByDiscount(24).subscribe((data: any) => {
            this.products = data.content;
        });
    }
}
