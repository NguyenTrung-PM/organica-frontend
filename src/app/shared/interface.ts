export interface Group {
    id: number;
    name: string;
    categories: Category[];
}
export interface Category {
    id: number;
    name: string;
}
export interface Content {
    content: Product[] | Image[] | Descriped[];
    size: number;
    totalElements: number;
}
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    discount: number;
    quantity: number;
    quality: number;
    unit: string;
    category: Category;
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

export interface CartProduct {
    product: Product;
    quantity: number;
    subPrice: number;
}

export interface User {
    usernameOrEmail: string;
    password: number;
}

export interface signUpData {
    email: string;
    name: string;
    password: string;
    phoneNum: string;
    username: string;
}
