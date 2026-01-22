"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  IconAdjustmentsBolt,
  IconBed,
  IconFlame,
  IconHeartHandshake,
  IconBuilding,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

export function ProgramsSection() {
  const programs = [
    {
      title: "Focus Rebuild",
      description: "Restore mental clarity and rebuild sustained attention.",
      icon: IconAdjustmentsBolt,
      href: "#focus-rebuild",
      accent: "from-indigo-400 to-cyan-400",
    },
    {
      title: "Burnout Reset",
      description: "Recover energy and regulate stress physiology.",
      icon: IconFlame,
      href: "#burnout-reset",
      accent: "from-amber-400 to-orange-400",
    },
    {
      title: "Sleep Reset",
      description: "Align circadian rhythms and improve recovery.",
      icon: IconBed,
      href: "#sleep-reset",
      accent: "from-sky-400 to-blue-500",
    },
    {
      title: "Communication Fitness",
      description: "Strengthen social and professional resilience.",
      icon: IconHeartHandshake,
      href: "#communication-fitness",
      accent: "from-emerald-400 to-teal-400",
    },
    {
      title: "Urban Survival",
      description: "Maintain wellbeing in high-demand environments.",
      icon: IconBuilding,
      href: "#urban-survival",
      accent: "from-slate-400 to-zinc-500",
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/30 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-200/30 blur-3xl rounded-full" />
      </div>

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-20 px-4 relative z-10">
        <span className="text-xs font-semibold tracking-[0.3em] uppercase text-indigo-500">
          Programs
        </span>

        <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-900">
          Targeted Biological
          <span className="block bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            Transformations
          </span>
        </h2>

        <p className="mt-6 text-slate-600 text-base md:text-lg">
          Carefully designed protocols built on neuroscience, physiology, and behavioral science.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4 relative z-10">
        {programs.map((program, index) => {
          const Icon = program.icon;

          return (
            <Link key={program.title} href={program.href}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 p-8 overflow-hidden"
              >
                {/* Accent glow */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    "bg-gradient-to-br",
                    program.accent
                  )}
                  style={{
                    maskImage:
                      "radial-gradient(circle at top left, black, transparent 70%)",
                  }}
                />

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Icon className="text-slate-800" size={26} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-xl font-semibold text-slate-900 mb-2">
                  {program.title}
                </h3>

                <p className="relative z-10 text-slate-600 text-sm leading-relaxed">
                  {program.description}
                </p>

                {/* CTA */}
                <div className="relative z-10 mt-6 text-sm font-semibold text-indigo-600 flex items-center gap-2">
                  Explore
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
