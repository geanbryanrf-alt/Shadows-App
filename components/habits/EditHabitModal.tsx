"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Habit } from "@/context/AppContext";

interface EditHabitModalProps {
    isOpen: boolean;
    onClose: () => void;
    habit: Habit | null;
    onSave: (id: string, updates: Partial<Habit>) => void;
    onDelete: (id: string) => void;
}

const EMOJIS = ["🎯", "💪", "📖", "🧘", "🏃", "✍️", "🎵", "💡", "🔥", "⚡", "🛡️", "🦇"];

const PILLARS = [
    { id: 'BODY', label: 'Corpo', color: 'text-cyan' },
    { id: 'SPIRIT', label: 'Espírito', color: 'text-red-400' },
    { id: 'MIND', label: 'Mente', color: 'text-yellow-400' },
    { id: 'RELATIONS', label: 'Relações', color: 'text-purple-400' },
];

export function EditHabitModal({ isOpen, onClose, habit, onSave, onDelete }: EditHabitModalProps) {
    const [name, setName] = useState("");
    const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
    const [selectedPillar, setSelectedPillar] = useState(PILLARS[0].id);

    useEffect(() => {
        if (habit) {
            setName(habit.name);
            setSelectedEmoji(habit.emoji);
            setSelectedPillar(habit.pillar);
        }
    }, [habit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !habit) return;

        onSave(habit.id, {
            name,
            emoji: selectedEmoji,
            pillar: selectedPillar as any
        });
        onClose();
    };

    const handleDelete = () => {
        if (!habit) return;
        if (window.confirm(`Tem certeza que deseja excluir o hábito "${habit.name}"?`)) {
            onDelete(habit.id);
            onClose();
        }
    };

    const isFixedHabit = habit?.name.toLowerCase().includes('nofap') || habit?.name.toLowerCase().includes('retenção');

    return (
        <AnimatePresence>
            {isOpen && habit && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
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
                                <h3 className="font-serif text-xl tracking-widest text-text-primary uppercase font-bold">Editar Hábito</h3>
                                <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                <div>
                                    <label className="text-[11px] uppercase tracking-[0.3em] text-text-secondary font-bold block pl-1 mb-2">Nome</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-black/40 border-2 border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-text-muted/40 focus:outline-none focus:border-cyan transition-all font-mono"
                                        disabled={isFixedHabit}
                                    />
                                    {isFixedHabit && <p className="text-[10px] text-cyan/50 mt-2 italic">* Este é um hábito mestre e não pode ter o nome alterado.</p>}
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

                                <div className="flex gap-3 mt-4">
                                    {!isFixedHabit && (
                                        <button
                                            type="button"
                                            onClick={handleDelete}
                                            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="flex-1 bg-cyan hover:bg-[#00e5ff] py-5 rounded-2xl text-[#080a0f] font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(0,212,255,0.3)] transition-all"
                                    >
                                        Salvar Alterações
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
