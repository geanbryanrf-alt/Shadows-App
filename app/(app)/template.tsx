"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
                duration: 0.35, 
                ease: [0.22, 1, 0.36, 1], // ease out quint - cinematic feel
                staggerChildren: 0.05
            }}
            className="w-full h-full transform-gpu"
            style={{ willChange: "transform, opacity" }}
        >
            {children}
        </motion.div>
    );
}
