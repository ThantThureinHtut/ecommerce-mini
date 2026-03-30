import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { Star } from "@/Components/Star";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import { Link, useForm } from "@inertiajs/react";
import { Order } from "@/types";
import { CheckCircle, Clock, Package, Truck, XCircle } from "@phosphor-icons/react";

const steps = ["pending", "processing", "shipped", "delivered"] as const;

const statusConfig: Record<
    string,
    {
        label: string;
        description: string;
        icon: React.ElementType;
        badgeClassName: string;
    }
> = {
    none: {
        label: "Pending",
        description: "Your order has been placed and is waiting for seller confirmation.",
        icon: Clock,
        badgeClassName: "bg-secondary text-secondary-foreground",
    },
    pending: {
        label: "Pending",
        description: "Your order has been placed and is waiting for seller confirmation.",
        icon: Clock,
        badgeClassName: "bg-secondary text-secondary-foreground",
    },
    processing: {
        label: "Processing",
        description: "The seller is packing your item and preparing shipment.",
        icon: Package,
        badgeClassName: "bg-foreground text-background",
    },
    shipped: {
        label: "Shipped",
        description: "Your order is on the way to your delivery address.",
        icon: Truck,
        badgeClassName: "border border-border bg-background text-foreground",
    },
    delivered: {
        label: "Delivered",
        description: "The item has arrived. You can rate it and leave a comment below.",
        icon: CheckCircle,
        badgeClassName: "bg-primary text-primary-foreground",
    },
    cancelled: {
        label: "Cancelled",
        description: "This order was cancelled and will not be delivered.",
        icon: XCircle,
        badgeClassName: "bg-destructive text-destructive-foreground",
    },
};

const formatDate = (value: string) =>
    new Date(value).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });

