import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs';
import { GroupService } from 'src/app/services/groups/group.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Category } from 'src/app/shared/interface';

@Component({
    selector: 'app-products-by-group',
    templateUrl: './products-by-group.component.html',
    styleUrls: ['./products-by-group.component.scss'],
})
export class ProductsByGroupComponent implements OnInit {
    categories: Category[] = [];
    size: number = 8;
    productByGroup: any[] = [];
    constructor(private productService: ProductService, private groupService: GroupService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    return this.groupService.getCategories(+params['groupId']);
                }),
            )
            .subscribe((resp: any) => {
                this.productByGroup = [];
                console.log("Chỗ này dơ, sửa lại đi")
                resp.forEach((category: Category) => {
                    this.productService.getAllByCategory(category.id, 8).subscribe((data) => {
                        this.productByGroup.push({ title: category.name, products: data.content });
                    });
                });
            });
    }
}
