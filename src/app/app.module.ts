import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [AppComponent, HeaderComponent, FooterComponent, HomeComponent];

const PRIMENGS = [];

const MODULES = [BrowserModule, AppRoutingModule, FormsModule];

@NgModule({
    declarations: [...COMPONENTS],
    imports: [...MODULES],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
