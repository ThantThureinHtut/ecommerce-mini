import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { Link } from "@inertiajs/react";
import { cn } from "@/lib/utils";

export default function OrderPage() {
    const steps = ["Placed", "Packed", "In transit", "Delivered"];
    const orders = [
        {
            id: 1,
            number: "MM-1204-8821",
            date: "Jan 12, 2024",
            status: "In transit",
            eta: "Jan 15",
            total: 325,
            progress: 2,
            items: [
                {
                    id: 1,
                    name: "Softline Daypack",
                    detail: "Stone • One size",
                    price: 189,
                    qty: 1,
                    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
                },
                {
                    id: 2,
                    name: "Studio Knit Tee",
                    detail: "Ink • M",
                    price: 64,
                    qty: 2,
                    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
                },
            ],
        },
        {
            id: 2,
            number: "MM-1198-1730",
            date: "Jan 09, 2024",
            status: "Packed",
            eta: "Jan 14",
            total: 142,
            progress: 1,
            items: [
                {
                    id: 3,
                    name: "Daylight Slides",
                    detail: "Clay • 41",
                    price: 72,
                    qty: 1,
                    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
                },
                {
                    id: 4,
                    name: "Everyday Cap",
                    detail: "Onyx • OS",
                    price: 70,
                    qty: 1,
                    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
                },
            ],
        },
    ];

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
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        <span>Order {order.number}</span>
                                        <Separator
                                            orientation="vertical"
                                            className="h-4"
                                        />
                                        <span>{order.date}</span>
                                        <Separator
                                            orientation="vertical"
                                            className="h-4"
                                        />
                                        <span>ETA {order.eta}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-base font-semibold text-foreground">
                                            {order.status}
                                        </h2>
                                        <Badge
                                            className={cn(
                                                "text-xs",
                                                order.status === "In transit"
                                                    ? "bg-foreground text-background"
                                                    : "bg-secondary text-secondary-foreground"
                                            )}
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Total
                                    </p>
                                    <p className="text-lg font-semibold text-foreground">
                                        ${order.total.toFixed(2)}
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
                                                index <= order.progress
                                                    ? "border-foreground bg-foreground"
                                                    : "border-border bg-background"
                                            )}
                                        />
                                        <span
                                            className={cn(
                                                index <= order.progress
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
                                {order.items.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route("order.tracking", order.id)}
                                        className="group"
                                    >
                                        <div className="flex gap-3 rounded-none border border-border bg-background/80 p-3 transition hover:border-foreground/40 hover:bg-muted/40">
                                            <div className="relative w-16 shrink-0 overflow-hidden rounded-none border border-border bg-muted/40">
                                                <div className="aspect-[4/5] w-full">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between gap-2">
                                                <div>
                                                    <p className="text-sm font-semibold text-foreground">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {item.detail}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>Qty {item.qty}</span>
                                                    <span className="text-foreground">
                                                        ${item.price.toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
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
                        </div>
                    ))}
                </div>

                <aside className="space-y-4 order-enter-aside">
                    <div className="rounded-none border border-border bg-background/90 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Shipping address
                            </span>
                            <Badge variant="outline">Standard</Badge>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-2 text-sm">
                            <p className="font-semibold text-foreground">
                                Thant Thurein Htut
                            </p>
                            <p className="text-muted-foreground">
                                No. 48, Kabar Aye Pagoda Rd
                            </p>
                            <p className="text-muted-foreground">
                                Bahan Township, Yangon
                            </p>
                            <p className="text-muted-foreground">
                                +95 9 123 456 789
                            </p>
                        </div>
                    </div>

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
