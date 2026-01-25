"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import {
  IconAdjustmentsBolt,
  IconBed,
  IconFlame,
  IconHeartHandshake,
  IconBuilding,
} from "@tabler/icons-react";

// Updated programs data
const programs = [
  {
    slug: "focus-rebuild",
    title: "Focus Rebuild",
    subtitle: "Restore mental clarity and rebuild sustained attention.",
    description:
      "Systematic protocol to eliminate attention fragmentation, rebuild sustained focus, and unlock flow states on demand.",
    category: ["Focus", "All"],
    duration: "7 Weeks",
    level: "Intermediate",
    icon: IconAdjustmentsBolt,
    accent: "from-indigo-400 to-cyan-400",
  },
  {
    slug: "burnout-reset",
    title: "Burnout Reset",
    subtitle: "Recover energy and regulate stress physiology.",
    description:
      "Science-backed system to regulate your nervous system, accelerate recovery, and thrive under high-stakes conditions.",
    category: ["Stress", "All"],
    duration: "8 Weeks",
    level: "All Levels",
    icon: IconFlame,
    accent: "from-amber-400 to-orange-400",
  },
  {
    slug: "sleep-reset",
    title: "Sleep Reset",
    subtitle: "Align circadian rhythms and improve recovery.",
    description:
      "Optimize light, timing, and habits to restore energy stability, deep sleep, and peak daytime performance.",
    category: ["Sleep", "Energy", "All"],
    duration: "6 Weeks",
    level: "Beginner–Advanced",
    icon: IconBed,
    accent: "from-sky-400 to-blue-500",
  },
  {
    slug: "communication-fitness",
    title: "Communication Fitness",
    subtitle: "Strengthen social and professional resilience.",
    description:
      "Train communication, empathy, and influence skills to improve personal and professional interactions.",
    category: ["Focus", "All"],
    duration: "5 Weeks",
    level: "All Levels",
    icon: IconHeartHandshake,
    accent: "from-emerald-400 to-teal-400",
  },
  {
    slug: "urban-survival",
    title: "Urban Survival",
    subtitle: "Maintain wellbeing in high-demand environments.",
    description:
      "Build mental and physical resilience to thrive in fast-paced and high-pressure urban settings.",
    category: ["Energy", "All"],
    duration: "8 Weeks",
    level: "Intermediate",
    icon: IconBuilding,
    accent: "from-slate-400 to-zinc-500",
  },
];

const categories = ["All", "Focus", "Stress", "Sleep", "Energy", "Longevity"];

export default function ProgramsLibrary() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = programs
    .filter((p) => p.category.includes(activeFilter) || activeFilter === "All")
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-x-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-[900px] h-[900px] bg-cyan-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-emerald-200/10 rounded-full blur-3xl" />
      </div>

      <main className="relative pt-20 pb-32">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 text-center mb-20">


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-950 leading-tight tracking-tight mb-8"
          >
            Upgrade Your{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
              Biology
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Structured programs built on neuroscience, physiology, and performance research to help you operate at your true potential.
          </motion.p>
        </div>

        {/* Controls */}
        <div className="max-w-6xl mx-auto px-6 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-5 py-4 rounded-2xl bg-white/70 backdrop-blur border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-slate-800 placeholder-slate-400"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200/50"
                    : "bg-white/80 backdrop-blur border border-slate-200 text-slate-700 hover:border-indigo-300 hover:shadow-md"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              <p className="text-xl">No programs match your search or filter.</p>
              <button
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
                className="mt-6 text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredPrograms.map((prog, index) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.6 }}
                >
                  <Link href={`/programs/${prog.slug}`} className="block group h-full">
                    <div className="relative h-full rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200/80 shadow-lg hover:shadow-2xl hover:border-slate-300/80 transition-all duration-500 flex flex-col">
                      {/* Accent bar */}
                      <div className={`h-2 bg-gradient-to-r ${prog.accent}`} />

                      <div className="p-8 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm font-medium text-slate-500">
                            {prog.duration}
                          </span>
                          <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                            {prog.level}
                          </span>
                        </div>

                        <div className="flex items-center mb-4 gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                            <Icon className="text-slate-800" size={26} />
                          </div>
                        </div>

                        <h3 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">
                          {prog.title}
                        </h3>

                        <p className="text-lg font-medium text-slate-600 mb-4">{prog.subtitle}</p>

                        <p className="text-slate-600 mb-8 flex-grow line-clamp-3">{prog.description}</p>

                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                            Explore Program →
                          </span>
                          <div className="inline-flex flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-50 to-cyan-50 items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
