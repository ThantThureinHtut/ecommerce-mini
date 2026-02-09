import Footer from "@/Components/Footer";
import SellerHeader from "@/Components/Seller/SellerHeader";
import React from "react";

export default function SellerLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto p-4">
                <SellerHeader />
                <main className="mt-8">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
