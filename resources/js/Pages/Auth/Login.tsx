import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
    });
    const loginSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("login", data));
    };

    return (
        <AuthLayout>
            <section className="bg-secondary/40 relative overflow-hidden rounded-none border border-border">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
                />
                <div className="relative z-10 grid gap-8 px-6 py-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <div className="space-y-4">
                        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                            Secure access
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            Sign in to continue shopping with ease.
                        </h1>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Keep your wishlist, track orders, and check out
                            faster on every visit.
                        </p>
                        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="rounded-none border border-border bg-background px-2 py-1">
                                Fast checkout
                            </span>
                            <span className="rounded-none border border-border bg-background px-2 py-1">
                                Order tracking
                            </span>
                            <span className="rounded-none border border-border bg-background px-2 py-1">
                                Saved items
                            </span>
                        </div>
                    </div>

                    <div className="bg-background/90 ring-primary w-full rounded-none ring-1 backdrop-blur motion-safe:animate-pop will-change-transform">
                        <div className="space-y-1 border-b border-border px-6 py-5">
                            <h2 className="text-lg font-semibold text-foreground">
                                Welcome back
                            </h2>
                            <p className="text-muted-foreground text-xs">
                                Sign in with your email and password.
                            </p>
                        </div>
                        <div className="px-6 py-6">
                            <form
                                onSubmit={loginSubmitHandler}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        onChange={(
                                            data: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setData("email", data.target.value)
                                        }
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="********"
                                        onChange={(
                                            data: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setData(
                                                "password",
                                                data.target.value,
                                            )
                                        }
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
                                        className="text-muted-foreground transition-colors hover:text-primary"
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
                                            Logining...
                                        </span>
                                    ) : (
                                        <>Login</>
                                    )}
                                </Button>
                                <div className="relative py-2">
                                    <Separator />
                                    <span className="bg-background text-muted-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-[10px] uppercase tracking-[0.3em]">
                                        Or
                                    </span>
                                </div>

                                <a href={route("auth.redirect")}>
                                    <Button
                                        type="button"
                                        size="lg"
                                        variant="outline"
                                        className="w-full gap-2"
                                    >
                                        <span className="border-border text-foreground grid size-5 place-items-center rounded-full border text-[11px] font-semibold">
                                            G
                                        </span>
                                        Continue with Google
                                    </Button>
                                </a>
                            </form>
                        </div>
                        <div className="flex items-center justify-between border-t border-border px-6 py-4 text-xs">
                            <span className="text-muted-foreground">
                                New here?
                            </span>
                            <Link
                                href={route("register")}
                                className="text-foreground transition-colors hover:text-primary"
                            >
                                Create an account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </AuthLayout>
    );
}
