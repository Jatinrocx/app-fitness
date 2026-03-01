"use client";

import { motion } from "framer-motion";
import { Dumbbell, Utensils, LineChart } from "lucide-react";

export function Method() {
    const methdology = [
        {
            icon: Dumbbell,
            title: "TRAIN",
            description: "Intensity and progressive overload. Structured programming designed for maximum hypertrophy without burnout.",
        },
        {
            icon: Utensils,
            title: "EAT",
            description: "Precision nutrition. No starvation, no binge cycles. Calculated macros to fuel performance and reveal aesthetics.",
        },
        {
            icon: LineChart,
            title: "TRACK",
            description: "Data-driven progress. If you aren't logging your lifts and weight, you're guessing. We eliminate guesswork.",
        },
    ];

    return (
        <section id="method" className="py-32 px-6 md:px-12 bg-[#0B0B0B]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F5F5F5] uppercase">
                        The Method
                    </h2>
                    <p className="mt-4 text-[#F5F5F5]/50 tracking-wide text-sm uppercase">Simplicity scaled with intensity</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {methdology.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group relative flex flex-col items-start p-8 glass-panel transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
                        >
                            <div className="mb-6 p-4 bg-[#F5F5F5]/5 rounded-lg group-hover:bg-[#cc2929]/10 transition-colors duration-300">
                                <item.icon className="w-8 h-8 text-[#F5F5F5] group-hover:text-[#cc2929] transition-colors duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-[#F5F5F5] tracking-widest mb-4">
                                {item.title}
                            </h3>
                            <p className="text-[#F5F5F5]/60 leading-relaxed text-sm">
                                {item.description}
                            </p>

                            {/* Subtle accent line on hover */}
                            <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#cc2929] transition-all duration-300 group-hover:w-full" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
