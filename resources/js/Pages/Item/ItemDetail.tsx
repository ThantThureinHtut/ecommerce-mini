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
import { router, usePage } from "@inertiajs/react";
import { Product } from "@/types";
import { Label } from "@/Components/ui/label";
import axios from "axios";

export default function ItemDetail({ item }: { item: Product | null }) {
    if (!item) {
        return (
            <GuestLayout>
                <section className="rounded-none border border-border bg-background/90 px-6 py-10">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Item not found
                    </h1>
                    <p className="mt-3 text-sm text-muted-foreground">
                        This product is unavailable or has been removed.
                    </p>
                </section>
            </GuestLayout>
        );
    }

    const rating = item?.ratings_count ?? 0 / 5;
    const reviewCount = item?.reviews_count ?? 0;
    const filledStars = Math.round(rating);
    const [processing, setProcessing] = useState(false);
    const variants = item.variants ?? [];
    const hasVariants = variants.length > 0;
    const defaultPrice = item?.base_price ?? "0.00";
    const defaultStock = Math.max(Number(item?.stock ?? 1), 0);

    const [priceAndQuantity, setPriceAndQuantity] = useState<{
        price: string;
        quantity: number;
    }>({ price: defaultPrice, quantity: defaultStock });
    const isOutOfStock = priceAndQuantity.quantity <= 0;
    // Track selected quantity
    const [selectedQuantityValue, setselectedQuantityValue] =
        useState<number>(1);

    // Track selected variant for each product type
    const [selectedVariantIndex, setSelectedVariantIndex] = useState<
        Record<number, number>
    >({});

    const { auth } = usePage().props;
    const user = auth.user;
    const images = item.productimages ?? [];
    // Make the limit to show the stock to prevent page crashing if stock value is too much count
    const maxSelectableQuantity = Math.min(priceAndQuantity.quantity, 40);
    const validImages = images.filter(
        (image) =>
            typeof image?.image_url === "string" && image.image_url.trim(),
    );
    const isUser = auth.isUser;
    const handleVariantChange = (
        productId: number,
        selectedValueId: string,
    ) => {
        setSelectedVariantIndex((prev) => ({
            ...prev,
            [productId]: Number(selectedValueId),
        }));
    };

    const AddCartAndOrderHandler = (
        e: React.MouseEvent<HTMLButtonElement>,
        routeName: string,
    ) => {
        e.preventDefault();
        const browserTimezone =
            Intl.DateTimeFormat().resolvedOptions().timeZone;
        let is_variant = hasVariants;
        let variant_main_count = variants.length;
        let user_selected_variant_count =
            Object.keys(selectedVariantIndex).length;
        if (is_variant) {
            if (variant_main_count !== user_selected_variant_count) {
                alert("Please select all variants");
                return;
            }
        }
        router.post(
            route(routeName),
            {
                user_id: user.id,
                product_id: item.id,
                variant_id: selectedVariantIndex,
                price: priceAndQuantity.price,
                qty: selectedQuantityValue + 1,
                browser_timezone: browserTimezone,
            },
            {
                preserveScroll: true,
                // Start processing state before the request is sent
                onStart: () => setProcessing(true),
                // Reset processing state after the request finishes (success or error)
                onFinish: () => setProcessing(false),
            },
        );
    };

    // Update price and quantity when variant changes
    useEffect(() => {
        if (!hasVariants) {
            setPriceAndQuantity({
                price: defaultPrice,
                quantity: defaultStock,
            });
            return;
        }

        if (Object.keys(selectedVariantIndex).length !== variants.length) {
            setPriceAndQuantity({
                price: defaultPrice,
                quantity: defaultStock,
            });
            return;
        }

        axios
            .post(route("item.variant"), {
                product_id: item?.id,
                product_value_id: Object.values(selectedVariantIndex),
            })
            .then((res) => {
                if (res.data.selectItem == null) {
                    setPriceAndQuantity({
                        price: defaultPrice,
                        quantity: defaultStock,
                    });
                    return;
                }
                setPriceAndQuantity({
                    price: res.data.selectItem?.price ?? defaultPrice,
                    quantity: Math.max(
                        Number(res.data.selectItem?.stock ),
                        0,
                    ),
                });
            });
    }, [
        selectedVariantIndex,
        item.id,
        defaultPrice,
        defaultStock,
        hasVariants,
        variants.length,
    ]);

    useEffect(() => {
        if (selectedQuantityValue > priceAndQuantity.quantity) {
            setselectedQuantityValue(1);
        }
    }, [priceAndQuantity.quantity, selectedQuantityValue]);

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
                            <Carousel>
                                <CarouselContent>
                                    {validImages.length > 0 ? (
                                        validImages.map((image) => (
                                            <CarouselItem key={image.id}>
                                                <div className="aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-muted/30 via-muted/60 to-muted">
                                                    <img
                                                        src={image.image_url}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            </CarouselItem>
                                        ))
                                    ) : (
                                        <CarouselItem>
                                            <div className="grid aspect-[4/5] w-full place-items-center bg-gradient-to-br from-muted/30 via-muted/60 to-muted px-6 text-center">
                                                <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                                    No image
                                                </span>
                                            </div>
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>

                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                        </div>

                        <div className="grid grid-cols-4 gap-3">
                            {validImages.length > 0 ? (
                                validImages.slice(1).map((image, index) => (
                                    <button
                                        key={image.image_url}
                                        type="button"
                                        className="group relative overflow-hidden rounded-none border border-border bg-background"
                                        aria-label={`View ${image.image_url}`}
                                    >
                                        <div className="aspect-[4/5] w-full overflow-hidden">
                                            <img
                                                src={image.image_url}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                            />
                                        </div>
                                        {index === 2 ? (
                                            <span className="absolute inset-0 grid place-items-center bg-foreground/70 text-[10px] font-semibold uppercase tracking-[0.3em] text-background">
                                                +6
                                            </span>
                                        ) : null}
                                    </button>
                                ))
                            ) : (
                                <div className="col-span-4 grid aspect-[4/1] place-items-center rounded-none border border-dashed border-border bg-muted/20 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                                    No image
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 item-detail-enter-info">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="secondary">Top rated</Badge>
                                <Badge className="bg-foreground text-background">
                                    In stock
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
                                    ${priceAndQuantity.price}
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

                        {/* Add to Cart Form */}
                        <form className="flex flex-col justify-center gap-4">
                            {hasVariants ? (
                                <div className="w-full lg:max-w-lg pb-5 border-b border-border">
                                    <FieldGroup>
                                        <FieldSet>
                                            <FieldLegend>
                                                Compute Environment
                                            </FieldLegend>
                                            <FieldDescription>
                                                Select the compute environment
                                                for your cluster.
                                            </FieldDescription>
                                            {variants.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className="flex flex-col gap-3"
                                                >
                                                    <Separator />
                                                    <Label className="text-base font-bold">
                                                        {
                                                            product
                                                                ?.product_type
                                                                ?.name
                                                        }
                                                    </Label>
                                                    <FieldDescription>
                                                        Selected:{" "}
                                                        {product?.product_values?.find(
                                                            (value) =>
                                                                value.id ===
                                                                selectedVariantIndex[
                                                                    product.id
                                                                ],
                                                        )?.name ?? "None"}
                                                    </FieldDescription>

                                                    <RadioGroup
                                                        value={
                                                            selectedVariantIndex[
                                                                product.id
                                                            ]?.toString() ?? ""
                                                        }
                                                        onValueChange={(
                                                            value,
                                                        ) =>
                                                            handleVariantChange(
                                                                product.id,
                                                                value,
                                                            )
                                                        }
                                                        className="gap-3 grid grid-cols-1 md:grid-cols-2 "
                                                    >
                                                        {product?.product_values?.map(
                                                            (value) => (
                                                                <FieldLabel
                                                                    key={
                                                                        value.id
                                                                    }
                                                                    htmlFor={`variant-${product.id}-value-${value.id}`}
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
                                                                            value={`${value.id}`}
                                                                            id={`variant-${product.id}-value-${value.id}`}
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
                            ) : null}

                            {/* Selected Value  */}
                            <div>
                                <Select
                                    value={String(selectedQuantityValue)}
                                    onValueChange={(value) => {
                                        setselectedQuantityValue(Number(value));
                                    }}
                                    disabled={isOutOfStock || processing}

                                >
                                    <SelectTrigger className="w-[180px] text-sm py-4">
                                        <SelectValue
                                            placeholder={"Quantity 1"}
                                        />
                                    </SelectTrigger>
                                    {isOutOfStock ? (
                                        <p className="text-sm text-destructive mt-4">
                                            Out of stock
                                        </p>
                                    ) : (
                                        <SelectContent>
                                            {Array.from({
                                                length: maxSelectableQuantity,
                                            }).map((_, index) => (
                                                <SelectItem
                                                    value={`${index}`}
                                                    key={index}
                                                >
                                                    {`Quantity ${index + 1}`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    )}
                                </Select>
                            </div>

                            {/* Add Cart And Buy now */}
                            {user && isUser ? (
                                <div className="flex gap-4">
                                    <Button
                                        className="rounded-none border border-border p-5 text-xs flex-1"
                                        onClick={(e) =>
                                            AddCartAndOrderHandler(
                                                e,
                                                "cart.store",
                                            )
                                        }
                                        disabled={processing || isOutOfStock}
                                    >
                                        Add Cart
                                    </Button>
                                    <Button
                                        variant={"outline"}
                                        onClick={(e) =>
                                            AddCartAndOrderHandler(
                                                e,
                                                "order.store",
                                            )
                                        }
                                        disabled={processing || isOutOfStock}
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
