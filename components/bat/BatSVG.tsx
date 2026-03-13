"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

// Morcego progressivo: começa invisível e vai aparecendo conforme hábitos são completados
export function BatSVG({ progress, className }: { progress: number; className?: string }) {
    // progress: 0 (nenhum hábito) → 1 (todos completos)
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Tamanho: inicia pequeno e cresce com o progresso
    const minSize = 60;
    const maxSize = 180;
    const size = minSize + clampedProgress * (maxSize - minSize);

    // Opacidade: começa em 0.2 (visível pálido) e chega a 1.0 (totalmente visível)
    const opacity = 0.2 + clampedProgress * 0.8;

    // Contraste e Cor: Morcego Branco Sólido
    const isFullyAwake = clampedProgress >= 1;
    const glowStyle = isFullyAwake
        ? "drop-shadow(0 0 25px rgba(0, 212, 255, 0.7)) drop-shadow(0 0 50px rgba(0, 212, 255, 0.3))"
        : clampedProgress > 0.5
            ? `drop-shadow(0 0 ${Math.round(clampedProgress * 15)}px rgba(0, 212, 255, ${clampedProgress * 0.4}))`
            : "none";

    // O filtro brightness(0) invert(1) faz ficar branco puro se for uma imagem escura
    // Adicionamos brightness(1.5) no final para brilhar mais se quiser
    const filterStyle = `brightness(0) invert(1) ${glowStyle}`.trim();

    // Animação de bater asas (wing flap)
    const flapVariants: Variants = {
        flap: {
            scaleX: [1, 1.25, 1], // Expande mais horizontalmente (asas batendo)
            scaleY: [1, 0.85, 1], // Contrai verticalmente
            transition: {
                duration: isFullyAwake ? 0.8 : 2.5, // Bem mais rápido quando desperto
                repeat: Infinity,
                ease: "easeInOut",
            }
        }
    };

    return (
        <motion.div
            className={cn("flex items-center justify-center", className)}
            style={{
                width: size,
                height: size,
                filter: filterStyle,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: opacity,
                scale: isFullyAwake ? 1.15 : 0.85 + clampedProgress * 0.15,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
        >
            <motion.div 
                className={cn(
                    "relative w-full h-full",
                    isFullyAwake && "animate-float"
                )}
                variants={flapVariants}
                animate="flap"
            >
                <Image
                    src="/bat-transparent.png"
                    alt="Morcego — O Protocolo"
                    fill
                    className="object-contain"
                    priority
                    unoptimized
                />
            </motion.div>
        </motion.div>
    );
}
