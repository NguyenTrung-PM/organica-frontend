import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite/favorite.service';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-products-by-favorite',
    templateUrl: './products-by-favorite.component.html',
    styleUrls: ['./products-by-favorite.component.scss'],
})
export class ProductsByFavoriteComponent implements OnInit {
    products!: Product[] | any;
    constructor(private favoriteService: FavoriteService) {}

    ngOnInit(): void {
        this.getProductInStore();
    }
    getProductInStore() {
        this.favoriteService.getfavoriteStore();
        this.products = this.favoriteService.getfavoriteProducts();
    }
}
