// import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
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
export class SignUpComponent implements OnInit {
    signMode: boolean = true;
    signIn!: FormGroup;
    signUp!: FormGroup;

    errorMessage!: string;

    constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {}

    ngOnInit(): void {
        this.onCreateSignUpForm();
    }

    onSwitchMode() {
        this.signMode = !this.signMode;
    }

    onCreateSignUpForm(): void {
        this.signUp = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
            username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            email: [
                null,
                [
                    Validators.required,
                    Validators.maxLength(40),
                    // Validators.pattern(
                    //     '(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))',
                    // ),
                    Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
                ],
            ],
            phoneNum: [
                null,
                [Validators.required, Validators.pattern('(0[3|5|7|8|9])+([0-9]{8})\\b'), Validators.minLength(10), Validators.maxLength(12)],
            ],
            password: [
                null,
                [
                    Validators.required,
                    Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$'),
                    Validators.minLength(6),
                    Validators.maxLength(20),
                ],
            ],
        });
    }

    onSignUp() {
        this.authenticationService
            .signUp(this.signUp.value)
            .toPromise()
            .then(
                (data) => {
                    this.router.navigate(['/auth/sign-in']);
                },
                (errRes) => {
                    this.errorMessage = errRes.error.message;
                },
            );
    }
}
