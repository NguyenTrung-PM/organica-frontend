import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductService } from 'src/app/services/products/product.service';
import { Category, Group, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
    items!: MenuItem[];
    products!: Product[] | any;
    productsDisplay: Product[] | any;
    isLoading: boolean = false;
    groups!: Group[];
    categorys!: Category[];
    title: string = 'Tất cả sản phẩm';
    subTitle: string = 'Rau củ quả';
    size: number = 30;
    totalElements!: number;
    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.initData();

        this.items = [
            {
                label: 'Rau củ quả',
                items: [
                    {
                        label: 'Rau ăn lá',
                        command: (event) => {
                            //event.originalEvent: Browser event
                            //event.item: menuitem metadata
                            console.log(event.item);
                        },
                        // style: { marginLeft: '50px' },
                    },
                    {
                        label: 'Rau ăn củ',
                        command: (event) => {
                            //event.originalEvent: Browser event
                            //event.item: menuitem metadata
                            // console.log(event.item);
                        },
                    },
                    {
                        label: 'Rau ăn quả',
                    },

                    {
                        label: 'Rau ăn hoa',
                    },
                    {
                        label: 'Rau ăn thân',
                    },
                    {
                        label: 'Rau gia vị',
                    },
                    {
                        label: 'Nấm',
                    },
                    {
                        label: 'Rau củ quả đông lạnh',
                    },
                ],
            },
            {
                label: 'Trái cây',

                items: [
                    {
                        label: 'Trái cây trong nước',
                    },
                    {
                        label: 'Trái cây nhập khẩu',
                    },
                    {
                        label: 'Trái cây đông lạnh',
                    },
                    {
                        label: 'Trái cây sấy',
                    },
                ],
            },
            {
                label: 'Thịt & Thủy hải sản',
                items: [
                    {
                        label: 'Thịt heo',
                    },
                    {
                        label: 'Thịt bò',
                    },
                    {
                        label: 'Gia cầm & Trứng',
                    },
                    {
                        label: 'Thủy hải sản',
                    },
                ],
            },
        ];
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
                this.categorys = group.categories;
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
}
