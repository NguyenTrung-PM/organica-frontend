import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/services/products/product.service';
import { Product, Image, Descriped, Content } from 'src/app/shared/interface';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    images!: Image[] | any;
    describes!: Descriped[] | any;
    id!: number;
    product!: Product;
    products!: Product[] | any;
    quantity: number = 1;
    length!: number;
    certificates = [
        {
            id: 1,
            title: 'ORGANICA',
            content:
                'Bạn đang chọn mua các loại thực phẩm hữu cơ của Organica, một trong những thương hiệu tiên phong về phát triển thực phẩm hữu cơ tại Việt Nam. Bạn sẽ yên tâm, không còn phải lo lắng về bữa ăn của gia đình mình nữa khi chọn mua các sản phẩm hữu cơ của Organica vì quá trình sản xuất đảm bảo không sử dụng phân bón hoá học, thuốc trừ sâu, trừ cỏ độc hại, không dùng chất kích thích tăng trưởng hay chất bảo quản, không sử dụng giống hay thành phần biến đổi gene (GMO). Organica có trang trại trồng rau củ quả nhiệt đới đạt chuẩn hữu cơ quốc tế USDA của Mỹ và Liên minh châu Âu (EU) đầu tiên tại Việt Nam từ năm 2015. Từ các nông sản từ trang trại hữu cơ, Organica cũng chế biến thành các loại thực phẩm khô chứng nhận hữu cơ quốc tế. Không chỉ là đơn vị đầu tư sản xuất, Organica cũng là đơn vị đầu tiên tại Việt Nam phát triển chuỗi cửa hàng bán lẻ thực phẩm hữu cơ tại TP.HCM, Hà Nội và Đà Nẵng.',
            img: 'logo.png',
        },
    ];
    natures = ['Chứng nhận hữu cơ USDA', 'Chứng nhận hữu cơ EU', 'Thuần Chay', 'Chay', 'Không hoá chất', ' Không chất bảo quản'];
    responsiveOptions: any[] = [
        {
            breakpoint: '360px',
            numVisible: 3,
        },
        {
            breakpoint: '280px',
            numVisible: 2,
        },
    ];
    constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
        });
        this.productService.getProductById(this.id).subscribe((data) => {
            this.product = data;
            this.productService.getImageById(this.id).subscribe((image) => {
                this.images = image.content;
                this.length = this.images.length;
            });
            this.productService.getDescribeById(this.id).subscribe((desc) => {
                this.describes = desc.content;
            });
        });
        this.productService.getAllProducts().subscribe((products) => {
            this.products = products.content;
        });
    }
    onChangeQuantity() {
        console.log(this.quantity);
    }
}
