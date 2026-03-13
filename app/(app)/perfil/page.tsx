"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Zap, Target, Bell, Cross, LogOut } from "lucide-react";

export default function PerfilPage() {
    const { 
        user, habits, rebootDays, resetReboot, currentDayIndex,
        age, faithLevel, motivation, timeWithProblem 
    } = useApp();
    const router = useRouter();
    const supabase = createClient();

    const handleReset = () => {
        if (window.confirm("ATENÇÃO: Você tem certeza que deseja registrar uma queda e zerar todo seu progresso? Essa ação não pode ser desfeita.")) {
            resetReboot();
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            alert("Este dispositivo/navegador não suporta notificações de sistema.");
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            new Notification("SHADOWS", {
                body: "Alfred: Senhor, as notificações foram ativadas. Manterei você informado sobre suas missões.",
            });
        } else {
            alert("Permissão negada. Ative nas configurações do navegador/celular.");
        }
    };

    const username = user?.user_metadata?.username || user?.email?.split('@')[0] || "Rebooter";
    const completedToday = habits.filter(h => h.completions[currentDayIndex]).length;
    const totalXP = rebootDays * 50 + (completedToday * 10);
    const currentLevel = Math.floor(totalXP / 500) + 1;

    const isCatholic = faithLevel === 'CATHOLIC';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="px-4 py-8 flex flex-col gap-6 pb-24"
        >
            {/* Header: Avatar e Identidade */}
            <section className="flex flex-col items-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-full bg-[#05070a] border-2 border-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)] mb-4 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-3xl text-white font-bold font-serif uppercase">
                        {username[0]}
                    </span>

                    <div className="absolute -bottom-2 bg-[#05070a] border border-cyan px-4 py-1 rounded-full text-[10px] uppercase font-bold text-cyan tracking-[0.2em] shadow-[0_0_10px_rgba(0,212,255,0.5)] whitespace-nowrap">
                        LVL {currentLevel}
                    </div>
                </motion.div>
                <h2 className="text-xl font-bold text-white mt-2 font-serif tracking-wider">
                    {username}
                </h2>
                <p className="text-[10px] text-white/40 mt-1 font-bold uppercase tracking-[0.3em] font-mono">
                    IDENTIDADE #{user?.id?.slice(0, 8).toUpperCase() || "OFFLINE"}
                </p>
            </section>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="glass-card rounded-2xl p-4 border-t border-t-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan">
                        <Zap size={18} />
                    </div>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40">Streak</p>
                        <p className="text-lg font-bold text-white">{rebootDays} Dias</p>
                    </div>
                </div>
                <div className="glass-card rounded-2xl p-4 border-t border-t-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                        <Target size={18} />
                    </div>
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40">Total XP</p>
                        <p className="text-lg font-bold text-white">{totalXP}</p>
                    </div>
                </div>
            </div>

            {/* Dados Táticos (Vindo do Onboarding) */}
            <section className="flex flex-col gap-3">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan font-bold pl-1">PERFIL TÁTICO</h3>
                <div className="glass-card rounded-2xl divide-y divide-white/5 border border-white/5">
                    <div className="p-4 flex items-center justify-between">
                        <span className="text-[12px] text-white/60">Idade</span>
                        <span className="text-[13px] text-white font-bold">{age || "--"} anos</span>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <span className="text-[12px] text-white/60">Tempo com o problema</span>
                        <span className="text-[13px] text-white font-bold uppercase tracking-wide">{timeWithProblem || "Não definido"}</span>
                    </div>
                    <div className="p-4 flex flex-col gap-1.5">
                        <span className="text-[12px] text-white/60">Sua Motivação (O Porquê)</span>
                        <p className="text-[13px] text-white font-serif italic leading-relaxed">
                            &quot;{motivation || "Construindo uma vida de liberdade e propósito."}&quot;
                        </p>
                    </div>
                </div>
            </section>

            {/* Configurações do Sistema */}
            <section className="flex flex-col gap-3">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-cyan font-bold pl-1">SISTEMAS E ALERTAS</h3>
                
                <div className="flex flex-col gap-2">
                    {/* Alertas Push */}
                    <button 
                        onClick={requestNotificationPermission}
                        className="glass-card rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                                <Bell size={18} />
                            </div>
                            <div>
                                <p className="text-[13px] font-bold text-white">Alertas do Alfred</p>
                                <p className="text-[11px] text-white/40">Notificações táticas ativadas</p>
                            </div>
                        </div>
                    </button>

                    {/* Modo Católico Status */}
                    <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCatholic ? "bg-[#f5c518]/20 text-[#f5c518]" : "bg-white/5 text-white/40"}`}>
                                <Cross size={18} />
                            </div>
                            <div>
                                <p className="text-[13px] font-bold text-white">Modo Católico</p>
                                <p className="text-[11px] text-white/40">
                                    {isCatholic ? "Protocolo espiritual ativado" : "Protocolo espiritual padrão"}
                                </p>
                            </div>
                        </div>
                        {isCatholic && (
                            <div className="px-2 py-0.5 rounded-full bg-[#f5c518]/10 border border-[#f5c518]/20 text-[#f5c518] text-[8px] font-bold uppercase tracking-widest">
                                Ativo
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Account Actions */}
            <section className="flex flex-col gap-2 mt-2">
                <button
                    onClick={handleSignOut}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between border-white/5 hover:border-red-500/30 hover:bg-red-500/5 transition-all text-left group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-red-400">
                            <LogOut size={18} />
                        </div>
                        <div>
                            <p className="text-[13px] font-bold text-white group-hover:text-red-400">Encerrar Sessão</p>
                            <p className="text-[11px] text-white/40">Desconectar da fortaleza</p>
                        </div>
                    </div>
                </button>

                <button
                    onClick={handleReset}
                    className="w-full py-4 text-[10px] text-red-500/60 hover:text-red-500 uppercase tracking-[0.2em] font-bold transition-all"
                >
                    Zerar Progresso (Registrar Queda)
                </button>
            </section>

            <footer className="text-center mt-4">
                <p className="text-[9px] text-white/20 uppercase tracking-[0.4em]">Shadows Project &copy; 2026</p>
            </footer>
        </motion.div>
    );
}
