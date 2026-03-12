"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";
import { useApp } from "@/context/AppContext";

// ─── Banco de missões ───────────────────────────────────────────────────────

const MISSION_BANK = [
    // BODY
    { id: 1, pillar: "BODY", icon: "💪", title: "Protocolo Físico", action: "Faça 50 flexões divididas em séries ao longo do dia.", alfred: "Senhor, seu nível energético está em queda. A testosterona se eleva com ação física, não com intenção." },
    { id: 2, pillar: "BODY", icon: "🧊", title: "Banho de Guerreiro", action: "Termine seu banho de hoje com 2 minutos de água fria.", alfred: "A exposição ao frio ativa o sistema nervoso simpático e treina a tolerância ao desconforto voluntário." },
    { id: 3, pillar: "BODY", icon: "🌅", title: "Luz Solar", action: "Saia e fique 15 minutos sob o sol antes das 10h.", alfred: "Cortisol no horário certo é combustível. Luz solar calibra o ritmo circadiano e eleva a serotonina basal." },
    { id: 4, pillar: "BODY", icon: "🔥", title: "Jejum Estendido", action: "Não coma nada até o meio-dia. Beba apenas água.", alfred: "O jejum aumenta a sensibilidade à insulina e a clareza mental. A fome é treinável." },
    { id: 5, pillar: "BODY", icon: "🚶", title: "Caminhada Estrutural", action: "Caminhe 20 minutos sem fones de ouvido. Apenas você e seus pensamentos.", alfred: "Andar sem estímulos força o córtex pré-frontal a trabalhar. É meditação em movimento." },

    // MIND
    { id: 6, pillar: "MIND", icon: "📖", title: "Leitura Profunda", action: "Leia 15 páginas de um livro físico sem interrupções.", alfred: "A leitura profunda é o antídoto para o vício em estímulos rápidos. Treina a atenção sustentada." },
    { id: 7, pillar: "MIND", icon: "✍️", title: "Diário de Guerra", action: "Escreva 5 linhas sobre como você está se sentindo hoje.", alfred: "Nomear uma emoção reduz sua intensidade em até 50%. A caneta é uma arma contra o caos interno." },
    { id: 8, pillar: "MIND", icon: "🎯", title: "Foco Extremo", action: "Trabalhe em uma única tarefa por 45 minutos. Nada de celular.", alfred: "A multitarefa é um mito. O foco mononuclear é a habilidade mais rara do século XXI." },
    { id: 9, pillar: "MIND", icon: "🧘", title: "Scan Mental", action: "Sente-se em silêncio por 10 minutos SEM fazer nada.", alfred: "Tolerar o tédio é o início da liberdade. O vício em estimulação é o inimigo da clareza." },
    { id: 10, pillar: "MIND", icon: "🎧", title: "Educação Ativa", action: "Ouça 20 minutos de um podcast ou audiobook sobre crescimento.", alfred: "O conhecimento é um arsenal. Alimente sua mente com ideias que a elevem." },

    // SPIRIT
    { id: 11, pillar: "SPIRIT", icon: "🙏", title: "Ancoragem Moral", action: "Reze o terço ou dedique 10 minutos a oração focada.", alfred: "O homem sem ancoragem espiritual está à deriva. A prece não é fraqueza; é comunicação com o fundamento." },
    { id: 12, pillar: "SPIRIT", icon: "🤝", title: "Ato de Serviço", action: "Faça algo por outra pessoa hoje. Sem esperar reconhecimento.", alfred: "O vício isola. A generosidade reconecta você com o mundo real e ativa a oxitocina." },
    { id: 13, pillar: "SPIRIT", icon: "🌿", title: "Gratidão Real", action: "Liste 3 coisas genuinamente boas da sua vida agora.", alfred: "O cérebro viciado foca na falta. Treinar a gratidão reconecta os circuitos de satisfação com o presente." },
];

function getDayString() {
    return new Date().toISOString().split('T')[0];
}

