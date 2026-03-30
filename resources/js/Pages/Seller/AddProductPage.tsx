import SellerLayout from "@/Layouts/SellerLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Badge } from "@/Components/ui/badge";
import { Textarea } from "@/Components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    ArrowLeft,
    CloudArrowUp,
    ImageSquare,
    Package,
    Plus,
    Trash,
} from "@phosphor-icons/react";
import { Link, useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ProductForm = {
    name: string;
    details: string;
    base_price: string;
    stock: string;
    images: File[];
    types?: string[];
    overrideType: string,
    overrideValues?: VariantOverrideValue[];
    additionalTypeValues?: Record<string, string>;
};

type VariantOverrideValue = {
    id: number;
    value: string;
    price: string;
    stock: string;
};

const variantTypes = [
    "Size",
    "Color",
    "Weight",
    "Storage",
    "Material",
    "Length",
    "Width",
];

export default function AddProductPage() {
    const { data, setData, errors, processing , post } = useForm<ProductForm>({
        name: "",
        details: "",
        base_price: "",
        stock: "",
        images: [],
        types: [],
        overrideType: "",
        overrideValues: [],
        additionalTypeValues: {},
    });

    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const nextOverrideIdRef = useRef(2);
    const [imageSizeError, setImageSizeError] = useState<string>("");

    const [overrideType, setOverrideType] = useState<string>("");
    const [overrideValues, setOverrideValues] = useState<VariantOverrideValue[]>([
        { id: 1, value: "", price: "", stock: "" },
    ]);

    const [additionalTypes, setAdditionalTypes] = useState<string[]>([]);
    const [additionalTypeValues, setAdditionalTypeValues] = useState<
        Record<string, string>
    >({});


    useEffect(() => {
        if (!overrideType) {
            return;
        }

        setAdditionalTypes((prev) => prev.filter((type) => type !== overrideType));
        setAdditionalTypeValues((prev) => {
            if (!(overrideType in prev)) {
                return prev;
            }
            const next = { ...prev };
            // Delete key is use to remove a property from an object
            delete next[overrideType];

            return next;
        });
    }, [overrideType]);


    // Functions for handling form actions
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        data.types = [...additionalTypes, overrideType];
        data.overrideType = overrideType;
        data.overrideValues = overrideValues;
        data.additionalTypeValues = additionalTypeValues;
        console.log("Form Data:", data);
        post(route("store-product" , data));
        console.log(errors)
        // post(route("product.store"), data);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        const maxSizeInBytes = 2 * 1024 * 1024;
        const oversizedFiles = files.filter((file) => file.size > maxSizeInBytes);
        const validFiles = files.filter((file) => file.size <= maxSizeInBytes);

        if (oversizedFiles.length > 0) {
            setImageSizeError(
                `These files are over 2MB: ${oversizedFiles
                    .map((file) => file.name)
                    .join(", ")}.`,
            );
        } else {
            setImageSizeError("");
        }

        setData("images", validFiles);
    };


    // Add the Value Row functions in Variant Section 1
    const addOverrideValueRow = () => {
        setOverrideValues((prev) => [
            ...prev,
            { id: nextOverrideIdRef.current++, value: "", price: "", stock: "" },
        ]);
    };

    // Remove the Value Row functions in Variant Section 1
    const removeOverrideValueRow = (id: number) => {
        setOverrideValues((prev) => {
            // Ensure at least one row remains
            // if the length is 1, do not remove
            if (prev.length === 1) {
                return prev;
            }
            return prev.filter((row) => row.id !== id);
        });
    };

    const updateOverrideValueRow = (
        id: number,
        key: keyof Omit<VariantOverrideValue, "id">,
        value: string,
    ) => {
        setOverrideValues((prev) =>
            prev.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
        );
    };

    const toggleAdditionalType = (type: string) => {
        if (type === overrideType) {
            return;
        }

        setAdditionalTypes((prev) => {
            if (prev.includes(type)) {
                return prev.filter((item) => item !== type);
            }
            return [...prev, type];
        });
    };

    const updateAdditionalTypeValues = (type: string, values: string) => {
        setAdditionalTypeValues((prev) => ({
            ...prev,
            [type]: values,
        }));
    };

    return (
        <SellerLayout>
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
                            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground w-fit"
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

                        <p className="max-w-3xl text-sm text-muted-foreground">
                            Add product details first, then configure variants.
                            Use the first variant section only when each value has
                            its own price and stock.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-8 pb-8">
                <form onSubmit={formSubmitHandler} className="space-y-6">
                    <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-base font-medium text-foreground">
                                Product Basics
                            </h2>
                        </div>
                        <Separator />

                        <div className="space-y-2">
                            <Label htmlFor="name">Product title *</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Premium Cotton T-Shirt"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-xs text-destructive">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="details">Product description *</Label>
                            <Textarea
                                id="details"
                                rows={5}
                                placeholder="Describe the product clearly for buyers..."
                                value={data.details}
                                onChange={(e) => setData("details", e.target.value)}
                            />
                            {errors.details && (
                                <p className="text-xs text-destructive">{errors.details}</p>
                            )}
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="base_price">Base price *</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                                        $
                                    </span>
                                    <Input
                                        id="base_price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="pl-7"
                                        value={data.base_price}
                                        onChange={(e) =>
                                            setData("base_price", e.target.value)
                                        }
                                    />
                                </div>
                                {errors.base_price && (
                                    <p className="text-xs text-destructive">
                                        {errors.base_price}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock *</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={data.stock}
                                    onChange={(e) => setData("stock", e.target.value)}
                                />
                                {errors.stock && (
                                    <p className="text-xs text-destructive">{errors.stock}</p>
                                )}
                            </div>
                        </div>

                    </div>



                    {/* Variant Section 1 */}
                    <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-base font-medium text-foreground">
                                Variant Section 1 (One type with price/stock per value)
                            </h2>
                            <Badge variant="secondary">Optional</Badge>
                        </div>
                        <Separator />

                        <div className="rounded-none border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-muted-foreground">
                            Use this section only when each value has a specific
                            price and stock. Example: Red has different price/stock
                            than Green.
                        </div>

                        <div className="space-y-2">
                            <Label>Type (choose only one)</Label>
                            <Select value={overrideType} onValueChange={setOverrideType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select one type (Size, Color...)" />
                                </SelectTrigger>
                                <SelectContent>
                                    {variantTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-3">
                            {overrideValues.map((row) => (
                                <div
                                    key={row.id}
                                    className="grid gap-3 rounded-none border border-border bg-secondary/30 p-4 md:grid-cols-[1.4fr_1fr_1fr_auto]"
                                >
                                    <div className="space-y-2">
                                        <Label>Value</Label>
                                        <Input
                                            placeholder="e.g. Red, XL, 128GB"
                                            value={row.value}
                                            onChange={(e) =>
                                                updateOverrideValueRow(
                                                    row.id,
                                                    "value",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Specific price</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            value={row.price}
                                            onChange={(e) =>
                                                updateOverrideValueRow(
                                                    row.id,
                                                    "price",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Specific stock</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            placeholder="0"
                                            value={row.stock}
                                            onChange={(e) =>
                                                updateOverrideValueRow(
                                                    row.id,
                                                    "stock",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="rounded-none"
                                            onClick={() => removeOverrideValueRow(row.id)}
                                            disabled={overrideValues.length === 1}
                                        >
                                            <Trash className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {/* Add the Value Row  */}
                            <Button
                                type="button"
                                variant="outline"
                                className="gap-2"
                                onClick={addOverrideValueRow}
                            >
                                <Plus className="size-3.5" />
                                Add Value Row
                            </Button>
                        </div>
                    </div>


                    {/* Variant Section 2 */}
                    <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-base font-medium text-foreground">
                                Variant Section 2 (Selection only)
                            </h2>
                            <Badge variant="secondary">Optional</Badge>
                        </div>
                        <Separator />

                        <p className="text-sm text-muted-foreground">
                            Choose other variant types here. This section is only
                            for selectable values and cannot set specific price or
                            stock.
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {variantTypes.map((type) => {
                                // if the type is already selected in overrideType, do not allow selecting it here
                                const selected = additionalTypes.includes(type);
                                // if the type is same as overrideType, disable it
                                const disabled = type === overrideType;

                                return (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => toggleAdditionalType(type)}
                                        disabled={disabled}
                                        className={cn(
                                            "rounded-none border px-3 py-1.5 text-sm transition-colors",
                                            selected
                                                ? "border-foreground bg-foreground text-background"
                                                : "border-border bg-background text-foreground hover:bg-secondary/60",
                                            disabled &&
                                                "cursor-not-allowed border-muted bg-muted text-muted-foreground",
                                        )}
                                    >
                                        {type}
                                    </button>
                                );
                            })}
                        </div>

                        {additionalTypes.length > 0 ? (
                            <div className="space-y-3">
                                {additionalTypes.map((type) => (
                                    <div
                                        key={type}
                                        className="rounded-none border border-border bg-secondary/30 p-4 space-y-2"
                                    >
                                        <Label htmlFor={`additional-values-${type}`}>
                                            {type} values
                                        </Label>
                                        <Input
                                            id={`additional-values-${type}`}
                                            placeholder="Enter values separated by comma"
                                            value={additionalTypeValues[type] ?? ""}
                                            onChange={(e) =>
                                                updateAdditionalTypeValues(
                                                    type,
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Example: Small, Medium, Large
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="rounded-none border border-border bg-background/90 p-6 shadow-sm space-y-4">
                        <div className="flex items-center gap-2">
                            <ImageSquare className="size-5 text-primary" />
                            <h2 className="text-base font-medium text-foreground">
                                Product Images
                            </h2>
                        </div>
                        <Separator />

                        <div className="rounded-none border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/40">
                            <div className="flex flex-col items-center gap-3">
                                <div className="grid size-12 place-items-center rounded-none bg-secondary text-muted-foreground">
                                    <CloudArrowUp className="size-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-foreground">
                                        Upload product images
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG or WEBP up to 2MB each
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Can't upload? Try reducing the file size or using a different image.
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="gap-2"
                                    onClick={() => imageInputRef.current?.click()}
                                >
                                    <Plus className="size-3.5" />
                                    Add Images
                                </Button>
                                <input
                                    ref={imageInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>
                        {(imageSizeError || errors.images) && (
                            <p className="text-xs text-destructive">
                                {imageSizeError || errors.images}
                            </p>
                        )}
                        {!imageSizeError &&
                            Object.keys(errors).some((key) =>
                                key.startsWith("images."),
                            ) && (
                                <p className="text-xs text-destructive">
                                    {
                                        errors[
                                            Object.keys(errors).find((key) =>
                                                key.startsWith("images."),
                                            ) as keyof typeof errors
                                        ]
                                    }
                                </p>
                            )}

                        {data.images.length > 0 ? (
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {data.images.map((file, index) => (
                                    <div
                                        key={`${file.name}-${index}`}
                                        className="rounded-none border border-border bg-secondary/40 p-3 text-xs text-muted-foreground"
                                    >
                                        <p className="truncate">{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="rounded-none border border-border bg-secondary/40 p-4">
                        <p className="mb-4 text-xs text-muted-foreground">
                            Submit when product title, description, base price,
                            and stock are ready.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button type="submit" className="flex-0 sm:flex-1" disabled={processing}>
                                {processing ? "Saving..." : "Save Product"}
                            </Button>
                            <Button type="button" variant="outline" className="flex-0 sm:flex-1">
                                Save as Draft
                            </Button>
                        </div>
                    </div>
                </form>
            </section>
        </SellerLayout>
    );
}
