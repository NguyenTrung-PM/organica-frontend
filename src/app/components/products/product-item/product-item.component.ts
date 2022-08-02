import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Subscription, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { MessageService } from 'src/app/services/messages/message.service';

import { ProductService } from 'src/app/services/products/product.service';
import { CartProduct, Image, orderItem, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit, OnDestroy {
    @Input() product!: Product;
    msgs: Message[] = [];
    @Output() newItemEvent = new EventEmitter<Message[]>();
    subscriptions: Subscription[] = [];
    cartProducts: CartProduct[] = [];
    checkProductInCart: boolean = false;
    itemInCart!: any;
    userId!: number;

    constructor(
        private messageService: MessageService,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private cartService: CartService,
        private favoriteService: FavoriteService,
        private authService: AuthenticationService,
    ) {}

    ngOnInit(): void {
        // this.cartService.getCartStore();
    }
    chooseProduct(id: number) {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
        this.router.navigate(['product', id]);
    }

    addToFavorite() {
        if (this.favoriteService.checkItemInfavorite(this.product) !== -1) {
            let msgs = [{ severity: 'info', summary: 'Sản phẩm đã có trong danh sách' }];
            this.messageService.addMessage(msgs);
        } else {
            this.favoriteService.addTofavorite(this.product);
            let msgs = [{ severity: 'success', summary: 'Đã thêm vào danh sách yêu thích' }];

            this.messageService.addMessage(msgs);
        }
    }
    addToCart(product: Product) {
        this.authService.$userId.subscribe((_userId) => {
            this.userId = _userId;
        });

        if (this.userId) {
            //ti fix
            this.cartService.getNow(product.id, this.userId).subscribe(data =>{
                this.itemInCart = data
            })

            this.itemInCart = {
                userId: this.userId,
                product: product,
                quantity: 1,
                ordered: false,
            };

            this.cartService.addItem(this.userId, this.itemInCart).subscribe(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                },
            );

            let msgs = [{ severity: 'info', summary: 'Đã thêm vào giỏ hàng' }];
            this.messageService.addMessage(msgs);
        } else {
            this.router.navigate(['auth/sign-in']);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((_sub) => {
            _sub.unsubscribe();
        });
    }
}
