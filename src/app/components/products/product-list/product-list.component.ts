import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/services/groups/group.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Category, Group, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
    menuItem!: MenuItem[];
    items: any = [];
    products!: Product[] | any;
    productsDisplay: Product[] | any;
    isLoading: boolean = false;
    groups!: Group[];
    categories!: Category[];
    title: string = 'Tất cả sản phẩm';
    subTitle: string = 'Rau củ quả';
    size: number = 30;
    totalElements!: number;

    subscription: Subscription[] = [];

    constructor(private productService: ProductService, private groupService: GroupService) {}

    ngOnInit(): void {
        this.subscription.push(
            this.groupService.getGroups().subscribe((groups: any[]) => {
                groups.forEach((group) => {
                    this.groupService.getCategories(group.id).subscribe((categories: any[]) => {
                        this.items.push({
                            label: group.name,
                            routerLink: `/groups/${group.id}`,
                            items: categories.map((category: any) => {
                                return {
                                    label: category.name,
                                    routerLink: `/categories/${category.id}`,
                                };
                            }),
                        });

                        this.menuItem = [...this.items];
                    });
                });
            }),
        );
        this.initData();
    }
    initData() {
        this.isLoading = true;
        this.productService.getProductsDisplay().subscribe((data) => {
            this.isLoading = false;
            this.productsDisplay = data.content;
            this.totalElements = data.totalElements;
            this.productService.getAllProducts(this.totalElements).subscribe((data) => {
                this.products = data.content;
            });
        });
        this.productService.getAllGroups().subscribe((data) => {
            this.groups = data;
            data.forEach((group) => {
                this.categories = group.categories;
            });
        });
    }
    loadMore() {
        // this.productService.loadMoreProductsBySize(this.size).subscribe((data) => {
        //     this.products = data.content;
        //     // console.log(data.content);
        //     this.size += 10;
        // });
        // this.initData();
        let newLength = this.productsDisplay.length + 10;
        if (newLength > this.products.length) {
            newLength = this.products.length;
        }
        this.productsDisplay = this.products.slice(0, newLength);
    }

    ngOnDestroy(): void {
        this.subscription.forEach(_x => {
            _x.unsubscribe();
        })
    }
}
