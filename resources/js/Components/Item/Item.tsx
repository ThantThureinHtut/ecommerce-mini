import React from "react";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { cn } from "@/lib/utils";
import { Star } from "@/Components/Star";

type ItemProps = {
    name?: string;
    price?: string;
    imageSrc?: string;
    rating?: number;
    reviewCount?: number;
    badge?: string;
    className?: string;
    onAddToCart?: () => void;
};

export default function Item({
    name,
    price,
    imageSrc,
    rating = 0,
    reviewCount = 128,
    badge,
    className,
    onAddToCart,
}: ItemProps) {
    const clampedRating = Math.max(0, Math.min(5, rating));
    const filledStars = Math.round(clampedRating);
    return (
        <article
            className={cn(
                "group/item relative flex h-full flex-col overflow-hidden rounded-none border border-border bg-background transition duration-200 hover:-translate-y-0.5 hover:shadow-sm",
                className,
            )}
        >
            <div className="relative">
                {badge ? (
                    <Badge
                        variant="secondary"
                        className="absolute left-3 top-3 z-10"
                    >
                        {badge}
                    </Badge>
                ) : null}
                <div className="flex aspect-[5/5] items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/60">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-300 group-hover/item:scale-[1.03]"
                        />
                    ) : (
                        <div className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                            No image
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 border-t border-border p-4">
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-foreground">
                        {name}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <div
                            className="flex items-center gap-0.5"
                            aria-label={`Rated ${clampedRating} out of 5`}
                        >
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    active={index < filledStars}
                                />
                            ))}
                        </div>
                        <span className="text-xs">
                            {clampedRating.toFixed(1)}
                        </span>
                        {reviewCount ? (
                            <span className="text-xs">({reviewCount})</span>
                        ) : null}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-foreground">
                        {price}
                    </span>

                    <Button size="lg" className="px-4" onClick={onAddToCart}>
                        Add to cart
                    </Button>
                </div>
            </div>
        </article>
    );
}
