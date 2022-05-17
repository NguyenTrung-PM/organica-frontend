import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

import { MenubarModule } from 'primeng/menubar';
import { SharedModule } from 'primeng/api';

const COMPONENTS = [AppComponent, HeaderComponent, FooterComponent, HomeComponent];

const PRIMENGS = [SharedModule, MenubarModule];

const MODULES = [BrowserModule, AppRoutingModule, FormsModule];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [...MODULES, ...PRIMENGS],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
