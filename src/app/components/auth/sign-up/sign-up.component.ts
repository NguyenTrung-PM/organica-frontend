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
            username: [null, Validators.required],
            name: [null, Validators.required],
            email: [null, Validators.required],
            phoneNum: [null, Validators.required],
            password: [null, Validators.required],
        });
    }

    onSignUp() {
        this.authenticationService.signUp(this.signUp.value).toPromise().then(
            (data) => {
                this.router.navigate(['/auth/sign-in']);
            },
            (errRes) => {
                this.errorMessage = errRes.error.message;
            },
        );
    }
}
