"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

// Marcos fisiológicos reais do Reboot
const MILESTONES = [
    {
        day: 3,
        title: "PRIMEIRO IMPACTO",
        icon: "💥",
        description: "Dopamina grita por estímulo. Irritabilidade alta. O corpo sente a abstinência. Você está lutando.",
        benefit: "Início da recalibração dos receptores D2",
        color: "text-red-400",
        borderColor: "border-red-500/30",
    },
    {
        day: 7,
        title: "SOBREVIVENTE",
        icon: "🛡️",
        description: "Pico de testosterona (+145%). Energia e agressividade naturais dispararam. A névoa começa a recuar.",
        benefit: "Testosterona no pico · Sono mais profundo",
        color: "text-orange-400",
        borderColor: "border-orange-500/30",
    },
    {
        day: 14,
        title: "CLAREZA MENTAL",
        icon: "👁️",
        description: "Névoa mental recua significativamente. Concentração e memória melhoram. Olhar mais presente.",
        benefit: "Córtex pré-frontal recuperando controle",
        color: "text-yellow-400",
        borderColor: "border-yellow-500/30",
    },
    {
        day: 21,
        title: "NEUROPLÁSTICA",
        icon: "🧠",
        description: "Novas vias neurais se formam. Velhos hábitos compulsivos doem menos. O cérebro está cicatrizando.",
        benefit: "Novas conexões sinápticas · Hábito quebrando",
        color: "text-lime-400",
        borderColor: "border-lime-500/30",
    },
    {
        day: 30,
        title: "BLINDAGEM",
        icon: "🫀",
        description: "Controle emocional restaurado. Ansiedade social diminui visivelmente. Presença magnética real.",
        benefit: "Cortisol normalizado · Confiança natural",
        color: "text-emerald-400",
        borderColor: "border-emerald-500/30",
    },
    {
        day: 45,
        title: "VISÃO DE ÁGUIA",
        icon: "🦅",
        description: "Foco absurdo. Olhos vibrantes e penetrantes. Capacidade de sustentar atenção profunda restaurada.",
        benefit: "Dopamina basal recalibrada · Foco restaurado",
        color: "text-teal-400",
        borderColor: "border-teal-500/30",
    },
    {
        day: 60,
        title: "FORTALEZA",
        icon: "⚔️",
        description: "O corpo é uma arma. Disciplina é automática. Tentações perdem seu poder sobre você.",
        benefit: "Autocontrole é o novo padrão · Libido saudável",
        color: "text-cyan",
        borderColor: "border-cyan/30",
    },
    {
        day: 90,
        title: "O RENASCIMENTO",
        icon: "🦇",
        description: "Reboot completo. Dopamina basal totalmente restaurada. Você governa o seu espírito. Liberdade total.",
        benefit: "Reset neurológico completo · Homem novo",
        color: "text-white",
        borderColor: "border-cyan/50",
    },
];

// Atributos RPG baseados nos pilares de hábitos
const ATTRIBUTES = [
    {
        name: "Receptores de Dopamina",
        icon: "🧠",
        pillar: "BODY",
        habitKeyword: "Nfp",
        colorFrom: "from-purple-500",
        colorTo: "to-pink-500",
        shadowColor: "rgba(168, 85, 247, 0.5)",
        description: "Sensibilidade ao prazer natural",
    },
    {
        name: "Energia & Testosterona",
        icon: "⚡",
        pillar: "BODY",
        habitKeyword: "Treinar|Jejum",
        colorFrom: "from-orange-500",
        colorTo: "to-yellow-500",
        shadowColor: "rgba(249, 115, 22, 0.5)",
        description: "Vigor físico e presença",
    },
    {
        name: "Foco & Clareza",
        icon: "👁️",
        pillar: "MIND",
        habitKeyword: "Ler|Audiobook|Criativo",
        colorFrom: "from-cyan",
        colorTo: "to-blue-500",
        shadowColor: "rgba(0, 212, 255, 0.5)",
        description: "Concentração profunda",
    },
    {
        name: "Armadura Espiritual",
        icon: "🛡️",
        pillar: "SPIRIT",
        habitKeyword: "Rezar",
        colorFrom: "from-red-500",
        colorTo: "to-amber-500",
        shadowColor: "rgba(239, 68, 68, 0.5)",
        description: "Paz interior, ancoragem moral",
    },
];

