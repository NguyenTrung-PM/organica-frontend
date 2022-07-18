import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {
    loginMode: boolean = true;
    loginForm!: FormGroup;
    registerForm!: FormGroup;
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    initData() {
        this.loginForm = this.fb.group({});
    }
    switchMode() {
        this.loginMode = !this.loginMode;
    }
    login() {
        if (this.loginMode) {
        } else {
        }
    }
}
