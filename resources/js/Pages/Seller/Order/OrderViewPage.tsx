import SellerLayout from "@/Layouts/SellerLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Badge } from "@/Components/ui/badge";
import { Separator } from "@/Components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    ClipboardText,
    MagnifyingGlass,
    ArrowLeft,
    Package,
    Clock,
    CheckCircle,
    Truck,
    XCircle,
    Eye,
    DotsThree,
} from "@phosphor-icons/react";
import { Link } from "@inertiajs/react";

// Sample order data
const orders = [
    {
        id: "ORD-2024-001",
        customer: "John Doe",
        email: "john@example.com",
        items: 3,
        total: 287.0,
        status: "pending",
        date: "2024-01-15",
    },
    {
        id: "ORD-2024-002",
        customer: "Jane Smith",
        email: "jane@example.com",
        items: 1,
        total: 189.0,
        status: "processing",
        date: "2024-01-14",
    },
    {
        id: "ORD-2024-003",
        customer: "Bob Johnson",
        email: "bob@example.com",
        items: 2,
        total: 156.5,
        status: "shipped",
        date: "2024-01-13",
    },
    {
        id: "ORD-2024-004",
        customer: "Alice Brown",
        email: "alice@example.com",
        items: 5,
        total: 423.0,
        status: "delivered",
        date: "2024-01-12",
    },
    {
        id: "ORD-2024-005",
        customer: "Charlie Wilson",
        email: "charlie@example.com",
        items: 1,
        total: 64.0,
        status: "cancelled",
        date: "2024-01-11",
    },
];

const statusConfig: Record<
    string,
    { label: string; icon: React.ElementType; variant: string }
> = {
    pending: { label: "Pending", icon: Clock, variant: "secondary" },
    processing: { label: "Processing", icon: Package, variant: "default" },
    shipped: { label: "Shipped", icon: Truck, variant: "outline" },
    delivered: { label: "Delivered", icon: CheckCircle, variant: "default" },
    cancelled: { label: "Cancelled", icon: XCircle, variant: "destructive" },
};

export default function OrderViewPage() {
    return (
        <SellerLayout>
            {/* Header Section */}
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
                    <div className="flex flex-col gap-3">
                        <Link
                            href={route("seller.dashboard")}
                            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
                        >
                            <ArrowLeft className="size-3.5" />
                            Back to Dashboard
                        </Link>
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                Order management
                            </h1>
                            <Badge variant="secondary" className="text-sm p-4">
                                <ClipboardText className="size-4 mr-2" />
                                {orders.length} orders
                            </Badge>
                        </div>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Track, manage, and fulfill your customer orders.
                            View order details and update statuses.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Cards */}
            <section className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-none border border-border bg-background/90 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-none bg-amber-500/10 text-amber-600">
                            <Clock className="size-5" weight="fill" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-foreground">
                                12
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Pending
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-none border border-border bg-background/90 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-none bg-primary/10 text-primary">
                            <Package className="size-5" weight="fill" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-foreground">
                                8
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Processing
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-none border border-border bg-background/90 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-none bg-blue-500/10 text-blue-600">
                            <Truck className="size-5" weight="fill" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-foreground">
                                24
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Shipped
                            </p>
                        </div>
                    </div>
                </div>
                <div className="rounded-none border border-border bg-background/90 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-none bg-green-500/10 text-green-600">
                            <CheckCircle className="size-5" weight="fill" />
                        </div>
                        <div>
                            <p className="text-2xl font-semibold text-foreground">
                                156
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Delivered
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters & Search */}
            <section className="mt-6">
                <div className="rounded-none border border-border bg-background/90 p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search by order ID or customer..."
                                className="pl-9"
                            />
                        </div>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">
                                    Processing
                                </SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">
                                    Delivered
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="newest">
                            <SelectTrigger className="w-full sm:w-[150px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest</SelectItem>
                                <SelectItem value="oldest">Oldest</SelectItem>
                                <SelectItem value="highest">
                                    Highest Value
                                </SelectItem>
                                <SelectItem value="lowest">
                                    Lowest Value
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Orders Table */}
            <section className="mt-4 pb-8">
                <div className="rounded-none border border-border bg-background/90 shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-[1fr_1.5fr_0.8fr_0.8fr_1fr_0.8fr] gap-4 px-6 py-3 border-b border-border bg-secondary/30 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                        <span>Order ID</span>
                        <span>Customer</span>
                        <span>Items</span>
                        <span>Total</span>
                        <span>Status</span>
                        <span className="text-right">Actions</span>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-border">
                        {orders.map((order) => {
                            const status = statusConfig[order.status];
                            const StatusIcon = status.icon;

                            return (
                                <div
                                    key={order.id}
                                    className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_0.8fr_0.8fr_1fr_0.8fr] gap-2 md:gap-4 px-6 py-4 hover:bg-secondary/20 transition-colors"
                                >
                                    {/* Order ID */}
                                    <div className="flex items-center gap-2">
                                        <span className="md:hidden text-xs text-muted-foreground">
                                            Order:
                                        </span>
                                        <span className="font-mono text-sm font-medium text-foreground">
                                            {order.id}
                                        </span>
                                    </div>

                                    {/* Customer */}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-foreground">
                                            {order.customer}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {order.email}
                                        </span>
                                    </div>

                                    {/* Items */}
                                    <div className="flex items-center gap-2">
                                        <span className="md:hidden text-xs text-muted-foreground">
                                            Items:
                                        </span>
                                        <span className="text-sm text-foreground">
                                            {order.items}{" "}
                                            {order.items === 1
                                                ? "item"
                                                : "items"}
                                        </span>
                                    </div>

                                    {/* Total */}
                                    <div className="flex items-center gap-2">
                                        <span className="md:hidden text-xs text-muted-foreground">
                                            Total:
                                        </span>
                                        <span className="text-sm font-medium text-foreground">
                                            ${order.total.toFixed(2)}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant={
                                                status.variant as
                                                    | "default"
                                                    | "secondary"
                                                    | "destructive"
                                                    | "outline"
                                            }
                                            className="gap-1.5"
                                        >
                                            <StatusIcon className="size-3" />
                                            {status.label}
                                        </Badge>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1.5"
                                        >
                                            <Eye className="size-3.5" />
                                            <span className="hidden sm:inline">
                                                View
                                            </span>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="size-8 p-0"
                                        >
                                            <DotsThree
                                                className="size-4"
                                                weight="bold"
                                            />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Table Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-border bg-secondary/30">
                        <p className="text-xs text-muted-foreground">
                            Showing {orders.length} of {orders.length} orders
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled
                                className="text-xs"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </SellerLayout>
    );
}
