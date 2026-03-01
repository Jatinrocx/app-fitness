"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Philosophy } from "@/components/Philosophy";
import { Timeline } from "@/components/Timeline";
import { Method } from "@/components/Method";
import { Programs } from "@/components/Programs";
import { ApplicationModal } from "@/components/ApplicationModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>();

  const handleOpenModal = (program?: string) => {
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-[#F5F5F5] selection:bg-[#cc2929]/40 selection:text-white">
      <Hero onApply={() => handleOpenModal()} />
      <Philosophy />
      <Timeline />
      <Method />
      <Programs onApply={(program) => handleOpenModal(program)} />

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProgram={selectedProgram}
      />
    </main>
  );
}
