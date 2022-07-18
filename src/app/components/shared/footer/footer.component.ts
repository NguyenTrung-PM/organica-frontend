import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { forbiddenEmailValidator } from 'src/app/directives/validation-label.directive';
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
    error: string = '';
    emailSubcribe!: FormControl;
    constructor() {}
    //
    ngOnInit(): void {
        this.emailSubcribe = new FormControl(null, [
            Validators.required,
            Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
            forbiddenEmailValidator,
        ]);
    }
    onSubcribe() {
        if (this.emailSubcribe.errors !== null) {
            console.log(this.emailSubcribe.errors);
        } else {
            console.log(this.emailSubcribe.value);
        }

        // this.emailSubcribe.reset();
    }
}
