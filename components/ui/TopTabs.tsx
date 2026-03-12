"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
    { label: "Hábitos", href: "/dashboard" },
    { label: "Evolução", href: "/evolucao" },
    { label: "Ameaças", href: "/ameacas" },
    { label: "Código", href: "/codigo" },
];

export function TopTabs() {
    const pathname = usePathname();

    return (
        <div className="px-4 mb-4">
            <div className="flex items-center bg-card rounded-xl p-1 border border-border-subtle">
                {TABS.map((tab) => {
                    const isActive = pathname === tab.href || (pathname === '/' && tab.href === '/dashboard');

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={cn(
                                "flex-1 text-center py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 btn-touch",
                                isActive
                                    ? "bg-[#f5c518] text-[#080a0f] shadow-[0_0_15px_rgba(245,197,24,0.3)]"
                                    : "text-text-secondary hover:text-text-primary"
                            )}
                        >
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
