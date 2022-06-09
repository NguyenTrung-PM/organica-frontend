import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//primeng
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { CarouselModule } from 'primeng/carousel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
//component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HomeCarouselComponent } from './components/shared/home-carousel/home-carousel.component';
import { ProductSidebarComponent } from './components/shared/product-sidebar/product-sidebar.component';
import { LoginComponent } from './components/account/login/login.component';
import { ProfileComponent } from './components/account/profile/profile.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
const COMPONENTS = [AppComponent, HeaderComponent, FooterComponent, HomeComponent];

const PRIMENGS = [SharedModule, MenubarModule, InputTextModule, ButtonModule, CarouselModule, PanelMenuModule, TableModule];

const MODULES = [BrowserModule, BrowserAnimationsModule, AppRoutingModule, FormsModule, ReactiveFormsModule, ScrollingModule];

@NgModule({
    declarations: [...COMPONENTS, HomeCarouselComponent, ProductSidebarComponent, LoginComponent, ProfileComponent],
    imports: [...MODULES, ...PRIMENGS],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
