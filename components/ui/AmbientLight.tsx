"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export function AmbientLight() {
    const { progressToday } = useApp();

    // Quando progressToday = 0, a luz é bem fraca e levemente avermelhada/escura
    // Quando progressToday = 1, a luz é um ciano intenso e expansivo
    
    // Calcula opacidade da luz ambiente (mínimo 0.1, máximo 0.4)
    const opacity = 0.1 + (progressToday * 0.3);
    
    // Scale do glow
    const scale = 1 + (progressToday * 0.5);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Fundo escuro base */}
            <div className="absolute inset-0 bg-[#020408]" />

            {/* Orb Principal (Central/Topo) */}
            <motion.div
                animate={{
                    opacity: opacity,
                    scale: scale,
                    y: [0, -20, 0],
                }}
                transition={{
                    y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 1 },
                    scale: { duration: 1 }
                }}
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[100px] transform-gpu"
                style={{
                    background: progressToday > 0 
                        ? `radial-gradient(circle, rgba(0,212,255,${0.3 + (progressToday * 0.2)}) 0%, transparent 70%)` 
                        : "radial-gradient(circle, rgba(200,30,30,0.1) 0%, transparent 70%)",
                    willChange: "transform, opacity"
                }}
            />

            {/* Orb Secundário (Bottom) */}
            <motion.div
                animate={{
                    opacity: opacity * 0.6,
                    scale: scale * 1.2,
                    x: [0, 30, -30, 0],
                }}
                transition={{
                    x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 1 },
                    scale: { duration: 1 }
                }}
                className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full blur-[80px] transform-gpu"
                style={{
                    background: progressToday > 0 
                        ? `radial-gradient(circle, rgba(0,102,255,${0.2 + (progressToday * 0.2)}) 0%, transparent 70%)` 
                        : "radial-gradient(circle, rgba(30,10,10,0.2) 0%, transparent 70%)",
                    willChange: "transform, opacity"
                }}
            />
        </div>
    );
}
