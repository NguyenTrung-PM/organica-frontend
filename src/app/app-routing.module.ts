import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { ProfileComponent } from './components/account/profile/profile.component';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'account',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: LoginComponent },
            { path: 'profile', component: ProfileComponent },
        ],
    },
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
