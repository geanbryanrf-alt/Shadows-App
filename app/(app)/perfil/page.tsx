"use client";

import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function PerfilPage() {
    const { user, habits, rebootDays, resetReboot, currentDayIndex } = useApp();
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
                icon: "/bat.png"
            });
        } else {
            alert("Permissão negada. Ative nas configurações do navegador/celular.");
        }
    };

    const username = user?.user_metadata?.username || user?.email?.split('@')[0] || "Rebooter";
    const completedToday = habits.filter(h => h.completions[currentDayIndex]).length;
    const totalXP = rebootDays * 50 + (completedToday * 10);
    const currentLevel = Math.floor(totalXP / 500) + 1;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="px-4 py-8 flex flex-col gap-8 pb-24"
        >

            {/* Informações do Usuário e Avatar */}
            <section className="flex flex-col items-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-24 h-24 rounded-full bg-[#05070a] border-2 border-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.4)] mb-4 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-3xl text-cyan font-bold leading-none font-serif uppercase">
                        {username[0]}
                    </span>

                    <div className="absolute -bottom-2 bg-[#05070a] border border-cyan px-4 py-1 rounded-full text-[10px] uppercase font-bold text-white tracking-[0.2em] shadow-[0_0_10px_rgba(0,212,255,0.5)] whitespace-nowrap">
                        LVL {currentLevel}
                    </div>
                </motion.div>
                <h2 className="text-xl font-bold text-white mt-2 font-serif tracking-wider drop-shadow-md">
                    {username}
                </h2>
                <p className="text-[10px] text-cyan mt-1 font-bold uppercase tracking-[0.3em] font-mono drop-shadow-[0_0_5px_rgba(0,212,255,0.3)]">
                    {user?.email || "Sem e-mail"}
                </p>
            </section>

            {/* Estatísticas Gerais */}
            <section className="grid grid-cols-2 gap-3">
                <motion.div
                    whileHover={{ y: -2 }}
                    className="glass-card glow-cyan-hover rounded-2xl text-center py-5 border-t border-t-cyan/20"
                >
                    <div className="text-2xl mb-2 drop-shadow-md">🔥</div>
                    <div className="text-4xl font-light text-cyan drop-shadow-[0_0_10px_rgba(0,212,255,0.6)] tracking-tighter">{rebootDays}</div>
                    <div className="text-[9px] text-text-muted uppercase tracking-[0.2em] mt-2 font-bold">Dias Atuais</div>
                </motion.div>

                <motion.div
                    whileHover={{ y: -2 }}
                    className="glass-card glow-cyan-hover rounded-2xl text-center py-5 border-t border-t-cyan/20"
                >
                    <div className="text-2xl mb-2 drop-shadow-md">⚔️</div>
                    <div className="text-4xl font-light text-white tracking-tighter drop-shadow-md">{totalXP}</div>
                    <div className="text-[9px] text-text-muted uppercase tracking-[0.2em] mt-2 font-bold">Total de XP</div>
                </motion.div>
            </section>

            {/* Configurações & Parceiro */}
            <section className="flex flex-col gap-4 mt-2">
                <h3 className="text-[10px] uppercase tracking-[0.2em] text-cyan font-bold drop-shadow-[0_0_5px_rgba(0,212,255,0.3)]">
                    SISTEMAS OPERACIONAIS
                </h3>

                <motion.div
                    onClick={requestNotificationPermission}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between cursor-pointer group hover:border-cyan/40 transition-colors"
                >
                    <div>
                        <p className="font-bold text-[13px] text-white font-mono uppercase tracking-wide group-hover:text-cyan transition-colors">Alertas do Alfred (Push)</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">Autorizar notificações no celular</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center text-cyan group-hover:scale-110 transition-transform">
                        🔔
                    </div>
                </motion.div>

                <motion.div
                    whileTap={{ scale: 0.98 }}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between cursor-pointer group"
                >
                    <div>
                        <p className="font-bold text-[13px] text-white font-mono uppercase tracking-wide group-hover:text-cyan transition-colors">A Armadura Espiritual</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">Modo Católico ativado</p>
                    </div>
                    {/* Toggle MOCK */}
                    <div className="w-10 h-5 bg-cyan/20 border border-cyan/50 rounded-full flex items-center px-1 shadow-[0_0_8px_rgba(0,212,255,0.3)]">
                        <motion.div
                            layout
                            className="w-3.5 h-3.5 bg-cyan rounded-full translate-x-4 shadow-[0_0_5px_rgba(0,212,255,0.8)]"
                        />
                    </div>
                </motion.div>

                <motion.div
                    onClick={handleSignOut}
                    whileTap={{ scale: 0.98 }}
                    className="glass-card rounded-2xl p-4 flex items-center justify-between cursor-pointer group border-white/5 hover:border-red-500/30 bg-white/5 hover:bg-red-500/5 transition-colors mt-4"
                >
                    <div>
                        <p className="font-bold text-[13px] text-white font-mono uppercase tracking-wide group-hover:text-red-400 transition-colors">Desconectar Identidade</p>
                        <p className="text-[11px] text-text-secondary mt-0.5">Encerrar sessão The Reboot</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-text-muted group-hover:text-red-400 group-hover:scale-110 transition-all">
                        🚪
                    </div>
                </motion.div>
            </section>

            {/* Area de Perigo */}
            <div className="mt-6 text-center pt-8 border-t border-white/5">
                <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[10px] text-[#ff4d4d] hover:text-white hover:bg-[#ff4d4d]/10 px-6 py-3 rounded-full uppercase tracking-[0.2em] font-bold border border-[#ff4d4d]/30 transition-all drop-shadow-[0_0_5px_rgba(229,57,53,0.3)]"
                >
                    Zerar Progresso (Registrar Queda)
                </motion.button>
            </div>

        </motion.div>
    );
}
