import React from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import AuthLayout from "@/Layouts/AuthLayout";
import { Link, useForm } from "@inertiajs/react";

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, errors, post, processing } = useForm<RegisterForm>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route("register", data));
    };
    return (
        <AuthLayout>
            <section className="bg-secondary/40 relative overflow-hidden rounded-none border border-border">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl"
                />
                <div className="relative z-10 grid gap-8 px-6 py-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <div className="space-y-4">
                        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                            Join the club
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            Create an account for a calmer shopping flow.
                        </h1>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Save favorites, track delivery, and get a faster
                            checkout with one tap.
                        </p>
                        <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
                            <div className="rounded-none border border-border bg-background px-3 py-2">
                                Curated picks, weekly.
                            </div>
                            <div className="rounded-none border border-border bg-background px-3 py-2">
                                Easy returns, no stress.
                            </div>
                        </div>
                    </div>

                    <div className="bg-background/90 ring-primary w-full rounded-none ring-1 backdrop-blur motion-safe:animate-pop will-change-transform">
                        <div className="space-y-1 border-b border-border px-6 py-5">
                            <h2 className="text-lg font-semibold text-foreground">
                                Create account
                            </h2>
                            <p className="text-muted-foreground text-xs">
                                Start with your name and email.
                            </p>
                        </div>
                        <div className="px-6 py-6">
                            <form
                                onSubmit={formSubmitHandler}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Alex Morgan"
                                        required
                                        onChange={(
                                            data: React.ChangeEvent<HTMLInputElement>,
                                        ) => setData("name", data.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        onChange={(
                                            data: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setData("email", data.target.value)
                                        }
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
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
                                <div className="space-y-2">
                                    <Label htmlFor="passwordConfirm">
                                        Confirm password
                                    </Label>
                                    <Input
                                        id="passwordConfirm"
                                        type="password"
                                        placeholder="********"
                                        onChange={(
                                            data: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            setData(
                                                "password_confirmation",
                                                data.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <p className="text-muted-foreground text-xs">
                                    By creating an account you agree to our
                                    <a
                                        href="#"
                                        className="text-foreground underline underline-offset-4 hover:text-primary"
                                    >
                                        Terms
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="#"
                                        className="text-foreground underline underline-offset-4 hover:text-primary"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
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
                                        <>Create account</>
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
                                        size="lg"
                                        variant="outline"
                                        className="w-full gap-2"
                                        type="button"
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
                                Already have an account?
                            </span>
                            <Link
                                href={route("login")}
                                className="text-foreground transition-colors hover:text-primary"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </AuthLayout>
    );
}
