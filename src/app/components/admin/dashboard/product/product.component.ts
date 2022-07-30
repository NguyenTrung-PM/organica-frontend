import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MegaMenuItem, MenuItem, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin, mergeMap } from 'rxjs';
import { GroupService } from 'src/app/services/groups/group.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Category, Content, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    animations: [trigger('fadeOut', [transition('* => void', [animate('500ms', style({ opacity: 0 }))])])],
    providers: [ConfirmationService],
})
export class ProductComponent implements OnInit {
    products: Product[] | any;
    items!: MenuItem[];
    visibleSidebar1!: boolean;
    display: boolean = false;
    editMode!: boolean;
    formProduct!: FormGroup;
    categories: Category[] = [];
    selectedProducts!: Product[];
    @ViewChild('dt') dt: Table | any;
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
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
                    { label: 'Users manager', icon: 'pi pi-user', routerLink: ['/users'] },
                    { label: 'Products manager', icon: 'pi pi-shopping-bag', routerLink: ['/products'] },
                ],
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
        this.productService
            .getProductsDisplay()
            .pipe(mergeMap((data: Content) => this.productService.getAllProducts(data.totalElements)))
            .subscribe((data) => {
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

    deleteProduct(id: number) {
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
    //
    openNew() {}
    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa những sản phẩm đã chọn không?',
            accept: () => {
                this.selectedProducts.forEach((product: Product) => {
                    this.productService.deleteById(product.id).subscribe((data) => {
                        this.initProduct();
                    });
                });
                this.selectedProducts = [];
                let msgs = [{ severity: 'info', summary: `Xóa thành công` }];
                this.messageService.addMessage(msgs);
            },
        });
    }
    // hideDialog() {
    //     this.display = false;
    // }
    applyFilterGlobal($event: any, stringVal: string) {
        this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }
}
