import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    searchValue: string = '';
    toggleSearch: boolean = true;
    items: MenuItem[] = [
        {
            label: 'Khuyến mãi',
        },
        {
            label: 'Sản phẩm',
            items: [
                {
                    label: 'Rau củ quả',
                    items: [
                        { label: 'Rau ăn lá' },
                        { label: 'Rau ăn củ' },
                        { label: 'Rau ăn quả' },
                        { label: 'Rau ăn hoa' },
                        { label: 'Rau ăn thân' },
                        { label: 'Rau gia vị' },
                        { label: 'Nấm' },
                    ],
                },
                {
                    label: 'Trái cây',
                    items: [{ label: 'Trái cây trong nước' }, { label: 'Trái cây nhập khẩu' }, { label: 'Trái cây đông lạnh' }],
                },
                { label: 'Thịt & thủy hải sản', items: [{ label: 'Thịt heo' }, { label: 'Thịt bò' }, { label: 'Trái cây đông lạnh' }] },
            ],
        },
        {
            label: 'Combo',
        },
        {
            label: 'Cửa hàng',
        },
    ];

    constructor() {}

    ngOnInit(): void {}

    onToggleSearch() {
        this.toggleSearch = !this.toggleSearch;
    }
}
