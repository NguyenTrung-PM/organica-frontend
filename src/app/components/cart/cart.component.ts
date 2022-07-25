import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { CartProduct, Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
    animations: [trigger('fadeOut', [transition('* => void', [animate('500ms', style({ opacity: 0, height: 0, transform: 'translateX(-100%)' }))])])],
})
export class CartComponent implements OnInit {
    totalPrice: number = 0;
    priceCheckout: number = 0;
    cartProducts: CartProduct[] = [];
    totalProduct!: number;
    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.getProductInStore();
        this.getTotal();
        // console.log((this.totalProduct = this.cartProducts.length));

        this.cartService.countProductSubject.next(this.cartProducts.length);
    }
    getProductInStore() {
        this.cartService.getCartStore();
        this.cartProducts = this.cartService.getCartProducts();
    }
    removeItem(cartProduct: CartProduct) {
        this.cartService.removeItemStore(cartProduct);
        this.cartProducts = this.cartService.getCartProducts();
        this.getTotal();
    }
    getTotal() {
        this.totalPrice = this.cartProducts.reduce((sum: number, cartProduct: CartProduct) => {
            return sum + cartProduct.quantity * cartProduct.product.price;
        }, 0);
        this.priceCheckout = this.totalPrice + 30000;
    }
    checkout() {
        console.log(this.cartProducts);
        console.log(this.totalPrice);
    }
    changeQuantity(cartProduct: CartProduct, quantity: number) {
        cartProduct.subPrice = cartProduct.product.price * quantity;
        this.getTotal();
        this.cartService.setCartStore();
    }
}
