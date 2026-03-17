import React from "react";
import { Button } from "@/Components/ui/button";
import {
    DotsThreeOutlineVerticalIcon,
    HouseIcon,
    MoonStarsIcon,
    PackageIcon,
    ShoppingCartIcon,
    SignOutIcon,
    SunDimIcon,
} from "@phosphor-icons/react";
import { Link, usePage } from "@inertiajs/react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

import { useTheme } from "@/src/Content/ThemeProvider";
import { Separator } from "./ui/separator";
import { LogIcon } from "@phosphor-icons/react/dist/ssr";

type NavItem = { label: string; icon: any; href: string };

const nav: NavItem[] = [
    { label: "Home", icon: <HouseIcon />, href: "/" },
    {
        label: "Cart",
        icon: <ShoppingCartIcon />,
        href: route("cart.dashboard"),
    },
    {
        label: "To Ship",
        icon: <PackageIcon />,
        href: route("order.dashboard"),
    },
    {
        label: "Logout",
        icon: <SignOutIcon />,
        href: route("logout"),
    },
];

export default function Header() {
    const { theme, setTheme } = useTheme();
    const { auth } = usePage().props;
    const user = auth.user;
    const isUser = auth.isUser;

    return (
        <div className="flex justify-between items-center">
            <Link
                href={"/"}
                className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent "
            >
                E-Commerce Mini
            </Link>

            {/* User Menu And Dark Mode */}
            <ul className="sm:flex gap-4 hidden items-center justify-center ">
                {/* Check if User Already Login Doesn't show Login and Register */}
                {!user || !isUser ? (
                    <>
                        <Link href={route("login")}>
                            <Button className="text-sm p-3">login</Button>
                        </Link>
                        <Link href={route("register")}>
                            <Button variant={"outline"} className="text-sm p-3">
                                register
                            </Button>
                        </Link>
                    </>
                ) : (
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center justify-center">
                                <Avatar className="size-9">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={route("profile.edit")} className="w-full">
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                </Link>
                                <Link
                                    href={`${route("profile.edit")}#password-security`}
                                    className="w-full"
                                >
                                    <DropdownMenuItem>
                                        Change password
                                    </DropdownMenuItem>
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    className="w-full"
                                >
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* Shopping Cart */}
                {user && isUser && (
                    <>
                        <Link href={route("cart.dashboard", user.id)}>
                            <ShoppingCartIcon className="size-6 text-primary" />
                        </Link>
                        <Separator orientation="vertical" />
                        <Link href={route("order.dashboard", user.id)}>
                            <PackageIcon className="size-6 text-primary" />
                        </Link>
                    </>
                )}
                <Separator orientation="vertical" />
                {/* Dark Mode */}
                <Button
                    onClick={() =>
                        setTheme(() => (theme == "light" ? "dark" : "light"))
                    }
                >
                    {theme == "light" ? <MoonStarsIcon /> : <SunDimIcon />}
                </Button>
            </ul>

            {/* Mobile Menu And Dark Mode */}
            <div className="sm:hidden flex gap-4">
                <Sheet>
                    <SheetTrigger>
                        <DotsThreeOutlineVerticalIcon className="size-6 text-primary" />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <SheetDescription className="sr-only">
                                Browse navigation links and account actions.
                            </SheetDescription>
                            <div className="flex flex-col gap-5 mt-4">
                                {/* Avatoar */}
                                {user && isUser && (
                                    <Link
                                        href={route("profile.edit")}
                                        className="group relative flex items-center gap-3 overflow-hidden rounded-none border border-border bg-background/60 px-3 py-3 transition-all duration-200 hover:border-primary hover:bg-primary/5"
                                    >
                                        <Avatar className="size-14 ring-1 ring-border transition-all duration-200 group-hover:ring-primary/40">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>
                                                {user.name?.slice(0, 2).toUpperCase() ??
                                                    "US"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-foreground">
                                                {user.name}
                                            </p>
                                            <p className="truncate text-xs text-muted-foreground">
                                                {user.email}
                                            </p>
                                            <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-primary">
                                                Edit profile and password
                                            </p>
                                        </div>
                                    </Link>
                                )}
                                <Separator />
                                {/* Navigation Links */}
                                <nav className="mt-2 flex flex-col gap-2">
                                    {nav.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`rounded-md px-3 py-2 text-sm hover:bg-muted  ${
                                                item.icon
                                                    ? "flex items-center gap-2"
                                                    : ""
                                            }`}
                                        >
                                            {item.icon && (
                                                <span className="text-xl text-primary">
                                                    {item.icon}
                                                </span>
                                            )}
                                            <span>{item.label}</span>
                                        </Link>
                                    ))}
                                </nav>

                                {/* Login/Register Buttons Mobile  */}
                                {!user ||
                                    (!isUser && (
                                        <div className="mt-6 border-t pt-4 flex flex-col gap-2 justify-center">
                                            <Link
                                                href="/login"
                                                className="block rounded-md  text-sm"
                                            >
                                                <Button className="w-full">
                                                    Login
                                                </Button>
                                            </Link>
                                            <Link
                                                href="/register"
                                                className="block rounded-md text-sm"
                                            >
                                                <Button
                                                    variant={"outline"}
                                                    className="w-full"
                                                >
                                                    Register
                                                </Button>
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                {/* Dark Mode */}
                <Button
                    onClick={() =>
                        setTheme(() => (theme == "light" ? "dark" : "light"))
                    }
                >
                    {theme == "light" ? <MoonStarsIcon /> : <SunDimIcon />}
                </Button>
            </div>
        </div>
    );
}
