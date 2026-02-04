import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Target, Check, Gauge, Sparkles, 
  ArrowRight, TrendingUp, TrendingDown, Minus,
  Calendar, Trophy, Zap
} from 'lucide-react';
import { useCourse } from '../../context/CourseContext';
import { FocusScorecard } from '@/lib/types';
import { cn } from '@/lib/utils';

const scorecardItems = [
  { key: 'startResistance', label: 'Start Resistance', lowerIsBetter: true, desc: 'Ease of beginning the session' },
  { key: 'mindWandering', label: 'Mind Wandering', lowerIsBetter: true, desc: 'Frequency of internal thoughts' },
  { key: 'urgeToSwitch', label: 'Urge to Switch', lowerIsBetter: true, desc: 'Desire to check notifications' },
  { key: 'mentalFatigue', label: 'Mental Fatigue', lowerIsBetter: true, desc: 'Tiredness during the work' },
  { key: 'completion', label: 'Completion Quality', lowerIsBetter: false, desc: 'Standard of the final output' },
] as const;

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

export function FoundationResetRitual() {
  const { baselineScorecard, focusScorecard, saveFocusScorecard, markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['1-7'];
  
  const [scorecard, setScorecard] = useState<FocusScorecard>(focusScorecard || {
    startResistance: 3,
    mindWandering: 3,
    urgeToSwitch: 3,
    mentalFatigue: 3,
    completion: 3,
  });

  const [intention, setIntention] = useState('');

  const calculateFCI = (scores: FocusScorecard) => {
    const adjusted = [6 - scores.startResistance, 6 - scores.mindWandering, 6 - scores.urgeToSwitch, 6 - scores.mentalFatigue, scores.completion];
    return Math.round((adjusted.reduce((a, b) => a + b, 0) / 25) * 100);
  };

  const currentFCI = calculateFCI(scorecard);
  const baselineFCI = baselineScorecard ? calculateFCI(baselineScorecard) : null;
  const improvement = baselineFCI ? currentFCI - baselineFCI : null;

  const handleComplete = () => {
    saveFocusScorecard(scorecard);
    markDayComplete(1, 7);
  };

  const getChangeIndicator = (key: string) => {
    if (!baselineScorecard) return null;
    const baseValue = baselineScorecard[key as keyof FocusScorecard];
    const currentValue = scorecard[key as keyof FocusScorecard];
    const item = scorecardItems.find(i => i.key === key);
    if (baseValue === currentValue) return { icon: Minus, color: 'text-slate-400', label: 'Stable' };
    const improved = item?.lowerIsBetter ? currentValue < baseValue : currentValue > baseValue;
    return improved ? { icon: TrendingUp, color: 'text-emerald-600', label: 'Improved' } : { icon: TrendingDown, color: 'text-rose-500', label: 'Declined' };
  };

  return (
    <motion.div initial="initial" animate="animate" variants={containerVariants} className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* 1. Header Section */}
      <motion.div variants={fadeInUp} className="text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-bold tracking-wider uppercase">
            <Calendar className="w-3 h-3" /> Week 1 Final
          </span>
          <span className="text-slate-500 font-semibold italic text-sm">Day 7 Ritual</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Foundation <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Reset Ritual</span>
        </h1>
      </motion.div>

      {/* 2. Closure Card - Soft Blue/Cyan Gradient */}
      <motion.div 
        variants={fadeInUp}
        className="relative overflow-hidden border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-xl bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/80 backdrop-blur-sm"
      >
        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 relative z-10">
          <div className="hidden sm:flex w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 items-center justify-center shadow-lg shadow-blue-200">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Closure Creates Momentum</h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              By consciously closing Week 1, you create a psychological clean slate. This prevents cognitive drag and ensures your new habits stick.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3. Task List Grid - Emerald/Purple/Pink Gradients */}
      <motion.div variants={fadeInUp} className="grid sm:grid-cols-3  gap-4">
        {[
          { icon: Gauge, title: 'Test', desc: 'Final 30m session', grad: 'from-emerald-50 to-teal-50 border-emerald-100' },
          { icon: Trophy, title: 'Compare', desc: 'Analyze delta', grad: 'from-purple-50 to-indigo-50 border-purple-100' },
          { icon: Sparkles, title: 'Intend', desc: 'Week 2 vision', grad: 'from-pink-50 to-rose-50 border-pink-100' }
        ].map((task, i) => (
          <div key={i} className={cn("bg-gradient-to-br border flex flex-col items-center md:text-start p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group", task.grad)}>
            <task.icon className="w-6 h-6  text-slate-700 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-bold text-slate-900">{task.title}</h3>
            <p className="text-xs text-slate-500 font-medium">{task.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* 4. Scorecard Module - Soft Indigo/Violet Gradient */}
      <motion.div 
        variants={fadeInUp}
        className="bg-gradient-to-br from-indigo-100/80 via-white to-violet-100/80 border border-indigo-200 rounded-[2.5rem] p-6 sm:p-10 text-slate-900 shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">Focus Scorecard</h2>
              <p className="text-slate-500 text-sm font-medium">Rate your session: 1 (Poor) to 5 (Masterful)</p>
            </div>
            <div className="px-6 py-3 bg-white border border-indigo-200 rounded-2xl text-center shadow-sm">
              <span className="block text-[10px] uppercase tracking-widest text-indigo-600 font-black">Current FCI</span>
              <span className="text-3xl font-black text-slate-900">{currentFCI}%</span>
            </div>
          </div>

          <div className="space-y-8">
            {scorecardItems.map((item) => {
              const change = getChangeIndicator(item.key);
              return (
                <div key={item.key} className="group">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <label className="text-base font-bold text-slate-800 flex items-center gap-2">
                        {item.label}
                        {change && <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-white border border-current/20 shadow-sm", change.color)}>{change.label}</span>}
                      </label>
                      <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                    </div>
                    <span className="text-2xl font-black text-indigo-600">{scorecard[item.key]}</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(value => (
                      <button
                        key={value}
                        onClick={() => setScorecard({ ...scorecard, [item.key]: value })}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-sm font-black transition-all duration-300",
                          scorecard[item.key] === value
                            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 scale-105"
                            : "bg-white/60 text-slate-400 hover:bg-white border border-indigo-50"
                        )}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* 5. Performance Delta - Teal/Sky Gradient */}
      {baselineFCI !== null && (
        <motion.div 
          variants={fadeInUp} 
          className="bg-gradient-to-br from-teal-50 via-white to-sky-50 border border-teal-100 rounded-[2rem] p-6 sm:p-8"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-6">Performance Delta</h3>
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="flex-1 w-full space-y-4">
               <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${baselineFCI}%` }} className="h-full bg-slate-400" /></div>
               <div className="h-3 w-full bg-blue-100 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${currentFCI}%` }} className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" /></div>
            </div>
            <div className={cn("shrink-0 w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 shadow-inner bg-white font-black", improvement! >= 0 ? "border-emerald-200 text-emerald-600" : "border-rose-200 text-rose-600")}>
              <span className="text-2xl">{improvement! >= 0 ? '+' : ''}{improvement}%</span>
              <span className="text-[10px] uppercase">Growth</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* 6. Intention Input - Amber/Gold Gradient */}
      <motion.div 
        variants={fadeInUp} 
        className="bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-200 rounded-[2.5rem] p-6 sm:p-10 shadow-lg shadow-amber-100/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-200">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Week 2 Architecture Intention</h2>
        </div>
        <textarea
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="In Week 2, I intend to..."
          className="w-full bg-white/80 border border-amber-200 rounded-2xl p-4 sm:p-6 text-slate-800 focus:ring-4 focus:ring-amber-500/10 min-h-[120px] outline-none transition-all placeholder:italic"
        />
      </motion.div>

      {/* 7. Footer - Finalize */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold text-slate-900">Week 1 Reflection Complete?</p>
          <p className="text-xs text-slate-500 font-medium">Finalize to unlock Week 2.</p>
        </div>
        <motion.button
          whileHover={!isComplete ? { scale: 1.05 } : {}}
          whileTap={!isComplete ? { scale: 0.95 } : {}}
          onClick={handleComplete}
          disabled={isComplete}
          className={cn(
            "flex items-center gap-3  cursor-pointer px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl w-full sm:w-auto justify-center",
            isComplete ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-slate-900 text-white hover:bg-blue-600"
          )}
        >
          {isComplete ? <><Check className="w-6 h-6 stroke-[3px]" /> Complete</> : <><ArrowRight className="w-5 h-5 stroke-[3px]" /> Finish Ritual</>}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}