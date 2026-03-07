"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedProgram?: string;
}

export function ApplicationModal({ isOpen, onClose, selectedProgram }: ApplicationModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        level: "",
        goal: "",
        commitment: "Select Commitment Level"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);
    const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "qr">("razorpay");

    const handleClose = () => {
        setStep(1);
        setIsLoading(false);
        onClose();
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const getProgramPrice = (programName?: string) => {
        switch (programName) {
            case "Beginner Blueprint": return 1999;
            case "Monthly Coaching": return 4999;
            case "Elite 1-on-1": return 12999;
            default: return 1999;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            // 0. Save Lead to Supabase
            const { error: dbError } = await supabase
                .from('applications')
                .insert([
                    {
                        name: formData.name,
                        age: parseInt(formData.age) || 0,
                        level: formData.level,
                        goal: formData.goal,
                        commitment: formData.commitment,
                        program: selectedProgram || "General",
                        payment_method: paymentMethod,
                        status: paymentMethod === 'qr' ? 'qr_pending' : 'razorpay_pending'
                    }
                ]);

            if (dbError) {
                console.error("Failed to save application to Supabase:", dbError);
            }

            if (paymentMethod === "qr") {
                setIsLoading(false);
                setStep(2);
                return;
            }

            // 1. Load Razorpay Script
            const res = await loadRazorpayScript();
            if (!res) {
                alert("Razorpay SDK failed to load");
                setIsLoading(false);
                return;
            }

            // 2. Create Order on Backend
            const amount = getProgramPrice(selectedProgram);
            const orderRecord = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, receipt: "receipt_" + Math.random().toString(36).substring(7) })
            }).then((t) => t.json());

            if (orderRecord.error) {
                alert("Please add Razorpay API keys to .env.local to test payments. Currently running in mock mode.");
                console.log("Mock Application Data:", { ...formData, program: selectedProgram });
                setIsLoading(false);
                handleClose();
                return;
            }

            // 3. Setup Razorpay Options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
                amount: orderRecord.amount,
                currency: orderRecord.currency,
                name: "Jatin Fitness",
                description: selectedProgram || "Coaching Application",
                order_id: orderRecord.id,
                handler: async function (response: Record<string, string>) {
                    // 4. Verify Payment on Backend
                    const verifyCall = await fetch("/api/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    }).then((t) => t.json());

                    if (verifyCall.message) {
                        alert("Payment verified! Application submitted successfully.");

                        // Optionally update Supabase status to 'paid' here
                        await supabase
                            .from('applications')
                            .update({ status: 'paid' })
                            .eq('name', formData.name) // Basic match, ideal would be returning an ID from the insert above
                            .eq('program', selectedProgram || "General");

                        handleClose();
                    } else {
                        alert("Payment verification failed.");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: "test@example.com", // Add email field to form later if needed
                    contact: "9999999999"      // Add phone field to form later if needed
                },
                theme: {
                    color: "#0B0B0B"
                }
            };

            const paymentObject = new (window as unknown as { Razorpay: new (opts: Record<string, unknown>) => { open: () => void } }).Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error("Payment flow error:", error);
            alert("Something went wrong with the payment flow.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 z-50 bg-[#0B0B0B]/80 backdrop-blur-sm"
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-12 overflow-y-auto pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0B0B0B] border border-[#F5F5F5]/10 p-8 w-full max-w-lg relative pointer-events-auto"
                        >
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-[#F5F5F5]/50 hover:text-[#F5F5F5] transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="mb-8">
                                <h2 className="text-2xl font-bold tracking-tight text-[#F5F5F5] uppercase mb-2">
                                    Apply For Coaching
                                </h2>
                                <p className="text-[#F5F5F5]/60 text-sm">
                                    {step === 1 ? (selectedProgram ? `Selected: ${selectedProgram}` : "Fill out the form below to begin.") : "Complete your payment directly."}
                                </p>
                            </div>

                            {step === 1 ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-bold text-[#F5F5F5]/50 uppercase tracking-widest mb-2">
                                            Name
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[#F5F5F5]/5 border border-[#F5F5F5]/10 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#cc2929] transition-colors"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-[#F5F5F5]/50 uppercase tracking-widest mb-2">
                                                Age
                                            </label>
                                            <input
                                                required
                                                type="number"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                className="w-full bg-[#F5F5F5]/5 border border-[#F5F5F5]/10 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#cc2929] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#F5F5F5]/50 uppercase tracking-widest mb-2">
                                                Current Level
                                            </label>
                                            <select
                                                required
                                                value={formData.level}
                                                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                                className="w-full bg-[#0B0B0B] border border-[#F5F5F5]/10 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#cc2929] transition-colors appearance-none"
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="Beginner">Beginner (0-1 yrs)</option>
                                                <option value="Intermediate">Intermediate (1-3 yrs)</option>
                                                <option value="Advanced">Advanced (3+ yrs)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#F5F5F5]/50 uppercase tracking-widest mb-2">
                                            Primary Goal
                                        </label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={formData.goal}
                                            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                            placeholder="Briefly describe your current scenario and what you want to achieve..."
                                            className="w-full bg-[#F5F5F5]/5 border border-[#F5F5F5]/10 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#cc2929] transition-colors resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#F5F5F5]/50 uppercase tracking-widest mb-2">
                                            Commitment Level
                                        </label>
                                        <select
                                            required
                                            value={formData.commitment}
                                            onChange={(e) => setFormData({ ...formData, commitment: e.target.value })}
                                            className="w-full bg-[#0B0B0B] border border-[#F5F5F5]/10 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#cc2929] transition-colors appearance-none"
                                        >
                                            <option value="Select Commitment Level" disabled>Select Commitment Level</option>
                                            <option value="Ready to work">I am ready to put in the work.</option>
                                            <option value="Exploring">Just exploring options.</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#F5F5F5]/50 uppercase tracking-widest mb-2">
                                            Payment Method
                                        </label>
                                        <select
                                            required
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value as "razorpay" | "qr")}
                                            className="w-full bg-[#0B0B0B] border border-[#F5F5F5]/10 px-4 py-3 text-[#F5F5F5] focus:outline-none focus:border-[#cc2929] transition-colors appearance-none"
                                        >
                                            <option value="razorpay">Pay Online (Cards/NetBanking/UPI)</option>
                                            <option value="qr">Direct Secure QR (0% Processing Fees)</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full py-4 mt-4 bg-[#F5F5F5] hover:bg-[#d1d1d1] text-[#0B0B0B] font-bold text-sm tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? "Processing..." : (paymentMethod === "qr" ? "Show QR Code" : "Submit & Pay Online")}
                                    </button>
                                </form>
                            ) : (
                                <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <p className="text-[#F5F5F5]/80">Please scan the QR code below using any UPI app (GPay, PhonePe, Paytm) to pay <strong>₹{getProgramPrice(selectedProgram)}</strong>.</p>

                                    <div className="flex justify-center my-8 relative">
                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=9634352098@upi&pn=Jatin%20Fitness&am=${getProgramPrice(selectedProgram)}&cu=INR`}
                                            alt="UPI QR Code"
                                            className="w-64 h-64 p-4 bg-white rounded-2xl border-2 border-[#cc2929] shadow-[0_0_30px_rgba(204,41,41,0.2)]"
                                        />
                                    </div>

                                    <p className="text-sm text-[#F5F5F5]/60 bg-[#F5F5F5]/5 p-4 rounded-lg border border-[#F5F5F5]/10">
                                        Once paid, please send a screenshot of the successful transaction on WhatsApp to <strong>+91 9634352098</strong> so we can begin your coaching program.
                                    </p>

                                    <button
                                        onClick={handleClose}
                                        className="w-full py-4 mt-4 bg-[#cc2929] hover:bg-[#a32020] text-[#F5F5F5] font-bold text-sm tracking-widest uppercase transition-colors"
                                    >
                                        I have made the payment
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
