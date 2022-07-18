import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    isLoading: boolean = false;
    products!: Product[] | any;
    discounts!: Product[];
    size: number = 24;
    subscription: Subscription[] = [];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.initData();
    }

    initData() {
        this.isLoading = true;
        this.subscription.push(
            this.productService.getAllProducts(this.size).subscribe((data) => {
                this.isLoading = false;
                this.products = data.content;
            }),

            this.productService.getByDiscount(this.size).subscribe((data: any) => {
                this.isLoading = false;
                this.discounts = data.content
            }),
        );
    }

    ngOnDestroy(): void {
        this.subscription.forEach((_sub) => {
            _sub.unsubscribe();
        });
    }
}
