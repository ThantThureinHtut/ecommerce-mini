export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        isSeller: boolean;
        isUser: boolean;
    };
};

export type CartItem = {
    id: number;
    product_id: number ;
    image: string;
    name: string;
    detail: string;
    price: number;
    qty: number;
    color?: string;
    size?: string;
};

export interface OptionalValue {
    id: number;
    name: string;
    optional_type_id: number;
}
export interface OptionalType {
    id: number;
    name: string;
    optionalvalues: OptionalValue[];
    optional_value_id: number;
}

export interface OptionalTypeName {
    id: number;
    name: string;
}

export interface Variant {
    id: number;
    product_id: number;
    product_type_id: number;
    product_type: OptionalTypeName;
    product_values: OptionalValue[];
    created_at: string;
    updated_at: string;
}

export interface Review {
    id: number;
    user_id: number;
    product_id: number;
    review: string;
}

export interface Images {
    id: number;
    product_id: number;
    image_url: string;
}
export type Product = {
    id: number;
    name: string;
    details: string;
    base_price: string;
    stock?: number | null;
    seller?: {
        id: number;
        phone_number: string;
        shop_name: string;
    };
    productimages: Images[];
    reviews?: Review[];
    stocks_count?: number;
    ratings_count: number;
    reviews_count: string;
    variants?: Variant[];
    seller_id?: number;
    created_at: string;
    updated_at: string;
};



// Cart Page
interface product_type {
    id:number,
    name:string
}
interface productValue  {
    id:number,
    name: string,
    product_id: number,
    product_type: product_type
}
interface cartItemVaraints  {
    cart_item_id: number;
    id:number;
    product_value: productValue;
}
type Items  = {
    id:number
    cart_id: number ;
    cart_item_variants: cartItemVaraints[];
    price: string,
    product: Product,
    product_id: number,
    qty: number,
}
