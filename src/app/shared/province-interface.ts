export interface Province {
    name: string;
    code: number;
    divisionType: string;
    codeName: string;
    phoneCode: number;
    districts: District[];
}
export interface District {
    name: string;
    code: number;
    divisionType: string;
    codename: string;
    provinceCode: number;
    wards: Ward[];
}
export interface Ward {
    name: string;
    code: number;
    divisionType: string;
    codename: string;
    districtCode: number;
}
