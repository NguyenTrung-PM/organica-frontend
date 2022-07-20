// import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {}

    ngOnInit(): void {
        this.onCreateLoginForm();
        this.onCreateSignUpForm();
    }

    onSwitchMode() {
        this.signMode = !this.signMode;
    }

    onCreateLoginForm(): void {
        this.signIn = this.fb.group({
            usernameOrEmail: [null, Validators.required],
            password: [null, [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{10,}$')]],
        });
    }

    onSignIn() {
        this.authenticationService.signIn(this.signIn.value);
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
        this.authenticationService.signUp(this.signUp.value).subscribe((data) => {
            console.log(data);
        });
    }
}
