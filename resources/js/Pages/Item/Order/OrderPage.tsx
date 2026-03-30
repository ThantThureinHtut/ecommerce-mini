import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";
import { Order } from "@/types";

const steps = ["Placed", "Packed", "In transit", "Delivered"];

const statusProgress: Record<string, number> = {
    placed: 0,
    packed: 1,
    processing: 1,
    shipped: 2,
    "in transit": 2,
    delivered: 3,
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

export default function OrderPage({
    orders,
}: {
    orders: Order[];
}) {
    return (
        <GuestLayout>
            <section className="relative overflow-hidden rounded-none border border-border bg-secondary/40 order-enter">
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
                            Orders in progress
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                Shipping orders
                            </h1>
                            <Badge variant="secondary" className="text-sm p-4">
                                {orders.length} active
                            </Badge>
                        </div>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Track the orders that are moving to you now. Tap an
                            item to see live tracking updates.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_0.9fr] p-4">
                    <div className="space-y-5 order-enter-main">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-none border border-border bg-background/90 p-5 shadow-sm"
                        >
                            {(() => {
                                const normalizedStatus = order.order_status.toLowerCase();
                                const progress = statusProgress[normalizedStatus] ?? 0;
                                const image = order.product?.productimages?.[0]?.image_url;
                                const variantDetail = order.ordervariants
                                    .map((variant) => variant.value)
                                    .join(" • ");

                                return (
                                    <>
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        <span>Order {order.order_number}</span>
                                        <Separator
                                            orientation="vertical"
                                            className="h-4"
                                        />
                                        <span>{formatDate(order.created_at)}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-base font-semibold text-foreground">
                                            {order.order_status}
                                        </h2>
                                        <Badge
                                            className={cn(
                                                "text-xs",
                                                progress >= 2
                                                    ? "bg-foreground text-background"
                                                    : "bg-secondary text-secondary-foreground"
                                            )}
                                        >
                                            {order.order_status}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Total
                                    </p>
                                    <p className="text-lg font-semibold text-foreground">
                                        ${Number(order.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                                {steps.map((step, index) => (
                                    <div
                                        key={`${order.id}-${step}`}
                                        className="flex items-center gap-2 text-xs"
                                    >
                                        <span
                                            className={cn(
                                                "size-2 rounded-full border",
                                                index <= progress
                                                    ? "border-foreground bg-foreground"
                                                    : "border-border bg-background"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                index <= progress
                                                    ? "text-foreground"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            {step}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Separator className="my-4" />

                            <div className="grid gap-3 sm:grid-cols-2">
                                <Link
                                    href={route("order.tracking", order.id)}
                                    className="group"
                                >
                                    <div className="flex gap-3 rounded-none border border-border bg-background/80 p-3 transition hover:border-foreground/40 hover:bg-muted/40">
                                        <div className="relative w-16 shrink-0 overflow-hidden rounded-none border border-border bg-muted/40">
                                            <div className="aspect-[4/5] w-full">
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt={order.product?.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between gap-2">
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">
                                                    {order.product?.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {variantDetail || order.product?.details}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>Qty {order.qty}</span>
                                                <span className="text-foreground">
                                                    ${Number(order.price).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-3">
                                <Link href={route("order.tracking", order.id)}>
                                    <Button className="h-9 px-4">
                                        Track order
                                    </Button>
                                </Link>
                                <Button variant="outline" className="h-9 px-4">
                                    View invoice
                                </Button>
                            </div>
                                    </>
                                );
                            })()}
                        </div>
                    ))}
                </div>
                <aside className="space-y-4 order-enter-aside">
                    <div className="rounded-none border border-border bg-secondary/40 p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Need help?
                            </span>
                            <Badge variant="secondary">24/7</Badge>
                        </div>
                        <Separator className="my-4" />
                        <p className="text-xs text-muted-foreground">
                            Our team can update delivery details or change the
                            recipient before dispatch.
                        </p>
                        <Button variant="outline" className="mt-4 w-full">
                            Contact support
                        </Button>
                        <Link href="/" className="mt-2 block">
                            <Button className="w-full">Back to shop</Button>
                        </Link>
                    </div>
                </aside>
            </section>
        </GuestLayout>
    );
}
