"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Activity, Sun } from "lucide-react";

export default function ToolsPreview() {
  return (
    <section className="relative py-36 bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[140px]" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-[140px]" />

      <div className="relative max-w-6xl mx-auto px-6">
   <div className="text-center mb-28">
  <span className="inline-block mb-4 text-xs font-semibold tracking-[0.3em] text-indigo-500 uppercase">
    Tools Preview
  </span>

  <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
    Visualise Your Biology
    <span className="block bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
      In Real Time
    </span>
  </h2>

  <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-slate-600">
    Beautiful, science-driven visualisations that turn stress, focus, and circadian
    rhythms into clear, actionable signals.
  </p>
</div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StressScore />
          <FocusTracker />
          <CircadianTool />
        </div>
      </div>
    </section>
  );
}

/* ================= STRESS SCORE ================= */

function StressScore() {
  return (
    <Card className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-xl">
      <CardHeader className="flex flex-row items-center gap-3">
        <Brain className="text-indigo-500" />
        <CardTitle className="text-slate-800">Stress Score</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full -rotate-90">
            <circle cx="96" cy="96" r="76" stroke="#e5e7eb" strokeWidth="10" fill="none" />
            <circle
              cx="96"
              cy="96"
              r="76"
              stroke="url(#stressGrad)"
              strokeWidth="10"
              fill="none"
              strokeDasharray="477"
              strokeDashoffset="160"
              className="animate-[stressGauge_4s_ease-in-out_infinite]"
            />
            <defs>
              <linearGradient id="stressGrad">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-slate-900">68</span>
            <span className="text-sm text-slate-500">Adaptive Load</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-6 text-center">
          Balance between physiological demand and recovery.
        </p>
      </CardContent>
    </Card>
  );
}

/* ================= FOCUS TRACKER (UPGRADED) ================= */

function FocusTracker() {
  const bars = [55, 70, 60, 85, 65, 90];

  return (
    <Card className="bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow">
      <CardHeader className="flex flex-row items-center gap-3">
        <Activity className="text-emerald-500" />
        <CardTitle className="text-slate-800">Focus Tracker</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative h-48 mt-4">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-t border-slate-200/60" />
            ))}
          </div>

          {/* Bars */}
          <div className="absolute inset-0 flex items-end gap-3 px-2">
            {bars.map((value, i) => (
              <div key={i} className="flex-1 flex items-end">
                <div
                  className="w-full rounded-lg bg-gradient-to-t from-emerald-500 to-cyan-400 animate-[barGrow_1.6s_ease-out_forwards]"
                  style={{
                    height: `${value}%`,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Line Graph */}
          <svg
            viewBox="0 0 300 160"
            className="absolute inset-0 w-full h-full"
          >
            {/* Glow */}
            <path
              d="M20 120 L70 90 L120 105 L170 60 L220 95 L270 50"
              fill="none"
              stroke="rgba(16,185,129,0.35)"
              strokeWidth="8"
              className="animate-[drawLine_2.8s_ease-out_forwards]"
            />

            {/* Main line */}
            <path
              d="M20 120 L70 90 L120 105 L170 60 L220 95 L270 50"
              fill="none"
              stroke="url(#focusGradient)"
              strokeWidth="3"
              className="animate-[drawLine_2.8s_ease-out_forwards]"
            />

            {/* Active pulse point */}
            <circle
              cx="270"
              cy="50"
              r="6"
              fill="#10b981"
              className="animate-pulse"
            />

            <defs>
              <linearGradient id="focusGradient">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Labels */}
        <div className="flex justify-between text-xs text-slate-400 mt-4 px-2">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
        </div>

        <p className="text-xs text-slate-500 mt-5">
          Tracks sustained attention, variability, and recovery patterns.
        </p>
      </CardContent>
    </Card>
  );
}


/* ================= CIRCADIAN TOOL ================= */

function CircadianTool() {
  return (
    <Card className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-xl">
      <CardHeader className="flex flex-row items-center gap-3">
        <Sun className="text-amber-500" />
        <CardTitle className="text-slate-800">Circadian Tool</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative h-40">
          <svg viewBox="0 0 300 120" className="w-full h-full">
            <path
              d="M0 70 Q50 20 100 70 T200 70 T300 70"
              fill="none"
              stroke="url(#circGrad)"
              strokeWidth="4"
              className="animate-[circadianWave_5s_ease-in-out_infinite]"
            />
            <defs>
              <linearGradient id="circGrad">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#fb923c" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Energy rhythm aligned with light exposure and sleep timing.
        </p>
      </CardContent>
    </Card>
  );
}
