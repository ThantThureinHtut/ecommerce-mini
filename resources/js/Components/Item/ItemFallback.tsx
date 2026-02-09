import React from "react";
import { Skeleton } from "@/Components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function ItemFallback({ className }: { className?: string }) {
    return (
        <Skeleton
            className={cn(
                "group/item relative flex h-full flex-col overflow-hidden rounded-none border border-border bg-background",
                className
            )}
        >
            {/* Image skeleton */}
            <div className="relative">
                <Skeleton className="aspect-[5/5] w-full" />
            </div>

            {/* Content skeleton */}
            <div className="flex flex-1 flex-col gap-3 border-t border-border p-4">
                <div className="space-y-2">
                    {/* Product name skeleton */}
                    <Skeleton className="h-4 w-3/4" />

                    {/* Rating skeleton */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-8" />
                    </div>
                </div>

                {/* Price and button skeleton */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-10 w-24" />
                </div>
            </div>
        </Skeleton>
    );
}
