import React, { Suspense, lazy } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { Link } from "@inertiajs/react";
import CartFallback from "@/Components/Cart/CartFallback";
const Cart = lazy(() => import("@/Components/Cart/Cart"));
export default function CartPage({ items }: { items?: any[] }) {
    const cartItems = (items ?? []).map((item) => {
        return {
            id: item.id,
            product_id: item.product.id,
            name: item.product.name,
            detail: item.product.details,
            price: item.price,
            qty: item.qty,
            image: item.product.productimages[0]?.image_url || "",
        };
    });
    console.log(items);
    const variant = (items ?? []).map((item) => {
        return {
            [item.cart_item_variants[0]?.product_value.product_type?.name || "N/A"]: item.cart_item_variants[0]?.product_value.name || "",
            [item.cart_item_variants[1]?.product_value.product_type?.name || "N/A"
            ]: item.cart_item_variants[1]?.product_value.name || "",
        };
    });

    const subtotal = cartItems.reduce(
        (total, item) => total + Number(item.price) * item.qty,
        0,
    );
    const shipping = subtotal >= 200 ? 0 : 12;
    const tax = subtotal * 0.06;
    const total = subtotal + shipping + tax;

    return (
        <GuestLayout>
            <section className="relative overflow-hidden rounded-none border border-border bg-secondary/40 cart-enter">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 right-0 size-80 rounded-full bg-primary/10 blur-3xl"
                />
                <div className="relative z-10 px-6 py-10">
                    <div className="flex flex-col gap-3">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Ready for checkout
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                Your cart
                            </h1>
                            <Badge variant="secondary" className="text-sm p-4">
                                {cartItems.length} items
                            </Badge>
                        </div>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Review your picks, adjust quantities, and continue
                            your calm checkout experience.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_0.9fr] pb-4">
                <div className="space-y-4 cart-enter-items">
                    {cartItems.map((item) => (
                        <Suspense key={item.id} fallback={<CartFallback />}>
                            <Cart item={item} key={item.id} variant={variant[cartItems.indexOf(item)]} />
                        </Suspense>
                    ))}

                    <div className="rounded-none border border-border bg-background/80 p-4 text-xs text-muted-foreground">
                        Free shipping on orders over $200. Easy returns within
                        30 days.
                    </div>
                </div>

                <aside className="space-y-4 cart-enter-summary">
                    <div className="rounded-none border border-border bg-background/90 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Order summary
                            </span>
                            <Badge variant="outline">Secure</Badge>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Subtotal
                                </span>
                                <span className="text-foreground">
                                    ${subtotal.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Shipping
                                </span>
                                <span className="text-foreground">
                                    {shipping === 0
                                        ? "Free"
                                        : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Tax
                                </span>
                                <span className="text-foreground">
                                    ${tax.toFixed(2)}
                                </span>
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between text-base font-semibold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button className="mt-5 h-10 w-full">
                            Proceed to checkout
                        </Button>
                        <Link href="/" className="mt-2 block">
                            <Button variant="outline" className="h-10 w-full">
                                Continue shopping
                            </Button>
                        </Link>
                    </div>
                </aside>
            </section>
        </GuestLayout>
    );
}
