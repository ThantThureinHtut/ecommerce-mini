import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import SellerLayout from "@/Layouts/SellerLayout";
import { Order } from "@/types";
import {
    ArrowLeft,
    CalendarBlank,
    CheckCircle,
    ClipboardText,
    Clock,
    Package,
    Truck,
    User,
    XCircle,
} from "@phosphor-icons/react";
import { Link } from "@inertiajs/react";

const statusConfig: Record<
    string,
    {
        label: string;
        icon: React.ElementType;
        badgeVariant: "default" | "secondary" | "destructive" | "outline";
        accentClass: string;
    }
> = {
    none: {
        label: "Pending",
        icon: Clock,
        badgeVariant: "secondary",
        accentClass: "bg-amber-500/10 text-amber-600",
    },
    pending: {
        label: "Pending",
        icon: Clock,
        badgeVariant: "secondary",
        accentClass: "bg-amber-500/10 text-amber-600",
    },
    processing: {
        label: "Processing",
        icon: Package,
        badgeVariant: "default",
        accentClass: "bg-primary/10 text-primary",
    },
    shipped: {
        label: "Shipped",
        icon: Truck,
        badgeVariant: "outline",
        accentClass: "bg-blue-500/10 text-blue-600",
    },
    placed: {
        label: "Placed",
        icon: ClipboardText,
        badgeVariant: "secondary",
        accentClass: "bg-slate-500/10 text-slate-600",
    },
    delivered: {
        label: "Delivered",
        icon: CheckCircle,
        badgeVariant: "default",
        accentClass: "bg-green-500/10 text-green-600",
    },
    cancelled: {
        label: "Cancelled",
        icon: XCircle,
        badgeVariant: "destructive",
        accentClass: "bg-red-500/10 text-red-600",
    },
};

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const formatCurrency = (value: string | number) =>
    `$${Number(value).toFixed(2)}`;

