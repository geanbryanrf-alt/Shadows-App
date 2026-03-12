"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ChevronRight, ChevronLeft, Shield, User, Heart, Zap, Cross } from "lucide-react";

const STEPS = [
    {
        id: "identity",
        title: "A Identidade",
        subtitle: "Como devemos chamá-lo no campo de batalha?",
        icon: User,
    },
    {
        id: "journey",
        title: "A Jornada",
        subtitle: "Há quanto tempo você enfrenta esse combate?",
        icon: Zap,
    },
    {
        id: "purpose",
        title: "O Propósito",
        subtitle: "O que te trouxe à Fortaleza hoje?",
        icon: Heart,
    },
    {
        id: "faith",
        title: "O Escudo",
        subtitle: "Você possui fé ou acredita em Deus?",
        icon: Cross,
    },
    {
        id: "oath",
        title: "O Juramento",
        subtitle: "Sua nova vida começa agora.",
        icon: Shield,
    },
];

export default function OnboardingPage() {
    const { completeOnboarding, user } = useApp();
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: user?.user_metadata?.username || "",
        age: "",
        time_with_problem: "",
        motivation: "",
        faith_level: "",
    });

    const nextStep = () => {
        if (step < STEPS.length - 1) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 0) setStep(step - 1);
    };

    const handleFinish = async () => {
        setIsSubmitting(true);
        try {
            await completeOnboarding({
                age: parseInt(formData.age) || 0,
                faith_level: formData.faith_level,
                time_with_problem: formData.time_with_problem,
                motivation: formData.motivation,
            });
            router.replace("/");
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const CurrentIcon = STEPS[step].icon;

    return (
        <div className="min-h-dvh bg-[#080a0f] text-white flex flex-col p-6 relative overflow-hidden">
            {/* Ambient background effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/5 blur-[120px] rounded-full" />

            {/* Progress Bar */}
            <div className="relative z-10 flex gap-2 mb-12">
                {STEPS.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                            i <= step ? "bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]" : "bg-white/10"
                        }`}
                    />
                ))}
            </div>

            <main className="flex-1 flex flex-col relative z-10 max-w-sm mx-auto w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1 flex flex-col"
                    >
                        {/* Header Step */}
                        <div className="mb-8">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                                <CurrentIcon className="text-cyan w-6 h-6" />
                            </div>
                            <h2 className="text-[10px] uppercase tracking-[0.3em] text-cyan font-bold mb-2">
                                Passo {step + 1} de {STEPS.length}
                            </h2>
                            <h1 className="font-serif text-3xl font-bold text-white mb-2 italic">
                                {STEPS[step].title}
                            </h1>
                            <p className="text-sm text-white/50 leading-relaxed font-light">
                                {STEPS[step].subtitle}
                            </p>
                        </div>

                        {/* Step Content */}
                        <div className="flex-1">
                            {step === 0 && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[9px] uppercase tracking-widest text-white/40 mb-1.5 block">Nome ou Pseudônimo</label>
                                        <input 
                                            type="text" 
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cyan/50 transition-colors"
                                            placeholder="Guerreiro"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[9px] uppercase tracking-widest text-white/40 mb-1.5 block">Idade</label>
                                        <input 
                                            type="number" 
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cyan/50 transition-colors"
                                            placeholder="Ex: 25"
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="grid grid-cols-1 gap-3">
                                    {["Menos de 1 ano", "1 a 3 anos", "3 a 5 anos", "Mais de 5 anos"].map((opt) => (
                                        <button
                                            key={opt}
                                            onClick={() => { setFormData({ ...formData, time_with_problem: opt }); nextStep(); }}
                                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                                                formData.time_with_problem === opt 
                                                    ? "bg-cyan/10 border-cyan text-cyan" 
                                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                            }`}
                                        >
                                            <span className="text-sm font-medium">{opt}</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-4">
                                    <textarea 
                                        rows={5}
                                        value={formData.motivation}
                                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-cyan/50 transition-colors resize-none leading-relaxed"
                                        placeholder="Minha família, minha saúde mental, meu futuro..."
                                    />
                                    <p className="text-[10px] text-white/30 italic">Pense no motivo real. Aquele que te manterá de pé quando a vontade de cair for forte.</p>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { label: "Sim, sou Católico", value: "CATHOLIC", sub: "Ativa o Modo Espiritual completo" },
                                        { label: "Sim, acredito em Deus", value: "FAITH", sub: "Foco em valores universais" },
                                        { label: "Não possuo crença", value: "NONE", sub: "Abordagem puramente estoica" }
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setFormData({ ...formData, faith_level: opt.value }); nextStep(); }}
                                            className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                                                formData.faith_level === opt.value 
                                                    ? "bg-cyan/10 border-cyan" 
                                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                                            }`}
                                        >
                                            <p className={`text-sm font-bold ${formData.faith_level === opt.value ? "text-cyan" : "text-white"}`}>{opt.label}</p>
                                            <p className="text-[10px] text-white/40 mt-0.5">{opt.sub}</p>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {step === 4 && (
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                                    <Shield className="w-12 h-12 text-cyan mx-auto mb-4" />
                                    <p className="text-sm text-white/80 leading-relaxed mb-6">
                                        Eu, <span className="text-cyan font-bold">{formData.name || "Guerreiro"}</span>, prometo lutar pela minha liberdade todos os dias. Entendo que a disciplina é o preço que pago pela minha paz.
                                    </p>
                                    <div className="h-px bg-white/10 w-full mb-6" />
                                    <p className="text-[10px] uppercase tracking-widest text-white/30">Bem-vindo à Fortaleza</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="mt-8 flex gap-3">
                    {step > 0 && (
                        <button
                            onClick={prevStep}
                            className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-white/60" />
                        </button>
                    )}
                    
                    {step === STEPS.length - 1 ? (
                        <button
                            onClick={handleFinish}
                            disabled={isSubmitting}
                            className="flex-1 h-14 bg-cyan text-[#080a0f] rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-95 transition-all flex items-center justify-center disabled:opacity-50"
                        >
                            {isSubmitting ? "Entrando..." : "ASSUMIR POSTO"}
                        </button>
                    ) : (step !== 1 && step !== 3) ? (
                        <button
                            onClick={nextStep}
                            className="flex-1 h-14 bg-white/10 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white/15 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            Continuar <ChevronRight className="w-4 h-4" />
                        </button>
                    ) : null}
                </div>
            </main>
        </div>
    );
}
