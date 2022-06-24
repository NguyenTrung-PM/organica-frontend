import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Group } from 'src/app/shared/interface';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    groups: Group[] = [
        { id: 1, name: 'Rau củ quả', categories: [] },
        { id: 2, name: 'Trái cây', categories: [] },
        { id: 3, name: 'Thịt & Thủy hải sản', categories: [] },
    ];
    subcribeForm: FormGroup | any;
    constructor() {}
    ngOnInit(): void {
        this.subcribeForm = new FormGroup({ emailSubcribe: new FormControl(null, [Validators.required, Validators.email]) });
    }
    onSubcribe() {
        console.log(this.subcribeForm.value);
    }
}
