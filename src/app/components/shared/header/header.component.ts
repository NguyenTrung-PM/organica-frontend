import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { Observable, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { GroupService } from 'src/app/services/groups/group.service';
import { SearchService } from 'src/app/services/search/search.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    searchValue: string = '';
    toggleSearch: boolean = true;
    items: any[] = [];
    userId: any = '';
    userRole: any[] = [];
    navMenu: MenuItem[] = [];
    authMenu: MenuItem[] = [];
    nonUserMenu: MenuItem[] = [];

    countProduct!: number;
    constructor(
        private groupService: GroupService,
        private authService: AuthenticationService,
        private userService: UserService,
        private searchService: SearchService,
        private router: Router,
        private route: ActivatedRoute,
        private cartService: CartService,
    ) {}

    ngOnInit(): void {
        this.onCreateNavMenu();
        this.onCreateNonUserMenu();
        this.fetchUserId();
        this.cartService.countProduct.subscribe((count) => {
            this.countProduct = count;
        });
    }

    fetchUserId() {
        this.authService.$userId
            .pipe(
                switchMap((_userId) => {
                    return _userId ? this.userService.getById(_userId) : new Observable();
                }),
            )
            .subscribe((_user) => {
                this.onCreateUserMenu(_user);
            });
    }

    onCreateNavMenu(): void {
        this.groupService
            .getAll()
            .toPromise()
            .then((groups: any[]) => {
                groups.forEach((group) => {
                    this.groupService
                        .getCategories(group.id)
                        .toPromise()
                        .then((categories: any[]) => {
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
                        });
                });
            });

        this.navMenu = [
            {
                label: 'Khuyến mãi',
                routerLink: '/products/discount',
            },
            {
                label: 'Sản phẩm',
                items: this.items,
                routerLink: '/products',
            },
            {
                label: 'Yêu thích',
                routerLink: '/products/favorite',
            },
            {
                label: 'Cửa hàng',
            },
        ];
    }

    onCreateUserMenu(user: any): void {
        this.authMenu = [
            {
                label: user.name,
                icon: 'far fa-user-circle',
            },
            {
                label: 'Cập nhật thông tin',
                icon: 'far fa-address-card',
                routerLink: '/auth/profile',
            },
            {
                separator: true,
            },
            {
                label: 'Administrator',
                icon: 'fa fa-gear',
                routerLink: '/admin',
                visible: user.roles.length >= 2 ? true : false,
            },
            {
                separator: true,
                visible: user.roles.length >= 2 ? true : false,
            },
            {
                label: 'Đăng xuất',
                icon: 'fas fa-sign-out',
                command: () => {
                    this.onCreateNonUserMenu();
                    this.authService.signOut();
                },
            },
        ];
    }

    onCreateNonUserMenu(): void {
        this.authMenu = [
            {
                label: 'Đăng nhập',
                icon: 'fas fa-sign-in',
                routerLink: '/auth/sign-in',
            },
            {
                label: 'Đăng kí',
                icon: 'far fa-id-card',
                routerLink: '/auth/sign-up',
            },
        ];
    }

    onToggleSearch() {
        this.toggleSearch = !this.toggleSearch;
        if (this.searchValue) {
            this.router.navigate(['products/search'], { queryParams: { keyword: this.searchValue } });
        }
    }

    onGoToCart(): void {
        this.authService.$userId.subscribe((_userId) => {
            return _userId ? this.router.navigate(['/cart']) : this.router.navigate(['/auth/sign-in']);
        });
    }
}
