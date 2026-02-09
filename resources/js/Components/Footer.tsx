import React from "react";

const footerLinks = {
    content: ["New arrivals", "Best sellers", "Collections", "Gift cards"],
    about: ["Company", "Careers", "Sustainability", "Contact"],
};

const payments = ["Visa", "Mastercard", "Touch 'n Go"];

export default function Footer() {
    return (
        <footer className="border-t border-border bg-secondary/40">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10">
                <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
                    <div className="space-y-3">
                        <p className="text-lg font-semibold text-foreground">
                            E Commerce Mini
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Curated essentials with a calm, minimalist shopping
                            experience. Built for quick discovery and clean
                            checkout.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Content
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-foreground">
                            {footerLinks.content.map((label) => (
                                <li key={label}>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            About
                        </p>
                        <ul className="mt-4 space-y-2 text-sm text-foreground">
                            {footerLinks.about.map((label) => (
                                <li key={label}>
                                    <a
                                        href="#"
                                        className="transition-colors hover:text-primary"
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-muted-foreground text-xs">
                        Payment methods
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {payments.map((method) => (
                            <span
                                key={method}
                                className="rounded-none border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground"
                            >
                                {method}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
