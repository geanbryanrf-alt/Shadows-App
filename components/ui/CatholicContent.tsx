"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Cross } from "lucide-react";


const CATHOLIC_QUOTES = [
    {
        author: "São João Paulo II",
        text: "A castidade é a afirmação do amor. Ela não é um 'não', mas um 'sim' vibrante ao amor verdadeiro.",
    },
    {
        author: "São Josemaria Escrivá",
        text: "Para defender a sua pureza, São Francisco de Assis revoltou-se na neve, São Bento jogou-se num silvado, São Bernardo mergulhou num tanque gelado...",
    },
    {
        author: "Santo Agostinho",
        text: "Tu estavas dentro de mim e eu fora... Tarde Te amei, Beleza tão antiga e tão nova, tarde Te amei!",
    },
    {
        author: "São Padre Pio",
        text: "A oração é a melhor arma que temos; é uma chave que abre o coração de Deus.",
    },
];

const PRAYERS = [
    {
        title: "Oração a São Miguel Arcanjo",
        text: "São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio...",
    },
    {
        title: "Ato de Contrição",
        text: "Meu Deus, eu me arrependo de todo coração de Vos ter ofendido, porque Sois infinitamente bom e Vos amo de todo o coração.",
    },
];

export function CatholicContent() {
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [showPrayer, setShowPrayer] = useState(false);

    useEffect(() => {
        setQuoteIndex(Math.floor(Math.random() * CATHOLIC_QUOTES.length));
    }, []);

    const quote = CATHOLIC_QUOTES[quoteIndex];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col gap-4 mb-6"
        >
            {/* Wisdom Card */}
            <div className="bg-stone-900/40 border border-[#f5c518]/20 rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-10%] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                    <Quote size={120} />
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                    <Quote size={12} className="text-[#f5c518]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#f5c518] font-bold">Sabedoria dos Santos</span>
                </div>

                <p className="font-serif text-[15px] text-white/90 leading-relaxed italic mb-4">
                    &quot;{quote.text}&quot;
                </p>
                
                <div className="flex items-center justify-between">
                    <span className="text-[11px] text-white/40 font-medium">— {quote.author}</span>
                    <button 
                        onClick={() => setShowPrayer(!showPrayer)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f5c518]/10 border border-[#f5c518]/20 text-[#f5c518] text-[10px] font-black uppercase tracking-widest hover:bg-[#f5c518]/20 transition-all"
                    >
                        <Cross size={10} />
                        {showPrayer ? "Fechar Oração" : "Ver Oração"}
                    </button>
                </div>

                <AnimatePresence>
                    {showPrayer && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-6 pt-5 border-t border-white/5">
                                <h4 className="font-serif text-sm font-bold text-white mb-2">{PRAYERS[0].title}</h4>
                                <p className="text-[12px] text-white/60 leading-relaxed italic">
                                    {PRAYERS[0].text}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
