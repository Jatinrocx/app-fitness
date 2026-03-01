"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
    onApply?: () => void;
}

export function Hero({ onApply }: HeroProps) {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden">
            <div className="z-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6 space-y-4"
                >
                    <h2 className="text-sm md:text-base tracking-[0.2em] text-[#F5F5F5]/60 uppercase font-medium">
                        Built in college. Refined with discipline.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] text-[#F5F5F5] uppercase mb-4">
                        Jatin
                    </h1>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] to-[#777] uppercase">
                        3 Years Natural.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 flex flex-col sm:flex-row items-center gap-6"
                >
                    <button
                        onClick={() => onApply && onApply()}
                        className="group relative px-8 py-4 bg-[#F5F5F5] text-[#0B0B0B] font-medium text-sm tracking-wide uppercase overflow-hidden flex items-center gap-2 cursor-pointer"
                    >
                        <span className="relative z-10 transition-transform duration-500 group-hover:-translate-x-1">Apply For Coaching</span>
                        <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0" />
                    </button>

                    <Link
                        href="#programs"
                        className="px-8 py-4 text-[#F5F5F5] font-medium text-sm tracking-wide uppercase border border-[#F5F5F5]/20 hover:border-[#F5F5F5]/60 transition-colors duration-300"
                    >
                        View Programs
                    </Link>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-xs tracking-[0.2em] text-[#F5F5F5]/40 uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-[#F5F5F5]/20 overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="w-full h-1/2 bg-[#F5F5F5]"
                    />
                </div>
            </motion.div>
        </section >
    );
}
