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
    content: Product[] | Image[] | Descriped[] | User[];
    size: number;
    totalElements: number;
    last: boolean;
    pageable: Pageable;
    totalPages: number;
}

export interface Pageable {
    pageNumber: number;
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
    id: number;
    userId: number;
    quantity: number;
    product: Product;
    orderAt: any;
    ordered: boolean;
}

export interface User {
    usernameOrEmail: string;
    password: number;
}

export interface User2 {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    username: string;
    password: string;
    addresses: Address[];
    createdAt: string;
    updatedAt: string;
    roles: Role[];
}

export interface Address {
    provinceCity: string;
    district: string;
    town: string;
    street: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface signUpData {
    email: string;
    name: string;
    password: string;
    phoneNum: string;
    username: string;
}

export interface orderItem {
    id?: number;
    userId: number;
    quantity: number;
    product: Product;
    orderAt?: string;
    ordered: boolean;
}
