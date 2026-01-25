"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const articles: any = {
  "boost-mental-performance": {
    title: "Boost Your Mental Performance",
    sections: [
      {
        h: "Why Mental Fitness Matters",
        p: "Your brain is your most powerful asset. Focus, memory, and emotional regulation are trainable skills.",
      },
      {
        h: "Daily Brain Habits",
        p: "Sleep, hydration, and structured work cycles dramatically improve cognition.",
      },
      {
        h: "Consistency is Power",
        p: "Small daily rituals compound into extraordinary performance over time.",
      },
    ],
  },
  "power-of-social-connections": {
    title: "Power of Social Connections",
    sections: [
      { h: "Human Connection", p: "Social bonds lower stress and increase longevity." },
      { h: "Belonging", p: "Community improves resilience and emotional health." },
      { h: "Growth Together", p: "Shared purpose creates lasting motivation." },
    ],
  },
  "design-your-environment": {
    title: "Design Your Environment",
    sections: [
      { h: "Your Space Shapes You", p: "Lighting, sound, and layout influence focus." },
      { h: "Minimal Distractions", p: "Clean spaces promote mental clarity." },
      { h: "Intentional Design", p: "Design your environment for peak flow." },
    ],
  },
  "daily-focus-rituals": {
    title: "Daily Focus Rituals",
    sections: [
      { h: "Start with Intention", p: "Morning rituals set mental clarity." },
      { h: "Deep Work Blocks", p: "Focus sprints enhance productivity." },
      { h: "Evening Reset", p: "Reflection strengthens learning." },
    ],
  },
};

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles[slug as string];

  if (!article) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-6">

      {/* Hero */}
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-400 text-transparent bg-clip-text">
          {article.title}
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto space-y-10 pb-24">
        {article.sections.map((s: any, i: number) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">{s.h}</h2>
            <p className="text-slate-600 leading-relaxed">{s.p}</p>
          </motion.div>
        ))}

        {/* Back Button */}
        <Link
          href="/learn"
          className="inline-block mt-12 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          ← Back to Learn
        </Link>
      </section>
    </div>
  );
}
