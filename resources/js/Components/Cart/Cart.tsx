import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/Components/ui/button";
import { CartItem } from "@/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { Link, router } from "@inertiajs/react";

type Variant = {
    [key:string] : string | null
};

export default function Cart({
    item,
    variant,
}: {
    item: CartItem;
    variant: Variant[] ;
}) {
    const [qty, setQty] = useState<number>(item.qty);
    const [confirmedQty, setConfirmedQty] = useState<number>(item.qty);
    const [showAuthAlert, setShowAuthAlert] = useState(false);
    const [showStockLimitAlert, setShowStockLimitAlert] = useState(false);
    const [stockLimitMessage, setStockLimitMessage] = useState(
        "You have reached the maximum available stock for this item.",
    );
    const latestRequestId = useRef(0);
    const quantityHandler = (value: string) => {
        if (value === "increment") {
            setQty((prev) => prev + 1);
        } else if (value === "decrement") {
            setQty((prev) => {
                if (prev > 1) {
                    return prev - 1;
                }
                setShowAuthAlert(true);
                return prev;
            });
        }
    };

    useEffect(() => {
        if (qty === confirmedQty) {
            return;
        }

    const timeout = setTimeout(() => {
            latestRequestId.current += 1;
            const requestId = latestRequestId.current;

            router.post(route("cart.update"), {
                item_id: item.id,
                product_id: item.product_id,
                variant: variant,
                quantity: qty,
            }, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: () => {
                    if (requestId === latestRequestId.current) {
                        setConfirmedQty(qty);
                    }
                },
                onError: (errors) => {
                    if (requestId !== latestRequestId.current) {
                        return;
                    }

                    const fallbackMessage =
                        "You have reached the maximum available stock for this item.";
                    const serverMessage = Array.isArray(errors.quantity)
                        ? errors.quantity[0]
                        : errors.quantity;

                    setStockLimitMessage(serverMessage || fallbackMessage);
                    setShowStockLimitAlert(true);
                    setQty(confirmedQty);
                },
            });
        }, 500);

        return () => clearTimeout(timeout);
    }, [qty, confirmedQty, item.id, item.product_id, variant]);

    return (
        <div
            key={item.id}
            className="rounded-none border border-border bg-background/90 p-4 shadow-sm"
        >
            <AlertDialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
                <AlertDialogContent
                    size="default"
                    className="max-w-lg gap-6 border border-border bg-background p-6 shadow-2xl sm:p-7"
                >
                    <AlertDialogHeader className="gap-4 sm:grid-cols-[88px_minmax(0,1fr)] sm:items-start sm:text-left">
                        <AlertDialogMedia className="mb-0 size-[88px] overflow-hidden border border-border bg-muted/40">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                            />
                        </AlertDialogMedia>
                        <div className="space-y-3">
                            <AlertDialogTitle className="text-xl font-semibold leading-tight text-foreground">
                                Remove this item from your cart?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm leading-6 text-muted-foreground">
                                This will remove{" "}
                                <span className="font-medium text-foreground">
                                    {item.name}
                                </span>
                                {variant
                                    ? ` (${Object.values(variant)
                                          .filter(Boolean)
                                          .join(", ")})`
                                    : ""}{" "}
                                from your cart.
                            </AlertDialogDescription>
                            <div className="rounded-none border border-border bg-muted/30 px-4 py-3 text-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-muted-foreground">
                                        Current quantity
                                    </span>
                                    <span className="font-medium text-foreground">
                                        {qty}
                                    </span>
                                </div>
                                <div className="mt-2 flex items-center justify-between gap-3">
                                    <span className="text-muted-foreground">
                                        Total
                                    </span>
                                    <span className="font-semibold text-foreground">
                                        ${(item.price * qty).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3 sm:grid sm:grid-cols-2">
                        <AlertDialogCancel className="h-11 w-full border-border text-sm font-medium">
                            Keep item
                        </AlertDialogCancel>
                        <AlertDialogAction
                            asChild
                            className="h-11 w-full bg-red-600 text-sm font-medium text-white hover:bg-red-700"
                        >
                            <Link method="post" href={route("cart.remove", { item_id: item.id })}>
                                Yes
                            </Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <AlertDialog
                open={showStockLimitAlert}
                onOpenChange={setShowStockLimitAlert}
            >
                <AlertDialogContent
                    size="default"
                    className="max-w-md gap-6 border border-border bg-background p-6 shadow-2xl sm:p-7"
                >
                    <AlertDialogHeader className="space-y-3 text-left">
                        <AlertDialogTitle className="text-xl font-semibold leading-tight text-foreground">
                            Stock limit reached
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm leading-6 text-muted-foreground">
                            {stockLimitMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="h-11 w-full text-sm font-medium">
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="relative w-full max-w-[130px] overflow-hidden rounded-none border border-border bg-muted/40">
                    <div className="aspect-[4/5] w-full">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h3 className="text-sm font-semibold text-foreground">
                                {item.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                {item.detail}
                            </p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                            ${(item.price * qty).toFixed(2)}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {variant.map((v) => {
                           return Object.entries(v).map(([key, value]) => {
                            return <span
                                key={key}
                                className={`rounded-none border border-border bg-muted/60 px-2 py-1 ${value || "hidden"}`}
                            >
                                {value ? `${key}: ${value}` : ``}
                            </span>
                        })
                        })}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon-xs"
                                onClick={() => quantityHandler("decrement")}
                            >
                                -
                            </Button>
                            <span className="text-xs text-muted-foreground">
                                Qty {qty}
                            </span>
                            <Button
                                variant="outline"
                                size="icon-xs"
                                onClick={() => quantityHandler("increment")}
                            >
                                +
                            </Button>
                        </div>
                        <Button
                            size="lg"
                            className="border border-red-500 bg-background text-red-500 hover:bg-red-500/20 "
                            onClick={() => setShowAuthAlert(true)}
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
