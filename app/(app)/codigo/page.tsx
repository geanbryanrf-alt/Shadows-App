"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock } from "lucide-react";
import { useApp } from "@/context/AppContext";

const TROPHIES = [
    {
        day: 1,
        icon: "🌑",
        title: "INÍCIO DA JORNADA",
        desc: "Você fez a escolha mais difícil: começar. O primeiro passo para reconstruir tudo.",
        detail: "Cada hora que passa sem recair é uma vitória neural. O cérebro começa a notar que o ciclo foi quebrado.",
        color: "border-white/20",
        glow: "rgba(255,255,255,0.15)",
    },
    {
        day: 3,
        icon: "💥",
        title: "PRIMEIRO IMPACTO",
        desc: "A abstinência está no pico. Irritabilidade alta. Mas você está vencendo a dopamina.",
        detail: "Os receptores D2 de dopamina começam a se recalibrar. A dor que sente agora é o som dos grilhões quebrando.",
        color: "border-red-500/30",
        glow: "rgba(239,68,68,0.3)",
    },
    {
        day: 7,
        icon: "⚡",
        title: "PICO DE TESTOSTERONA",
        desc: "A testosterona atinge +145% do basal. Sua energia e agressividade naturais voltaram ao mundo.",
        detail: "Use essa energia em atividade física. O excesso hormonal precisa de um canal de saída produtivo.",
        color: "border-orange-500/30",
        glow: "rgba(249,115,22,0.4)",
    },
    {
        day: 14,
        icon: "👁️",
        title: "CLAREZA MENTAL",
        desc: "A névoa mental some. Concentração e memória disparam. Você se torna mais presente.",
        detail: "O córtex pré-frontal retoma o controle do córtex límbico. Você passa a pensar antes de agir.",
        color: "border-yellow-400/30",
        glow: "rgba(250,204,21,0.4)",
    },
    {
        day: 21,
        icon: "🧠",
        title: "NEUROPLÁSTICA",
        desc: "Novas vias neurais se formam. Velhos hábitos compulsivos começam a doer menos.",
        detail: "A mielina das novas rotas sinápticas se consolida. O cérebro está literalmente se recabeando.",
        color: "border-lime-400/30",
        glow: "rgba(163,230,53,0.4)",
    },
    {
        day: 30,
        icon: "🫀",
        title: "BLINDAGEM",
        desc: "Cortisol normalizado. Ansiedade social diminui visivelmente. Presença magnética real.",
        detail: "O sistema nervoso autônomo recupera o equilíbrio. Você pode entrar em qualquer sala com confiança.",
        color: "border-emerald-400/30",
        glow: "rgba(52,211,153,0.4)",
    },
    {
        day: 45,
        icon: "🦅",
        title: "VISÃO DE ÁGUIA",
        desc: "Foco absurdo. Olhos vibrantes e penetrantes. Atenção profunda restaurada.",
        detail: "A dopamina basal está normalizada. Pequenos prazeres da vida voltam a ser prazerosos de verdade.",
        color: "border-teal-400/30",
        glow: "rgba(45,212,191,0.4)",
    },
    {
        day: 60,
        icon: "⚔️",
        title: "FORTALEZA",
        desc: "O corpo é uma arma. Disciplina é automática. Tentações perdem poder sobre você.",
        detail: "Autocontrole virou um traço de personalidade, não um esforço. Você não resiste mais, simplesmente não quer.",
        color: "border-cyan/30",
        glow: "rgba(0,212,255,0.4)",
    },
    {
        day: 90,
        icon: "🦇",
        title: "O RENASCIMENTO",
        desc: "Reboot completo. Dopamina restaurada. Você governa o seu espírito. Liberdade total.",
        detail: "O reset neurológico está completo. Este não é o fim, é o nascimento de um homem novo e livre.",
        color: "border-white/50",
        glow: "rgba(0,212,255,0.7)",
    },
];

