import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { Button } from "@/Components/ui/button";
import {
    DotsThreeOutlineVerticalIcon,
    MoonStarsIcon,
    PackageIcon,
    ShoppingCartIcon,
    SunDimIcon,
} from "@phosphor-icons/react";
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
import { Separator } from "@/Components/ui/separator";

type NavItem = { label: string; icon: any | null; href: string };

const nav: NavItem[] = [
    { label: "Home", icon: null, href: "/seller/dashboard" },
];

export default function SellerHeader() {
    const { theme, setTheme } = useTheme();
    const { auth } = usePage().props;
    const user = auth.user;
    const isSeller = auth.isSeller;
    return (
        <div className="flex items-center justify-between">
            <Link
                href={"/seller/dashboard"}
                className="text-2xl font-extrabold bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent "
            >
                E-Commerce Mini{" "}
                <strong className="bg-primary text-white py-1 px-2 text-2xl">
                    Seller
                </strong>
            </Link>

            {/* User Menu And Dark Mode */}
            <ul className="sm:flex gap-4 hidden items-center justify-center ">
                {/* Check if User Already Login Doesn't show Login and Register */}
                {!user || !isSeller ? (
                    <>
                        <Link href={route("seller.login")}>
                            <Button className="text-sm p-3">login</Button>
                        </Link>
                        <Link href={route("seller.register")}>
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
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>History</DropdownMenuItem>
                                <Link
                                    href={route("seller.logout")}
                                    method="post"
                                    className="w-full"
                                >
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

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
                            <nav className="mt-6 flex flex-col gap-2">
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
                            <div className="mt-6 border-t pt-4 flex flex-col gap-2 justify-center">
                                <Link
                                    href={route("seller.login")}
                                    className="block rounded-md  text-sm"
                                >
                                    <Button className="w-full">Login</Button>
                                </Link>
                                <Link
                                    href={route("seller.register")}
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
