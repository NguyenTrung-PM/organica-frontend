// import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    // animations: [trigger('fade', [transition('void=>*', [style({ opacity: 0 }), animate(1000, style({ opacity: 1 }))])])],
    // animations: [
    //     trigger('openClose', [
    //         // ...
    //         state(
    //             'open',
    //             style({
    //                 opacity: 1,
    //                 transform: 'translateX(50px)',
    //             }),
    //         ),
    //         state(
    //             'closed',
    //             style({
    //                 opacity: 0.7,
    //                 transform: 'translateX(-50px)',
    //             }),
    //         ),
    //         transition('open => closed', [animate('1s')]),
    //         transition('closed => open', [animate('1s')]),
    //     ]),
    // ],
})
export class SignInComponent implements OnInit {
    signIn!: FormGroup;
    errMessage!: string;
    constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {}

    ngOnInit(): void {
        this.onCreateLoginForm();
    }

    onCreateLoginForm(): void {
        this.signIn = this.fb.group({
            usernameOrEmail: [null, Validators.required],
            password: [null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$')]],
        });
    }

    onSignIn() {
        this.authenticationService.signIn(this.signIn.value);
        this.authenticationService.$userId.subscribe((_userId) => {
            if (_userId) {
                this.router.navigate(['/home']);
            } else {
                this.errMessage = 'Vui lòng kiểm tra lại thông tin đăng nhập!';
            }
        });
        console.log(this.signIn);
    }
}
