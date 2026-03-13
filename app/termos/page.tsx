"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ScrollText } from "lucide-react";
import Link from "next/link";

export default function TermosPage() {
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
                        <ScrollText size={32} />
                    </div>
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-white italic">Termos de Uso</h1>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold">Última atualização: 12 de Março, 2026</p>
                </header>

                <div className="prose prose-invert prose-stone max-w-none flex flex-col gap-6 text-[15px] leading-relaxed">
                    <section>
                        <h2 className="text-lg font-serif font-bold text-cyan flex items-center gap-2 mb-3">
                            <span className="opacity-20 text-xs">01.</span> Aceitação dos Termos
                        </h2>
                        <p className="text-white/60">
                            Ao acessar e utilizar o sistema SHADOWS (The Rebooter App), você concorda expressamente em cumprir e estar vinculado aos seguintes Termos de Uso. Este aplicativo foi desenvolvido para auxiliar no desenvolvimento pessoal, disciplina e superação de hábitos negativos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-serif font-bold text-cyan flex items-center gap-2 mb-3">
                            <span className="opacity-20 text-xs">02.</span> Natureza do Conteúdo
                        </h2>
                        <p className="text-white/60">
                            Todo o conteúdo, protocolos, planos de 90 dias e orientações são fornecidos para fins informativos e motivacionais. O SHADOWS não substitui aconselhamento médico ou psicológico profissional. Se você sofre de vício clínico ou transtornos graves, recomendamos a busca de ajuda profissional qualificada.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-serif font-bold text-cyan flex items-center gap-2 mb-3">
                            <span className="opacity-20 text-xs">03.</span> Responsabilidade do Usuário
                        </h2>
                        <p className="text-white/60">
                            Você é o único responsável pela veracidade dos dados fornecidos e pela manutenção do segredo de sua conta. O progresso (&quot;Reboot Days&quot;) é uma ferramenta de gamificação baseada na sua autodeclaração; a integridade do processo depende da sua honestidade.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-serif font-bold text-cyan flex items-center gap-2 mb-3">
                            <span className="opacity-20 text-xs">04.</span> Propriedade Intelectual
                        </h2>
                        <p className="text-white/60">
                            O design, marcas, logos e o &quot;Protocolo Shadows&quot; são propriedade intelectual do projeto. A reprodução não autorizada para fins comerciais é estritamente proibida.
                        </p>
                    </section>

                    <section className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <p className="text-xs text-white/40 leading-relaxed italic">
                            &quot;A disciplina é a base sobre a qual se constrói a verdadeira liberdade.&quot;
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
