import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MegaMenuItem, MenuItem, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin, mergeMap } from 'rxjs';
import { GroupService } from 'src/app/services/groups/group.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { ProductService } from 'src/app/services/products/product.service';
import { UserService } from 'src/app/services/users/user.service';
import { Category, Content, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [trigger('fadeOut', [transition('* => void', [animate('500ms', style({ opacity: 0 }))])])],
    providers: [ConfirmationService],
})
export class DashboardComponent implements OnInit {
    items!: MenuItem[];
    visibleSidebar1!: boolean;
    userLength!: number;
    productLength!: number;
    constructor(private userService: UserService, private productService: ProductService) {}

    ngOnInit(): void {
        this.items = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Users manager', icon: 'pi pi-user', routerLink: ['/admin/users'] },
                    { label: 'Products manager', icon: 'pi pi-shopping-bag', routerLink: ['/admin/products'] },
                ],
            },
        ];
        this.initData();
    }

    initData() {
        forkJoin([this.userService.getAll(), this.productService.getProductsDisplay()]).subscribe((result) => {
            this.userLength = result[0].totalElements;
            this.productLength = result[1].totalElements;
        });
    }
}
