import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import React from "react";

export default function GuestLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto p-4">
                <Header />
                <main className="mt-8">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
