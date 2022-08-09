import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProductComponent } from './components/admin/dashboard/product/product.component';
import { UserComponent } from './components/admin/dashboard/user/user.component';

import { ProfileComponent } from './components/auth/profile/profile.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';

import { CartComponent } from './components/cart/cart.component';

import { HomeComponent } from './components/home/home.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { ReOrderComponent } from './components/orders/re-order/re-order.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductsByCategoryComponent } from './components/products/products-by-category/products-by-category.component';
import { ProductsByDiscountComponent } from './components/products/products-by-discount/products-by-discount.component';
import { ProductsByFavoriteComponent } from './components/products/products-by-favorite/products-by-favorite.component';
import { ProductsByGroupComponent } from './components/products/products-by-group/products-by-group.component';
import { ProductsByTotalComponent } from './components/products/products-by-total/products-by-total.component';
import { ProductsComponent } from './components/products/products.component';
import { SearchComponent } from './components/shared/search/search.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UserComponent },
            { path: 'products', component: ProductComponent },
        ],
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
            { path: '', component: ProductsByTotalComponent },
            { path: 'search', component: SearchComponent },
            { path: 'discount', component: ProductsByDiscountComponent },
            { path: 'favorite', component: ProductsByFavoriteComponent },
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
