import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { SignatureService } from 'src/app/services/signature/signature.service';
import { UserService } from 'src/app/services/users/user.service';
import { CartProduct } from 'src/app/shared/interface';

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit {
    signature = '';
    hashValue = '';
    userId!: number;

    cartProducts: CartProduct[] = [];
    constructor(
        private signatureService: SignatureService,
        private authService: AuthenticationService,
        private cartService: CartService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.authService.$userId
            .pipe(
                switchMap((_userId) => {
                    this.userId = _userId;
                    return this.signatureService.getHashValue(_userId);
                }),
            )
            .subscribe((_hashValue) => {
                this.hashValue = _hashValue.hashValue;
            });
    }

    check() {
        this.signatureService.check(this.userId, this.signature).subscribe(
            (data) => {
                console.log(data.check);
                if (data.check) {
                    this.checkCart();
                    this.router.navigate(['/home']);
                } else {
                    this.router.navigate(['/signature']);
                }
            },
            (err) => {
                console.log(err);
            },
        );
    }

    checkCart() {
        this.cartService.getCurrentByUserId(this.userId).subscribe((data) => {
            data.forEach((_item: any) => {
                _item.ordered = true;
                this.cartService.updateItem(_item.id, _item).subscribe((_data) => {});
                this.checkCart();
            });
        });
    }
}
