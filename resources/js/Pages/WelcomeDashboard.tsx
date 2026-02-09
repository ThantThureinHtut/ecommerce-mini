import { Button } from "@/Components/ui/button";
import GuestLayout from "@/Layouts/GuestLayout";
import ShopingCart from "@/assets/ShoppingCart.svg?raw";
import ItemFallback from "@/Components/Item/ItemFallback";
import { Link } from "@inertiajs/react";
import { Suspense, lazy } from "react";
import { Product } from "@/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Item = lazy(() => import("@/Components/Item/Item"));

type Products = Product[];
export default function WelcomeDashboard({ products }: { products: Products }) {
    return (
        <GuestLayout>
            <div>
                <section
                    id="welcome"
                    className="bg-secondary/50 w-full overflow-hidden border-b border-border p-4"
                >
                    <div
                        aria-hidden="true"
                        className="pointer-events-none  rounded-full bg-primary/10 blur-3xl"
                    />
                    <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-center gap-8 px-6  lg:flex-row lg:gap-12">
                        <div className="flex max-w-xl flex-col items-center gap-4 text-center lg:items-start lg:text-left welcome-enter-text">
                            <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                                Minimal. Fast. Curated.
                            </p>
                            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                <span className="text-primary">#Welcome</span>{" "}
                                to our Shopping Online Mall
                            </h1>
                            <p className="text-muted-foreground text-sm sm:text-base">
                                Clean picks, quick checkout, and a calm browsing
                                experience.
                            </p>
                            <a href="#items-container">
                                <Button className="px-6 text-base py-5">
                                    Check it
                                </Button>
                            </a>
                        </div>

                        <div
                            aria-hidden="true"
                            className="shopping-cart-art w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[420px] drop-shadow-xl welcome-enter-art"
                            dangerouslySetInnerHTML={{ __html: ShopingCart }}
                        />
                    </div>
                </section>

                {/* Items */}
                <section
                    id="items-container"
                    className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-10"
                >
                    <Suspense fallback={<ItemFallback />}>
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={route("item.detail", {
                                    name: product.name,
                                    id: product.id,
                                })}
                                className="max-w-72"
                            >
                                <Item
                                    name={product.name}
                                    price={product.price}
                                    badge={
                                        dayjs(product.created_at).format(
                                            "HH:mm",
                                        ) !== "72:00"
                                            ? "New"
                                            : ""
                                    }
                                    rating={product.ratings_count}
                                />
                            </Link>
                        ))}
                    </Suspense>
                </section>
            </div>
        </GuestLayout>
    );
}
