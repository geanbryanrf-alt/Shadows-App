"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PrivacidadePage() {
    return (
        <div className="min-h-dvh bg-[#080a0f] text-white/90 font-sans selection:bg-cyan selection:text-base antialiased px-6 py-12 max-w-2xl mx-auto">
            <Link href="/" className="fixed top-6 left-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan/10 hover:border-cyan/40 transition-all group z-50">
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8"
            >
                <header className="flex flex-col gap-4 items-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan mb-2">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-white italic">Política de Privacidade</h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Proteção de Identidade e Dados</p>
                </header>

                <div className="prose prose-invert prose-stone max-w-none flex flex-col gap-6 text-[15px] leading-relaxed">
                    <section>
                        <h2 className="text-lg font-serif font-bold text-cyan flex items-center gap-2 mb-3">
                            <span className="opacity-20 text-xs">01.</span> Segurança de Dados
                        </h2>
                        <p className="text-white/60">
                            Sua privacidade é nossa prioridade máxima. Utilizamos o **Supabase** (tecnologia de nível empresarial) para criptografar e proteger seus dados. Suas informações de hábitos, falhas e recomeços são estritamente privadas e não são compartilhadas com terceiros.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-serif font-bold text-cyan flex items-center gap-2 mb-3">
                            <span className="opacity-20 text-xs">02.</span> Coleta de Informações
                        </h2>
                        <p className="text-white/60">
                            Coletamos apenas os dados fundamentais para o funcionamento do app: e-mail (para autenticação), nome de usuário e as informações de progresso que você insere. Dados como idade e fé (colhidos no onboarding) são usados exclusivamente para adaptar a experiência e o conteúdo exibido para você.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-serif font-bold text-cyan flex items-center gap-2 mb-3">
                            <span className="opacity-20 text-xs">03.</span> Exclusão de Dados
                        </h2>
                        <p className="text-white/60">
                            Você tem o direito de zerar seus dados ou solicitar a exclusão de sua conta a qualquer momento através das configurações de perfil ou entrando em contato com o suporte.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-serif font-bold text-cyan flex items-center gap-2 mb-3">
                            <span className="opacity-20 text-xs">04.</span> Uso de Cookies
                        </h2>
                        <p className="text-white/60">
                            Utilizamos cookies apenas para manter sua sessão ativa (login) e para que você possa utilizar o app em modo PWA (instalar na tela inicial) com persistência local.
                        </p>
                    </section>

                    <section className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            "Nenhum homem é livre se não for senhor de si mesmo."
                        </p>
                    </section>
                </div>

                <footer className="text-center mt-12 pb-12">
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">Shadows Project &copy; 2026</p>
                </footer>
            </motion.div>
        </div>
    );
}
