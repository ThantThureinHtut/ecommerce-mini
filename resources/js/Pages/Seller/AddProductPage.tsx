import SellerLayout from "@/Layouts/SellerLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Badge } from "@/Components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Package,
    ImageSquare,
    CurrencyDollar,
    Tag,
    ArrowLeft,
    CloudArrowUp,
    Plus,
    Trash,
} from "@phosphor-icons/react";
import { Link, useForm } from "@inertiajs/react";
import React from "react";

type ProductForm = {
    name: string;
    description: string;
    price: string;
    compare_price: string;
    sku: string;
    quantity: string;
    category: string;
    images: File[];
};

export default function AddProductPage() {
    const { data, setData, errors, post, processing } = useForm<ProductForm>({
        name: "",
        description: "",
        price: "",
        compare_price: "",
        sku: "",
        quantity: "",
        category: "",
        images: [],
    });

    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // post(route("product.store", data));
    };

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
                                Add new product
                            </h1>
                            <Badge variant="secondary" className="text-sm p-4">
                                <Package className="size-4 mr-2" />
                                New listing
                            </Badge>
                        </div>
                        <p className="max-w-2xl text-sm text-muted-foreground">
                            Fill in the details below to add a new product to
                            your store. Make sure all required fields are
                            completed.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className="mt-8 pb-8">
                <form onSubmit={formSubmitHandler}>
                    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                        {/* Left Column - Product Details */}
                        <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="grid size-8 place-items-center rounded-none bg-primary/10 text-primary">
                                        <Tag className="size-4" weight="fill" />
                                    </div>
                                    <h2 className="text-base font-medium text-foreground">
                                        Basic Information
                                    </h2>
                                </div>
                                <Separator className="mb-5" />

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Product Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="e.g. Premium Wireless Headphones"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="transition-all focus:ring-2 focus:ring-primary/20"
                                        />
                                        {errors.name && (
                                            <p className="text-xs text-destructive">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">
                                            Description
                                        </Label>
                                        <textarea
                                            id="description"
                                            placeholder="Describe your product in detail..."
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            rows={4}
                                            className="flex w-full rounded-none border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                        {errors.description && (
                                            <p className="text-xs text-destructive">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="category">
                                            Category *
                                        </Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setData("category", value)
                                            }
                                        >
                                            <SelectTrigger className="text-sm">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="electronics">
                                                    Electronics
                                                </SelectItem>
                                                <SelectItem value="clothing">
                                                    Clothing
                                                </SelectItem>
                                                <SelectItem value="home">
                                                    Home & Garden
                                                </SelectItem>
                                                <SelectItem value="sports">
                                                    Sports & Outdoors
                                                </SelectItem>
                                                <SelectItem value="beauty">
                                                    Beauty & Personal Care
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-xs text-destructive">
                                                {errors.category}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Media Upload */}
                            <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="grid size-8 place-items-center rounded-none bg-primary/10 text-primary">
                                        <ImageSquare
                                            className="size-4"
                                            weight="fill"
                                        />
                                    </div>
                                    <h2 className="text-base font-medium text-foreground">
                                        Product Images
                                    </h2>
                                </div>
                                <Separator className="mb-5" />

                                <div className="border-2 border-dashed border-border rounded-none p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="grid size-12 place-items-center rounded-none bg-secondary text-muted-foreground">
                                            <CloudArrowUp className="size-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-foreground">
                                                Drop images here or click to
                                                upload
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                PNG, JPG or WEBP up to 5MB each
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="gap-2"
                                        >
                                            <Plus className="size-3.5" />
                                            Add Images
                                        </Button>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="aspect-square rounded-none border border-border bg-secondary/50 flex items-center justify-center group relative overflow-hidden"
                                        >
                                            <ImageSquare className="size-6 text-muted-foreground" />
                                            <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="size-8 p-0"
                                                >
                                                    <Trash className="size-3.5" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Pricing & Inventory */}
                        <div className="space-y-6">
                            {/* Pricing */}
                            <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="grid size-8 place-items-center rounded-none bg-primary/10 text-primary">
                                        <CurrencyDollar
                                            className="size-4"
                                            weight="fill"
                                        />
                                    </div>
                                    <h2 className="text-base font-medium text-foreground">
                                        Pricing
                                    </h2>
                                </div>
                                <Separator className="mb-5" />

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price *</Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                $
                                            </span>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData(
                                                        "price",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-7 transition-all focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        {errors.price && (
                                            <p className="text-xs text-destructive">
                                                {errors.price}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="compare_price">
                                            Compare-at price
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                $
                                            </span>
                                            <Input
                                                id="compare_price"
                                                type="number"
                                                step="0.01"
                                                placeholder="0.00"
                                                value={data.compare_price}
                                                onChange={(e) =>
                                                    setData(
                                                        "compare_price",
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-7 transition-all focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Original price to show as
                                            strikethrough
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Inventory */}
                            <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="grid size-8 place-items-center rounded-none bg-primary/10 text-primary">
                                        <Package
                                            className="size-4"
                                            weight="fill"
                                        />
                                    </div>
                                    <h2 className="text-base font-medium text-foreground">
                                        Inventory
                                    </h2>
                                </div>
                                <Separator className="mb-5" />

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="sku">
                                            SKU (Stock Keeping Unit)
                                        </Label>
                                        <Input
                                            id="sku"
                                            type="text"
                                            placeholder="e.g. WH-1000XM5"
                                            value={data.sku}
                                            onChange={(e) =>
                                                setData("sku", e.target.value)
                                            }
                                            className="transition-all focus:ring-2 focus:ring-primary/20"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="quantity">
                                            Quantity *
                                        </Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            placeholder="0"
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                            className="transition-all focus:ring-2 focus:ring-primary/20"
                                        />
                                        {errors.quantity && (
                                            <p className="text-xs text-destructive">
                                                {errors.quantity}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="rounded-none border border-border bg-secondary/40 p-4">
                                <p className="text-xs text-muted-foreground mb-4">
                                    Make sure all required fields (*) are filled
                                    before publishing.
                                </p>
                                <div className="flex gap-3">
                                    <Button
                                        type="submit"
                                        className="flex-1 gap-2"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                                Publishing...
                                            </span>
                                        ) : (
                                            <>
                                                <Package className="size-4" />
                                                Publish Product
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Save as Draft
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </SellerLayout>
    );
}
