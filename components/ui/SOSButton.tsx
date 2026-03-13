"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";

const SHOCK_ACTIONS = [
    { emoji: "💪", text: "Faça 30 FLEXÕES agora.", sub: "Esgote o corpo. Prove que você controla seus impulsos.", duration: 120 },
    { emoji: "🧊", text: "Água gelada no rosto AGORA.", sub: "O choque térmico ativa a resposta de sobrevivência. Faça isso.", duration: 60 },
    { emoji: "🏃", text: "Saia do quarto. Ande 5 minutos.", sub: "Mudança de ambiente corta o loop de gatilho imediatamente.", duration: 300 },
    { emoji: "🧘", text: "Respire 4-7-8 por 3 ciclos.", sub: "Inspire 4s. Segure 7s. Expire 8s. Acalme o pico límbico.", duration: 90 },
    { emoji: "🚿", text: "Banho gelado de 2 minutos.", sub: "Testosterona sobe. Dopamina normaliza. Você sai vencedor.", duration: 120 },
];

const LOSSES = [
    "dias de mente limpa",
    "sua autoconfiança reconstruída",
    "os receptores de dopamina que estão cicatrizando",
    "o respeito que está reconquistando",
    "a armadura espiritual que está construindo",
];

type Phase = "idle" | "impact" | "action" | "survived";

