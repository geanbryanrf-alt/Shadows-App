import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    active?: boolean;
}

export function Card({ children, className, active = false, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-2xl p-4 transition-all duration-300",
                "border",
                active
                    ? "bg-card-hover border-cyan shadow-cyan"
                    : "bg-card border-border-subtle hover:border-border-mid",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
