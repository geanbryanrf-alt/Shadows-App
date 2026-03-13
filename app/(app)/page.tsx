"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { BatSVG } from "@/components/bat/BatSVG";
import { motion, AnimatePresence } from "framer-motion";
import { AddHabitModal } from "@/components/habits/AddHabitModal";
import { RewardModal } from "@/components/habits/RewardModal";
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useState, useEffect } from "react";
import { CatholicContent } from "@/components/ui/CatholicContent";

const MOCK_STATS_LABELS = [
    { icon: "🔥", label: "Streak" },
    { icon: "🏆", label: "Recorde" },
    { icon: "⭐", label: "Dias Perfeitos" },
    { icon: "✅", label: "Total" },
];

const DAYS_ABBR = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// Calcula os 7 dias da semana atual (Seg-Dom) para mostrar na grid
function getWeekDates(): number[] {
    const today = new Date();
    const dow = today.getDay(); // 0=Dom
    const mondayOffset = dow === 0 ? -6 : 1 - dow;
    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() + mondayOffset + i);
        return d.getDate();
    });
}

export default function DashboardPage() {
    const {
        habits, toggleHabitDay, addHabit, deleteHabit,
        currentDayIndex, completedToday, totalHabits, progressToday,
        rebootDays, faithLevel
    } = useApp();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRewardOpen, setIsRewardOpen] = useState(false);
    const hasShownReward = useRef(false);
    const weekDates = getWeekDates();

    // Detectar dia perfeito e mostrar recompensa
    useEffect(() => {
        if (totalHabits > 0 && completedToday === totalHabits && !hasShownReward.current) {
            hasShownReward.current = true;
            setTimeout(() => setIsRewardOpen(true), 600);
        }
        if (completedToday < totalHabits) {
            hasShownReward.current = false;
        }
    }, [completedToday, totalHabits]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-2 flex flex-col gap-6 pb-24"
        >
            <AddHabitModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={addHabit}
            />
            <RewardModal
                isOpen={isRewardOpen}
                onClose={() => setIsRewardOpen(false)}
            />

            {/* HUD Centralizada */}
            <section
                className="rounded-3xl p-6 glass-card flex flex-col items-center justify-center relative overflow-hidden h-[240px] border-t border-t-cyan/10"
                style={{ background: "radial-gradient(circle at center, #0f1622 0%, #05070a 100%)" }}
            >
                <div className="absolute top-6 left-6 z-10">
                    <h2 className="text-[9px] uppercase tracking-[0.3em] text-cyan/70 font-bold">THE REBOOT</h2>
                    <span className="text-xl text-text-primary font-serif italic mt-1">
                        {completedToday === 0
                            ? "Adormecido"
                            : completedToday === totalHabits
                                ? "Desperto"
                                : `${completedToday}/${totalHabits} Hábitos`}
                    </span>
                </div>

                {/* Dias de Reboot no canto superior direito */}
                <div className="absolute top-6 right-6 z-10 text-right">
                    <p className="text-[8px] uppercase tracking-widest text-cyan/50">Reboot</p>
                    <p className="text-lg font-mono font-bold text-cyan drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]">
                        D{rebootDays}
                    </p>
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] pointer-events-none opacity-40">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="90" cy="90" r="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
                        <motion.circle
                            cx="90" cy="90" r="80" stroke="#00D4FF" strokeWidth="2" fill="none"
                            strokeDasharray={2 * Math.PI * 80}
                            animate={{ strokeDashoffset: (2 * Math.PI * 80) - progressToday * (2 * Math.PI * 80) }}
                            transition={{ duration: 1 }}
                            className="drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]"
                        />
                    </svg>
                </div>

                <div className="flex-1 flex items-center justify-center mt-4 z-10 transition-transform duration-500 scale-110">
                    <BatSVG progress={progressToday} />
                </div>
            </section>

            {/* Conteúdo Católico (Apenas para perfis Católicos) */}
            {faithLevel === 'CATHOLIC' && <CatholicContent />}

            {/* Stats Compactas */}
            <section className="grid grid-cols-4 gap-2">
                {MOCK_STATS_LABELS.map((stat, i) => (
                    <div key={i} className="glass-card rounded-2xl p-3 flex flex-col items-center justify-center border-t border-t-white/5">
                        <span className="text-lg mb-0.5">{stat.icon}</span>
                        <span className="text-text-primary font-mono font-bold text-xs">
                            {i === 0 ? `${rebootDays}D` : i === 3 ? completedToday : "0"}
                        </span>
                        <span className="text-[8px] uppercase tracking-widest text-text-muted text-center mt-0.5">{stat.label}</span>
                    </div>
                ))}
            </section>

            {/* Grid de Hábitos — Responsivo Mobile */}
            <section className="glass-card rounded-3xl overflow-hidden border border-white/5 bg-[#0a0d14]/40">
                {/* Header Navegação */}
                <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/5 font-serif">
                    <button className="text-text-muted hover:text-white transition-colors"><ChevronLeft size={20} /></button>
                    <span className="text-[13px] uppercase tracking-[0.3em] text-text-primary font-bold">
                        {new Date().toLocaleString("pt-BR", { month: "long", year: "numeric" }).toUpperCase()}
                    </span>
                    <button className="text-text-muted hover:text-white transition-colors"><ChevronRight size={20} /></button>
                </div>

                {/* Wrapper com scroll horizontal em telas pequenas */}
                <div className="overflow-x-auto">
                    {/* Sub-header Dias — mínimo fixo em 480px para garantir legibilidade */}
                    <div className="min-w-[480px] px-4 sm:px-6">
                        {/* Cabeçalho de dias */}
                        <div className="grid grid-cols-[160px_repeat(7,1fr)_36px] gap-1 py-3 items-end border-b border-white/5">
                            <span className="text-[11px] text-text-muted font-medium pl-1">Hábito</span>
                            {DAYS_ABBR.map((day, i) => (
                                <div key={i} className="flex flex-col items-center gap-0.5">
                                    <span className="text-[9px] text-text-muted font-medium">{day}</span>
                                    <span className={cn(
                                        "text-[13px] font-serif font-bold",
                                        i === currentDayIndex
                                            ? "text-cyan drop-shadow-[0_0_5px_rgba(0,212,255,0.4)]"
                                            : "text-text-secondary"
                                    )}>{weekDates[i]}</span>
                                </div>
                            ))}
                            <div className="w-9" />
                        </div>

                        {/* Lista de Hábitos */}
                        <div className="flex flex-col">
                            <AnimatePresence>
                                {habits.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-12 px-6 text-center flex flex-col items-center gap-3"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-cyan/5 border border-cyan/10 flex items-center justify-center text-cyan/30">
                                            <Plus size={24} />
                                        </div>
                                        <p className="text-[13px] text-white/40 font-serif italic">
                                            "Sua fortaleza está vazia. Comece a construir sua primeira torre adicionando um hábito abaixo."
                                        </p>
                                    </motion.div>
                                ) : (
                                    habits.map((habit) => (
                                        <motion.div
                                            layout
                                            key={habit.id}
                                            className="grid grid-cols-[160px_repeat(7,1fr)_36px] gap-1 items-center px-0 py-3 group border-b border-white/[0.03] last:border-0 hover:bg-white/[0.01] transition-all"
                                        >
                                            <div className="flex items-center gap-2 overflow-hidden pr-2">
                                                <span className="text-lg flex-shrink-0">{habit.emoji}</span>
                                                <span className="text-[12px] text-text-primary font-semibold line-clamp-1">
                                                    {habit.name}
                                                </span>
                                            </div>

                                            {habit.completions.map((checked: boolean, i: number) => (
                                                <div key={i} className="flex justify-center">
                                                    <motion.button
                                                        whileTap={{ scale: 0.75 }}
                                                        style={{ WebkitTapHighlightColor: "transparent" }}
                                                        onClick={() => {
                                                            const d = new Date();
                                                            const dow = d.getDay();
                                                            const mondayOffset = dow === 0 ? -6 : 1 - dow;
                                                            const clickDate = new Date(d);
                                                            clickDate.setDate(d.getDate() + mondayOffset + i);
                                                            toggleHabitDay(habit.id, i, clickDate.toISOString());
                                                        }}
                                                        className={cn(
                                                            "w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
                                                            i === currentDayIndex
                                                                ? checked
                                                                    ? "bg-cyan/20 border-cyan text-cyan shadow-[0_0_12px_rgba(0,212,255,0.25)]"
                                                                    : "border-cyan/40 bg-transparent"
                                                                : checked
                                                                    ? "bg-white/10 border-white/30 text-white/70"
                                                                    : "border-white/10 bg-transparent"
                                                        )}
                                                    >
                                                        {checked && (
                                                            <motion.svg
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                width="11" height="9" viewBox="0 0 12 10" fill="none"
                                                            >
                                                                <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </motion.svg>
                                                        )}
                                                    </motion.button>
                                                </div>
                                            ))}

                                            {/* Ações */}
                                            <div className="flex items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="text-text-muted hover:text-cyan p-1 transition-colors"><Pencil size={13} /></button>
                                                {!habit.name.toLowerCase().includes('nofap') && !habit.name.toLowerCase().includes('retenção') && (
                                                    <button onClick={() => deleteHabit(habit.id)} className="text-text-muted hover:text-red-400 p-1 transition-colors"><Trash2 size={13} /></button>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-cyan/[0.03] border border-cyan/20 text-cyan/80 hover:text-cyan hover:border-cyan hover:bg-cyan/10 transition-all w-full group shadow-lg"
            >
                <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                <span className="text-[12px] font-bold uppercase tracking-[0.3em]">Adicionar novo hábito</span>
            </motion.button>

            {/* Diário de Guerra */}
            <section className="glass-card rounded-3xl p-6 border-l-2 border-l-cyan/40 bg-[#0a0d14]/40">
                <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-2 bg-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
                    <div>
                        <h3 className="font-serif text-sm tracking-widest text-text-primary uppercase font-bold">Diário de Guerra</h3>
                        <p className="text-[9px] uppercase tracking-widest text-text-muted mt-1 italic">Status: Operacional</p>
                    </div>
                </div>
                <textarea
                    className="w-full bg-black/30 border border-white/5 rounded-2xl p-5 text-[14px] text-text-primary font-mono placeholder:text-text-muted/20 focus:outline-none focus:border-cyan/30 focus:bg-black/50 transition-all resize-none min-h-[120px] shadow-inner"
                    placeholder="> Relate as vitórias e embates de hoje..."
                />
            </section>
        </motion.div>
    );
}
