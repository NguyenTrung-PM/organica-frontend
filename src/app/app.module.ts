import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DialogModule } from 'primeng/dialog';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MenuModule } from 'primeng/menu';
import { MegaMenuModule } from 'primeng/megamenu';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
//component

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HomeCarouselComponent } from './components/shared/home-carousel/home-carousel.component';
import { LoginComponent } from './components/account/login/login.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductEditComponent } from './components/products/product-edit/product-edit.component';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { GalleriaModule } from 'primeng/galleria';
import { CutStringsPipe } from './pipes/cut-strings.pipe';
import { OrderListComponent } from './components/orders/order-list/order-list.component';
import { OrderItemComponent } from './components/orders/order-list/order-item/order-item.component';
import { OrderDetailComponent } from './components/orders/order-detail/order-detail.component';
import { ReOrderComponent } from './components/orders/re-order/re-order.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ProductsComponent } from './components/products/products.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { ProductsByGroupComponent } from './components/products/products-by-group/products-by-group.component';
import { ProductsByCategoryComponent } from './components/products/products-by-category/products-by-category.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { MessagesComponent } from './components/shared/messages/messages.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
const COMPONENTS = [AppComponent, HeaderComponent, FooterComponent, HomeComponent];

const PRIMENGS = [
    SharedModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    CarouselModule,
    PanelMenuModule,
    DialogModule,
    CascadeSelectModule,
    CardModule,
    GalleriaModule,
    InputNumberModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    MenuModule,
    MegaMenuModule,
    SidebarModule,
    ConfirmDialogModule,
];

const MODULES = [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule];

@NgModule({
    declarations: [
        ...COMPONENTS,
        HomeCarouselComponent,
        LoginComponent,
        ProfileComponent,
        ProductDetailComponent,
        ProductEditComponent,
        ProductItemComponent,
        CutStringsPipe,
        OrderListComponent,
        OrderItemComponent,
        OrderDetailComponent,
        ReOrderComponent,
        SpinnerComponent,
        SidebarComponent,
        ProductsComponent,
        ProductsByGroupComponent,
        ProductsByCategoryComponent,
        CartComponent,
        ProductListComponent,
        MessagesComponent,
        DashboardComponent,
    ],
    imports: [...MODULES, ...PRIMENGS],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
