import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourse } from '../../context/CourseContext';
import { 
  BookOpen, Target, Check, Bell, Smartphone, 
  Layout, Eye, Shield, ChevronRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const checklistItems = [
  { key: 'notifications', label: 'Notifications off', description: 'Disable all non-essential notifications', icon: Bell, color: 'bg-rose-100 text-rose-600' },
  { key: 'phone', label: 'Phone out of room', description: 'Physical distance creates mental clarity', icon: Smartphone, color: 'bg-indigo-100 text-indigo-600' },
  { key: 'tabs', label: 'Tabs reduced', description: 'Close all unnecessary browser tabs', icon: Layout, color: 'bg-violet-100 text-violet-600' },
  { key: 'clutter', label: 'Visual clutter removed', description: 'Clear your desk and screen', icon: Eye, color: 'bg-amber-100 text-amber-600' },
  { key: 'boundary', label: 'Boundary set', description: 'Communicate focus time to others', icon: Shield, color: 'bg-teal-100 text-teal-600' },
];

export function DistractionRemovalSprint() {
  const { distractionChecklist, updateDistractionChecklist, markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['1-4'];
  
  const completedCount = Object.values(distractionChecklist).filter(Boolean).length;
  const progress = Math.round((completedCount / checklistItems.length) * 100);

  const containerVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-violet-50 to-rose-50 p-4 md:p-6 lg:p-8">
      <motion.div 
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header Section - Refined Padding */}
        <header className="relative p-6 md:p-8 lg:p-10 rounded-[2rem] bg-gradient-to-br from-indigo-100/40 via-white/40 to-rose-100/40 backdrop-blur-xl border border-white/60 shadow-2xl shadow-indigo-100 overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-[10px] font-bold tracking-wider uppercase">
                Week 1
              </span>
              <span className="text-indigo-600 font-semibold tracking-tight text-xs">Day 4</span>
            </div>
            
            {/* Clamped Heading - prevents "too big" feeling on lg/xl */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-indigo-950 mb-3 tracking-tight leading-tight">
              Distraction <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-rose-500">Removal Sprint</span>
            </h1>
            
            <p className="text-sm md:text-base lg:text-lg text-indigo-800/70 max-w-xl leading-relaxed">
              Cleanse your environment. By adding friction to your biggest attention leaks, 
              you reclaim focus automatically.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column */}
          <div className="xl:col-span-7 space-y-6">
            <section className="p-5 md:p-6 lg:p-8 rounded-3xl bg-white/60 border border-white/80 shadow-xl shadow-indigo-50">
              <div className="flex items-center gap-4 mb-4 lg:mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-indigo-900">Friction Creates Focus</h2>
              </div>
              
              <div className="space-y-4 text-indigo-900/80">
                <p className="leading-relaxed text-sm lg:text-base">
                  The easiest way to avoid distractions is to make them <b>harder to access</b>. 
                  Every click added to a distraction is a moment your brain can choose focus.
                </p>
                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/50 italic text-indigo-700 text-sm lg:text-base font-medium">
                  "Instead of trying to change everything, focus on the top 3 digital leaks today."
                </div>
              </div>
            </section>

            <section className="p-5 md:p-6 lg:p-8 rounded-3xl bg-white/60 border border-white/80 shadow-xl shadow-indigo-50">
              <div className="flex items-center gap-4 mb-4 lg:mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-200 flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-indigo-900">Today's Protocol</h2>
              </div>
              
              <div className="space-y-3">
                {[
                  { t: 'Digital Purge', d: 'Remove top 3 digital distractions', c: 'bg-indigo-50' },
                  { t: 'Physical Space', d: 'Clear 1 visual clutter item', c: 'bg-rose-50' },
                  { t: 'The Boundary', d: 'Signal your focus time clearly', c: 'bg-violet-50' }
                ].map((task, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 5 }}
                    className={cn("flex flex-col sm:flex-row items-center sm:items-center gap-3 p-4 rounded-2xl border border-white transition-colors text-center sm:text-left", task.c)}
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-indigo-600 shadow-sm text-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-bold text-indigo-900 leading-none mb-1 text-sm lg:text-base">{task.t}</p>
                      <p className="text-xs text-indigo-600/70 font-medium">{task.d}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Setup Sprint */}
          <div className="xl:col-span-5">
            <div className="xl:sticky xl:top-8 p-6 md:p-8 rounded-[2.5rem] bg-white/80 backdrop-blur-2xl border border-white shadow-2xl shadow-indigo-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg lg:text-xl xl:text-2xl font-bold text-indigo-950">Setup Sprint</h2>
                  <p className="text-indigo-500 font-bold text-[10px] md:text-xs uppercase tracking-wider">Environment Shielding</p>
                </div>
                <div className="text-right">
                  <motion.div 
                    key={progress}
                    initial={{ scale: 1.2, color: '#6366f1' }}
                    animate={{ scale: 1, color: '#4338ca' }}
                    className="text-2xl lg:text-3xl xl:text-4xl font-black italic"
                  >
                    {progress}%
                  </motion.div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-indigo-100 rounded-full mb-6 overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-400 rounded-full"
                />
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {checklistItems.map((item) => {
                    const Icon = item.icon;
                    const isChecked = distractionChecklist[item.key];
                    
                    return (
                      <motion.button
                        key={item.key}
                        variants={itemVars}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateDistractionChecklist(item.key, !isChecked)}
                        className={cn(
                          "w-full cursor-pointer flex flex-col sm:flex-row items-center gap-3 p-3 md:p-4 rounded-xl transition-all duration-300 text-center sm:text-left border-2",
                          isChecked 
                            ? "bg-teal-50 border-teal-200" 
                            : "bg-white/50 border-transparent hover:border-indigo-100 hover:bg-white"
                        )}
                      >
                        <div className={cn(
                          "w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all duration-500 flex-shrink-0 shadow-sm",
                          isChecked ? "bg-teal-500 text-white rotate-[360deg]" : item.color
                        )}>
                          {isChecked ? <Check className="w-5 h-5" strokeWidth={3} /> : <Icon className="w-4 h-4 md:w-5 md:h-5" />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            "font-bold transition-all text-xs md:text-sm lg:text-base leading-tight",
                            isChecked ? "text-teal-700 line-through opacity-60" : "text-indigo-900"
                          )}>
                            {item.label}
                          </p>
                          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tight mt-1 sm:mt-0">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className={cn("hidden sm:block w-3 h-3 transition-transform", isChecked ? "text-teal-300 rotate-90" : "text-indigo-200")} />
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => markDayComplete(1, 4)}
                disabled={isComplete}
                className={cn(
                  "w-full mt-6 py-4 rounded-xl cursor-pointer font-bold text-xs lg:text-base flex items-center justify-center gap-3 transition-all shadow-xl",
                  isComplete 
                    ? "bg-teal-500 text-white cursor-not-allowed" 
                    : "bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 text-white"
                )}
              >
                {isComplete ? <><Check className="w-5 h-5" /> Day Complete</> : "Mark Day as Complete"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}