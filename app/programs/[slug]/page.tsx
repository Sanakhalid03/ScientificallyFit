"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Brain,
  Zap,
  Target,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

// ── Programs data ──
export const programs = [
  {
    slug: "focus-rebuild",
    title: "Focus Rebuild",
    subtitle: "Restore mental clarity and rebuild sustained attention.",
    description:
      "Systematic protocol to eliminate attention fragmentation, rebuild sustained focus, and unlock flow states on demand.",
    category: ["Focus", "All"],
    duration: "7 Weeks",
    level: "Intermediate",
    accent: "from-indigo-400 to-cyan-400",
    heroTagline: "Reclaim your attention in a world designed to steal it.",
    overview:
      "Modern life fragments attention into thousands of micro-interruptions. Focus Rebuild systematically repairs attentional infrastructure through neuroscience-backed protocols, environmental redesign, and cognitive training — taking you from scattered to laser-focused in 7 structured weeks.",
    whatYouGet: [
      "Deep understanding of attention mechanisms and fragmentation triggers",
      "Custom attention architecture tailored to your lifestyle",
      "Weekly protocols with decreasing cognitive load over time",
      "Flow state training and triggers",
      "Relapse prevention system and maintenance toolkit",
    ],
    weeks: [
      { week: 1, title: "Attention Audit & Foundation Reset", topics: ["Assess attention landscape", "Remove major distractions", "Baseline deep work capacity", "Single-task micro-sessions"] },
      { week: 2, title: "Environmental & Digital Architecture", topics: ["Optimize workspace for focus", "Digital hygiene protocols", "Attention-supportive rituals", "60-min deep work training"] },
      { week: 3, title: "Cognitive Fuel & Energy Management", topics: ["Nutrition for attention", "Light & movement timing", "Ultradian rhythm training", "Pre-focus priming sequences"] },
      { week: 4, title: "Advanced Concentration Training", topics: ["Progressive focus exercises", "Distraction resistance drills", "Dual n-back exercises", "Flow state protocols"] },
      { week: 5, title: "Deep Work Systematization", topics: ["Personal deep work ritual stack", "3–4 hour session frameworks", "Context switching minimization", "Output quality measurement"] },
      { week: 6, title: "Integration & Real-World Application", topics: ["High-stakes focus application", "Interruption handling", "Collaborative focus strategies", "Meeting & communication hygiene"] },
      { week: 7, title: "Ownership & Long-Term Maintenance", topics: ["Lifelong focus OS creation", "Seasonal adaptations", "Relapse detection", "Quarterly review dashboard"] },
    ],
    benefits: [
      { icon: Brain, text: "30–90 min deep focus sessions on demand" },
      { icon: Zap, text: "Reduced mental fatigue & decision fatigue" },
      { icon: Target, text: "Higher quality output in less time" },
      { icon: BarChart3, text: "Measurable improvements in attention metrics" },
    ],
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
    accent: "from-amber-400 to-orange-400",
    heroTagline: "Turn stress into sustainable energy and resilience.",
    overview:
      "Burnout Reset guides you through physiological recovery and stress regulation protocols. You’ll rebuild energy, resilience, and performance capacity through scientifically proven interventions in 8 structured weeks.",
    whatYouGet: [
      "Personalized stress assessment and recovery plan",
      "Daily nervous system regulation exercises",
      "Energy recovery rituals and pacing strategies",
      "Guided meditation and breathing protocols",
      "Relapse prevention for chronic stress patterns",
    ],
    weeks: [
      { week: 1, title: "Stress Baseline & Energy Mapping", topics: ["Identify stress triggers", "Assess energy levels", "Track fatigue patterns", "Set recovery goals"] },
      { week: 2, title: "Nervous System Regulation", topics: ["Breathing exercises", "Heart rate variability training", "Micro-rest protocols", "Mindful resets"] },
      { week: 3, title: "Sleep & Recovery Optimization", topics: ["Align circadian rhythm", "Sleep hygiene routines", "Power nap strategy", "Evening wind-down rituals"] },
      { week: 4, title: "Nutrition & Energy Management", topics: ["Adapt nutrition for recovery", "Hydration strategies", "Micro-nutrient optimization", "Energy boosting routines"] },
      { week: 5, title: "Workload & Life Balance", topics: ["Identify energy drains", "Time blocking for recovery", "Boundary setting techniques", "Priority recalibration"] },
      { week: 6, title: "Resilience Training", topics: ["Cognitive reframing exercises", "Stress inoculation", "Adaptive mindset techniques", "Visualization & goal setting"] },
      { week: 7, title: "Integration & Sustainability", topics: ["Energy maintenance plan", "Relapse detection", "Ongoing stress management strategies", "Quarterly review & adjustments"] },
      { week: 8, title: "Mastery & Autonomy", topics: ["Self-monitoring dashboard", "Independent resilience routines", "Long-term recovery plan", "Continuous performance optimization"] },
    ],
    benefits: [
      { icon: Zap, text: "Reduced chronic stress and anxiety" },
      { icon: Brain, text: "Improved mental clarity and focus" },
      { icon: BarChart3, text: "Increased energy consistency throughout the day" },
      { icon: Target, text: "Greater productivity without burnout" },
    ],
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
    accent: "from-sky-400 to-blue-500",
    heroTagline: "Reclaim deep, restorative sleep for optimal performance.",
    overview:
      "Sleep Reset helps you systematically align your biological clock, improve sleep quality, and enhance daytime energy. Using science-backed interventions, you’ll build a sustainable sleep routine in 6 weeks.",
    whatYouGet: [
      "Personal sleep assessment and chronotype mapping",
      "Guided light exposure and timing protocols",
      "Bedtime rituals for faster sleep onset",
      "Sleep tracking and optimization dashboard",
      "Behavioral adjustments for long-term sleep health",
    ],
    weeks: [
      { week: 1, title: "Sleep Baseline & Chronotype", topics: ["Track sleep patterns", "Identify sleep disruptors", "Determine chronotype", "Set personalized goals"] },
      { week: 2, title: "Light & Environment Optimization", topics: ["Morning light exposure", "Evening light reduction", "Bedroom environment tweaks", "Noise & temperature optimization"] },
      { week: 3, title: "Sleep Rituals & Hygiene", topics: ["Consistent sleep schedule", "Wind-down routines", "Avoid stimulants", "Pre-sleep mindfulness"] },
      { week: 4, title: "Napping & Recovery", topics: ["Effective power nap strategy", "Energy recovery techniques", "Circadian alignment exercises", "Short sleep hacks"] },
      { week: 5, title: "Behavioral Adjustment & Tracking", topics: ["Sleep tracking review", "Iterative adjustments", "Lifestyle alignment", "Energy peak planning"] },
      { week: 6, title: "Integration & Optimization", topics: ["Long-term sleep maintenance plan", "Seasonal adaptation", "Sleep for cognitive performance", "Review & optimization"] },
    ],
    benefits: [
      { icon: Brain, text: "Faster sleep onset and improved REM cycles" },
      { icon: Zap, text: "Daytime energy consistency" },
      { icon: Target, text: "Enhanced cognitive performance" },
      { icon: BarChart3, text: "Better stress recovery through sleep" },
    ],
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
    accent: "from-emerald-400 to-teal-400",
    heroTagline: "Communicate effectively and build stronger connections.",
    overview:
      "Communication Fitness helps you build social intelligence, empathy, and professional influence. Learn practical frameworks to connect, persuade, and collaborate more effectively over 5 intensive weeks.",
    whatYouGet: [
      "Understanding communication styles and emotional intelligence",
      "Conflict resolution and negotiation strategies",
      "Presentation and storytelling skills",
      "Active listening and rapport-building techniques",
      "Practical frameworks for professional and personal conversations",
    ],
    weeks: [
      { week: 1, title: "Foundations of Effective Communication", topics: ["Identify personal communication style", "Understand emotional cues", "Active listening drills", "Baseline empathy exercises"] },
      { week: 2, title: "Conflict & Negotiation", topics: ["Conflict identification", "Negotiation frameworks", "Assertiveness training", "Resolution simulations"] },
      { week: 3, title: "Persuasive Speaking & Storytelling", topics: ["Storytelling frameworks", "Presentation practice", "Persuasive messaging", "Audience engagement"] },
      { week: 4, title: "Professional Relationship Building", topics: ["Networking strategies", "Mentorship techniques", "Feedback delivery", "Collaboration exercises"] },
      { week: 5, title: "Integration & Real-World Application", topics: ["Applied communication scenarios", "Continuous improvement", "Tracking progress", "Creating communication routines"] },
    ],
    benefits: [
      { icon: Brain, text: "Enhanced social and professional influence" },
      { icon: Zap, text: "Stronger rapport in teams and relationships" },
      { icon: Target, text: "Clear, concise, and persuasive communication" },
      { icon: BarChart3, text: "Reduced misunderstandings and conflicts" },
    ],
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
    accent: "from-slate-400 to-zinc-500",
    heroTagline: "Thrive in demanding urban environments without burning out.",
    overview:
      "Urban Survival equips you with strategies to maintain energy, focus, and resilience in demanding urban lifestyles. From physical health to mental agility, you’ll learn actionable techniques to navigate high-pressure environments.",
    whatYouGet: [
      "Physical resilience and energy optimization plans",
      "Urban stress navigation strategies",
      "Environmental hacks for focus and recovery",
      "Emergency preparedness and decision-making frameworks",
      "Long-term habits for sustainable performance",
    ],
    weeks: [
      { week: 1, title: "Baseline Energy & Environment Audit", topics: ["Assess daily energy patterns", "Identify environmental stressors", "Urban living challenges", "Set goals for performance"] },
      { week: 2, title: "Physical Resilience Training", topics: ["Mobility and strength routines", "Nutrition planning", "Recovery protocols", "Cardiovascular endurance"] },
      { week: 3, title: "Stress Navigation & Mindset", topics: ["Mindfulness practices", "Cognitive reframing", "Situational awareness", "Mental resilience exercises"] },
      { week: 4, title: "Productivity & Time Management", topics: ["High-demand scheduling", "Prioritization frameworks", "Focus rituals", "Digital detox strategies"] },
      { week: 5, title: "Urban Environmental Optimization", topics: ["Workspace and commute hacks", "Light and sound optimization", "Ergonomic improvements", "Daily habit integration"] },
      { week: 6, title: "Crisis & Decision Training", topics: ["Rapid decision-making", "Emergency planning", "Problem-solving simulations", "Stress inoculation"] },
      { week: 7, title: "Integration & Long-Term Habits", topics: ["Sustainable lifestyle routines", "Monthly progress tracking", "Preventative health checks", "Community & social support"] },
      { week: 8, title: "Mastery & Autonomy", topics: ["Independent resilience framework", "Seasonal planning", "Energy self-regulation", "Performance review rituals"] },
    ],
    benefits: [
      { icon: Brain, text: "Enhanced cognitive performance under pressure" },
      { icon: Zap, text: "Sustained energy throughout demanding days" },
      { icon: Target, text: "Better focus and decision-making" },
      { icon: BarChart3, text: "Resilience against urban stressors" },
    ],
  },
];


