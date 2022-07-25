import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct, Product } from 'src/app/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class CartService {
    cartProducts: CartProduct[] = [];
    countProductSubject = new BehaviorSubject<number>(0);
    countProduct = this.countProductSubject.asObservable();
    constructor() {}

    addToCart(product: Product) {
        if (product.quantity !== 0) {
            if (this.checkItemInCart(product) !== -1) {
                // let index = this.checkItemInCart(product);
                // this.cartProducts[index].quantity++;
            } else {
                this.cartProducts.push({ product, quantity: 1, subPrice: product.price });
            }

            this.setCartStore();
        }
    }

    setCartStore() {
        localStorage.setItem('cart_key', JSON.stringify(this.cartProducts));
    }
    getCartStore() {
        const user = localStorage.getItem('cart_key');
        this.cartProducts = user !== null ? JSON.parse(user) : [];
    }
    getCartProducts() {
        this.countProductSubject.next(this.cartProducts.length);
        return this.cartProducts;
    }
    clearCartStore() {
        this.cartProducts = [];

        localStorage.removeItem('cart_key');
    }
    removeItemStore(cartProduct: CartProduct) {
        const index = this.cartProducts.findIndex((o: any) => o.product.id === cartProduct.product.id);

        if (index !== -1) {
            this.cartProducts.splice(index, 1);
            this.setCartStore();
        }
    }
    checkItemInCart(product: Product) {
        return this.cartProducts.findIndex((o: any) => o.product.id === product.id);
    }
}
