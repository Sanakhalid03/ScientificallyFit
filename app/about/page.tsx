"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

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
    desc: "All programs are designed with research from neuroscience, psychology, and physiology.",
    gradientFrom: "#6366f1",
    gradientTo: "#06b6d4",
  },
  {
    title: "Trusted Expertise",
    desc: "Developed by leading practitioners and verified by clinical studies.",
    gradientFrom: "#f472b6",
    gradientTo: "#fb923c",
  },
  {
    title: "Global Reach",
    desc: "Helping thousands of users optimize performance worldwide.",
    gradientFrom: "#22c55e",
    gradientTo: "#14b8a6",
  },
  {
    title: "Innovative Insights",
    desc: "Combining cutting-edge tools with actionable feedback loops.",
    gradientFrom: "#a855f7",
    gradientTo: "#f43f5e",
  },
];

/* -------- FIXED MISSION CARD (NO DOM LEAK) -------- */

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

/* ---------------- PAGE ---------------- */

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-cyan-50 via-white to-indigo-50 min-h-screen overflow-hidden">

      {/* HERO */}
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

      {/* MISSION */}
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

      {/* WHY TRUST US — UNCHANGED */}
      <section className="py-28 px-6">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-900">
          Why Trust Us?
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {credibilityCards.map(({ title, desc, gradientFrom, gradientTo }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group relative w-[280px] h-[380px] transition-all duration-500 cursor-pointer"
            >
              {/* SAME SKEW DESIGN */}
              <span
                className="absolute top-0 left-[40px] w-1/2 h-full rounded-lg transform skew-x-[12deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-70px)]"
                style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
              />
              <span
                className="absolute top-0 left-[40px] w-1/2 h-full rounded-lg transform skew-x-[12deg] blur-[28px] transition-all duration-500 group-hover:skew-x-0 group-hover:left-[15px] group-hover:w-[calc(100%-70px)]"
                style={{ background: `linear-gradient(315deg, ${gradientFrom}, ${gradientTo})` }}
              />

              {/* SAME BLOBS */}
              <span className="pointer-events-none absolute inset-0 z-10">
                <span className="absolute top-0 left-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.08)] backdrop-blur-[8px] shadow-[0_5px_15px_rgba(0,0,0,0.06)] transition-all duration-100 animate-blob group-hover:top-[-50px] group-hover:left-[40px] group-hover:w-[90px] group-hover:h-[90px] group-hover:opacity-100" />
                <span className="absolute bottom-0 right-0 w-0 h-0 rounded-lg opacity-0 bg-[rgba(255,255,255,0.08)] backdrop-blur-[8px] shadow-[0_5px_15px_rgba(0,0,0,0.06)] transition-all duration-500 animate-blob animation-delay-1000 group-hover:bottom-[-50px] group-hover:right-[40px] group-hover:w-[90px] group-hover:h-[90px] group-hover:opacity-100" />
              </span>

              {/* SAME CONTENT */}
              <div className="relative z-20 left-0 p-[20px_30px] bg-[rgba(255,255,255,0.06)] backdrop-blur-[12px] shadow-lg rounded-lg text-white transition-all duration-500 group-hover:left-[-20px] group-hover:p-[50px_30px]">
                <h3 className="text-xl mb-2 font-bold">{title}</h3>
                <p className="text-sm leading-relaxed">{desc}</p>
               
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA unchanged */}
      <section className="py-24 bg-gradient-to-r from-cyan-50 via-white to-indigo-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center px-6"
        >
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 mb-4">
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
