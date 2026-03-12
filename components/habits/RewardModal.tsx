"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

interface RewardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const REWARD_MESSAGES = [
    {
        title: "RECEPTORES RESTAURADOS",
        body: "Ao completar seus hábitos hoje, seus receptores de dopamina estão sendo recalibrados. O prazer artificial perde poder. O prazer real retorna.",
        icon: "🧠",
    },
    {
        title: "TESTOSTERONA ATIVADA",
        body: "Seu treino e jejum de hoje elevaram sua testosterona natural. Confiança, energia e presença magnética estão sendo forjadas agora.",
        icon: "⚡",
    },
    {
        title: "SINAPSES FORTALECIDAS",
        body: "Ler e ouvir conteúdo de valor hoje criou novas conexões neurais. Sua mente está se tornando mais afiada que ontem.",
        icon: "👁️",
    },
    {
        title: "ARMADURA ESPIRITUAL ATIVA",
        body: "Sua oração de hoje reforçou sua ancoragem espiritual. A paz interior que você sente agora é o que nenhum vício entrega.",
        icon: "🛡️",
    },
    {
        title: "CORTISOL NEUTRALIZADO",
        body: "A disciplina de hoje reduziu o cortisol do estresse crônico. Sua ansiedade está recuando. Seu corpo agradece.",
        icon: "🫀",
    },
    {
        title: "NEUROPLASTICIDADE ATIVA",
        body: "Cada dia que você completa todos os hábitos, velhas vias neurais do vício enfraquecem. Novas vias de disciplina se solidificam.",
        icon: "🔬",
    },
    {
        title: "CAMPO DE FORÇA ATIVO",
        body: "Hoje você provou que pode controlar impulsos. Isso reescreve a história que seu cérebro conta sobre quem você é.",
        icon: "💎",
    },
    {
        title: "EVOLUÇÃO SILENCIOSA",
        body: "As pessoas ao seu redor ainda não perceberam, mas por dentro você já é outra pessoa. A transformação é inevitável.",
        icon: "🦇",
    },
];

export function RewardModal({ isOpen, onClose }: RewardModalProps) {
    const message = REWARD_MESSAGES[Math.floor(Math.random() * REWARD_MESSAGES.length)];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 40 }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        className="w-full max-w-sm relative z-10"
                    >
                        {/* Glow de fundo */}
                        <div className="absolute -inset-10 bg-cyan/10 rounded-full blur-[80px] pointer-events-none" />

                        <div className="relative bg-[#0a0d14] border border-cyan/30 rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(0,212,255,0.15)]">
                            {/* Barra superior cyan */}
                            <div className="h-1 bg-gradient-to-r from-transparent via-cyan to-transparent" />

                            <button
                                onClick={onClose}
                                className="absolute top-5 right-5 text-text-secondary hover:text-white transition-colors p-1.5 bg-white/5 rounded-full z-20"
                            >
                                <X size={16} />
                            </button>

                            <div className="p-8 pt-10 flex flex-col items-center text-center">
                                {/* Bat Icon com glow */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                                    className="relative w-24 h-24 mb-6"
                                >
                                    <div className="absolute inset-0 bg-cyan/20 rounded-full blur-xl animate-pulse" />
                                    <div className="relative w-full h-full drop-shadow-[0_0_20px_rgba(0,212,255,0.6)]" style={{ filter: 'invert(1) contrast(100%)' }}>
                                        <Image
                                            src="/bat-transparent.png"
                                            alt="Morcego Desperto"
                                            fill
                                            className="object-contain"
                                            unoptimized
                                        />
                                    </div>
                                </motion.div>

                                {/* Título Principal */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h2 className="font-serif text-[10px] uppercase tracking-[0.4em] text-cyan/70 font-bold mb-2">
                                        Dia Perfeito
                                    </h2>
                                    <h3 className="font-serif text-2xl font-extrabold tracking-[0.15em] text-white mb-1 drop-shadow-[0_0_10px_rgba(0,212,255,0.3)]">
                                        O MORCEGO DESPERTOU
                                    </h3>
                                </motion.div>

                                {/* Divider */}
                                <div className="w-16 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent my-5" />

                                {/* Card do benefício */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="w-full bg-cyan/[0.04] border border-cyan/10 rounded-2xl p-5 mb-6"
                                >
                                    <div className="flex items-center gap-2 mb-3 justify-center">
                                        <span className="text-xl">{message.icon}</span>
                                        <span className="text-[9px] uppercase tracking-[0.2em] text-cyan font-bold">
                                            {message.title}
                                        </span>
                                    </div>
                                    <p className="text-[12px] text-text-secondary leading-relaxed">
                                        {message.body}
                                    </p>
                                </motion.div>

                                {/* Botão de fechar */}
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    onClick={onClose}
                                    className="w-full bg-cyan/80 hover:bg-cyan py-4 rounded-2xl text-[#080a0f] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all text-sm"
                                >
                                    Continuar
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
