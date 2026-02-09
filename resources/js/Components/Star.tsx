import { cn } from "@/lib/utils";

export function Star({ active }: { active: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={cn(
                "size-4 transition-colors",
                active ? "text-primary" : "text-muted-foreground/40"
            )}
            fill="currentColor"
        >
            <path d="M12 3.5l2.9 5.87 6.48.94-4.69 4.58 1.11 6.46L12 18.9l-5.8 3.05 1.11-6.46L2.62 10.3l6.48-.94L12 3.5z" />
        </svg>
    );
}
