"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ListChecks, TrendingUp, Trophy, Bot } from "lucide-react";

const NAVIGATION_ITEMS = [
    { label: "Hábitos", href: "/", icon: ListChecks },
    { label: "Evolução", href: "/evolucao", icon: TrendingUp },
    { label: "Alfred", href: "/ameacas", icon: Bot },
    { label: "Arsenal", href: "/codigo", icon: Trophy },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4"
            style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
        >
            <div className="max-w-md w-full bg-[#121620]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 flex items-center justify-between shadow-2xl">
                {NAVIGATION_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{ WebkitTapHighlightColor: "transparent" }}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 py-2.5 px-1 rounded-xl transition-all duration-300 gap-1 active:scale-95",
                                isActive
                                    ? "bg-[#f5c518] text-[#080a0f] shadow-[0_0_20px_rgba(245,197,24,0.3)] scale-[1.02]"
                                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                            )}
                        >
                            <Icon size={isActive ? 18 : 16} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={cn(
                                "text-[10px] font-bold tracking-wider uppercase",
                                isActive ? "opacity-100" : "opacity-70"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
