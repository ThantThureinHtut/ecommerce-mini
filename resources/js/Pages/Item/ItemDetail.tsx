import React, { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Separator } from "@/Components/ui/separator";
import { Star } from "@/Components/Star";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/Components/ui/carousel";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
} from "@/Components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { usePage } from "@inertiajs/react";
import { Variant, Product } from "@/types";
import type { EmblaCarouselType } from "embla-carousel";
import { Label } from "@/Components/ui/label";

export default function ItemDetail({ item }: { item: Product }) {
    const rating = item?.ratings_count ?? 0 / 5;
    const reviewCount = item?.ratings_count ?? 0;
    const filledStars = Math.round(rating);
    const [api, setApi] = useState<EmblaCarouselType>();
    const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
    const images = [
        {
            src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
            alt: "Minimal outfit on display",
        },
        {
            src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
            alt: "Fabric detail",
        },
        {
            src: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
            alt: "Side profile view",
        },
        {
            src: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80",
            alt: "Packaging close-up",
        },
    ];
    const { auth } = usePage().props;
    const user = auth.user;
    const isUser = auth.isUser;
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    console.log(item);
    return (
        <GuestLayout>
            <section className="relative overflow-hidden rounded-none border border-border bg-secondary/40">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 right-0 size-72 rounded-full bg-primary/10 blur-3xl"
                />

                <div className="relative z-10 grid gap-14 px-6 py-10 lg:grid-cols-[1.1fr_1fr] lg:items-start item-detail-enter">
                    <div className="space-y-4 item-detail-enter-media">
                        <div className="relative lg:max-w-xl  rounded-none border border-border bg-background/90 shadow-sm">
                            <Carousel setApi={setApi}>
                                <CarouselContent>
                                    {images.map((image, index) => (
                                        <CarouselItem key={image.src}>
                                            <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-muted/30 via-muted/60 to-muted">
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>

                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {images.slice(1).map((image, index) => (
                                <button
                                    key={image.src}
                                    type="button"
                                    className="group relative overflow-hidden rounded-none border border-border bg-background"
                                    aria-label={`View ${image.alt}`}
                                >
                                    <div className="aspect-[4/5] w-full overflow-hidden">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                        />
                                    </div>
                                    {index === 2 ? (
                                        <span className="absolute inset-0 grid place-items-center bg-foreground/70 text-[10px] font-semibold uppercase tracking-[0.3em] text-background">
                                            +6
                                        </span>
                                    ) : null}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6 item-detail-enter-info">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary">Top rated</Badge>
                                <Badge className="bg-foreground text-background">
                                    {/* {
                                        item?.productvariants?.[
                                            selectedVariantIndex
                                        ]?.status
                                    } */}
                                </Badge>
                            </div>
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                {item.name}
                            </h1>
                            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                                {item.details}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <div
                                className="flex items-center gap-0.5"
                                aria-label={`Rated ${rating} out of 5`}
                            >
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star
                                        key={index}
                                        active={index < filledStars}
                                    />
                                ))}
                            </div>
                            <span className="text-foreground font-medium">
                                {rating.toFixed(1)}
                            </span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>{reviewCount} reviews</span>
                        </div>

                        <div className="rounded-none border border-border bg-background/90 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Price
                                </span>
                                <span className="text-2xl font-semibold text-foreground">
                                    ${item?.base_price}
                                </span>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Seller
                                </span>
                                <span className="font-medium text-foreground">
                                    {item.seller?.shop_name}
                                </span>
                            </div>
                        </div>

                        <div className="rounded-none border border-border bg-background/80 p-4 text-xs text-muted-foreground">
                            Ships in 24 hours • Free returns within 30 days •
                            Eco-friendly packaging
                        </div>
                        <form
                            onSubmit={formSubmitHandler}
                            action=""
                            className="flex flex-col justify-center gap-4"
                        >
                            <div className="w-full lg:max-w-lg pb-5 border-b border-border">
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>
                                            Compute Environment
                                        </FieldLegend>
                                        <FieldDescription>
                                            Select the compute environment for
                                            your cluster.
                                        </FieldDescription>
                                        {item?.variants?.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex flex-col gap-3"
                                            >
                                                <Separator />
                                                <Label className="text-base font-bold">
                                                    {
                                                        product?.product_type
                                                            ?.name
                                                    }
                                                </Label>

                                                <RadioGroup className="gap-3 grid grid-cols-1 md:grid-cols-2 ">
                                                    {product?.product_values?.map(
                                                        (value) => (
                                                            <FieldLabel
                                                                key={value.id}
                                                                htmlFor={`${value?.name}`}
                                                                className="cursor-pointer hover:bg-accent transition-all [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 dark:[&:has([data-state=checked])]:bg-primary/20"
                                                            >
                                                                <Field
                                                                    orientation="horizontal"
                                                                    className="items-start justify-between gap-4"
                                                                >
                                                                    <FieldContent className="gap-1">
                                                                        <FieldTitle>
                                                                            {
                                                                                value?.name
                                                                            }
                                                                        </FieldTitle>
                                                                    </FieldContent>
                                                                    <RadioGroupItem
                                                                        value={`${value?.name}`}
                                                                        id={`${value?.name}`}
                                                                    />
                                                                </Field>
                                                            </FieldLabel>
                                                        ),
                                                    )}
                                                </RadioGroup>
                                            </div>
                                        ))}
                                    </FieldSet>
                                </FieldGroup>
                            </div>

                            <div>
                                <Select>
                                    <SelectTrigger className="w-[180px] text-sm py-4">
                                        <SelectValue
                                            placeholder={"Quantity 1"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Array.from({
                                            length: Number(),
                                        }).map((_, index) => (
                                            <SelectItem
                                                value={`${index}`}
                                                key={index}
                                            >
                                                {`Quantity ${index + 1}`}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Add Cart And Buy now */}
                            {user && isUser ? (
                                <div className="flex gap-4">
                                    <Button className="rounded-none border border-border p-5 text-xs flex-1">
                                        Add Cart
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        className="rounded-none border border-border p-5 text-xs flex-1"
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <AlertDialog>
                                        <AlertDialogTrigger
                                            className="flex-1"
                                            asChild
                                        >
                                            <div>
                                                <Button className="rounded-none border border-border p-5 text-xs w-full">
                                                    Add Cart
                                                </Button>
                                            </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-lg">
                                                    Login required
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className="text-sm">
                                                    Please log in or sign up
                                                    first to add items to your
                                                    cart.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction>
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                    <AlertDialog>
                                        <AlertDialogTrigger
                                            className="flex-1"
                                            asChild
                                        >
                                            <div>
                                                <Button
                                                    variant={"outline"}
                                                    className="rounded-none border border-border p-5 text-xs w-full"
                                                >
                                                    Buy Now
                                                </Button>
                                            </div>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className="text-lg">
                                                    Login required
                                                </AlertDialogTitle>
                                                <AlertDialogDescription className="text-sm">
                                                    Please log in or sign up
                                                    first to buy this item.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Cancel
                                                </AlertDialogCancel>
                                                <AlertDialogAction>
                                                    Continue
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
