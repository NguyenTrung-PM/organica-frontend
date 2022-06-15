import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProvinceService } from 'src/app/services/provinces/province.service';
import { District, Province, Ward } from 'src/app/shared/province-interface';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    displayModal: boolean = true;

    nameProvince!: string;
    nameDistrict!: string;
    nameWard!: string;

    provinces!: Province[];
    districts!: District[];
    wards!: Ward[];

    formDelivery = this.fb.group({
        selectedCodeProvince: 0,
        selectedCodeDistrict: 0,
        selectedCodeWard: 0,
    });

    constructor(private provinceService: ProvinceService, private fb: FormBuilder) {}

    ngOnInit(): void {
        this.getAllProvince();
    }

    showDialog() {
        this.displayModal = true;
    }

    getAllProvince() {
        this.provinceService.getAllProvince().subscribe((data) => {
            this.provinces = data;
        });
    }

    onChangeProvince() {
        let codeProvince = +this.formDelivery.value.selectedCodeProvince;
        if (codeProvince !== 0) {
            this.provinceService.getDistrictByCodeProvince(codeProvince).subscribe((data) => {
                this.districts = data.districts;
                this.provinces.forEach((data) => {
                    if (data.code === codeProvince) {
                        this.nameProvince = data.name;
                    }
                });
                this.formDelivery.value.selectedCodeDistrict = 0;
                this.formDelivery.value.selectedCodeWard = 0;
                this.nameDistrict = '';
                this.nameWard = '';
            });
        } else {
            this.formDelivery.value.selectedCodeDistrict = 0;
            this.formDelivery.value.selectedCodeWard = 0;
            this.districts = [];
            this.wards = [];
        }
        this.onChangeDistrict();
        this.onChangeWard();
    }
    onChangeDistrict() {
        let codeDistrict = +this.formDelivery.value.selectedCodeDistrict;
        if (codeDistrict !== 0) {
            this.provinceService.getDistrictByCodeDistrict(codeDistrict).subscribe((data) => {
                this.wards = data.wards;
                this.districts.forEach((data) => {
                    if (data.code === codeDistrict) {
                        this.nameDistrict = data.name;
                    }
                });
                this.formDelivery.value.selectedCodeWard = 0;
                this.nameWard = '';
            });
        } else {
            this.formDelivery.value.selectedCodeWard = 0;
            this.wards = [];
        }
        this.onChangeWard();
    }
    onChangeWard() {
        let codeWard = +this.formDelivery.value.selectedCodeWard;
        this.wards.forEach((data) => {
            if (data.code === codeWard) {
                this.nameWard = data.name;
            }
        });
    }
    print() {
        // console.log(this.nameProvince, this.nameDistrict, this.nameWard);
        // console.log(
        //     this.formDelivery.value.selectedCodeProvince,
        //     this.formDelivery.value.selectedCodeDistrict,
        //     this.formDelivery.value.selectedCodeWard,
        // );
    }
}
