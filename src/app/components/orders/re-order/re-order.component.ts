import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-re-order',
    templateUrl: './re-order.component.html',
    styleUrls: ['./re-order.component.scss'],
})
export class ReOrderComponent implements OnInit {
    countProduct: number = 1;
    constructor() {}

    ngOnInit(): void {}
}
