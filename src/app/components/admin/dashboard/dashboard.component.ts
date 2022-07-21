import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MegaMenuItem, MenuItem, Message, PrimeNGConfig } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { GroupService } from 'src/app/services/groups/group.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Category, Content, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [trigger('fadeOut', [transition('* => void', [animate('500ms', style({ opacity: 0 }))])])],
    providers: [ConfirmationService],
})
export class DashboardComponent implements OnInit {
    products: Content[] | any;
    items!: MenuItem[];
    visibleSidebar1!: boolean;
    display: boolean = false;
    editMode!: boolean;
    formProduct!: FormGroup;
    categories: Category[] = [];

    constructor(
        private productService: ProductService,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private groupService: GroupService,
    ) {}

    ngOnInit(): void {
        this.initProduct();
        this.initData();
        this.items = [
            {
                label: 'Home',
                items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }],
            },
        ];

        forkJoin([this.groupService.getCategories(1), this.groupService.getCategories(2), this.groupService.getCategories(3)]).subscribe((datas) => {
            datas.forEach((data) => {
                data.forEach((item: any) => {
                    this.categories.push({ id: item.id, name: item.name });
                });
            });
        });
    }
    initProduct() {
        this.productService.getAllProducts().subscribe((data) => {
            this.products = data.content;
        });
    }
    initData() {
        this.formProduct = this.fb.group({
            id: [0],
            name: [''],
            price: [0],
            image: [''],
            discount: [0],
            quality: [0],
            quantity: [0],
            unit: [''],
            category: this.fb.group({
                id: [0],
                name: [''],
            }),
        });
    }
    showForm(editMode: boolean, id: number) {
        this.display = true;
        this.editMode = editMode;
        if (editMode) {
            this.productService.getProductById(id).subscribe((data) => {
                this.formProduct = this.fb.group({
                    id: [data.id],
                    name: [data.name],
                    image: [data.image],
                    price: [data.price],
                    discount: [data.discount],
                    quality: [data.quality],
                    quantity: [data.quantity],
                    unit: [data.unit],
                    category: this.fb.group({
                        id: [data.category.id],
                        name: [data.category.name],
                    }),
                });
                console.log(this.formProduct.value);
            });
        } else {
            this.initData();
        }
    }
    addProduct() {
        if (this.editMode) {
            const formData = this.fb.group({
                id: [this.formProduct.value.id],
                name: [this.formProduct.value.name],
                image: [this.formProduct.value.image],
                price: [this.formProduct.value.price],
                discount: [this.formProduct.value.discount],
                quantity: [this.formProduct.value.quantity],
                quality: [this.formProduct.value.quality],
                unit: [this.formProduct.value.unit],
                category: [{ id: this.formProduct.value.category.id, name: this.onChangeIdCategory() }],
            });
            this.productService.edit(formData.value).subscribe((data) => {
                this.initProduct();
            });
            let msgs = [{ severity: 'success', summary: `Sửa thành công` }];
            this.messageService.addMessage(msgs);
        } else {
            const formData = this.fb.group({
                id: [0],
                name: [this.formProduct.value.name],
                image: [this.formProduct.value.image],
                price: [this.formProduct.value.price],
                discount: [this.formProduct.value.discount],
                quantity: [this.formProduct.value.quantity],
                quality: [this.formProduct.value.quality],
                unit: [this.formProduct.value.unit],
                category: [{ id: this.formProduct.value.category.id, name: this.onChangeIdCategory() }],
            });

            let msgs = [{ severity: 'success', summary: `Thêm thành công` }];
            this.messageService.addMessage(msgs);
            this.productService.add(formData.value).subscribe((data) => {
                this.initProduct();
            });
            this.formProduct.reset();
        }
        this.display = false;
    }

    confirm(id: number) {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa không?',
            accept: () => {
                this.productService.deleteById(id).subscribe((data) => {
                    this.initProduct();
                });
                let msgs = [{ severity: 'info', summary: `Xóa thành công` }];
                this.messageService.addMessage(msgs);
            },
        });
    }
    onChangeIdCategory() {
        return this.categories.filter((category) => +category.id === +this.formProduct.value.category.id)[0].name;
    }
}
