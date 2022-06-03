import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-carousel',
    templateUrl: './home-carousel.component.html',
    styleUrls: ['./home-carousel.component.scss'],
})
export class HomeCarouselComponent implements OnInit {
    imgHomeCarousel = ['badge-1.png', 'badge-2.png', 'badge-3.png', 'badge-4.png'];
    constructor() {}

    ngOnInit(): void {}
}