// Sorteio diário determinístico — muda a cada dia, priorizando o pilar mais fraco
function getDailyMissions(weakestPillar: string) {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);

    // 1 missão garantida do pilar mais fraco
    const weakMissions = MISSION_BANK.filter(m => m.pillar === weakestPillar);
    const otherMissions = MISSION_BANK.filter(m => m.pillar !== weakestPillar);

    const pickFrom = (arr: typeof MISSION_BANK, count: number) => {
        const shuffled = [...arr].sort((a, b) => ((a.id * dayOfYear * 7) % 17) - ((b.id * dayOfYear * 7) % 17));
        return shuffled.slice(0, count);
    };

    const main = pickFrom(weakMissions, 1);
    const rest = pickFrom(otherMissions, 2);
    return [...main, ...rest];
}

// Fala do Alfred baseada no pilar mais fraco
function alfredGreeting(pillar: string, allDone: boolean): string {
    if (allDone) return '"Excelente, senhor. O campo de batalha de hoje foi conquistado. Descanse com a dignidade de quem não cedeu."';
    const msgs: Record<string, string> = {
        BODY: '"Senhor, seu pilar físico está abaixo do ideal. O corpo é o instrumento da vontade — hoje, priorize as missões de CORPO."',
        MIND: '"Senhor, detectei que sua mente está vulnerável. Foco e leitura são essenciais hoje. Priorize as missões de MENTE."',
        SPIRIT: '"Senhor, sua armadura espiritual precisa de atenção. Comece pelo espírito — ele ancora todas as demais batalhas."',
    };
    return msgs[pillar] || '"Senhor, selecionei 3 missões críticas para hoje. Complete-as e mantenha a armadura intacta."';
}

