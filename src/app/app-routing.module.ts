import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { CartComponent } from './components/cart/cart.component';

import { HomeComponent } from './components/home/home.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { ReOrderComponent } from './components/orders/re-order/re-order.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductsByCategoryComponent } from './components/products/products-by-category/products-by-category.component';
import { ProductsByGroupComponent } from './components/products/products-by-group/products-by-group.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'auth',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'sign-in', component: SignInComponent },
            { path: 'sign-up', component: SignUpComponent },
            { path: 'profile', component: ProfileComponent },
        ],
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent,
    },
    {
        path: 'products',
        component: ProductsComponent,
        children: [
            {
                path: 'groups',
                children: [
                    { path: '', redirectTo: '1', pathMatch: 'full' },
                    { path: ':groupId', component: ProductsByGroupComponent },
                ],
            },
            {
                path: 'categories',
                children: [
                    { path: '', redirectTo: '1', pathMatch: 'full' },
                    { path: ':categoryId', component: ProductsByCategoryComponent },
                ],
            },
        ],
    },

    {
        path: 'order',
        children: [
            { path: '', component: OrderListComponent },
            { path: 'detail', component: OrderDetailComponent },
            { path: 'reorder', component: ReOrderComponent },
        ],
    },
    { path: 'cart', component: CartComponent },
    {
        path: '**',
        redirectTo: '/home',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
