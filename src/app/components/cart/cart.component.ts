import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { MessageService } from 'src/app/services/messages/message.service';
import { UserService } from 'src/app/services/users/user.service';
import { CartProduct, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    animations: [trigger('fadeOut', [transition('* => void', [animate('500ms', style({ opacity: 0, height: 0, transform: 'translateX(-100%)' }))])])],
})
export class CartComponent implements OnInit, OnDestroy {
    totalPrice: number = 0;
    priceCheckout: number = 0;
    cartProducts: CartProduct[] = [];
    totalProduct!: number;

    subscriptions: Subscription[] = [];

    constructor(private router: Router,private cartService: CartService, private authService: AuthenticationService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.checkCart();
        this.cartService.countProductSubject.next(this.cartProducts.length);
    }

    checkCart() {
        const getUserId = this.authService.$userId
            .pipe(
                switchMap((userId) => {
                    return this.cartService.getCurrentByUserId(userId);
                }),
            )
            .subscribe((data) => {
                this.cartProducts = data;
                this.getTotalPrice();
            });

        this.subscriptions.push(getUserId);
    }

    checkout() {
        this.cartProducts.forEach((_item) => {
            _item.ordered = true;
            this.cartService.updateItem(_item.id, _item).subscribe((_data) => {});
            this.checkCart();
        });
        let msgs = [{ severity: 'success', summary: 'Đặt hàng thành công' }];
        this.messageService.addMessage(msgs);
        this.router.navigate(['/auth/profile'])


    }

    removeItem(itemId: number) {
        const remove = this.cartService.removeItem(itemId).subscribe(() => {
            this.checkCart();
            this.getTotalPrice();
        });
        this.subscriptions.push(remove);
    }

    changeQuantity(cartProduct: CartProduct, quantity: number) {
        cartProduct.quantity = quantity;
        const update = this.cartService.updateItem(cartProduct.id, cartProduct).subscribe(() => {
            this.getTotalPrice();
        });
        this.subscriptions.push(update);
    }

    getTotalPrice() {
        this.totalPrice = this.cartProducts.reduce((sum: number, item: CartProduct) => {
            return (sum += item.quantity * item.product.price);
        }, 0);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((_sub) => {
            _sub.unsubscribe();
        });
    }
}
