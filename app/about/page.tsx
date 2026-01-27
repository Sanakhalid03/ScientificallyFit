"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
// Icons for the trust section
import { Microscope, ShieldCheck, Globe, Lightbulb } from "lucide-react";

/* ---------------- DATA ---------------- */

const missionCards = [
  {
    title: "Empower Individuals",
    desc: "Tools to optimize mind, body, and performance.",
    gradientFrom: "#6EE7B7",
    gradientTo: "#3B82F6",
  },
  {
    title: "Integrate Science",
    desc: "Evidence-based techniques across multiple domains.",
    gradientFrom: "#F472B6",
    gradientTo: "#FBBF24",
  },
  {
    title: "Deliver Insights",
    desc: "Actionable feedback for peak human performance.",
    gradientFrom: "#A78BFA",
    gradientTo: "#22D3EE",
  },
];

const credibilityCards = [
  {
    title: "Science-Backed",
    desc: "All programs are designed with research from neuroscience and physiology.",
    gradient: "from-blue-500 to-cyan-400",
    icon: <Microscope className="w-7 h-7" />,
    glow: "group-hover:shadow-blue-200/50",
  },
  {
    title: "Trusted Expertise",
    desc: "Developed by leading practitioners and verified by clinical studies.",
    gradient: "from-emerald-500 to-teal-400",
    icon: <ShieldCheck className="w-7 h-7" />,
    glow: "group-hover:shadow-emerald-200/50",
  },
  {
    title: "Global Reach",
    desc: "Helping thousands of users optimize performance worldwide.",
    gradient: "from-orange-400 to-yellow-400",
    icon: <Globe className="w-7 h-7" />,
    glow: "group-hover:shadow-orange-200/50",
  },
  {
    title: "Innovative Insights",
    desc: "Combining cutting-edge tools with actionable feedback loops.",
    gradient: "from-purple-500 to-pink-400",
    icon: <Lightbulb className="w-7 h-7" />,
    glow: "group-hover:shadow-purple-200/50",
  },
];

/* -------- ORIGINAL MISSION CARD -------- */

const MissionCard = styled.div<{
  $gradientFrom: string;
  $gradientTo: string;
}>`
  width: 220px;
  height: 300px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.5s ease, box-shadow 0.5s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  &::before {
    content: "";
    position: absolute;
    width: 120px;
    height: 150%;
    background-image: linear-gradient(
      180deg,
      ${(p) => p.$gradientFrom},
      ${(p) => p.$gradientTo}
    );
    top: -25%;
    left: -20%;
    animation: rotBGimg 5s linear infinite;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 5px;
    border-radius: 15px;
    background: #ffffff;
  }

  h3 {
    position: relative;
    font-size: 1.5rem;
    font-weight: 700;
    color: #111827;
    text-align: center;
    margin-bottom: 0.5rem;
    z-index: 1;
  }

  p {
    position: relative;
    text-align: center;
    color: #374151;
    font-size: 0.95rem;
    z-index: 1;
  }

  @keyframes rotBGimg {
    to {
      transform: rotate(360deg);
    }
  }
`;

/* ---------------- NEW TRUST CARD COMPONENT ---------------- */

const TrustCard = ({ title, desc, gradient, icon, glow, delay }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1"
    >
      <div className={`text-slate-800 rounded-3xl border border-white/40 bg-white/50 shadow-2xl duration-700 z-10 relative backdrop-blur-xl hover:border-white/60 overflow-hidden ${glow} w-full h-full flex flex-col items-center p-8`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-tr ${gradient} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500`} />
          <div style={{animationDelay: '0.5s'}} className={`absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-tr ${gradient} blur-3xl opacity-10 group-hover:opacity-30 transform group-hover:scale-110 transition-all duration-700 animate-bounce`} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-250%] transition-transform duration-1000" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className={`absolute inset-0 rounded-full border-2 border-slate-200 animate-ping opacity-20`} />
            <div className={`p-5 rounded-2xl backdrop-blur-lg border border-white/50 bg-gradient-to-br ${gradient} shadow-lg text-white transform group-hover:rotate-[360deg] transition-transform duration-1000`}>
              {icon}
            </div>
          </div>
          
          <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
            <p className={`text-2xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
              {title}
            </p>
          </div>
          
          <p className="text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-slate-900 transition-colors">
            {desc}
          </p>

          <div className={`w-1/3 h-1 bg-gradient-to-r ${gradient} rounded-full transform group-hover:w-1/2 transition-all duration-500 opacity-40 group-hover:opacity-100`} />
          
          <div className="flex space-x-2 mt-6 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-tr ${gradient} animate-bounce`} />
            <div style={{animationDelay: '0.1s'}} className={`w-2 h-2 rounded-full bg-gradient-to-tr ${gradient} animate-bounce`} />
            <div style={{animationDelay: '0.2s'}} className={`w-2 h-2 rounded-full bg-gradient-to-tr ${gradient} animate-bounce`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- PAGE ---------------- */

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-cyan-50 via-white to-indigo-50 min-h-screen overflow-hidden">

      {/* HERO - RESTORED */}
      <section className="relative py-36 overflow-hidden">
        <span className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-r from-indigo-400 via-cyan-300 to-emerald-400 rounded-full opacity-30 animate-blob slow-blob" />
        <span className="absolute -bottom-32 -right-20 w-[600px] h-[600px] bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full opacity-20 animate-blob slow-blob animation-delay-2000" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500">
            Unlock Your Full Potential
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-700/90 leading-relaxed">
            Harness the power of science, technology, and actionable insights.
          </p>
        </motion.div>
      </section>

      {/* MISSION - RESTORED */}
      <section className="py-20">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-900">
          Our Mission
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {missionCards.map((card, idx) => (
            <MissionCard
              key={idx}
              $gradientFrom={card.gradientFrom}
              $gradientTo={card.gradientTo}
            >
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </MissionCard>
          ))}
        </div>
      </section>

      {/* WHY TRUST US — UPDATED TO 4 IN A ROW WITH DIFFERENT COLORS & ICONS */}
      <section className="py-28 px-6 max-w-[1400px] mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-slate-900">
          Why Trust Us?
        </h2>

        {/* Grid set to 4 columns on large screens to force one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {credibilityCards.map((card, idx) => (
            <TrustCard 
              key={idx} 
              {...card} 
              delay={idx * 0.2} 
            />
          ))}
        </div>
      </section>

      {/* CTA - RESTORED */}
      <section className="py-24 bg-gradient-to-r from-cyan-50 via-white to-indigo-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 mb-4 leading-[1.1]">
            Join us in advancing human potential
          </h2>
          <p className="text-lg text-slate-700 mb-8">
            Explore our tools, programs, and insights.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 text-white font-semibold shadow-lg hover:shadow-2xl transition-all"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  );
}