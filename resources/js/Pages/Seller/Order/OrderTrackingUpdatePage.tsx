import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Separator } from "@/Components/ui/separator";
import SellerLayout from "@/Layouts/SellerLayout";
import { Order } from "@/types";
import {
    ArrowLeft,
    CheckCircle,
    Clock,
    Package,
    Truck,
    XCircle,
} from "@phosphor-icons/react";
import { Link, useForm } from "@inertiajs/react";

const statusConfig: Record<
    string,
    {
        label: string;
        description: string;
        icon: React.ElementType;
        badgeVariant: "default" | "secondary" | "destructive" | "outline";
    }
> = {
    pending: {
        label: "Pending",
        description: "Order is received and waiting for seller action.",
        icon: Clock,
        badgeVariant: "secondary",
    },
    processing: {
        label: "Processing",
        description: "Items are being prepared and packed.",
        icon: Package,
        badgeVariant: "default",
    },
    shipped: {
        label: "Shipped",
        description: "Package has left your store and is on the way.",
        icon: Truck,
        badgeVariant: "outline",
    },
    delivered: {
        label: "Delivered",
        description: "Customer has received the order.",
        icon: CheckCircle,
        badgeVariant: "default",
    },
    cancelled: {
        label: "Cancelled",
        description: "Order was cancelled and should not continue.",
        icon: XCircle,
        badgeVariant: "destructive",
    },
    none: {
        label: "Pending",
        description: "Order is received and waiting for seller action.",
        icon: Clock,
        badgeVariant: "secondary",
    },
};

export default function OrderTrackingUpdatePage({
    order,
    availableStatuses,
}: {
    order: Order;
    availableStatuses: string[];
}) {
    const currentStatus = order.order_status.toLowerCase();
    const form = useForm({
        order_status: currentStatus === "none" ? "pending" : currentStatus,
    });

    const selectedStatus =
        statusConfig[form.data.order_status] ?? statusConfig.pending;
    const CurrentIcon = selectedStatus.icon;

    return (
        <SellerLayout>
            <section className="relative overflow-hidden rounded-none border border-border bg-secondary/40">
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
                        <Link
                            href={route("order-view-detail.dashboard", order.id)}
                            className="inline-flex w-fit items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="size-3.5" />
                            Back to order detail
                        </Link>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Seller tracking update
                                </p>
                                <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                    Update order status
                                </h1>
                                <p className="max-w-2xl text-sm text-muted-foreground">
                                    Change the tracking state for this order so
                                    the customer sees the latest fulfillment
                                    progress.
                                </p>
                            </div>

                            <Badge
                                variant={selectedStatus.badgeVariant}
                                className="gap-2 px-3 py-1"
                            >
                                <CurrentIcon className="size-4" />
                                {selectedStatus.label}
                            </Badge>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] pb-8">
                <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Tracking control
                        </p>
                        <h2 className="text-xl font-semibold text-foreground">
                            Choose the next order status
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Current order: {order.order_number}
                        </p>
                    </div>

                    <Separator className="my-6" />

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.patch(
                                route(
                                    "seller.order.tracking.update",
                                    order.id,
                                ),
                            );
                        }}
                        className="space-y-6"
                    >
                        <div className="space-y-3">
                            <Label htmlFor="order_status">
                                Tracking status
                            </Label>
                            <Select
                                value={form.data.order_status}
                                onValueChange={(value) =>
                                    form.setData("order_status", value)
                                }
                            >
                                <SelectTrigger
                                    id="order_status"
                                    className="w-full h-11 text-sm"
                                >
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableStatuses.map((status) => (
                                        <SelectItem key={status} value={status}>
                                            {statusConfig[status]?.label ??
                                                status}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.errors.order_status ? (
                                <p className="text-xs text-destructive">
                                    {form.errors.order_status}
                                </p>
                            ) : null}
                        </div>

                        <div className="rounded-none border border-border bg-secondary/30 p-4">
                            <div className="flex items-center gap-3">
                                <div className="grid size-10 place-items-center rounded-none bg-background">
                                    <CurrentIcon className="size-5 text-foreground" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {selectedStatus.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {selectedStatus.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button type="submit" disabled={form.processing}>
                                {form.processing
                                    ? "Saving..."
                                    : "Save tracking status"}
                            </Button>
                            <Link
                                href={route(
                                    "order-view-detail.dashboard",
                                    order.id,
                                )}
                            >
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>

                <aside className="space-y-4">
                    <div className="rounded-none border border-border bg-background/90 p-5 shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Order summary
                        </p>
                        <Separator className="my-4" />
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">
                                    Product
                                </span>
                                <span className="text-right text-foreground">
                                    {order.product?.name}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">
                                    Customer
                                </span>
                                <span className="text-right text-foreground">
                                    {order.user?.name}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">
                                    Quantity
                                </span>
                                <span className="text-foreground">
                                    {order.qty}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-muted-foreground">
                                    Total
                                </span>
                                <span className="text-foreground">
                                    ${Number(order.price).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-none border border-border bg-secondary/40 p-5">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Status guide
                        </p>
                        <Separator className="my-4" />
                        <div className="space-y-3">
                            {availableStatuses.map((status) => {
                                const config =
                                    statusConfig[status] ??
                                    statusConfig.pending;
                                const Icon = config.icon;

                                return (
                                    <div
                                        key={status}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="grid size-8 place-items-center rounded-none bg-background">
                                            <Icon className="size-4 text-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">
                                                {config.label}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {config.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </aside>
            </section>
        </SellerLayout>
    );
}
