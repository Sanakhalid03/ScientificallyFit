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
// ------------------------
const GradientCard: React.FC<{ module: ModuleType; index: number }> = ({ module, index }) => {
  const Icon = module.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="group relative rounded-3xl p-[2px] overflow-hidden"
    >
      {/* Gradient Background */}
      <motion.div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${module.gradient} transition-all duration-700`}
        whileHover={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))` }}
      />

      <Link href={module.href}>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className={`relative rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm bg-white/70`}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${module.gradient} text-white shadow-md`}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {module.title}
          </h3>
          <p className="text-gray-600 mb-4">{module.description}</p>
          <ul className="text-gray-700 text-sm space-y-1 ml-2 mb-4">
            {module.outcomes.map((outcome, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" /> {outcome}
              </li>
            ))}
          </ul>
          <div className="text-indigo-700 font-semibold group-hover:underline flex items-center gap-1">
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
      <section className="py-24 bg-gradient-to-br from-indigo-100 via-white to-cyan-100 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Four Pillars of Human Functioning
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
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
