import React from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import SellerLayout from "@/Layouts/SellerLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Storefront,
    TrendUp,
    Package,
    ChartBar,
    ShieldCheck,
} from "@phosphor-icons/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
    });

    const loginSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("seller.login", data));
    };

    return (
        <SellerLayout>
            <section className="relative overflow-hidden rounded-none border border-border bg-gradient-to-br from-secondary/60 via-background to-primary/5">
                {/* Decorative elements */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary/15 blur-[100px]"
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-primary/10 blur-[80px]"
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

                <div className="relative z-10 grid gap-8 px-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-16">
                    {/* Left side - Branding & Benefits */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-none border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                            <Storefront className="size-3.5" weight="fill" />
                            Seller Portal
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                                Power your business with our marketplace.
                            </h1>
                            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                                Access your seller dashboard, manage products,
                                track orders, and grow your revenue — all in one
                                place.
                            </p>
                        </div>

                        {/* Feature highlights */}
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="group flex items-start gap-3 rounded-none border border-border bg-background/80 p-3 backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5">
                                <div className="grid size-8 shrink-0 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <TrendUp className="size-4" weight="fill" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-foreground">
                                        Real-time Analytics
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        Track sales & performance
                                    </p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-3 rounded-none border border-border bg-background/80 p-3 backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5">
                                <div className="grid size-8 shrink-0 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Package className="size-4" weight="fill" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-foreground">
                                        Inventory Control
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        Manage stock effortlessly
                                    </p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-3 rounded-none border border-border bg-background/80 p-3 backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5">
                                <div className="grid size-8 shrink-0 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <ChartBar
                                        className="size-4"
                                        weight="fill"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-foreground">
                                        Sales Reports
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        Detailed insights daily
                                    </p>
                                </div>
                            </div>
                            <div className="group flex items-start gap-3 rounded-none border border-border bg-background/80 p-3 backdrop-blur transition-colors hover:border-primary/40 hover:bg-primary/5">
                                <div className="grid size-8 shrink-0 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                    <ShieldCheck
                                        className="size-4"
                                        weight="fill"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-foreground">
                                        Secure Payments
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        Fast & protected payouts
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Login Form */}
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
                                    Seller Login
                                </h2>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Sign in to access your seller dashboard.
                            </p>
                        </div>

                        {/* Form body */}
                        <div className="px-6 py-6">
                            <form
                                onSubmit={loginSubmitHandler}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="seller-email">
                                        Business Email
                                    </Label>
                                    <Input
                                        id="seller-email"
                                        type="email"
                                        placeholder="seller@business.com"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="transition-all focus:ring-2 focus:ring-primary/20"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="seller-password">
                                        Password
                                    </Label>
                                    <Input
                                        id="seller-password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="transition-all focus:ring-2 focus:ring-primary/20"
                                    />
                                    {errors.password && (
                                        <p className="text-xs text-destructive">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <a
                                        href="#"
                                        className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full gap-2"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <span className="flex items-center gap-2">
                                            <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                            Signing in...
                                        </span>
                                    ) : (
                                        <>
                                            <Storefront
                                                className="size-4"
                                                weight="fill"
                                            />
                                            Access Dashboard
                                        </>
                                    )}
                                </Button>

                                <div className="relative py-3">
                                    <Separator />
                                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                                        Or
                                    </span>
                                </div>

                                <a href={route("auth.redirect")}>
                                    <Button
                                        type="button"
                                        size="lg"
                                        variant="outline"
                                        className="w-full gap-2 transition-all hover:border-primary/40 hover:bg-primary/5"
                                    >
                                        <span className="grid size-5 place-items-center rounded-full border border-border text-[11px] font-bold text-foreground">
                                            G
                                        </span>
                                        Continue with Google
                                    </Button>
                                </a>
                            </form>
                        </div>

                        {/* Form footer */}
                        <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-6 py-4 text-xs">
                            <span className="text-muted-foreground">
                                New seller?
                            </span>
                            <Link
                                href={route("seller.register")}
                                className="font-medium text-primary transition-colors hover:text-primary/80 hover:underline underline-offset-4"
                            >
                                Register your store →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom stats bar */}
                <div className="relative z-10 border-t border-border bg-secondary/40 px-6 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 text-center text-xs text-muted-foreground sm:justify-between">
                        <div className="flex items-center gap-6">
                            <div>
                                <span className="block text-lg font-bold text-foreground">
                                    10K+
                                </span>
                                <span>Active Sellers</span>
                            </div>
                            <div className="hidden h-8 w-px bg-border sm:block" />
                            <div>
                                <span className="block text-lg font-bold text-foreground">
                                    $2M+
                                </span>
                                <span>Monthly Sales</span>
                            </div>
                            <div className="hidden h-8 w-px bg-border sm:block" />
                            <div>
                                <span className="block text-lg font-bold text-foreground">
                                    99.9%
                                </span>
                                <span>Uptime</span>
                            </div>
                        </div>
                        <p className="text-muted-foreground/70">
                            Trusted by thousands of businesses worldwide
                        </p>
                    </div>
                </div>
            </section>
        </SellerLayout>
    );
}
