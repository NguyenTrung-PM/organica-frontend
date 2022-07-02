import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    isLoading: boolean = false;
    products!: Product[] | any;
    size: number = 30;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.initData();
    }
    initData() {
        this.isLoading = true;
        this.productService.getAllProducts().subscribe((data) => {
            this.isLoading = false;
            this.products = data.content;
        });
    }
    // loadMore() {
    //     this.productService.loadMoreProductsBySize(this.size).subscribe((data) => {
    //         this.products = data.content;
    //         // console.log(data.content);
    //         this.size += 10;
    //     });
    //     this.initData();
    // }
}