export default function OrderTrackingPage({
    order,
    rating,
    review,
}: {
    order: Order;
    rating?: number | null;
    review?: string | null;
}) {
    const normalizedStatus = order.order_status.toLowerCase();
    const currentStatus = statusConfig[normalizedStatus] ?? statusConfig.pending;
    const CurrentIcon = currentStatus.icon;
    const currentStepIndex =
        normalizedStatus === "none"
            ? 0
            : normalizedStatus === "cancelled"
              ? -1
              : Math.max(steps.indexOf(normalizedStatus as (typeof steps)[number]), 0);
    const image = order.product?.productimages?.[0]?.image_url;
    const variantDetail = order.ordervariants.map((variant) => `${variant.key}: ${variant.value}`);
    const canLeaveFeedback = normalizedStatus === "delivered";

    const form = useForm({
        rating: rating ?? 5,
        review: review ?? "",
    });

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
                            Buyer order detail
                        </p>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-3">
                                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                    Order {order.order_number}
                                </h1>
                                <p className="max-w-2xl text-sm text-muted-foreground">
                                    {currentStatus.description}
                                </p>
                            </div>
                            <Badge className={cn("gap-2 px-3 py-1", currentStatus.badgeClassName)}>
                                <CurrentIcon className="size-4" />
                                {currentStatus.label}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                            <span>Placed {formatDate(order.created_at)}</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>Qty {order.qty}</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>${Number(order.price).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="space-y-6 order-enter-main">
                    <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Delivery progress
                            </h2>
                            <Badge variant="secondary">{currentStatus.label}</Badge>
                        </div>
                        <Separator className="my-4" />

                        <div className="grid gap-4 md:grid-cols-4">
                            {steps.map((step, index) => {
                                const isActive = currentStepIndex >= index;
                                const stepStatus = statusConfig[step];
                                const StepIcon = stepStatus.icon;

                                return (
                                    <div
                                        key={step}
                                        className={cn(
                                            "rounded-none border p-4 transition-colors",
                                            isActive
                                                ? "border-foreground bg-secondary/40"
                                                : "border-border bg-background",
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "grid size-10 place-items-center rounded-none border",
                                                    isActive
                                                        ? "border-foreground bg-foreground text-background"
                                                        : "border-border bg-background text-muted-foreground",
                                                )}
                                            >
                                                <StepIcon className="size-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">
                                                    {stepStatus.label}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {index === 0
                                                        ? "Order confirmed"
                                                        : index === 1
                                                          ? "Packed by seller"
                                                          : index === 2
                                                            ? "Moving to you"
                                                            : "Received by buyer"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {normalizedStatus === "cancelled" ? (
                            <p className="mt-4 text-sm text-destructive">
                                This order was cancelled. Contact support if this looks incorrect.
                            </p>
                        ) : null}
                    </div>

                    <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Item summary
                        </h2>
                        <Separator className="my-4" />
                        <div className="flex gap-4">
                            <div className="relative w-24 shrink-0 overflow-hidden rounded-none border border-border bg-muted/40">
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

                            <div className="flex-1 space-y-2">
                                <p className="text-lg font-semibold text-foreground">
                                    {order.product?.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {variantDetail.length > 0
                                        ? variantDetail.join(" • ")
                                        : order.product?.details}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <span>Quantity: {order.qty}</span>
                                    <span className="text-foreground">
                                        Total: ${Number(order.price).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                    Rating and comment
                                </h2>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    {canLeaveFeedback
                                        ? "Share how this order went. You can update your feedback later."
                                        : "Feedback becomes available after the item is delivered."}
                                </p>
                            </div>
                            {rating || review ? (
                                <Badge variant="outline">Saved</Badge>
                            ) : null}
                        </div>

                        <Separator className="my-4" />

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                form.post(route("order.review.store", order.id));
                            }}
                            className="space-y-5"
                        >
                            <div className="space-y-3">
                                <Label>Your rating</Label>
                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: 5 }).map((_, index) => {
                                            const value = index + 1;

                                            return (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    onClick={() => form.setData("rating", value)}
                                                    disabled={!canLeaveFeedback}
                                                    className={cn(
                                                        "rounded-none border border-transparent p-1 transition",
                                                        canLeaveFeedback
                                                            ? "hover:border-border"
                                                            : "cursor-not-allowed opacity-60",
                                                    )}
                                                    aria-label={`Rate ${value} stars`}
                                                >
                                                    <Star active={value <= form.data.rating} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        {form.data.rating} out of 5
                                    </span>
                                </div>
                                {form.errors.rating ? (
                                    <p className="text-xs text-destructive">{form.errors.rating}</p>
                                ) : null}
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="review">Your comment</Label>
                                <Textarea
                                    id="review"
                                    value={form.data.review}
                                    onChange={(event) => form.setData("review", event.target.value)}
                                    disabled={!canLeaveFeedback}
                                    rows={5}
                                    placeholder="Tell other buyers what arrived, how it felt, and whether it matched expectations."
                                />
                                {form.errors.review ? (
                                    <p className="text-xs text-destructive">{form.errors.review}</p>
                                ) : null}
                            </div>

                            <Button type="submit" disabled={!canLeaveFeedback || form.processing}>
                                {form.processing
                                    ? "Saving..."
                                    : review || rating
                                      ? "Update feedback"
                                      : "Submit feedback"}
                            </Button>
                        </form>
                    </div>
                </div>

                <aside className="space-y-4 order-enter-aside">
                    <div className="rounded-none border border-border bg-background/90 p-5 shadow-sm">
                        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Shipping address
                        </span>
                        <Separator className="my-4" />
                        <p className="whitespace-pre-line text-sm text-foreground">
                            {order.shipping_address || "No shipping address found for this order."}
                        </p>
                    </div>

                    <div className="rounded-none border border-border bg-secondary/40 p-5">
                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Quick actions
                            </span>
                            <Badge variant="secondary">Buyer</Badge>
                        </div>
                        <Separator className="my-4" />
                        <Link href={route("order.dashboard")} className="block">
                            <Button className="w-full">Back to orders</Button>
                        </Link>
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
