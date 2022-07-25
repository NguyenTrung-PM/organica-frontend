import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/interface';

@Injectable({
    providedIn: 'root',
})
export class FavoriteService {
    favoriteProducts: Product[] = [];
    constructor() {}
    addTofavorite(product: Product) {
        if (this.checkItemInfavorite(product) !== -1) {
        } else {
            this.favoriteProducts.push(product);
        }

        this.setfavoriteStore();
    }

    setfavoriteStore() {
        localStorage.setItem('favorite_key', JSON.stringify(this.favoriteProducts));
    }
    getfavoriteStore() {
        const user = localStorage.getItem('favorite_key');
        this.favoriteProducts = user !== null ? JSON.parse(user) : [];
    }
    getfavoriteProducts() {
        return this.favoriteProducts;
    }
    clearfavoriteStore() {
        this.favoriteProducts = [];

        localStorage.removeItem('favorite_key');
    }
    removeItemStore(product: Product) {
        const index = this.favoriteProducts.findIndex((o: any) => o.id === product.id);

        if (index !== -1) {
            this.favoriteProducts.splice(index, 1);
            this.setfavoriteStore();
        }
    }
    checkItemInfavorite(product: Product) {
        return this.favoriteProducts.findIndex((o: any) => o.id === product.id);
    }
}