export default function CodigoPage() {
    const { rebootDays } = useApp();
    const [selected, setSelected] = useState<typeof TROPHIES[0] | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="px-4 py-6 flex flex-col gap-6 pb-32"
        >
            {/* Header */}
            <div className="text-center px-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-cyan font-bold mb-1 drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]">
                    Arsenal do Guerreiro
                </p>
                <h2 className="font-serif text-[22px] text-text-primary tracking-wide font-bold mb-2">
                    Suas Conquistas
                </h2>
                <p className="text-[11px] text-text-muted uppercase tracking-widest leading-relaxed">
                    Cada dia limpo desbloqueia uma nova armadura neurológica.
                </p>
            </div>

            {/* Streak atual */}
            <div
                className="rounded-2xl p-4 flex items-center justify-between border border-white/5"
                style={{ background: "rgba(0,212,255,0.05)" }}
            >
                <div>
                    <p className="text-[9px] uppercase tracking-widest text-cyan mb-1">Dias no Reboot</p>
                    <p className="text-3xl font-mono font-bold text-white">{rebootDays}</p>
                </div>
                <div className="text-right">
                    <p className="text-[9px] uppercase tracking-widest text-text-muted mb-1">Próxima conquista</p>
                    <p className="text-sm font-bold text-white">
                        {TROPHIES.find(t => t.day > rebootDays)
                            ? `Dia ${TROPHIES.find(t => t.day > rebootDays)!.day}`
                            : "Tudo desbloqueado!"}
                    </p>
                </div>
            </div>

            {/* Grid de Troféus */}
            <div className="grid grid-cols-3 gap-3">
                {TROPHIES.map((trophy, i) => {
                    const unlocked = rebootDays >= trophy.day;
                    return (
                        <motion.button
                            key={trophy.day}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            whileTap={{ scale: 0.93 }}
                            onClick={() => setSelected(trophy)}
                            className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl p-4 border transition-all ${trophy.color}`}
                            style={{
                                background: unlocked
                                    ? `radial-gradient(ellipse at center, ${trophy.glow}20 0%, #0a0d1480 100%)`
                                    : "rgba(5,7,10,0.5)",
                                boxShadow: unlocked ? `0 0 20px ${trophy.glow}30` : "none",
                                opacity: unlocked ? 1 : 0.4,
                            }}
                        >
                            {!unlocked && (
                                <div className="absolute top-2 right-2">
                                    <Lock size={10} className="text-white/30" />
                                </div>
                            )}
                            <span
                                className={`text-3xl transition-all ${!unlocked ? "grayscale" : ""}`}
                                style={unlocked ? { filter: `drop-shadow(0 0 8px ${trophy.glow})` } : {}}
                            >
                                {trophy.icon}
                            </span>
                            <div className="text-center">
                                <p className="text-[8px] font-bold uppercase tracking-wider text-white/80 leading-tight">
                                    {trophy.title}
                                </p>
                                <p className="text-[8px] text-white/30 mt-0.5">Dia {trophy.day}</p>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Modal de detalhe */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                        className="fixed inset-0 z-[80] flex items-end justify-center px-4 pb-8"
                        style={{ background: "rgba(5,7,10,0.85)", backdropFilter: "blur(10px)" }}
                    >
                        <motion.div
                            initial={{ y: 60, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 60, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className={`w-full max-w-md rounded-3xl p-6 border ${selected.color} glass-card`}
                            style={{
                                background: `radial-gradient(ellipse at top, ${selected.glow}15, #0a0d14 70%)`,
                                boxShadow: `0 0 40px ${selected.glow}25`,
                            }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span
                                    className="text-5xl"
                                    style={{ filter: `drop-shadow(0 0 12px ${selected.glow})` }}
                                >
                                    {selected.icon}
                                </span>
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-text-muted">Dia {selected.day}</p>
                                    <h3 className="font-serif text-[18px] font-bold text-white uppercase tracking-wider">
                                        {selected.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="text-[13px] text-text-primary leading-relaxed mb-3">{selected.desc}</p>
                            <div className="border-t border-white/5 pt-3">
                                <p className="text-[10px] uppercase tracking-widest text-text-muted mb-2">A Ciência por trás</p>
                                <p className="text-[11px] text-text-secondary leading-relaxed italic">{selected.detail}</p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className="mt-4 w-full py-3 rounded-xl text-[11px] uppercase tracking-widest font-bold text-text-muted border border-white/10 hover:border-white/20 transition-colors"
                            >
                                Fechar
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
