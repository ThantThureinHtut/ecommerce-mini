import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import SellerLayout from "@/Layouts/SellerLayout";
import { cn } from "@/lib/utils";
import { Order } from "@/types";
import {
    ArrowLeft,
    CalendarBlank,
    CheckCircle,
    ClipboardText,
    Clock,
    Package,
    Receipt,
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

export default function OrderDetailPage({ order }: { order: Order }) {
    const normalizedStatus = order.order_status.toLowerCase();
    const status = statusConfig[normalizedStatus] ?? statusConfig.pending;
    const StatusIcon = status.icon;
    const image = order.product?.productimages?.[0]?.image_url;
    const variantDetails = order.ordervariants ?? [];

    return (
        <SellerLayout>
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
                    <div className="flex flex-col gap-4">
                        <Link
                            href={route("order-view.dashboard")}
                            className="inline-flex w-fit items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="size-3.5" />
                            Back to Orders
                        </Link>

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div className="space-y-3">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Seller order view
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                        {order.product?.name ?? "Order detail"}
                                    </h1>
                                    <Badge
                                        variant={status.badgeVariant}
                                        className="gap-1.5 px-3 py-1"
                                    >
                                        <StatusIcon className="size-3.5" />
                                        {status.label}
                                    </Badge>
                                </div>
                                <p className="max-w-2xl text-sm text-muted-foreground">
                                    Review the order information, customer
                                    details, selected variants, and the product
                                    image from a single page.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button variant="outline" className="gap-2">
                                    <Receipt className="size-4" />
                                    Print invoice
                                </Button>
                                <Button className="gap-2">
                                    <Package className="size-4" />
                                    Update status
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
                <div className="space-y-6">
                    <div className="overflow-hidden rounded-none border border-border bg-background/90 shadow-sm">
                        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                            <div className="border-b border-border bg-muted/20 lg:border-b-0 lg:border-r">
                                <div className="aspect-[4/3] h-full w-full">
                                    {image ? (
                                        <img
                                            src={image}
                                            alt={order.product?.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full min-h-[320px] items-center justify-center bg-secondary/40 px-6 text-center">
                                            <div className="space-y-3">
                                                <div className="mx-auto grid size-14 place-items-center rounded-none bg-background text-muted-foreground">
                                                    <Package className="size-7" />
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    No product image available
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            Order Number
                                        </p>
                                        <p className="mt-2 font-mono text-base font-semibold text-foreground">
                                            {order.order_number}
                                        </p>
                                    </div>
                                    <div
                                        className={cn(
                                            "grid size-12 place-items-center rounded-none",
                                            status.accentClass,
                                        )}
                                    >
                                        <StatusIcon
                                            className="size-5"
                                            weight="fill"
                                        />
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            Product
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            {order.product?.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {order.product?.details}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            Ordered On
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                            <CalendarBlank className="size-4 text-muted-foreground" />
                                            {formatDate(order.created_at)}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            Quantity
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            {order.qty}{" "}
                                            {order.qty === 1
                                                ? "item"
                                                : "items"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            Total Price
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            ${Number(order.price).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Selected Variants
                                </p>
                                <h2 className="mt-2 text-xl font-semibold text-foreground">
                                    Product options
                                </h2>
                            </div>
                            <Badge variant="outline">
                                {variantDetails.length} selections
                            </Badge>
                        </div>

                        <Separator className="my-5" />

                        {variantDetails.length > 0 ? (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {variantDetails.map((variant) => (
                                    <div
                                        key={variant.id}
                                        className="rounded-none border border-border bg-secondary/20 p-4"
                                    >
                                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                            {variant.key}
                                        </p>
                                        <p className="mt-2 text-sm font-medium text-foreground">
                                            {variant.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-none border border-dashed border-border bg-secondary/20 px-4 py-8 text-center text-sm text-muted-foreground">
                                No variant options were selected for this order.
                            </div>
                        )}
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
                                    {order.user?.name ?? "Unknown customer"}
                                </p>
                            </div>
                            <div className="rounded-none border border-border bg-secondary/20 p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Email
                                </p>
                                <p className="mt-2 break-all text-sm font-medium text-foreground">
                                    {order.user?.email ?? "No email provided"}
                                </p>
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
                                    Status
                                </span>
                                <Badge variant={status.badgeVariant}>
                                    {status.label}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                                <span className="text-sm text-muted-foreground">
                                    Quantity
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                    {order.qty}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-3">
                                <span className="text-sm text-muted-foreground">
                                    Total
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                    ${Number(order.price).toFixed(2)}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-sm text-muted-foreground">
                                    Created
                                </span>
                                <span className="text-sm font-medium text-foreground">
                                    {formatDate(order.created_at)}
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
            </section>
        </SellerLayout>
    );
}
