"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AddHabitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (habit: { name: string; emoji: string; pillar: string; block: string; xp_value: number }) => void;
}

const EMOJIS = ["🎯", "💪", "📖", "🧘", "🏃", "✍️", "🎵", "💡", "🔥", "⚡", "🛡️", "🦇"];

const PILLARS = [
    { id: 'BODY', label: 'Corpo', color: 'text-cyan' },
    { id: 'SPIRIT', label: 'Espírito', color: 'text-red-400' },
    { id: 'MIND', label: 'Mente', color: 'text-yellow-400' },
    { id: 'RELATIONS', label: 'Relações', color: 'text-purple-400' },
];

export function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
    const [name, setName] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
    const [selectedPillar, setSelectedPillar] = useState(PILLARS[0].id);
    const [selectedBlock, setSelectedBlock] = useState("MORNING");

    const BLOCKS = [
        { id: "MORNING", label: "Manhã" },
        { id: "ANYTIME", label: "Livre" },
        { id: "NIGHT", label: "Noite" }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onAdd({
            name,
            emoji: selectedEmoji,
            pillar: selectedPillar,
            block: selectedBlock,
            xp_value: 10 // Valor base padrão para todos MVP
        });

        setName("");
        setSelectedEmoji(EMOJIS[0]);
        setSelectedBlock("MORNING");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-md bg-[#0f1622] border border-white/10 rounded-[32px] overflow-hidden relative shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)]"
                    >
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-serif text-xl tracking-widest text-text-primary uppercase font-bold">Novo Hábito</h3>
                                <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div>
                                    <input
                                        autoFocus
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nome do hábito..."
                                        className="w-full bg-black/40 border-2 border-cyan/20 rounded-2xl px-6 py-4 text-white placeholder:text-text-muted/40 focus:outline-none focus:border-cyan transition-all font-mono"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[11px] uppercase tracking-[0.3em] text-text-secondary font-bold block pl-1">Ícone</label>
                                    <div className="flex flex-wrap gap-2">
                                        {EMOJIS.map((emoji) => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => setSelectedEmoji(emoji)}
                                                className={cn(
                                                    "w-11 h-11 flex items-center justify-center rounded-xl transition-all text-xl",
                                                    selectedEmoji === emoji
                                                        ? "bg-cyan/20 border-2 border-cyan shadow-[0_0_15px_rgba(0,212,255,0.3)] scale-110"
                                                        : "bg-white/5 border border-white/5 hover:border-white/20"
                                                )}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[11px] uppercase tracking-[0.3em] text-text-secondary font-bold block pl-1">Pilar</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {PILLARS.map((p) => (
                                            <button
                                                key={p.id}
                                                type="button"
                                                onClick={() => setSelectedPillar(p.id)}
                                                className={cn(
                                                    "flex items-center justify-center p-3 rounded-xl border transition-all text-[10px] uppercase tracking-widest font-bold",
                                                    selectedPillar === p.id
                                                        ? "border-cyan/50 bg-cyan/10 text-cyan shadow-[0_0_10px_rgba(0,212,255,0.1)]"
                                                        : "border-white/5 bg-white/5 text-text-secondary opacity-60"
                                                )}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[11px] uppercase tracking-[0.3em] text-text-secondary font-bold block pl-1">Turno</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {BLOCKS.map((b) => (
                                            <button
                                                key={b.id}
                                                type="button"
                                                onClick={() => setSelectedBlock(b.id)}
                                                className={cn(
                                                    "flex items-center justify-center p-3 rounded-xl border transition-all text-[10px] uppercase tracking-widest font-bold",
                                                    selectedBlock === b.id
                                                        ? "border-cyan/50 bg-cyan/10 text-cyan shadow-[0_0_10px_rgba(0,212,255,0.1)]"
                                                        : "border-white/5 bg-white/5 text-text-secondary opacity-60"
                                                )}
                                            >
                                                {b.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!name.trim()}
                                    className="w-full bg-cyan/80 hover:bg-cyan py-5 rounded-2xl text-[#080a0f] font-black uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all disabled:opacity-30 disabled:shadow-none btn-touch mt-4 text-sm"
                                >
                                    Adicionar
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
