"use client";

import { Header } from "@/components/ui/Header";
import { BottomNav } from "@/components/ui/BottomNav";
import { SOSButton } from "@/components/ui/SOSButton";
import { AppProvider } from "@/context/AppContext";
import { AmbientLight } from "@/components/ui/AmbientLight";
import { useApp } from "@/context/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <AppLayoutContent>{children}</AppLayoutContent>
        </AppProvider>
    );
}

function AppLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, isLoadingAuth, onboardingComplete } = useApp();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!isLoadingAuth && user && !onboardingComplete && pathname !== "/onboarding") {
            router.replace("/onboarding");
        }
    }, [user, isLoadingAuth, onboardingComplete, pathname, router]);

    const isOnboarding = pathname === "/onboarding";

    if (isLoadingAuth) {
        return (
            <div className="min-h-dvh flex items-center justify-center bg-[#080a0f]">
                <div className="w-12 h-12 border-4 border-cyan/20 border-t-cyan rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-dvh flex flex-col mx-auto max-w-md w-full relative overflow-hidden">
            <AmbientLight />
            
            <div className="flex-1 flex flex-col relative z-10 w-full h-full">
                {!isOnboarding && <Header />}

                <main className={cn("flex-1 overflow-y-auto w-full", !isOnboarding && "pb-32")}>
                    {children}
                </main>

                {!isOnboarding && <BottomNav />}
            </div>
            
            {!isOnboarding && <SOSButton />}
        </div>
    );
}