export default function AmeacasPage() {
    const { weakestPillar } = useApp();
    const missions = useMemo(() => getDailyMissions(weakestPillar), [weakestPillar]);
    
    const [completed, setCompletedState] = useState<number[]>([]);
    const [expanded, setExpanded] = useState<number | null>(null);

    // Load do localStorage (diário)
    useEffect(() => {
        const todayStr = getDayString();
        const saved = localStorage.getItem(`shadows_missions_${todayStr}`);
        if(saved) {
            try { setCompletedState(JSON.parse(saved)); } catch {}
        }
    }, []);

    const toggle = (id: number) => {
        setCompletedState(prev => {
            const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
            localStorage.setItem(`shadows_missions_${getDayString()}`, JSON.stringify(next));
            return next;
        });
    };

    const allDone = completed.length === missions.length;

    const pillarLabel: Record<string, string> = { BODY: "💪 CORPO", MIND: "🧠 MENTE", SPIRIT: "🙏 ESPÍRITO" };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="px-4 py-6 flex flex-col gap-6 pb-32"
        >
            {/* Header Alfred */}
            <div className="flex flex-col items-center text-center gap-3">
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border border-white/10"
                    style={{ background: "radial-gradient(circle, #0f1622, #05070a)", boxShadow: "0 0 25px rgba(0,212,255,0.15)" }}
                >
                    🤵
                </motion.div>
                <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-cyan font-bold drop-shadow-[0_0_5px_rgba(0,212,255,0.5)]">
                        Alfred — Assistente Pessoal
                    </p>
                    <h2 className="font-serif text-[18px] text-text-primary tracking-wide font-bold mt-1">
                        Missões de Hoje
                    </h2>
                    {!allDone && (
                        <p className="text-[9px] uppercase tracking-widest text-text-muted mt-1">
                            Pilar prioritário: <span className="text-cyan">{pillarLabel[weakestPillar] || "GERAL"}</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Fala do Alfred */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl p-4 border border-white/5 relative"
            >
                <div className="absolute -top-2 left-6 w-4 h-4 bg-[#0f1622] border-l border-t border-white/5 rotate-45" />
                <p className="text-[12px] text-text-secondary italic leading-relaxed">
                    {alfredGreeting(weakestPillar, allDone)}
                </p>
            </motion.div>

            {/* Progresso */}
            <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                        animate={{ width: `${(completed.length / missions.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-cyan shadow-[0_0_8px_rgba(0,212,255,0.6)]"
                    />
                </div>
                <span className="text-[11px] font-mono font-bold text-cyan">{completed.length}/{missions.length}</span>
            </div>

            {/* Cards de Missão */}
            <div className="flex flex-col gap-3">
                {missions.map((mission, i) => {
                    const done = completed.includes(mission.id);
                    const isOpen = expanded === mission.id;
                    const isWeak = mission.pillar === weakestPillar;
                    return (
                        <motion.div
                            key={mission.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className={`rounded-2xl border transition-all overflow-hidden ${done ? "border-cyan/30" : isWeak ? "border-cyan/20" : "border-white/5"}`}
                            style={{ background: done ? "rgba(0,212,255,0.05)" : isWeak ? "rgba(0,212,255,0.03)" : "rgba(10,13,20,0.6)" }}
                        >
                            <button
                                onClick={() => setExpanded(isOpen ? null : mission.id)}
                                className="w-full flex items-center gap-4 p-4 text-left"
                            >
                                <span className={`text-2xl flex-shrink-0 transition-all ${done ? "" : "grayscale opacity-60"}`}>
                                    {mission.icon}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className={`text-[8px] uppercase tracking-widest font-bold ${isWeak ? "text-cyan" : "text-cyan/40"}`}>
                                            {mission.pillar === "BODY" ? "CORPO" : mission.pillar === "MIND" ? "MENTE" : "ESPÍRITO"}
                                        </span>
                                        {isWeak && <span className="text-[7px] uppercase tracking-widest bg-cyan/10 text-cyan px-1.5 py-0.5 rounded-full">Prioritário</span>}
                                    </div>
                                    <p className={`text-[13px] font-bold tracking-wide transition-colors ${done ? "text-white line-through opacity-50" : "text-text-primary"}`}>
                                        {mission.title}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggle(mission.id); }}
                                    className="flex-shrink-0 ml-2"
                                >
                                    {done
                                        ? <CheckCircle size={22} className="text-cyan drop-shadow-[0_0_5px_rgba(0,212,255,0.6)]" />
                                        : <Circle size={22} className="text-white/20 hover:text-white/40 transition-colors" />}
                                </button>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 pt-0 border-t border-white/5 flex flex-col gap-3">
                                            <div className="pt-3">
                                                <p className="text-[10px] uppercase tracking-widest text-text-muted mb-1.5">A Missão</p>
                                                <p className="text-[13px] text-text-primary leading-relaxed font-medium">
                                                    {mission.action}
                                                </p>
                                            </div>
                                            <div className="bg-black/20 rounded-xl p-3">
                                                <p className="text-[9px] uppercase tracking-widest text-cyan mb-1.5">Alfred diz:</p>
                                                <p className="text-[11px] text-text-secondary italic leading-relaxed">
                                                    &quot;{mission.alfred}&quot;
                                                </p>
                                            </div>
                                            {!done && (
                                                <button
                                                    onClick={() => toggle(mission.id)}
                                                    className="w-full py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest text-[#080a0f] transition-all"
                                                    style={{ background: "linear-gradient(135deg, #00D4FF, #0066ff)", boxShadow: "0 0 15px rgba(0,212,255,0.3)" }}
                                                >
                                                    Marcar como concluída ✓
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* Banner de vitória */}
            <AnimatePresence>
                {allDone && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card rounded-2xl p-5 text-center border border-cyan/30"
                        style={{ background: "radial-gradient(ellipse, rgba(0,212,255,0.1), transparent)" }}
                    >
                        <p className="text-3xl mb-2">🦇</p>
                        <p className="font-serif text-[18px] font-bold text-cyan uppercase tracking-widest">
                            Dia Conquistado
                        </p>
                        <p className="text-[11px] text-text-muted mt-1">
                            Todas as missões concluídas. Alfred está orgulhoso.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
