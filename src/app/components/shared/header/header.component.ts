import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { GroupService } from 'src/app/services/groups/group.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    searchValue: string = '';
    toggleSearch: boolean = true;
    items: any[] = [];
    menuItem: MenuItem[] = [];

    constructor(private groupService: GroupService) {}

    ngOnInit(): void {
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
                });
            });
        });

        this.menuItem = [
            {
                label: 'Khuyến mãi',
            },
            {
                label: 'Sản phẩm',
                items: this.items,
                routerLink: '/products',
            },
            {
                label: 'Combo',
            },
            {
                label: 'Cửa hàng',
            },
        ];
    }

    onToggleSearch() {
        this.toggleSearch = !this.toggleSearch;
    }
}
