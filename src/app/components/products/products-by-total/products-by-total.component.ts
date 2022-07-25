import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { MessageService } from 'src/app/services/messages/message.service';
import { ProductService } from 'src/app/services/products/product.service';
import { SearchService } from 'src/app/services/search/search.service';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-products-by-total',
    templateUrl: './products-by-total.component.html',
    styleUrls: ['./products-by-total.component.scss'],
})
export class ProductsByTotalComponent implements OnInit {
    // productsDisplay: Product[] | any;
    products: Product[] | any;

    totalElements!: number;
    itemsPerPage!: number;
    currentPage!: number;
    valuePaging!: number;
    p!: number;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private searchService: SearchService,
        private messageService: MessageService,
        private productService: ProductService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.valuePaging = +params['page'] + 1;
        });
        this.router.events.pipe(filter((e) => e instanceof ActivationEnd)).subscribe((event: ActivationEnd | any) => {
            this.valuePaging = event.snapshot.queryParams['page'];
            this.initDataByPage(this.valuePaging);
        });
        if (this.valuePaging) {
            this.initDataByPage(this.valuePaging);
        } else {
            this.initDataByPage(0);
        }
    }

    initDataByPage(page: number) {
        this.productService.getByPage(page).subscribe((data) => {
            this.products = data.content;
            this.totalElements = data.totalElements;
            this.currentPage = data.pageable.pageNumber;
        });
    }
}
