import { useState } from 'react';
import { useCourse } from '../../../context/CourseContext';
import { BookOpen, Check, Lock, PartyPopper, Zap, ShieldCheck } from 'lucide-react';

// 1. Define the shape of your state
interface WorksheetData {
  automatic: string;
  friction: string;
  rules: string;
}

// 2. Define the structure for your fields to satisfy the index signature
interface FieldConfig {
  id: keyof WorksheetData; 
  label: string;
  sub: string;
  placeholder: string;
  color: string;
}

export function EnvironmentLockIn() {
  const { markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['2-7'];
  
  // 3. Apply the interface to useState
  const [worksheet, setWorksheet] = useState<WorksheetData>({
    automatic: '',
    friction: '',
    rules: '',
  });

  const handleComplete = () => {
    markDayComplete(2, 7);
  };

  const cardStyle = "group transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/50 bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-6 lg:p-8 mb-8";

  // 4. Move fields into a typed array
  const fields: FieldConfig[] = [
    { 
      id: 'automatic', 
      label: 'What now works automatically?', 
      sub: 'Habits that no longer require willpower.',
      placeholder: 'e.g., Phone in the other room, morning desk prep...',
      color: 'focus-within:ring-teal-400'
    },
    { 
      id: 'friction', 
      label: 'What still causes friction?', 
      sub: 'Points of resistance that need more optimization.',
      placeholder: 'e.g., Tab switching, noise in the afternoon...',
      color: 'focus-within:ring-rose-400'
    },
    { 
      id: 'rules', 
      label: 'Locked-in non-negotiables', 
      sub: 'Rules you will never break during deep work.',
      placeholder: 'e.g., No Slack before 11 AM, "Do Not Disturb" on...',
      color: 'focus-within:ring-indigo-400'
    }
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-rose-50 px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-600 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase">
              Final Milestone
            </span>
            <div className="h-px w-12 bg-indigo-200" />
            <span className="text-indigo-400 font-medium text-xs sm:text-sm md:text-base">Week 2 • Day 7</span>
          </div>
          
          {/* Responsive Header: min 1.75rem, max 2.5rem (Standard Desktop Size) */}
          <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-extrabold tracking-tight text-indigo-950 mb-4 leading-tight">
            Environment <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">Lock-In</span>
          </h1>
          <p className="text-[clamp(0.9rem,2vw,1.1rem)] text-indigo-800/70 max-w-2xl leading-relaxed">
            Your focus architecture is almost complete. Let's cement your progress and turn your workspace into a high-performance sanctuary.
          </p>
        </header>

        {/* Content Section */}
        <div className={`${cardStyle} bg-gradient-to-br from-white/80 to-indigo-50/50`}>
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 md:gap-6">
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-400 flex items-center justify-center shadow-lg shadow-indigo-200">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-indigo-950 mb-3">Lock-In What Works</h2>
              <p className="text-indigo-800/80 leading-relaxed text-sm md:text-base">
                Week 2 focused on the physical and digital friction that stalls your progress. 
                By now, you've experimented with new boundaries. This session is about 
                <span className="font-semibold text-indigo-600"> making the ephemeral permanent.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Worksheet Section */}
        <section className={`${cardStyle} relative overflow-hidden`}>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-100">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-indigo-950">Architecture Review</h2>
                <p className="text-[10px] sm:text-xs md:text-sm text-indigo-500 font-medium">Reflect and solidify your systems</p>
              </div>
            </div>

            <div className="space-y-8">
              {fields.map((field) => (
                <div key={field.id} className="group/field">
                  <label className="text-sm md:text-base font-bold text-indigo-900 block mb-1">
                    {field.label}
                  </label>
                  <p className="text-[10px] sm:text-xs md:text-sm text-indigo-400 mb-3 font-medium">{field.sub}</p>
                  <textarea
                    value={worksheet[field.id]}
                    onChange={(e) => setWorksheet({ ...worksheet, [field.id]: e.target.value })}
                    placeholder={field.placeholder}
                    className={`w-full p-4 rounded-2xl bg-white/50 border border-indigo-100 text-sm md:text-base text-indigo-900 placeholder:text-indigo-300 focus:outline-none focus:ring-4 transition-all min-h-[120px] resize-none ${field.color}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Summary */}
        <div className="relative group transition-transform duration-500 hover:scale-[1.01] mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 via-teal-400 to-violet-400 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 text-center border border-white">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3 group-hover:rotate-6 transition-transform">
              <PartyPopper className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
            
            <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-indigo-950 mb-4">Week 2 Accomplished!</h3>
            <p className="text-sm md:text-base text-indigo-800/70 mb-10 max-w-lg mx-auto leading-relaxed">
              You've successfully transitioned from a passive worker to an active 
              <span className="text-indigo-600 font-semibold"> Environment Architect</span>.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {[
                { label: 'Workspace', val: 'Optimized', icon: ShieldCheck },
                { label: 'Focus Time', val: '60m+', icon: Zap },
                { label: 'Rituals', val: 'Locked', icon: Check }
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex flex-col items-center">
                  <stat.icon className="w-5 h-5 text-indigo-500 mb-2" />
                  <div className="text-base md:text-lg font-bold text-indigo-900 leading-tight">{stat.val}</div>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-indigo-400 mt-1 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center md:justify-end pb-12">
          <button
            onClick={handleComplete}
            disabled={isComplete}
            className={`
              relative group flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg transition-all duration-300
              ${isComplete 
                ? 'bg-emerald-100 text-emerald-600 cursor-default' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 active:scale-95'}
            `}
          >
            {isComplete ? (
              <>
                <Check className="w-5 h-5 md:w-6 md:h-6 stroke-[3px]" />
                <span>Week 2 Verified</span>
              </>
            ) : (
              <>
                <span>Complete Week 2</span>
                <PartyPopper className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-pulse" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}