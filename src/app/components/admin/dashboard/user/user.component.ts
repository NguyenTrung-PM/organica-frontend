import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ConfirmationService, MegaMenuItem, MenuItem, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { forkJoin, mergeMap } from 'rxjs';
import { GroupService } from 'src/app/services/groups/group.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { ProductService } from 'src/app/services/products/product.service';
import { UserService } from 'src/app/services/users/user.service';
import { Category, Content, Product, Role, User2 } from 'src/app/shared/interface';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    animations: [trigger('fadeOut', [transition('* => void', [animate('500ms', style({ opacity: 0 }))])])],
    providers: [ConfirmationService],
})
export class UserComponent implements OnInit {
    @Output() userLength = new EventEmitter();
    disabled: boolean = true;
    users: User2[] | any;
    items!: MenuItem[];
    visibleSidebar1!: boolean;
    display: boolean = false;
    editMode!: boolean;
    formUsers!: FormGroup;
    categories: Category[] = [];
    roles: Role[] = [];
    @ViewChild('dt') dt: Table | any;
    constructor(
        private productService: ProductService,
        private fb: FormBuilder,

        private messageService: MessageService,
        private groupService: GroupService,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.initUser();
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

        this.userService.getRolesAll().subscribe((data) => {
            this.roles = data;
        });
    }
    initUser() {
        this.userService.getAll().subscribe((data) => {
            this.users = data.content;
            this.userLength.emit(data.content.length);
        });
    }
    initData() {
        this.formUsers = this.fb.group({
            id: [0],
            name: [''],
            email: [''],
            phoneNumber: [''],
            username: [''],
            password: [''],
            addresses: this.fb.array([]),
            createdAt: [''],
            updatedAt: [''],
            roles: this.fb.array([]),
        });
    }
    showForm(editMode: boolean, idUser: number) {
        this.display = true;
        this.editMode = editMode;
        let id = 0;
        let name = '';
        let email = '';
        let phoneNumber = '';
        let username = '';
        let password = '';
        let addresses = this.fb.array([]);
        let createdAt = '';
        let updatedAt = '';
        let roles = this.fb.array([]);
        if (editMode) {
            this.userService.getById(idUser).subscribe((data) => {
                (id = data.id),
                    (name = data.name),
                    (email = data.email),
                    (phoneNumber = data.phoneNumber),
                    (username = data.username),
                    (password = data.password),
                    data.addresses.forEach((address) => {
                        addresses.push(
                            this.fb.group({
                                provinceCity: [address.provinceCity],
                                district: [address.district],
                                town: [address.town],
                                street: [address.street],
                            }),
                        );
                    }),
                    (createdAt = data.createdAt),
                    (updatedAt = data.updatedAt),
                    data.roles.forEach((role) => {
                        roles.push(
                            this.fb.group({
                                id: [role.id],
                                name: [role.name],
                            }),
                        );
                    });
                this.formUsers = this.fb.group({
                    id: [id],
                    name: [name],
                    email: [email],
                    phoneNumber: [phoneNumber],
                    username: [username],
                    password: [password],
                    addresses: addresses,
                    createdAt: [createdAt],
                    updatedAt: [updatedAt],
                    roles: roles,
                });
            });
        }
    }

    applyFilterGlobal($event: any, stringVal: string) {
        this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }
    get roleControls() {
        return (<FormArray>this.formUsers.get('roles')).controls;
    }
    get addressControls() {
        return (<FormArray>this.formUsers.get('addresses')).controls;
    }
}
