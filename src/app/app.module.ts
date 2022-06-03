import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';
import { HomeCarouselComponent } from './components/shared/home-carousel/home-carousel.component';
import { CarouselModule } from 'primeng/carousel';
const COMPONENTS = [AppComponent, HeaderComponent, FooterComponent, HomeComponent];

const PRIMENGS = [SharedModule, MenubarModule, InputTextModule, ButtonModule, CarouselModule];

const MODULES = [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule];

@NgModule({
    declarations: [...COMPONENTS, HomeCarouselComponent],

    imports: [...MODULES, ...PRIMENGS],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
