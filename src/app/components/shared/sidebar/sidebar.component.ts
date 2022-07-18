import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/services/groups/group.service';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
    menuItem!: MenuItem[];
    items: any = [];
    subscription: Subscription[] = [];

    constructor(private productService: ProductService, private groupService: GroupService) {}

    ngOnInit(): void {
        this.subscription.push(
            this.groupService.getAll().subscribe((groups: any[]) => {
                groups.forEach((group) => {
                    this.groupService.getCategories(group.id).subscribe((categories: any[]) => {
                        this.items.push({
                            label: group.name,
                            routerLink: `/products/groups/${group.id}`,
                            items: categories.map((category: any) => {
                                return {
                                    label: category.name,
                                    routerLink: `/products/categories/${category.id}`,
                                };
                            }),
                        });
                        this.menuItem = [...this.items];
                    });
                });
            }),
        );
    }

    ngOnDestroy(): void {
        this.subscription.forEach((_sub) => {
            _sub.unsubscribe();
        });
    }
}
