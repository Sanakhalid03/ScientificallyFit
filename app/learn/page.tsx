"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styled from "styled-components";

const articles = [
  {
    title: "Boost Mental Performance",
    desc: "Train your focus, clarity, and cognitive energy.",
    slug: "boost-mental-performance",
    bg: "#8B5CF6",
    hoverBg: "rgba(139, 92, 246, 0.2)",
  },
  {
    title: "Power of Social Connection",
    desc: "Why relationships are essential for resilience.",
    slug: "power-of-social-connections",
    bg: "#F472B6",
    hoverBg: "rgba(244, 114, 182, 0.2)",
  },
  {
    title: "Design Your Environment",
    desc: "Optimize surroundings to elevate your brain.",
    slug: "design-your-environment",
    bg: "#22C55E",
    hoverBg: "rgba(34, 197, 94, 0.2)",
  },
  {
    title: "Daily Focus Rituals",
    desc: "Small habits that compound into success.",
    slug: "daily-focus-rituals",
    bg: "#A78BFA",
    hoverBg: "rgba(167, 139, 250, 0.2)",
  },
];

// Prevent bg and hoverBg from being passed to the DOM
const Card = styled.div<{ bg: string }>`
  .card {
    width: 240px;
    height: 340px;
    border-radius: 18px;
    background: ${(p) => p.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0f172a;
    cursor: pointer;
    position: relative;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }

  .card:hover {
    transform: translateY(-12px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.12);
    /* background stays same as original */
  }

  .card::before,
  .card::after {
    content: "";
    position: absolute;
    width: 25%;
    height: 25%;
    background: rgba(255, 255, 255, 0.25);
    transition: all 0.5s ease;
  }

  .card::before {
    top: 0;
    right: 0;
    border-radius: 0 18px 0 100%;
  }

  .card::after {
    bottom: 0;
    left: 0;
    border-radius: 0 100% 0 18px;
  }

  .card:hover::before,
  .card:hover::after {
    width: 100%;
    height: 100%;
    border-radius: 18px;
  }
`;


export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      {/* Hero */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-[#F8FAFC]">

        {/* Moving aurora gradient layer */}
        <div className="absolute inset-0 aurora-gradient opacity-80" />

        {/* Slow color shift overlay */}
        <div className="absolute inset-0 animate-hue bg-[linear-gradient(120deg,#e0e7ff,#ecfeff,#fdf2f8)] mix-blend-overlay opacity-70" />

        {/* Subtle tech grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.15)_1px,transparent_0)] bg-[size:42px_42px] opacity-30 animate-grid" />

        {/* Glow fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white/80" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-fuchsia-500 animate-gradient-text drop-shadow-xl">
            Learn & Elevate
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed">
            Evidence-based insights designed to upgrade your mind, focus, and life.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="px-7 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:shadow-2xl transition">
              Explore Articles
            </button>
          </div>
        </motion.div>

        {/* Animations */}
        <style>{`
          .aurora-gradient {
            background: linear-gradient(120deg, #a5b4fc, #67e8f9, #f0abfc, #fcd34d);
            background-size: 400% 400%;
            animation: auroraMove 18s ease infinite;
          }
          @keyframes auroraMove { 0%{background-position:0% 50%;} 50%{background-position:100% 50%;} 100%{background-position:0% 50%;} }

          .animate-hue { animation: hueShift 20s linear infinite; }
          @keyframes hueShift { from{filter:hue-rotate(0deg);} to{filter:hue-rotate(360deg);} }

          @keyframes gridMove { 0%{background-position:0 0;} 100%{background-position:42px 42px;} }
          .animate-grid { animation: gridMove 25s linear infinite; }

          @keyframes gradientText { 0%{background-position:0%} 100%{background-position:200%} }
          .animate-gradient-text { background-size:200% auto; animation: gradientText 6s linear infinite; }
        `}</style>
      </section>

      {/* Cards */}
   <section className="flex justify-center gap-10 flex-wrap pb-24">
  {articles.map((a, i) => (
    <Link key={i} href={`/learn/${a.slug}`}>
      <Card bg={a.bg}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div>
            <h3>{a.title}</h3>
            <p className="text-sm mt-3 font-normal text-slate-600">{a.desc}</p>
          </div>
        </motion.div>
      </Card>
    </Link>
  ))}
</section>

    </div>
  );
}
