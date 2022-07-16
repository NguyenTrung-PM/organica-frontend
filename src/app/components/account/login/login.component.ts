import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginMode: boolean = true;
    loginForm!: FormGroup;
    constructor() {}

    ngOnInit(): void {}
    switchMode() {
        this.loginMode = !this.loginMode;
    }
}
