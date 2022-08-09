import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserService } from '../services/users/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    users: any;

    constructor(private authService: AuthenticationService, private userService: UserService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        this.authService.$userId
            .pipe(
                switchMap((_userId) => {
                    return this.userService.getById(_userId);
                }),
            )
            .subscribe((data) => {
                this.users = data;
            });

        if (this.users?.roles.length === 2) {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
