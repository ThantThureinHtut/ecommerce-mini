import SellerLayout from "@/Layouts/SellerLayout";
import { Button } from "@/Components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import {
    Storefront,
    Package,
    ChartLineUp,
    ClipboardText,
    Plus,
} from "@phosphor-icons/react";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function SellerDashboard() {
    const { auth } = usePage().props;
    const user = auth.user;
    const isSeller = auth.isSeller;
    const [showAuthAlert, setShowAuthAlert] = useState(false);

    const handleProtectedAction = () => {
        if (!user || !isSeller) {
            setShowAuthAlert(true);
        }
    };

    return (
        <SellerLayout>
            <div>
                {/* Auth Required Alert Dialog */}
                <AlertDialog
                    open={showAuthAlert}
                    onOpenChange={setShowAuthAlert}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-lg">
                                Login required
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm">
                                Please log in or sign up first to access seller
                                features.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Link href={route("seller.login")}>
                                    Continue
                                </Link>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Welcome Section */}
                <section
                    id="seller-welcome"
                    className="bg-secondary/50 w-full overflow-hidden border border-border p-4 relative"
                >
                    {/* Decorative blur elements */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-primary/10 blur-[80px]"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-16 -right-16 size-56 rounded-full bg-primary/15 blur-[60px]"
                    />

                    <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center gap-8 px-6 py-8 lg:flex-row lg:gap-12 relative z-10">
                        {/* Text Content */}
                        <div className="flex max-w-xl flex-col items-center gap-4 text-center lg:items-start lg:text-left welcome-enter-text">
                            <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                                Seller Dashboard
                            </p>
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                <span className="text-primary">#Welcome</span>{" "}
                                to your Store Hub
                            </h1>
                            <p className="text-muted-foreground text-sm sm:text-base">
                                Manage your products, track orders, and grow
                                your business — all in one place.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-2">
                                <Link
                                    href={
                                        showAuthAlert
                                            ? ""
                                            : route("add-product.dashboard")
                                    }
                                >
                                    <Button
                                        className="px-6 text-base py-5 gap-2"
                                        onClick={handleProtectedAction}
                                    >
                                        <Plus
                                            className="size-4"
                                            weight="bold"
                                        />
                                        Add Product
                                    </Button>
                                </Link>
                                <Link
                                    href={
                                        showAuthAlert
                                            ? ""
                                            : route("order-view.dashboard")
                                    }
                                >
                                    <Button
                                        variant="outline"
                                        className="px-6 text-base py-5 gap-2"
                                        onClick={handleProtectedAction}
                                    >
                                        <ClipboardText className="size-4" />
                                        View Orders
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Icon Illustration */}
                        <div
                            aria-hidden="true"
                            className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] welcome-enter-art"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group flex flex-col items-center justify-center gap-2 rounded-none border border-border bg-background/80 p-6 backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5">
                                    <div className="grid size-12 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Storefront
                                            className="size-6"
                                            weight="fill"
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Your Store
                                    </span>
                                </div>
                                <div className="group flex flex-col items-center justify-center gap-2 rounded-none border border-border bg-background/80 p-6 backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5">
                                    <div className="grid size-12 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Package
                                            className="size-6"
                                            weight="fill"
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Products
                                    </span>
                                </div>
                                <div className="group flex flex-col items-center justify-center gap-2 rounded-none border border-border bg-background/80 p-6 backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5">
                                    <div className="grid size-12 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <ClipboardText
                                            className="size-6"
                                            weight="fill"
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Orders
                                    </span>
                                </div>
                                <div className="group flex flex-col items-center justify-center gap-2 rounded-none border border-border bg-background/80 p-6 backdrop-blur transition-all hover:border-primary/40 hover:bg-primary/5">
                                    <div className="grid size-12 place-items-center rounded-none bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                        <ChartLineUp
                                            className="size-6"
                                            weight="fill"
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Analytics
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </SellerLayout>
    );
}
