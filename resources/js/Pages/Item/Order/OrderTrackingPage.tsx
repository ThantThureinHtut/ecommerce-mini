import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { Link } from "@inertiajs/react";

type TrackingEvent = {
    id: number;
    title: string;
    detail: string;
    time: string;
    location: string;
    status: "none" | "pending" | "processing" | "shipped" | "delivered" | "cancelled";
};

export default function OrderTrackingPage() {
    const orderId = "MM-1204-8821";
    const trackingId = "TH-88-905-221";
    const eta = "Jan 15, 2:00 PM - 6:00 PM";
    const trackingEvents: TrackingEvent[] = [
        {
            id: 1,
            title: "Order placed",
            detail: "Payment confirmed and order created.",
            time: "Jan 12, 9:12 AM",
            location: "Yangon",
            status: "none",
        },
        {
            id: 2,
            title: "Packed and ready",
            detail: "Items packed at Arcadia Supply Co.",
            time: "Jan 12, 6:42 PM",
            location: "Yangon Fulfillment",
            status: "processing",
        },
        {
            id: 3,
            title: "In transit",
            detail: "Handed to carrier, moving to hub.",
            time: "Jan 13, 7:25 AM",
            location: "Mandalay Hub",
            status: "cancelled",
        },
        {
            id: 4,
            title: "Out for delivery",
            detail: "Courier is on the way to you.",
            time: "Expected Jan 15",
            location: "Yangon",
            status: "upcoming",
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
                    <div className="flex flex-col gap-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Tracking status
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                Order tracking
                            </h1>
                            <Badge className="bg-foreground text-background">
                                In transit
                            </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span>Order {orderId}</span>
                            <Separator
                                orientation="vertical"
                                className="h-4"
                            />
                            <span>Tracking {trackingId}</span>
                            <Separator
                                orientation="vertical"
                                className="h-4"
                            />
                            <span>ETA {eta}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="relative flex size-2">
                                <span className="absolute inline-flex size-2 animate-ping rounded-full bg-primary/40" />
                                <span className="relative inline-flex size-2 rounded-full bg-primary" />
                            </span>
                            Live updates enabled
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
                <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm order-enter-main">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Shipment timeline
                        </h2>
                        <Badge variant="secondary">Updated 5 min ago</Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative border-l border-border pl-6">
                        <div className="space-y-6">
                            {trackingEvents.map((event) => (
                                <div key={event.id} className="relative">
                                    <span
                                        className={`absolute -left-[13px] top-2 flex size-6 items-center justify-center rounded-full border ${
                                            event.status === "done"
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : event.status === "current"
                                                ? "border-foreground bg-foreground text-background"
                                                : "border-border bg-background text-muted-foreground"
                                        }`}
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    </span>
                                    <div className="rounded-none border border-border bg-background/80 p-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h3 className="text-sm font-semibold text-foreground">
                                                {event.title}
                                            </h3>
                                            <Badge
                                                variant={
                                                    event.status === "current"
                                                        ? "default"
                                                        : "outline"
                                                }
                                            >
                                                {event.status === "done"
                                                    ? "Complete"
                                                    : event.status === "current"
                                                    ? "In progress"
                                                    : "Next"}
                                            </Badge>
                                        </div>
                                        <p className="mt-2 text-xs text-muted-foreground">
                                            {event.detail}
                                        </p>
                                        <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                                            <span>{event.time}</span>
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="space-y-4 order-enter-aside">
                    <div className="rounded-none border border-border bg-background/90 p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Delivery address
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
                        <Button variant="outline" className="mt-4 w-full">
                            Contact support
                        </Button>
                    </div>

                    <div className="rounded-none border border-border bg-secondary/40 p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Order summary
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                                $325.00
                            </span>
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-3 text-xs text-muted-foreground">
                            <div className="flex items-center justify-between">
                                <span>Softline Daypack</span>
                                <span className="text-foreground">$189.00</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Studio Knit Tee</span>
                                <span className="text-foreground">$64.00</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Delivery</span>
                                <span className="text-foreground">$12.00</span>
                            </div>
                        </div>
                        <Button className="mt-4 w-full">
                            Track another order
                        </Button>
                        <Link href="/" className="mt-2 block">
                            <Button variant="outline" className="w-full">
                                Back to shop
                            </Button>
                        </Link>
                    </div>
                </aside>
            </section>
        </GuestLayout>
    );
}
