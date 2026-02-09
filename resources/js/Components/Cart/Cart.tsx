import React from "react";
import { Button } from "@/Components/ui/button";
import { CartItem } from "@/types";
export default function Cart({ item }: { item: CartItem }) {
    return (
        <div
            key={item.id}
            className="rounded-none border border-border bg-background/90 p-4 shadow-sm"
        >
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
                            ${(item.price * item.qty).toFixed(2)}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="rounded-none border border-border bg-muted/60 px-2 py-1">
                            Color: {item.color}
                        </span>
                        <span className="rounded-none border border-border bg-muted/60 px-2 py-1">
                            Size: {item.size}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon-xs">
                                -
                            </Button>
                            <span className="text-xs text-muted-foreground">
                                Qty {item.qty}
                            </span>
                            <Button variant="outline" size="icon-xs">
                                +
                            </Button>
                        </div>
                        <Button
                            size="lg"
                            className="border border-red-500 bg-background text-red-500 hover:bg-red-500/20 "
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
