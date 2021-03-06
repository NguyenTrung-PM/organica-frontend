import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forbiddenEmailValidator } from 'src/app/directives/validation-label.directive';
import { ProvinceService } from 'src/app/services/provinces/province.service';
import { District, Province, Ward } from 'src/app/shared/province-interface';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    displayModal: boolean = false;
    editModeDelivery = false;

    nameProvince!: string;
    nameDistrict!: string;
    nameWard!: string;

    provinces!: Province[];
    districts!: District[];
    wards!: Ward[];

    formDelivery!: FormGroup;
    accountForm!: FormGroup;
    constructor(private provinceService: ProvinceService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.getAllProvince();
        this.createAccount();
        this.initFormDelivery();
    }

    addDelivery() {
        this.displayModal = true;
        this.editModeDelivery = false;
        this.initFormDelivery();
    }

    getAllProvince() {
        this.provinceService.getAllProvince().subscribe((data) => {
            this.provinces = data;
        });
    }

    onChangeProvince() {
        let codeProvince = +this.formDelivery.value.address.selectedCodeProvince;
        if (codeProvince !== 0) {
            this.provinceService.getDistrictByCodeProvince(codeProvince).subscribe((data) => {
                this.districts = data.districts;
                this.provinces.forEach((data) => {
                    if (data.code === codeProvince) {
                        this.nameProvince = data.name;
                    }
                });
                this.formDelivery.value.address.selectedCodeDistrict = 0;
                this.formDelivery.value.address.selectedCodeWard = 0;
                this.nameDistrict = '';
                this.nameWard = '';
            });
        } else {
            this.formDelivery.value.address.selectedCodeDistrict = 0;
            this.formDelivery.value.address.selectedCodeWard = 0;
            this.districts = [];
            this.wards = [];
        }
        this.onChangeDistrict();
        this.onChangeWard();
    }
    onChangeDistrict() {
        let codeDistrict = +this.formDelivery.value.address.selectedCodeDistrict;
        if (codeDistrict !== 0) {
            this.provinceService.getDistrictByCodeDistrict(codeDistrict).subscribe((data) => {
                this.wards = data.wards;
                this.districts.forEach((data) => {
                    if (data.code === codeDistrict) {
                        this.nameDistrict = data.name;
                    }
                });
                this.formDelivery.value.address.selectedCodeWard = 0;
                this.nameWard = '';
            });
        } else {
            this.formDelivery.value.address.selectedCodeWard = 0;
            this.wards = [];
        }
        this.onChangeWard();
    }
    onChangeWard() {
        let codeWard = +this.formDelivery.value.address.selectedCodeWard;
        this.wards.forEach((data) => {
            if (data.code === codeWard) {
                this.nameWard = data.name;
            }
        });
    }
    // cancel() {
    //     this.formDelivery.reset();
    // }
    editDelivery() {
        this.editModeDelivery = !this.editModeDelivery;
        this.displayModal = true;
        this.initFormDelivery();
    }
    print() {
        let deliveryData = {
            name: this.formDelivery.value.name,
            phone: this.formDelivery.value.phone,
            address: `${this.formDelivery.value.street}, ${this.nameWard},${this.nameDistrict},${this.nameProvince}`,
        };
        console.log(deliveryData);
    }
    saveAccount() {
        console.log(this.accountForm);
    }

    createAccount() {
        this.accountForm = this.fb.group({
            name: [null, Validators.required],
            phone: [null, [Validators.required, Validators.pattern('(0[3|5|7|8|9])+([0-9]{8})\\b')]],
            email: [null, [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'), forbiddenEmailValidator]],
        });
    }
    initFormDelivery() {
        if (this.editModeDelivery) {
            this.formDelivery = this.fb.group({
                name: ['null', Validators.required],
                phone: ['null', [Validators.required, Validators.pattern('(0[3|5|7|8|9])+([0-9]{8})\\b')]],
                address: this.fb.group({
                    selectedCodeProvince: [0, Validators.min(1)],
                    selectedCodeDistrict: [0, Validators.min(1)],
                    selectedCodeWard: [0, Validators.min(1)],
                }),

                street: ['null', Validators.required],
            });
        } else {
            this.formDelivery = this.fb.group({
                name: [null, Validators.required],
                phone: [null, [Validators.required, Validators.pattern('(0[3|5|7|8|9])+([0-9]{8})\\b')]],
                address: this.fb.group({
                    selectedCodeProvince: [0, Validators.min(1)],
                    selectedCodeDistrict: [0, Validators.min(1)],
                    selectedCodeWard: [0, Validators.min(1)],
                }),

                street: [null, Validators.required],
            });
        }
    }
}
