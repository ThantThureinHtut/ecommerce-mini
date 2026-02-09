import React from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import SellerLayout from "@/Layouts/SellerLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import {
    Storefront,
    Rocket,
    CreditCard,
    Users,
    Lightning,
    CheckCircle,
} from "@phosphor-icons/react";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/Components/ui/tooltip";

type SellerRegisterForm = {
    shop_name: string;
    name: string;
    email: string;
    phone_number: string;
};

export default function Register() {
    const { data, setData, errors, post, processing } =
        useForm<SellerRegisterForm>({
            shop_name: "",
            name: "",
            email: "",
            phone_number: "",
        });
    const user = usePage().props.auth.user;
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("seller.register", data));
    };

    return (
        <SellerLayout>
            <section className="relative overflow-hidden rounded-none border border-border bg-gradient-to-br from-primary/5 via-background to-secondary/60">
                {/* Decorative elements */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-primary/15 blur-[100px]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/10 blur-[80px]"
                />

                {/* Subtle grid pattern overlay */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                <div className="relative z-10 grid gap-8 px-6 py-12 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:py-16">
                    {/* Left side - Branding & Benefits */}
                    <div className="space-y-6 lg:sticky lg:top-8">
                        <div className="inline-flex items-center gap-2 rounded-none border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                            <Rocket className="size-3.5" />
                            Start Selling Today
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                                Launch your store in minutes.
                            </h1>
                            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                                Join thousands of successful sellers and start
                                reaching millions of customers. No setup fees,
                                no hidden costs.
                            </p>
                        </div>

                        {/* Benefits list */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="grid size-6 shrink-0 place-items-center rounded-none bg-primary/10 text-primary">
                                    <CheckCircle
                                        className="size-3.5"
                                        weight="fill"
                                    />
                                </div>
                                <span>Free to register — no monthly fees</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="grid size-6 shrink-0 place-items-center rounded-none bg-primary/10 text-primary">
                                    <CheckCircle
                                        className="size-3.5"
                                        weight="fill"
                                    />
                                </div>
                                <span>List unlimited products</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="grid size-6 shrink-0 place-items-center rounded-none bg-primary/10 text-primary">
                                    <CheckCircle
                                        className="size-3.5"
                                        weight="fill"
                                    />
                                </div>
                                <span>Secure & fast payment processing</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="grid size-6 shrink-0 place-items-center rounded-none bg-primary/10 text-primary">
                                    <CheckCircle
                                        className="size-3.5"
                                        weight="fill"
                                    />
                                </div>
                                <span>24/7 seller support team</span>
                            </div>
                        </div>

                        {/* Stats cards */}
                        <div className="grid gap-3 sm:grid-cols-3">
                            <div className="group rounded-none border border-border bg-background/80 p-4 text-center backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5">
                                <div className="mx-auto mb-2 grid size-10 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Users className="size-5" />
                                </div>
                                <p className="text-xl font-bold text-foreground">
                                    1M+
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    Active Buyers
                                </p>
                            </div>
                            <div className="group rounded-none border border-border bg-background/80 p-4 text-center backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5">
                                <div className="mx-auto mb-2 grid size-10 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <CreditCard className="size-5" />
                                </div>
                                <p className="text-xl font-bold text-foreground">
                                    2-Day
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    Fast Payouts
                                </p>
                            </div>
                            <div className="group rounded-none border border-border bg-background/80 p-4 text-center backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5">
                                <div className="mx-auto mb-2 grid size-10 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Lightning
                                        className="size-5"
                                        weight="fill"
                                    />
                                </div>
                                <p className="text-xl font-bold text-foreground">
                                    5 Min
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    Quick Setup
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Registration Form */}
                    <div className="w-full rounded-none bg-background/95 shadow-xl ring-1 ring-primary/50 backdrop-blur-sm motion-safe:animate-pop will-change-transform">
                        {/* Form header */}
                        <div className="space-y-1 border-b border-border px-6 py-5">
                            <div className="flex items-center gap-2">
                                <div className="grid size-7 place-items-center rounded-none bg-primary text-primary-foreground">
                                    <Storefront
                                        className="size-4"
                                        weight="fill"
                                    />
                                </div>
                                <h2 className="text-lg font-semibold text-foreground">
                                    Create Seller Account
                                </h2>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Fill in the details below to set up your store.
                            </p>
                        </div>

                        {/* Form body */}
                        <div className="px-6 py-6">
                            <form
                                onSubmit={formSubmitHandler}
                                className="space-y-4"
                            >
                                {/* Store Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="store_name">
                                        Store Name
                                    </Label>
                                    <Input
                                        id="store_name"
                                        type="text"
                                        placeholder="My Awesome Store"
                                        value={data.shop_name}
                                        onChange={(e) =>
                                            setData("shop_name", e.target.value)
                                        }
                                        className="transition-all focus:ring-2 focus:ring-primary/20"
                                    />
                                    {errors.shop_name && (
                                        <p className="text-xs text-destructive">
                                            {errors.shop_name}
                                        </p>
                                    )}
                                </div>

                                {/* Owner Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
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

                                {/* Email & Phone side by side */}
                                <div className="">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            value={data.phone_number}
                                            onChange={(e) =>
                                                setData(
                                                    "phone_number",
                                                    e.target.value,
                                                )
                                            }
                                            className="transition-all focus:ring-2 focus:ring-primary/20"
                                        />
                                        {errors.phone_number && (
                                            <p className="text-xs text-destructive">
                                                {errors.phone_number}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Terms agreement */}
                                <p className="text-xs text-muted-foreground">
                                    By creating a seller account, you agree to
                                    our{" "}
                                    <a
                                        href="#"
                                        className="text-foreground underline underline-offset-4 hover:text-primary"
                                    >
                                        Seller Terms
                                    </a>
                                    ,{" "}
                                    <a
                                        href="#"
                                        className="text-foreground underline underline-offset-4 hover:text-primary"
                                    >
                                        Commission Policy
                                    </a>
                                    , and{" "}
                                    <a
                                        href="#"
                                        className="text-foreground underline underline-offset-4 hover:text-primary"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
                                {user ? (
                                    // This check if user skip the user login , can't register the seller account
                                    // To make sure the user login user first
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full gap-2"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                                Creating account...
                                            </span>
                                        ) : (
                                            <>
                                                <Rocket className="size-4" />
                                                Create Seller Account
                                            </>
                                        )}
                                    </Button>
                                ) : (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div>
                                                <Button
                                                    disabled={true}
                                                    size="lg"
                                                    type="button"
                                                    className="w-full gap-2"
                                                >
                                                    <Rocket className="size-4" />
                                                    Create Seller Account
                                                </Button>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <div>
                                                <Link
                                                    href="/"
                                                    className="flex items-center  gap-1 "
                                                >
                                                    <p>
                                                        {" "}
                                                        Please login first to
                                                        create a seller account
                                                    </p>
                                                    <p className="text-primary underline">
                                                        Click here
                                                    </p>
                                                </Link>
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                )}
                            </form>
                        </div>

                        {/* Form footer */}
                        <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-6 py-4 text-xs">
                            <span className="text-muted-foreground">
                                Already have a seller account?
                            </span>
                            <Link
                                href={route("seller.login")}
                                className="font-medium text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
                            >
                                Sign in →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom trust indicators */}
                <div className="relative z-10 border-t border-border bg-secondary/40 px-6 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-center text-[10px] uppercase tracking-wider text-muted-foreground sm:gap-8">
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-green-500"></span>
                            Secure Encryption
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-green-500"></span>
                            Verified Sellers
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-green-500"></span>
                            24/7 Support
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-green-500"></span>
                            Easy Payouts
                        </span>
                    </div>
                </div>
            </section>
        </SellerLayout>
    );
}
