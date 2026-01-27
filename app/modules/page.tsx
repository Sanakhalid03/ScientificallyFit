"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Heart, Leaf, Users, ArrowRight } from "lucide-react";
import React from "react";
import type { LucideIcon } from "lucide-react";

// ------------------------
// Module Data
// ------------------------
type ModuleType = {
  title: string;
  description: string;
  outcomes: string[];
  icon: LucideIcon;
  href: string;
  gradient: string;
  hoverGradient: string;
};

const modules: ModuleType[] = [
  {
    title: "Mental Fitness",
    description:
      "Optimize cognitive performance, emotional regulation, and mental resilience.",
    outcomes: ["Sharper focus", "Better stress management", "Improved sleep"],
    icon: Brain,
    href: "/modules/mental",
    gradient: "from-indigo-300 via-purple-200 to-cyan-200",
    hoverGradient: "from-indigo-400 via-purple-300 to-cyan-300",
  },
  {
    title: "Social & Relationship Fitness",
    description:
      "Build deeper connections and navigate relationships with intention.",
    outcomes: ["Stronger communication", "Healthier boundaries", "Deeper intimacy"],
    icon: Heart,
    href: "/modules/social",
    gradient: "from-pink-200 via-rose-100 to-orange-100",
    hoverGradient: "from-pink-300 via-rose-200 to-orange-200",
  },
  {
    title: "Environmental Fitness",
    description:
      "Design your physical and digital spaces for peak performance.",
    outcomes: ["Optimized workspace", "Reduced digital noise", "Better urban living"],
    icon: Leaf,
    href: "/modules/environmental",
    gradient: "from-green-200 via-teal-100 to-lime-100",
    hoverGradient: "from-green-300 via-teal-200 to-lime-200",
  },
  {
    title: "Family Fitness",
    description:
      "Create sustainable routines that support the whole family system.",
    outcomes: ["Aligned schedules", "Quality family time", "Sustainable habits"],
    icon: Users,
    href: "/modules/family",
    gradient: "from-yellow-200 via-amber-100 to-orange-100",
    hoverGradient: "from-yellow-300 via-amber-200 to-orange-200",
  },
];

// ------------------------
// Gradient Card Component
const GradientCard: React.FC<{ module: ModuleType; index: number }> = ({
  module,
  index,
}) => {
  const Icon = module.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.35, duration: 0.3 }}
      className="group relative rounded-3xl p-[2px] overflow-hidden"
    >
      {/* Gradient border */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${module.gradient} transition-all duration-500`}
      />

      {/* Glow overlay */}
      <div className="absolute inset-0 rounded-3xl opacity-0 blur-xl bg-gradient-to-br from-white/20 via-white/10 to-white/0 group-hover:opacity-50 transition-all duration-500" />

      <Link href={module.href}>
        <motion.div
          whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="relative rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-white/75 backdrop-blur-md"
        >
          {/* Subtle shine effect on hover */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-30 transition-all duration-700" />

          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.15 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${module.gradient} text-white shadow-md`}
            style={{ filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.3))" }} // makes icon pop
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {module.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4">{module.description}</p>

          {/* Outcomes */}
          <ul className="text-gray-700 text-sm space-y-1 ml-2 mb-4">
            {module.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
                {outcome}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="text-indigo-700 font-semibold flex items-center gap-1">
            Explore Module <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};


// ------------------------
// Section Header
// ------------------------
const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-12">
    {subtitle && (
      <p className="text-indigo-500 font-semibold text-sm uppercase tracking-wider">
        {subtitle}
      </p>
    )}
    <h2 className="text-4xl font-extrabold text-gray-900">{title}</h2>
  </div>
);

// ------------------------
// Modules Page
// ------------------------
const ModulesPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
{/* Hero Section */}
<section className="relative py-20 sm:py-24 md:py-32 bg-gradient-to-br from-indigo-100 via-white to-cyan-100 text-center px-4 overflow-hidden">
  {/* Moving Gradient Background Overlay */}
  <div className="absolute inset-0 animate-hue bg-[linear-gradient(120deg,#e0e7ff,#ecfeff,#fdf2f8)] mix-blend-overlay opacity-40" />

  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className="relative z-10 max-w-full sm:max-w-2xl md:max-w-5xl mx-auto"
  >
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight
  text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-fuchsia-500 animate-gradient-text">
  Four Pillars of Human Functioning
</h1>

    <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-full sm:max-w-2xl mx-auto leading-relaxed">
      Each module is a science-backed system designed to elevate your
      wellbeing across mind, relationships, environment, and family.
    </p>
  </motion.div>
</section>



      {/* Modules Grid */}
      <section className="py-16 px-6 lg:px-12">
        <SectionHeader
          title="Explore Our Core Modules"
          subtitle="Evidence-based systems, beautifully built"
        />

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {modules.map((mod, i) => (
            <GradientCard key={mod.title} module={mod} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ModulesPage;
