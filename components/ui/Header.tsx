import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

export function Header() {
    return (
        <header className="flex items-center justify-between px-4 py-4 mt-2">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center relative opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                    <Image
                        src="/bat-transparent.png"
                        alt="Shadows Logo"
                        fill
                        className="object-contain"
                        unoptimized
                        style={{ filter: 'invert(1) contrast(100%)' }}
                    />
                </div>
                <div>
                    <h1 className="font-serif text-[22px] font-extrabold tracking-[0.2em] leading-none text-text-primary">
                        SHADOWS
                    </h1>
                    <p className="text-[10px] font-normal tracking-[0.35em] text-text-secondary uppercase mt-1">
                        Discipline is freedom
                    </p>
                </div>
            </div>
            <Link href="/perfil" className="p-2 text-text-secondary hover:text-text-primary transition-colors btn-touch">
                <User size={20} />
            </Link>
        </header>
    );
}
