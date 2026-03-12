"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";
import { Mail, KeyRound, Loader2, User, ChevronRight } from "lucide-react";

export default function LoginPage() {
    const supabase = createClient();
    const router = useRouter();
    const [mode, setMode] = useState<"LOGIN" | "SIGNUP">("LOGIN");
    // ... rest of state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === "SIGNUP") {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            username: username || email.split("@")[0]
                        }
                    }
                });
                if (signUpError) throw signUpError;
                
                // Redireciona para o / (que o Dashboard cuidará do Onboarding se necessário)
                router.push("/");
                router.refresh();
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (signInError) throw signInError;
                
                router.push("/");
                router.refresh();
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro de Autenticação. Verifique os dados.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030508] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            
            {/* Ambient Backgrounds Complexos */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[20%] -left-[10%] w-[800px] h-[800px] bg-cyan/10 rounded-full blur-[120px] mix-blend-screen opacity-50" 
                />
                <motion.div 
                    animate={{ rotate: -360, scale: [1, 1.5, 1] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[30%] -right-[10%] w-[900px] h-[900px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen opacity-40" 
                />
                <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm z-10 flex flex-col items-center relative"
            >
                {/* Logo & Branding Area */}
                <div className="text-center mb-10 relative">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan/20 to-blue-600/20 border border-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(0,212,255,0.15)] mb-6 text-4xl"
                    >
                        🦇
                    </motion.div>
                    
                    <h1 className="font-serif text-4xl font-bold tracking-[0.2em] mb-3 uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-lg">
                        SHADOWS
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan/50" />
                        <p className="text-[10px] text-cyan uppercase tracking-[0.4em] font-medium drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]">The Reboot Protocol</p>
                        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan/50" />
                    </div>
                </div>

                {/* Main Glassmorphic Form Card */}
                <form 
                    onSubmit={handleAuth} 
                    className="w-full bg-[#0a0f18]/60 backdrop-blur-2xl border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] relative overflow-hidden"
                >
                    {/* Borda superior de destaque */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

                    <div className="mb-8 text-center">
                        <h2 className="text-white/90 text-xl font-bold font-serif mb-1">
                            {mode === "LOGIN" ? "Bem-vindo de volta" : "Crie seu Arsenal"}
                        </h2>
                        <p className="text-text-muted text-[13px]">
                            {mode === "LOGIN" ? "Acesse a Caverna e retome o protocolo." : "A disciplina é a base da sua nova liberdade."}
                        </p>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-red-500/10 border border-red-500/20 text-red-400 text-[12px] p-3.5 rounded-2xl mb-6 text-center shadow-inner flex items-center justify-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col gap-5">
                        <AnimatePresence mode="popLayout">
                            {mode === "SIGNUP" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="relative flex items-center group"
                                >
                                    <div className="absolute left-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-focus-within:bg-cyan/10 transition-colors">
                                        <User size={14} className="text-white/40 group-focus-within:text-cyan transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Codinome (Opcional)"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 focus:border-cyan/40 rounded-2xl py-4 pl-14 pr-4 text-[14px] text-white placeholder:text-white/20 outline-none transition-all shadow-inner focus:bg-[#05070a]/50"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative flex items-center group">
                            <div className="absolute left-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-focus-within:bg-cyan/10 transition-colors">
                                <Mail size={14} className="text-white/40 group-focus-within:text-cyan transition-colors" />
                            </div>
                            <input
                                type="email"
                                required
                                placeholder="E-mail tático"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 focus:border-cyan/40 rounded-2xl py-4 pl-14 pr-4 text-[14px] text-white placeholder:text-white/20 outline-none transition-all shadow-inner focus:bg-[#05070a]/50"
                            />
                        </div>

                        <div className="relative flex items-center group">
                            <div className="absolute left-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-focus-within:bg-cyan/10 transition-colors">
                                <KeyRound size={14} className="text-white/40 group-focus-within:text-cyan transition-colors" />
                            </div>
                            <input
                                type="password"
                                required
                                minLength={6}
                                placeholder="Senha (Mín. 6 dígitos)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 focus:border-cyan/40 rounded-2xl py-4 pl-14 pr-4 text-[14px] text-white placeholder:text-white/20 outline-none transition-all shadow-inner focus:bg-[#05070a]/50"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-gradient-to-r from-cyan to-blue-600 hover:from-cyan/90 hover:to-blue-600/90 text-white font-bold tracking-widest py-4 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transform hover:-translate-y-0.5"
                        >
                            {loading ? (
                                <Loader2 size={20} className="animate-spin text-white" />
                            ) : (
                                <span className="flex items-center gap-2 text-[13px] uppercase">
                                    {mode === "LOGIN" ? "Iniciar Sessão" : "Criar Aliança"}
                                    <ChevronRight size={16} />
                                </span>
                            )}
                        </button>
                    </div>
                </form>

                {/* Sub Action */}
                <div className="mt-8 text-center z-10 block">
                    <button
                        type="button"
                        onClick={() => {
                            setMode(mode === "LOGIN" ? "SIGNUP" : "LOGIN");
                            setError(null);
                        }}
                        className="text-[12px] text-white/40 hover:text-cyan transition-colors inline-block pb-1 border-b border-transparent hover:border-cyan/50"
                    >
                        {mode === "LOGIN" 
                            ? "Ainda não possui acesso? Registre-se." 
                            : "Já é um membro? Faça login."}
                    </button>
                </div>

            </motion.div>
        </div>
    );
}
