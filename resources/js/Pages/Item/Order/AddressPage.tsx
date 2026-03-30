import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { Textarea } from "@/Components/ui/textarea";
import { PageProps } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";

type AddressPageProps = PageProps<{
    address: {
        id?: number;
        user_id?: number;
        address: string;
    };
}>;

export default function AddressPage() {
    const { auth, address } = usePage<AddressPageProps>().props;
    const form = useForm({
        address: address?.address ?? "",
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.patch(route("order.address.update"));
    };

    return (
        <GuestLayout>
            <section className="relative overflow-hidden border border-border bg-secondary/30">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-20 -right-20 size-64 rounded-full bg-primary/10 blur-3xl"
                />
                <div className="relative z-10 space-y-8 p-5 sm:p-8">
                    <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            Shipping details
                        </p>
                        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
                            Edit shipping address
                        </h1>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            Update the address used for your current and future
                            order deliveries.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <form
                            onSubmit={submit}
                            className="border border-border bg-background/80 p-4 sm:p-5"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="address">Full address</Label>
                                <Textarea
                                    id="address"
                                    rows={8}
                                    placeholder="Enter your full shipping address"
                                    value={form.data.address}
                                    onChange={(e) =>
                                        form.setData("address", e.target.value)
                                    }
                                />
                                {form.errors.address && (
                                    <p className="text-xs text-destructive">
                                        {form.errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Button type="submit" disabled={form.processing}>
                                    Save address
                                </Button>
                                <Link href={route("cart.dashboard")}>
                                    <Button type="button" variant="outline">
                                        Back to cart
                                    </Button>
                                </Link>
                            </div>
                        </form>

                        <aside className="border border-border bg-background/80 p-4 sm:p-5">
                            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                Address preview
                            </p>
                            <Separator className="my-4" />
                            <div className="space-y-2 text-sm">
                                <p className="font-semibold text-foreground">
                                    {auth.user?.name}
                                </p>
                                {form.data.address ? (
                                    form.data.address
                                        .split("\n")
                                        .filter((line) => line.trim().length > 0)
                                        .map((line, index) => (
                                            <p
                                                key={`${line}-${index}`}
                                                className="text-muted-foreground"
                                            >
                                                {line}
                                            </p>
                                        ))
                                ) : (
                                    <p className="text-muted-foreground">
                                        No shipping address saved yet.
                                    </p>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
