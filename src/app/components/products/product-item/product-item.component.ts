import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { MessageService } from 'src/app/services/messages/message.service';

import { ProductService } from 'src/app/services/products/product.service';
import { Image, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
    @Input() product!: Product;
    msgs: Message[] = [];
    @Output() newItemEvent = new EventEmitter<Message[]>();
    constructor(
        private messageService: MessageService,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute,
        private cartService: CartService,
        private favoriteService: FavoriteService,
    ) {}

    ngOnInit(): void {
        this.cartService.getCartStore();
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
    addToCart() {
        if (this.product.quantity !== 0) {
            if (this.cartService.checkItemInCart(this.product) !== -1) {
                let msgs = [{ severity: 'info', summary: 'Sản phẩm đã có trong giỏ hàng' }];
                this.messageService.addMessage(msgs);
            } else {
                this.cartService.addToCart(this.product);
                let msgs = [{ severity: 'success', summary: 'Thêm vào giỏ hàng thành công' }];

                this.messageService.addMessage(msgs);
            }
        }
    }
}
