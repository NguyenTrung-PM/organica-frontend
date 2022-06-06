import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-product-sidebar',
    templateUrl: './product-sidebar.component.html',
    styleUrls: ['./product-sidebar.component.scss'],
})
export class ProductSidebarComponent implements OnInit {
    items!: MenuItem[];

    constructor() {}

    ngOnInit(): void {
        this.items = [
            {
                label: 'Rau củ quả',
                items: [
                    {
                        label: 'Rau ăn lá',
                        command: (event) => {
                            //event.originalEvent: Browser event
                            //event.item: menuitem metadata
                            // console.log(event.item);
                        },
                        // style: { marginLeft: '50px' },
                    },
                    {
                        label: 'Rau ăn củ',
                        command: (event) => {
                            //event.originalEvent: Browser event
                            //event.item: menuitem metadata
                            // console.log(event.item);
                        },
                    },
                    {
                        label: 'Rau ăn quả',
                    },

                    {
                        label: 'Rau ăn hoa',
                    },
                    {
                        label: 'Rau ăn thân',
                    },
                    {
                        label: 'Rau gia vị',
                    },
                    {
                        label: 'Nấm',
                    },
                    {
                        label: 'Rau củ quả đông lạnh',
                    },
                ],
            },
            {
                label: 'Trái cây',

                items: [
                    {
                        label: 'Trái cây trong nước',
                    },
                    {
                        label: 'Trái cây nhập khẩu',
                    },
                    {
                        label: 'Trái cây đông lạnh',
                    },
                    {
                        label: 'Trái cây sấy',
                    },
                ],
            },
            {
                label: 'Thịt & Thủy hải sản',
                items: [
                    {
                        label: 'Thịt heo',
                    },
                    {
                        label: 'Thịt bò',
                    },
                    {
                        label: 'Gia cầm & Trứng',
                    },
                    {
                        label: 'Thủy hải sản',
                    },
                ],
            },
        ];
    }
}
