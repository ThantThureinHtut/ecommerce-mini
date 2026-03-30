export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
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
    average_rating?: number;
    ratings_count: number;
    reviews_count: string;
    variants?: Variant[];
    seller_id?: number;
    created_at: string;
    updated_at: string;
};

export interface OrderVariant {
    id: number;
    order_id: number;
    key: string;
    value: string;
}

export interface Order {
    id: number;
    order_number: string;
    order_status: string;
    price: string;
    qty: number;
    user_id: number;
    product_id: number;
    created_at: string;
    updated_at: string;
    shipping_address?: string | null;
    product: Product;
    ordervariants: OrderVariant[];
    user: User;
}

export interface SellerOrder {
      order_number: string;
      latest_created_at: string;
      item_count: number;
      name: string;
      email: string;
      total_amount: string;
}


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
