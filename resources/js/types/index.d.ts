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
    image: string;
    name: string;
    detail: string;
    price: number;
    qty: number;
    color: string;
    size: string;
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

export type Product = {
    id: number;
    name: string;
    details: string;
    base_price: string;
    seller?: {
        id: number;
        phone_number: string;
        shop_name: string;
    };
    reviews?: Review[];
    stocks_count: number;
    ratings_count: number;
    reviews_count: string;
    variants: Variant[];
    seller_id: number;
    created_at: string;
    updated_at: string;
};