export default function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const program = programs.find((p) => p.slug === slug);

  if (!program) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-x-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-20 w-[900px] h-[900px] bg-cyan-200/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-emerald-200/10 rounded-full blur-3xl" />
      </div>

      <main className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
 <Link
  href="/programs"
  className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800 transition"
>
  <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
  Back to Programs
</Link>

        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-block px-4 sm:px-6 py-2 sm:py-3 mb-4 rounded-full bg-gradient-to-r ${program.accent} text-white font-medium text-sm sm:text-lg`}
          >
            {program.duration} • {program.level}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-950 leading-tight tracking-tight mb-4 sm:mb-6"
          >
            {program.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10"
          >
            {program.heroTagline || program.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed"
          >
            {program.overview}
          </motion.p>
        </div>

        {/* What You Get */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-slate-900">
            What You’ll Get
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {program.whatYouGet.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CheckCircle2 className="text-indigo-500 mb-3 sm:mb-4" size={28} />
                <p className="text-sm sm:text-base md:text-lg text-slate-800">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Weekly Curriculum */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-slate-900">
            {program.weeks.length}-Week Curriculum
          </h2>
          <div className="space-y-6 sm:space-y-10">
            {program.weeks.map((week, i) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white/80 backdrop-blur border border-slate-200 rounded-3xl overflow-hidden shadow-lg"
              >
                <div className={`h-2 bg-gradient-to-r ${program.accent}`} />
                <div className="p-4 sm:p-8">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 flex items-center justify-center text-indigo-600 font-bold text-lg sm:text-2xl shrink-0">
                      {week.week}
                    </div>
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900">{week.title}</h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-4 text-slate-700 text-sm sm:text-base md:text-lg">
                    {week.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3">
                        <Calendar size={18} className="text-indigo-500 mt-1 shrink-0" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Key Benefits */}
        <section className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 text-slate-900">
            Expected Outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {program.benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-center shadow-md hover:shadow-xl transition-all"
                >
                  <Icon size={36} className="mx-auto mb-4 sm:mb-6 text-indigo-600" />
                  <p className="text-sm sm:text-base md:text-lg font-medium text-slate-800">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-4 sm:space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Ready to start {program.title}?
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto opacity-90">
            Take our assessment to see if this program is right for you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-4">
            <Link href="/assessment" className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-700 font-bold text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Start Assessment
            </Link>
         <Link
  href="/programs"
  className="px-6 sm:px-8 py-3 sm:py-4 bg-indigo-700 text-white font-bold text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-700/30 transition-all inline-block text-center"
>
  View All Programs
</Link>

          </div>
        </motion.div>
      </main>
    </div>
  );
}