export function SOSButton() {
    const { rebootDays } = useApp();
    const [phase, setPhase] = useState<Phase>("idle");
    const [action, setAction] = useState(SHOCK_ACTIONS[0]);
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);



    const openSOS = () => {
        const randomAction = SHOCK_ACTIONS[Math.floor(Math.random() * SHOCK_ACTIONS.length)];
        setAction(randomAction);
        setPhase("impact");
    };

    const startAction = () => {
        setTimeLeft(action.duration);
        setPhase("action");
    };

    useEffect(() => {
        if (phase === "action" && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((t) => {
                    if (t <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [phase, action, timeLeft]);

    const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

    const close = () => setPhase("idle");

    return (
        <>
            {/* Botão flutuante */}
            <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-40 pointer-events-none">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openSOS}
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl transition-all pointer-events-auto relative overflow-hidden"
                    style={{
                        background: "linear-gradient(to right, #1a0505, #2d0808)",
                        border: "1px solid #e53935",
                        boxShadow: "0 0 15px rgba(229,57,53,0.3)",
                    }}
                >
                    <motion.div
                        className="absolute inset-0 bg-red-500/10"
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="flex items-center gap-3 relative z-10">
                        <span className="text-[#f5c518] text-lg drop-shadow-[0_0_5px_rgba(245,197,24,0.5)]">🦇</span>
                        <span className="font-bold text-sm tracking-[0.1em] text-white">THE CAVERNA</span>
                    </div>
                    <div
                        className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase text-white tracking-widest relative z-10"
                        style={{ backgroundColor: "#e53935", boxShadow: "0 0 10px rgba(229,57,53,0.8)" }}
                    >
                        SOS
                    </div>
                </motion.button>
            </div>

            {/* Modal Fullscreen */}
            <AnimatePresence>
                {phase !== "idle" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
                        style={{ background: "radial-gradient(ellipse at center, #1a0000 0%, #05000080 100%)", backdropFilter: "blur(20px)" }}
                    >
                        {/* Pulse vermelho de fundo */}
                        <motion.div
                            className="absolute inset-0 bg-red-900/20"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />

                        <AnimatePresence mode="wait">

                            {/* FASE 1: IMPACTO / AVERSÃO À PERDA */}
                            {phase === "impact" && (
                                <motion.div
                                    key="impact"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 1.1, opacity: 0 }}
                                    className="flex flex-col items-center gap-6 text-center relative z-10 w-full max-w-sm"
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.8, repeat: Infinity }}
                                        className="text-5xl"
                                    >
                                        ⚠️
                                    </motion.div>

                                    <h1 className="font-serif text-[28px] font-bold text-white uppercase tracking-widest leading-tight drop-shadow-[0_0_15px_rgba(255,100,100,0.8)]">
                                        Alerta Límbico
                                    </h1>

                                    <div className="bg-black/40 border border-red-500/30 rounded-2xl p-5 text-left w-full">
                                        <p className="text-[12px] uppercase tracking-widest text-red-400 font-bold mb-3">Se você ceder agora, perderá:</p>
                                        <ul className="flex flex-col gap-2">
                                            <li className="flex items-center gap-2 text-white font-bold text-[15px]">
                                                <span className="text-red-400">✗</span>
                                                <span>{rebootDays} {LOSSES[0]}</span>
                                            </li>
                                            {LOSSES.slice(1).map((loss, i) => (
                                                <li key={i} className="flex items-center gap-2 text-white/70 text-[13px]">
                                                    <span className="text-red-400/60">✗</span>
                                                    {loss}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <p className="text-[11px] text-white/50 uppercase tracking-widest">
                                        Seu cérebro está mentindo para você agora. A fissura passa em minutos.
                                    </p>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={startAction}
                                        className="w-full py-4 rounded-2xl font-black text-[14px] uppercase tracking-widest text-white"
                                        style={{ background: "linear-gradient(135deg, #c62828, #e53935)", boxShadow: "0 0 25px rgba(229,57,53,0.6)" }}
                                    >
                                        Ativar Protocolo de Escape →
                                    </motion.button>

                                    <button onClick={close} className="text-[10px] uppercase tracking-widest text-white/20 hover:text-white/40 transition-colors">
                                        Fechar
                                    </button>
                                </motion.div>
                            )}

                            {/* FASE 2: A ORDEM DE CHOQUE */}
                            {phase === "action" && (
                                <motion.div
                                    key="action"
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    className="flex flex-col items-center gap-8 text-center relative z-10 w-full max-w-sm"
                                >
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-red-400 font-bold mb-2">Ordem Ativa</p>
                                        <motion.div
                                            animate={{ rotate: [0, -3, 3, 0] }}
                                            transition={{ duration: 0.5, repeat: 2 }}
                                            className="text-7xl mb-4"
                                        >
                                            {action.emoji}
                                        </motion.div>
                                        <h2 className="font-serif text-[22px] font-bold text-white uppercase tracking-wider leading-tight">
                                            {action.text}
                                        </h2>
                                        <p className="text-[12px] text-white/50 mt-3 leading-relaxed">{action.sub}</p>
                                    </div>

                                    {/* Timer */}
                                    <div className="w-40 h-40 relative flex items-center justify-center">
                                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                                            <circle cx="80" cy="80" r="72" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                                            <motion.circle
                                                cx="80" cy="80" r="72"
                                                stroke="#e53935"
                                                strokeWidth="8"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeDasharray={2 * Math.PI * 72}
                                                animate={{ strokeDashoffset: (2 * Math.PI * 72) * (1 - timeLeft / action.duration) }}
                                                style={{ filter: "drop-shadow(0 0 8px #e53935)" }}
                                            />
                                        </svg>
                                        <span className="font-mono text-3xl font-bold text-white">
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setPhase("survived")}
                                        className="w-full py-4 rounded-2xl font-black text-[14px] uppercase tracking-widest text-[#080a0f]"
                                        style={{ background: "linear-gradient(135deg, #4ade80, #22c55e)", boxShadow: "0 0 25px rgba(74,222,128,0.5)" }}
                                    >
                                        ✓ Sobrevivi
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* FASE 3: VITÓRIA */}
                            {phase === "survived" && (
                                <motion.div
                                    key="survived"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center gap-6 text-center relative z-10 w-full max-w-sm"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.3, 1] }}
                                        transition={{ duration: 0.6, ease: "backOut" }}
                                        className="text-7xl"
                                    >
                                        🦇
                                    </motion.div>

                                    <div>
                                        <h2 className="font-serif text-[28px] font-bold text-white uppercase tracking-widest drop-shadow-[0_0_15px_rgba(0,212,255,0.8)]">
                                            Batalha Vencida
                                        </h2>
                                        <p className="text-[12px] text-white/60 mt-2 leading-relaxed">
                                            Você provou que é mais forte do que o impulso. Cada vitória reconstrói os seus receptores de dopamina.
                                        </p>
                                    </div>

                                    <div className="bg-cyan/10 border border-cyan/20 rounded-2xl p-4 w-full text-center">
                                        <p className="text-[10px] uppercase tracking-widest text-cyan mb-1">Protegido</p>
                                        <p className="text-2xl font-bold font-mono text-white">{rebootDays} dias</p>
                                        <p className="text-[10px] text-white/40 mt-1">de mente limpa intactos</p>
                                    </div>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={close}
                                        className="w-full py-4 rounded-2xl font-black text-[14px] uppercase tracking-widest text-[#080a0f]"
                                        style={{ background: "linear-gradient(135deg, #00D4FF, #0066ff)", boxShadow: "0 0 25px rgba(0,212,255,0.5)" }}
                                    >
                                        Continuar a Missão
                                    </motion.button>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
