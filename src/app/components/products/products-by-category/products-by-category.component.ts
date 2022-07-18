import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-products-by-category',
    templateUrl: './products-by-category.component.html',
    styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent implements OnInit, OnDestroy {
    products: Product[] = [];
    size: number = 8;
    subscription: Subscription[] = [];

    constructor(private productService: ProductService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts(): void {
        const _products = this.route.params
            .pipe(
                switchMap((params: Params) => {
                    return this.productService.getAllByCategory(+params['categoryId'], this.size);
                }),
            )
            .subscribe((resp: any) => {
                this.products = resp.content;
            });

        this.subscription.push(_products);
    }

    ngOnDestroy(): void {
        this.subscription.forEach((_sub) => {
            _sub.unsubscribe();
        });
    }
}
