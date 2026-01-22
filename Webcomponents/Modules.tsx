"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Brain, Users, Leaf, Home } from "lucide-react";
import Link from "next/link";

const modules = [
  {
    title: "Mental Fitness",
    promise: "Sharpen clarity, emotional balance, and resilience.",
    outcomes: ["Stress regulation", "Cognitive clarity", "Emotional control"],
    icon: Brain,
    glow: "from-indigo-500 via-cyan-400 to-emerald-400",
  },
  {
    title: "Social Fitness",
    promise: "Build trust, communication, and connection.",
    outcomes: ["Healthy boundaries", "Conflict mastery", "Deeper bonds"],
    icon: Users,
    glow: "from-pink-500 via-rose-400 to-orange-300",
  },
  {
    title: "Environmental Fitness",
    promise: "Design spaces that support your nervous system.",
    outcomes: ["Lower stress", "Better sleep cues", "Higher focus"],
    icon: Leaf,
    glow: "from-emerald-500 via-lime-400 to-teal-300",
  },
  {
    title: "Family Fitness",
    promise: "Create harmony, routines, and shared resilience.",
    outcomes: ["Emotional safety", "Stronger bonds", "Daily rituals"],
    icon: Home,
    glow: "from-violet-500 via-fuchsia-400 to-pink-300",
  },
];

export default function ModuleRow() {
  return (
    <section className="relative py-28 bg-gradient-to-b from-slate-50 to-white">
      {/* soft background glow */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-indigo-400/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 pb-4">
          <span className="text-xs font-semibold tracking-[0.35em] uppercase text-indigo-500">
            The 4 Core Systems
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
            Human Performance,
            <span className="block bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              Engineered
            </span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-slate-600">
            Each system upgrades a critical life domain — together they form one
            intelligent human operating system.
          </p>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <Card
                key={m.title}
                className="
                  group relative overflow-hidden
                  border border-white/50
                  bg-white/70 backdrop-blur-xl
                  shadow-lg hover:shadow-2xl
                  transition-all duration-500 hover:-translate-y-3
                "
              >
                {/* Neon glow border */}
                <div
                  className={`
                    absolute -inset-[2px] rounded-xl opacity-0
                    group-hover:opacity-100 transition duration-500
                    bg-gradient-to-br ${m.glow} blur-xl
                  `}
                />

                {/* Light sweep */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Card body */}
                <div className="relative rounded-xl bg-white/85 p-7">
                  {/* Icon */}
                  <div
                    className="
                      w-12 h-12 rounded-xl mb-5
                      flex items-center justify-center
                      bg-gradient-to-br from-slate-900 to-slate-700
                      text-white shadow-md
                      group-hover:scale-110 group-hover:rotate-6
                      transition-transform duration-500
                    "
                  >
                    <Icon size={22} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {m.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4">
                    {m.promise}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {m.outcomes.map((o) => (
                      <li
                        key={o}
                        className="text-xs text-slate-700 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400" />
                        {o}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="#"
                    className="
                      inline-flex items-center gap-1
                      text-xs font-semibold
                      text-indigo-600 hover:text-indigo-800
                      transition-colors
                    "
                  >
                    Explore Module
                    <ArrowUpRight
                      size={14}
                      className="
                        transition-transform
                        group-hover:translate-x-1 group-hover:-translate-y-1
                      "
                    />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
