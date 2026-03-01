"use client";

import { motion } from "framer-motion";

const timelineData = [
    {
        year: "Year 1",
        title: "Learning",
        description: "Built the foundation. Understood the biology, nutrition, and mechanical tension required to induce hypertrophy naturally.",
    },
    {
        year: "Year 2",
        title: "Consistency",
        description: "Executed the plan with zero missed days. Dialed in the recovery protocol, sleep hygiene, and progressive overload.",
    },
    {
        year: "Year 3",
        title: "System",
        description: "Refined everything into a scalable system. No guesswork left. The discipline compounded into aesthetic reality.",
    },
];

export function Timeline() {
    return (
        <section id="timeline" className="py-24 px-6 md:px-12 bg-[#0B0B0B]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F5F5F5] uppercase mb-16 text-center">
                    The Journey
                </h2>

                <div className="relative border-l border-[#F5F5F5]/20 ml-4 md:ml-12 pl-8 md:pl-16 space-y-16">
                    {timelineData.map((item, index) => (
                        <motion.div
                            key={item.year}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="relative"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[37px] md:-left-[69px] top-1 w-3 h-3 bg-[#cc2929] rounded-full shadow-[0_0_10px_rgba(204,41,41,0.5)]" />

                            <span className="text-sm font-bold tracking-[0.2em] text-[#cc2929] uppercase mb-2 block">
                                {item.year}
                            </span>
                            <h3 className="text-xl md:text-2xl font-semibold text-[#F5F5F5] mb-3">
                                {item.title}
                            </h3>
                            <p className="text-[#F5F5F5]/60 leading-relaxed max-w-2xl">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
