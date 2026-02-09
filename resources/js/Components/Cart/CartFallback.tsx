import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CartFallback() {
    return (
        <Skeleton className="rounded-none border border-border bg-background/90 p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="relative w-full max-w-[130px] overflow-hidden rounded-none border border-border bg-muted/40">
                    <div className="aspect-[4/5] w-full">
                        <Skeleton className="h-full w-full object-cover" />
                    </div>
                </div>

                <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <Skeleton className="text-sm font-semibold text-foreground w-80 h-4" />
                            <Skeleton className="text-xs text-muted-foreground w-40 h-4 mt-2" />
                        </div>
                        <Skeleton className="text-sm font-semibold text-foreground w-20 h-6" />
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <Skeleton className="rounded-none border border-border bg-muted/60 px-2 py-1 w-14 h-6" />
                        <Skeleton className="rounded-none border border-border bg-muted/60 px-2 py-1 w-14 h-6" />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-5 h-5" />
                            <Skeleton className="text-xs text-muted-foreground w-10 h-6" />
                            <Skeleton className="w-5 h-5" />
                        </div>
                        <Skeleton className="w-16 h-9" />
                    </div>
                </div>
            </div>
        </Skeleton>
    );
}
