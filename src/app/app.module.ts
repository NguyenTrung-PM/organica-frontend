import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PrimeNgModule } from './shared/primeng.module';
import { HomeComponent } from './components/home/home.component';
import { InputTextModule } from 'primeng/inputtext';

import { ButtonModule } from 'primeng/button';
const COMPONENTS = [AppComponent, HeaderComponent, FooterComponent, HomeComponent];

const MODULES = [BrowserModule, AppRoutingModule, PrimeNgModule];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [...MODULES, InputTextModule, ButtonModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
