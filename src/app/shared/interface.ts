export interface Group {
    id: number;
    name: string;
    // categorys: Category[];
}
export interface Category {
    id: number;
    name: string;
    product: Product[];
}
export interface Product {
    id: number;
    name: string;
    price: number;
    discount: number;
    quantity: number;
    quality: number;
    unit: string;
    describes: Descriped[];
    images: Image[];
}
export interface Descriped {
    id: number;
    title: string;
    content: string;
}
export interface Image {
    id: number;
    source: string;
}
