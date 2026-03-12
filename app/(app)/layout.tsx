import { Header } from "@/components/ui/Header";
import { BottomNav } from "@/components/ui/BottomNav";
import { SOSButton } from "@/components/ui/SOSButton";
import { AppProvider } from "@/context/AppContext";
import { AmbientLight } from "@/components/ui/AmbientLight";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <AppProvider>
            <div className="min-h-dvh flex flex-col mx-auto max-w-md w-full relative overflow-hidden">
                <AmbientLight />
                
                <div className="flex-1 flex flex-col relative z-10 w-full h-full">
                    <Header />

                    <main className="flex-1 overflow-y-auto pb-32 w-full">
                        {children}
                    </main>

                    <BottomNav />
                </div>
                
                <SOSButton />
            </div>
        </AppProvider>
    );
}