export default function OrderDetailPage({ orders }: { orders: Order[] }) {
    const primaryOrder = orders[0];
    const shippingAddressLines = (primaryOrder?.shipping_address ?? "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

    if (!primaryOrder) {
        return (
            <SellerLayout>
                <div className="space-y-6">
                    <Link
                        href={route("order-view.dashboard")}
                        className="inline-flex w-fit items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="size-3.5" />
                        Back to Orders
                    </Link>

                    <section className="rounded-none border border-border bg-background/90 px-6 py-10 text-center shadow-sm">
                        <div className="mx-auto flex max-w-md flex-col items-center gap-3">
                            <div className="grid size-14 place-items-center rounded-none bg-secondary/40 text-muted-foreground">
                                <Package className="size-7" />
                            </div>
                            <h1 className="text-2xl font-semibold text-foreground">
                                Order not found
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                There is no seller order data available for this
                                order number.
                            </p>
                        </div>
                    </section>
                </div>
            </SellerLayout>
        );
    }

    const totalItems = orders.reduce((sum, order) => sum + order.qty, 0);
    const totalAmount = orders.reduce(
        (sum, order) => sum + Number(order.price) * order.qty,
        0,
    );
    const uniqueStatuses = Array.from(
        new Set(orders.map((order) => order.order_status.toLowerCase())),
    );

    return (
        <SellerLayout>
            <div className="space-y-8 pb-10">
                <Link
                    href={route("order-view.dashboard")}
                    className="inline-flex w-fit items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-3.5" />
                    Back to Orders
                </Link>

                <section className="relative overflow-hidden rounded-none border border-border bg-secondary/40">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-20 right-0 size-80 rounded-full bg-primary/10 blur-3xl"
                    />

                    <div className="relative z-10 px-6 py-10">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Seller order view
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                        {primaryOrder.order_number}
                                    </h1>
                                    <Badge variant="outline">
                                        {orders.length}{" "}
                                        {orders.length === 1
                                            ? "product"
                                            : "products"}
                                    </Badge>
                                </div>
                                <p className="max-w-2xl text-sm text-muted-foreground">
                                    This order groups all purchased products for
                                    the same order number. Review the customer,
                                    totals, and each line item below.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:flex">
                                <div className="rounded-none border border-border bg-background/80 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Placed
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-foreground">
                                        {formatDate(primaryOrder.created_at)}
                                    </p>
                                </div>
                                <div className="rounded-none border border-border bg-background/80 px-4 py-3">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Total
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-foreground">
                                        {formatCurrency(totalAmount)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
                    <div className="space-y-6">
                        <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Order Items
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold text-foreground">
                                        Purchased products
                                    </h2>
                                </div>
                                <Badge variant="secondary">
                                    {totalItems}{" "}
                                    {totalItems === 1 ? "item" : "items"}
                                </Badge>
                            </div>

                            <Separator className="my-5" />

                            <div className="space-y-4">
                                {orders.map((order) => {
                                    const normalizedStatus =
                                        order.order_status.toLowerCase();
                                    const status =
                                        statusConfig[normalizedStatus] ??
                                        statusConfig.pending;
                                    const StatusIcon = status.icon;
                                    const image =
                                        order.product?.productimages?.[0]
                                            ?.image_url;
                                    const lineTotal =
                                        Number(order.price) * order.qty;

                                    return (
                                        <div
                                            key={order.id}
                                            className="overflow-hidden rounded-none border border-border bg-secondary/10"
                                        >
                                            <div className="grid gap-0 md:grid-cols-[140px_1fr]">
                                                <div className="border-b border-border bg-muted/20 md:border-b-0 md:border-r">
                                                    {image ? (
                                                        <img
                                                            src={image}
                                                            alt={
                                                                order.product
                                                                    ?.name
                                                            }
                                                            className="h-40 w-full object-cover md:h-full"
                                                        />
                                                    ) : (
                                                        <div className="flex h-40 items-center justify-center bg-secondary/40 text-muted-foreground md:h-full">
                                                            <Package className="size-8" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-5">
                                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                                        <div className="space-y-2">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h3 className="text-lg font-semibold text-foreground">
                                                                    {order.product
                                                                        ?.name ??
                                                                        "Product"}
                                                                </h3>
                                                                <Badge
                                                                    variant="outline"
                                                                    className="border-primary text-primary"
                                                                >
                                                                    COD Available
                                                                </Badge>
                                                                <Badge
                                                                    variant={
                                                                        status.badgeVariant
                                                                    }
                                                                    className="gap-1.5"
                                                                >
                                                                    <StatusIcon className="size-3.5" />
                                                                    {status.label}
                                                                </Badge>
                                                            </div>

                                                            <p className="text-sm text-muted-foreground">
                                                                {order.product
                                                                    ?.details ||
                                                                    "No product description available."}
                                                            </p>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-3 sm:min-w-[260px]">
                                                            <div className="rounded-none border border-border bg-background/80 p-3">
                                                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                                                    Qty
                                                                </p>
                                                                <p className="mt-1 text-sm font-medium text-foreground">
                                                                    {order.qty}
                                                                </p>
                                                            </div>
                                                            <div className="rounded-none border border-border bg-background/80 p-3">
                                                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                                                    Line Total
                                                                </p>
                                                                <p className="mt-1 text-sm font-medium text-foreground">
                                                                    {formatCurrency(
                                                                        lineTotal,
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Separator className="my-5" />

                                                    <div className="grid gap-5 sm:grid-cols-2">
                                                        <div className="space-y-2">
                                                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                                                Selected Variants
                                                            </p>

                                                            {order.ordervariants
                                                                ?.length ? (
                                                                <div className="flex flex-wrap gap-2">
                                                                    {order.ordervariants.map(
                                                                        (
                                                                            variant,
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    variant.id
                                                                                }
                                                                                className="rounded-none border border-border bg-background px-3 py-2 text-sm"
                                                                            >
                                                                                <span className="text-muted-foreground">
                                                                                    {
                                                                                        variant.key
                                                                                    }
                                                                                    :
                                                                                </span>{" "}
                                                                                <span className="font-medium text-foreground">
                                                                                    {
                                                                                        variant.value
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-muted-foreground">
                                                                    No variant
                                                                    options were
                                                                    selected for
                                                                    this item.
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                                                Actions
                                                            </p>
                                                            <div className="flex flex-wrap gap-3">
                                                                <Link
                                                                    href={route(
                                                                        "order.print",
                                                                        order.id,
                                                                    )}
                                                                >
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                    >
                                                                        Print
                                                                        invoice
                                                                    </Button>
                                                                </Link>
                                                                <Link
                                                                    href={route(
                                                                        "seller.order.tracking",
                                                                        order.id,
                                                                    )}
                                                                >
                                                                    <Button
                                                                        size="sm"
                                                                    >
                                                                        Update
                                                                        status
                                                                    </Button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Customer
                                    </p>
                                    <h2 className="mt-2 text-xl font-semibold text-foreground">
                                        Buyer details
                                    </h2>
                                </div>
                                <div className="grid size-10 place-items-center rounded-none bg-primary/10 text-primary">
                                    <User className="size-5" weight="fill" />
                                </div>
                            </div>

                            <Separator className="my-5" />

                            <div className="space-y-4">
                                <div className="rounded-none border border-border bg-secondary/20 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Name
                                    </p>
                                    <p className="mt-2 text-sm font-medium text-foreground">
                                        {primaryOrder.user?.name ??
                                            "Unknown customer"}
                                    </p>
                                </div>
                                <div className="rounded-none border border-border bg-secondary/20 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Email
                                    </p>
                                    <p className="mt-2 break-all text-sm font-medium text-foreground">
                                        {primaryOrder.user?.email ??
                                            "No email provided"}
                                    </p>
                                </div>
                                <div className="rounded-none border border-border bg-secondary/20 p-4">
                                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                        Shipping address
                                    </p>
                                    <div className="mt-2 space-y-1 text-sm font-medium text-foreground">
                                        {shippingAddressLines.length ? (
                                            shippingAddressLines.map(
                                                (line, index) => (
                                                    <p
                                                        key={`${line}-${index}`}
                                                    >
                                                        {line}
                                                    </p>
                                                ),
                                            )
                                        ) : (
                                            <p className="text-muted-foreground">
                                                No buyer address saved for this
                                                order.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-none border border-border bg-secondary/40 p-6">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Order snapshot
                            </p>

                            <div className="mt-4 space-y-4">
                                <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                                    <span className="text-sm text-muted-foreground">
                                        Order number
                                    </span>
                                    <span className="font-mono text-sm font-medium text-foreground">
                                        {primaryOrder.order_number}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                                    <span className="text-sm text-muted-foreground">
                                        Statuses
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        {uniqueStatuses.length}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                                    <span className="text-sm text-muted-foreground">
                                        Products
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        {orders.length}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                                    <span className="text-sm text-muted-foreground">
                                        Quantity
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        {totalItems}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                                    <span className="text-sm text-muted-foreground">
                                        Total
                                    </span>
                                    <span className="text-sm font-medium text-foreground">
                                        {formatCurrency(totalAmount)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm text-muted-foreground">
                                        Created
                                    </span>
                                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                        <CalendarBlank className="size-4 text-muted-foreground" />
                                        {formatDate(primaryOrder.created_at)}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {uniqueStatuses.map((statusKey) => {
                                    const status =
                                        statusConfig[statusKey] ??
                                        statusConfig.pending;
                                    const StatusIcon = status.icon;

                                    return (
                                        <Badge
                                            key={statusKey}
                                            variant={status.badgeVariant}
                                            className="gap-1.5"
                                        >
                                            <StatusIcon className="size-3.5" />
                                            {status.label}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>
                </section>
            </div>
        </SellerLayout>
    );
}
