"use client";

import { motion } from "framer-motion";

export function Philosophy() {
    return (
        <section id="philosophy" className="py-32 px-6 md:px-12 bg-[#0B0B0B] relative">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F5] italic pr-2">
                        &quot;Discipline compounds.&quot;
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl space-y-6 text-[#F5F5F5]/70 text-lg md:text-xl font-light leading-relaxed text-balance"
                >
                    <p>
                        Started with limited resources. No expensive coaching. Just an unwavering commitment to the process.
                    </p>
                    <p>
                        1.5 years of a strict, structured diet. Countless hours perfecting form. A 100% natural transformation built entirely on consistency and calculated effort.
                    </p>
                    <p>
                        This isn&apos;t about shortcuts. It&apos;s about engineering a system that guarantees results.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