export default function EvolucaoPage() {
    const { habits, rebootDays, currentDayIndex } = useApp();
    const currentRebootDay = rebootDays;

    // Calcular progresso de cada atributo baseado nos hábitos
    const getAttributeProgress = (attr: typeof ATTRIBUTES[0]) => {
        if (habits.length === 0) return 0;
        const keywords = attr.habitKeyword.split("|");
        const matchingHabits = habits.filter((h: { name: string; completions: boolean[] }) =>
            keywords.some(kw => h.name.toLowerCase().includes(kw.toLowerCase()))
        );
        if (matchingHabits.length === 0) return 0;
        const completedCount = matchingHabits.filter((h: { name: string; completions: boolean[] }) => h.completions[currentDayIndex]).length;
        return Math.round((completedCount / matchingHabits.length) * 100);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="px-4 py-6 flex flex-col gap-6 pb-32"
        >

            {/* Citação */}
            <div className="text-center px-6 py-2">
                <p className="font-serif italic text-text-primary text-[15px] mb-2 leading-relaxed drop-shadow-md">
                    &quot;O treinamento é nada. A vontade é tudo.&quot;
                </p>
                <p className="text-[10px] text-cyan uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]">— Ra&apos;s al Ghul</p>
            </div>

            {/* Reboot Clock */}
            <motion.section
                whileHover={{ scale: 1.01 }}
                className="glass-card glow-cyan-hover rounded-2xl p-6 relative overflow-hidden flex flex-col items-center border-t border-t-cyan/20"
                style={{ background: 'radial-gradient(circle at top, #121c2c, #080a0f)' }}
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-cyan font-bold mb-4 drop-shadow-[0_0_5px_rgba(0,212,255,0.3)]">
                    REBOOT CLOCK
                </span>

                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-light text-text-primary tracking-tighter">07</span>
                        <span className="text-[8px] uppercase tracking-widest text-text-secondary">Dias</span>
                    </div>
                    <span className="text-2xl font-thin text-cyan opacity-50 mb-4">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-light text-text-primary tracking-tighter">14</span>
                        <span className="text-[8px] uppercase tracking-widest text-text-secondary">Horas</span>
                    </div>
                    <span className="text-2xl font-thin text-cyan opacity-50 mb-4">:</span>
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-light text-text-primary tracking-tighter">22</span>
                        <span className="text-[8px] uppercase tracking-widest text-text-secondary">Minutos</span>
                    </div>
                </div>

                <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentRebootDay / 90) * 100}%` }}
                        className="h-full bg-cyan shadow-[0_0_10px_rgba(0,212,255,1)]"
                    />
                </div>
                <p className="text-[9px] uppercase tracking-widest text-text-muted mt-3">Rumo aos 90 dias de liberdade total.</p>
            </motion.section>

            {/* ======== STATUS DO GUERREIRO (RPG Attributes) ======== */}
            <section>
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-4 bg-cyan rounded-full shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-cyan font-bold drop-shadow-[0_0_5px_rgba(0,212,255,0.3)]">
                        STATUS DO GUERREIRO
                    </span>
                </div>

                <div className="flex flex-col gap-4">
                    {ATTRIBUTES.map((attr, i) => {
                        const progress = getAttributeProgress(attr);
                        return (
                            <motion.div
                                key={attr.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card rounded-2xl p-4 border border-white/5 relative overflow-hidden group"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl group-hover:scale-110 transition-transform">{attr.icon}</span>
                                        <div>
                                            <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider block">
                                                {attr.name}
                                            </span>
                                            <span className="text-[9px] text-text-muted uppercase tracking-wider">
                                                {attr.description}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={cn(
                                        "text-sm font-mono font-bold",
                                        progress > 0 ? "text-cyan drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]" : "text-text-muted"
                                    )}>
                                        {progress}%
                                    </span>
                                </div>

                                <div className="h-2 rounded-full overflow-hidden bg-white/5 border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: i * 0.15 }}
                                        className={cn("h-full rounded-full bg-gradient-to-r", attr.colorFrom, attr.colorTo)}
                                        style={{
                                            boxShadow: progress > 0 ? `0 0 12px ${attr.shadowColor}` : 'none'
                                        }}
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ======== LINHA DO TEMPO FISIOLÓGICA ======== */}
            <section className="mt-2">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-1.5 h-4 bg-cyan rounded-full shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-cyan font-bold drop-shadow-[0_0_5px_rgba(0,212,255,0.3)]">
                        O QUE MUDA NO SEU CORPO
                    </span>
                </div>

                <div className="relative">
                    {/* Linha vertical central */}
                    <div className="absolute left-[23px] top-4 bottom-4 w-px bg-gradient-to-b from-red-500/50 via-cyan/30 to-cyan/50" />

                    <div className="flex flex-col gap-1">
                        {MILESTONES.map((m, i) => {
                            const isUnlocked = currentRebootDay >= m.day;
                            const isNext = !isUnlocked && (i === 0 || currentRebootDay >= MILESTONES[i - 1].day);
                            const isCurrent = currentRebootDay >= m.day && (i === MILESTONES.length - 1 || currentRebootDay < MILESTONES[i + 1].day);

                            return (
                                <motion.div
                                    key={m.day}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    className={cn(
                                        "flex gap-4 items-start py-4 pl-2 pr-1 relative group",
                                    )}
                                >
                                    {/* Node da timeline */}
                                    <div className={cn(
                                        "w-[14px] h-[14px] rounded-full border-2 flex-shrink-0 mt-1 z-10 transition-all duration-500",
                                        isUnlocked
                                            ? "bg-cyan border-cyan shadow-[0_0_12px_rgba(0,212,255,0.7)]"
                                            : isNext
                                                ? "bg-transparent border-cyan/50 animate-pulse shadow-[0_0_8px_rgba(0,212,255,0.3)]"
                                                : "bg-transparent border-white/15"
                                    )} />

                                    {/* Content Card */}
                                    <div className={cn(
                                        "flex-1 rounded-2xl p-4 border transition-all duration-300",
                                        isUnlocked
                                            ? `glass-card ${m.borderColor} shadow-[0_0_15px_rgba(0,212,255,0.05)]`
                                            : isNext
                                                ? "bg-[#0a0d14]/60 border-cyan/20 border-dashed"
                                                : "bg-[#05070a]/40 border-white/5 opacity-40"
                                    )}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={cn(
                                                "text-lg transition-all",
                                                isUnlocked ? "" : "grayscale opacity-50"
                                            )}>{m.icon}</span>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className={cn(
                                                        "text-[10px] font-bold uppercase tracking-[0.15em]",
                                                        isUnlocked ? m.color : "text-text-muted"
                                                    )}>
                                                        {m.title}
                                                    </span>
                                                    <span className={cn(
                                                        "text-[9px] font-mono font-bold",
                                                        isUnlocked ? "text-cyan" : "text-text-muted/50"
                                                    )}>
                                                        DIA {m.day}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className={cn(
                                            "text-[11px] leading-relaxed mb-2",
                                            isUnlocked ? "text-text-secondary" : "text-text-muted/40"
                                        )}>
                                            {m.description}
                                        </p>

                                        {isUnlocked && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-center gap-1.5 mt-2"
                                            >
                                                <span className="text-[8px]">✦</span>
                                                <span className="text-[9px] text-cyan/80 uppercase tracking-wider font-medium">
                                                    {m.benefit}
                                                </span>
                                            </motion.div>
                                        )}

                                        {isCurrent && (
                                            <div className="mt-3 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_6px_rgba(0,212,255,0.8)]" />
                                                <span className="text-[9px] text-cyan font-bold uppercase tracking-widest">
                                                    Você está aqui
                                                </span>
                                            </div>
                                        )}

                                        {isNext && (
                                            <div className="mt-3">
                                                <div className="h-1 rounded-full overflow-hidden bg-white/5">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${((currentRebootDay - (MILESTONES[i - 1]?.day || 0)) / (m.day - (MILESTONES[i - 1]?.day || 0))) * 100}%` }}
                                                        transition={{ duration: 1.5 }}
                                                        className="h-full bg-cyan/50"
                                                    />
                                                </div>
                                                <span className="text-[9px] text-text-muted mt-1.5 block">
                                                    Faltam {m.day - currentRebootDay} dias
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

        </motion.div>
    );
}
