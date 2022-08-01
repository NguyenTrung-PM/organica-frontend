import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Params, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { MessageService } from 'src/app/services/messages/message.service';
import { SearchService } from 'src/app/services/search/search.service';
import { Product } from 'src/app/shared/interface';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    valueSearch: string = '';
    products: Product[] | any;
    length!: number;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private searchService: SearchService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.route.queryParams.subscribe((params: Params) => {
            this.valueSearch = params['keyword'];
        });
        this.getResult(this.valueSearch);

        this.router.events.pipe(filter((e) => e instanceof ActivationEnd)).subscribe((event: ActivationEnd | any) => {
            this.valueSearch = event.snapshot.queryParams['keyword'];
            this.getResult(this.valueSearch);
        });
        // this.router.events.subscribe((event) => {
        //     console.log(event);
        // });
    }
    getResult(keyword: string) {
        this.searchService.getValue(keyword).subscribe((data) => {
            this.products = data.content;
            this.length = data.content.length;
            if (this.valueSearch) {
                let msgs = [{ severity: 'success', summary: `Đã tìm thấy ${this.length} sản phẩm` }];
                this.messageService.addMessage(msgs);
            }
        });
    }
}
