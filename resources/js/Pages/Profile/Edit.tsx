import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Separator } from "@/Components/ui/separator";
import { PageProps } from "@/types";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";

type ProfilePageProps = PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
}>;

export default function ProfileEdit() {
    const { auth } = usePage<ProfilePageProps>().props;
    const user = auth.user;

    const profileForm = useForm({
        name: user?.name ?? "",
        email: user?.email ?? "",
    });

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submitProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        profileForm.patch(route("profile.update"));
    };

    const submitPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        passwordForm.put(route("password.update"), {
            onSuccess: () =>
                passwordForm.reset(
                    "current_password",
                    "password",
                    "password_confirmation",
                ),
        });
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
                            Account dashboard
                        </p>
                        <h1 className="text-2xl font-semibold text-foreground sm:text-3xl">
                            Profile and security settings
                        </h1>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            Manage your user details and update password in one
                            place.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-2">
                        <div className="border border-border bg-background/80 p-4 sm:p-5">
                            <h2 className="text-base font-semibold text-foreground">
                                Edit profile
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Keep your personal info up to date.
                            </p>
                            <form
                                onSubmit={submitProfile}
                                className="mt-4 space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        value={profileForm.data.name}
                                        onChange={(e) =>
                                            profileForm.setData(
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {profileForm.errors.name && (
                                        <p className="text-xs text-destructive">
                                            {profileForm.errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileForm.data.email}
                                        onChange={(e) =>
                                            profileForm.setData(
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {profileForm.errors.email && (
                                        <p className="text-xs text-destructive">
                                            {profileForm.errors.email}
                                        </p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={profileForm.processing}
                                    className="w-full sm:w-auto"
                                >
                                    Save profile
                                </Button>
                            </form>
                        </div>

                        <div
                            id="password-security"
                            className="border border-border bg-background/80 p-4 sm:p-5"
                        >
                            <h2 className="text-base font-semibold text-foreground">
                                Change password
                            </h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                Use a strong password to protect your account.
                            </p>
                            <form
                                onSubmit={submitPassword}
                                className="mt-4 space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="current_password">
                                        Current password
                                    </Label>
                                    <Input
                                        id="current_password"
                                        type="password"
                                        value={passwordForm.data.current_password}
                                        onChange={(e) =>
                                            passwordForm.setData(
                                                "current_password",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {passwordForm.errors.current_password && (
                                        <p className="text-xs text-destructive">
                                            {
                                                passwordForm.errors
                                                    .current_password
                                            }
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">
                                        New password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={passwordForm.data.password}
                                        onChange={(e) =>
                                            passwordForm.setData(
                                                "password",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {passwordForm.errors.password && (
                                        <p className="text-xs text-destructive">
                                            {passwordForm.errors.password}
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={
                                            passwordForm.data
                                                .password_confirmation
                                        }
                                        onChange={(e) =>
                                            passwordForm.setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="w-full sm:w-auto"
                                >
                                    Update password
                                </Button>
                            </form>
                        </div>
                    </div>

                    <Separator />
                    <div className="flex justify-end">
                        <Link
                            href={route("welcome")}
                            className="text-xs text-muted-foreground hover:text-primary"
                        >
                            Back to home
                        </Link>
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
