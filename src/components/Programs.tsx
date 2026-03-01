"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const programs = [
    {
        title: "Beginner Blueprint",
        price: "₹1,999",
        billing: "One-time",
        description: "The digital plan that started it all. 12 weeks of structured training.",
        features: [
            "12-Week Hypertrophy Program",
            "Macro & Nutrition Guide",
            "Video Form Demonstrations",
            "Lifetime Digital Access"
        ],
        highlight: false,
    },
    {
        title: "Monthly Coaching",
        price: "₹4,999",
        billing: "/ month",
        description: "Accountability and adjustments. For those who want more than just a PDF.",
        features: [
            "Custom Training Split",
            "Personalized Diet Macros",
            "Weekly Check-ins",
            "Form Review via WhatsApp",
            "Dashboard Access"
        ],
        highlight: true,
    },
    {
        title: "Elite 1-on-1",
        price: "₹12,999",
        billing: "/ month",
        description: "The highest tier of access. Only 5 slots available at any time.",
        features: [
            "Everything in Monthly",
            "Daily Direct Access",
            "Bi-weekly Strategy Calls",
            "Advanced Peaking Protocols",
            "Priority Dashboard Review"
        ],
        highlight: false,
    }
];

interface ProgramsProps {
    onApply?: (program: string) => void;
}

export function Programs({ onApply }: ProgramsProps) {
    return (
        <section id="programs" className="py-32 px-6 md:px-12 bg-[#0B0B0B]">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#F5F5F5] uppercase">
                        Programs
                    </h2>
                    <p className="mt-4 text-[#F5F5F5]/60 tracking-wider text-sm uppercase">Select your protocol</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={program.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className={`relative flex flex-col p-8 md:p-10 transition-transform duration-300 hover:-translate-y-2 ${program.highlight
                                ? "border border-[#cc2929] bg-[#cc2929]/5"
                                : "glass-panel"
                                }`}
                        >
                            {program.highlight && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#cc2929] text-[#F5F5F5] text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                                    Recommended
                                </div>
                            )}

                            <div className="mb-8 border-b border-[#F5F5F5]/10 pb-8">
                                <h3 className="text-xl font-medium text-[#F5F5F5] tracking-wide mb-2">
                                    {program.title}
                                </h3>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-4xl font-bold text-[#F5F5F5]">{program.price}</span>
                                    <span className="text-sm font-light text-[#F5F5F5]/50">{program.billing}</span>
                                </div>
                                <p className="text-sm text-[#F5F5F5]/60 min-h-[40px]">
                                    {program.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {program.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-[#F5F5F5]/80">
                                        <Check className="w-4 h-4 text-[#cc2929] shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => onApply && onApply(program.title)}
                                className={`w-full py-4 text-center text-sm font-bold uppercase tracking-widest transition-colors duration-300 cursor-pointer ${program.highlight
                                    ? "bg-[#cc2929] hover:bg-[#a32020] text-[#F5F5F5]"
                                    : "bg-[#F5F5F5] hover:bg-[#d1d1d1] text-[#0B0B0B]"
                                    }`}
                            >
                                {program.title === "Beginner Blueprint" ? "Purchase" : "Apply Now"}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
