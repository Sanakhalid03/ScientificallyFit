import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, Check, Sparkles, ArrowRight, Loader2, Cloud } from 'lucide-react';
import { useCourse } from '../../context/CourseContext';

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

interface FormData {
  attentionThief: string;
  easiestFocus: string;
  systemChange: string;
}

export function ReflectionPatternReview() {
  const { reflections, saveReflections, markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['1-6'];

  const [formData, setFormData] = useState<FormData>({
    attentionThief: reflections?.attentionThief || '',
    easiestFocus: reflections?.easiestFocus || '',
    systemChange: reflections?.systemChange || '',
  });

  const [savingStatus, setSavingStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setSavingStatus('saving');

    const handler = setTimeout(async () => {
      await saveReflections(formData);
      setSavingStatus('saved');
      setLastSavedTime(new Date());
      
      setTimeout(() => setSavingStatus('idle'), 3000);
    }, 1500);

    return () => clearTimeout(handler);
  }, [formData, saveReflections]);

  const handleManualSave = async () => {
    setSavingStatus('saving');
    await saveReflections(formData);
    setSavingStatus('saved');
    setLastSavedTime(new Date());
  };

  const handleComplete = () => {
    saveReflections(formData);
    markDayComplete(1, 6);
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="min-h-screen py-6 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        
        {/* --- Header Section --- */}
        <motion.header variants={fadeInUp} className="mb-8 sm:mb-12 text-center md:text-left relative">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide uppercase bg-blue-600 text-white shadow-lg shadow-blue-200">
              Week 1
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-500 text-sm sm:text-base font-medium italic">Day 6: Deep Review</span>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3 sm:mb-4">
              Reflection & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Pattern Review</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto md:mx-0">
              Success leaves clues. Identify the patterns from your past week to engineer a focused future.
            </p>
          </div>
        </motion.header>

        {/* --- Insight Card --- */}
        <motion.div 
          variants={fadeInUp}
          whileHover={{ y: -4 }}
          className="relative overflow-hidden border border-blue-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl shadow-blue-200/40 mb-8 sm:mb-10 
                     bg-gradient-to-br from-blue-100/60 via-white/80 to-cyan-100/60 backdrop-blur-md" 
        >
          <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-blue-200/40 rounded-full blur-3xl -mr-24 -mt-24 sm:-mr-32 sm:-mt-32 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-300">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">Patterns Create Leverage</h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-5 sm:gap-6 items-center">
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                Small changes in your daily systems create massive results. Find the 20% of habits causing 80% of your distractions.
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-100 shadow-inner">
                <h4 className="font-semibold text-blue-800 text-[10px] sm:text-xs mb-3 flex items-center gap-2 tracking-wider">
                  <Target className="w-3.5 h-3.5" /> FOCUS ON:
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {['Recurring distractions', 'Peak focus times', 'Effective interventions'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-700">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-200 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- Worksheet Form --- */}
        <motion.div variants={fadeInUp} className="space-y-6 sm:space-y-8 mb-8 sm:mb-10">
          {[
            {
              id: 'attentionThief' as keyof FormData,
              label: 'What stole your attention most this week?',
              desc: "Look at your attention logs. What's the #1 culprit?",
              placeholder: 'Social media, meetings, internal anxiety...',
              gradient: 'from-orange-100/70 via-white/90 to-red-50/50',
              border: 'border-orange-100',
              iconColor: 'text-orange-600'
            },
            {
              id: 'easiestFocus' as keyof FormData,
              label: 'When was focus easiest this week?',
              desc: 'Consider environment, time of day, and type of task.',
              placeholder: 'Early mornings in the cafe, deep work blocks...',
              gradient: 'from-emerald-100/70 via-white/90 to-teal-50/50',
              border: 'border-emerald-100',
              iconColor: 'text-emerald-600'
            },
            {
              id: 'systemChange' as keyof FormData,
              label: 'What system change worked best?',
              desc: 'Which specific intervention felt like a "win"?',
              placeholder: 'Phone in another room, Pomodoro timer...',
              gradient: 'from-blue-100/70 via-white/90 to-indigo-50/50',
              border: 'border-blue-100',
              iconColor: 'text-blue-600'
            }
          ].map((field) => (
            <div 
              key={field.id} 
              className={`group flex flex-col border ${field.border} rounded-2xl sm:rounded-[2rem] p-5 sm:p-7 shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-500/10 bg-gradient-to-br ${field.gradient}`}
            >
              <div className="flex justify-between items-start mb-1 gap-2">
                <label className="text-lg sm:text-xl font-bold text-slate-800 group-focus-within:text-blue-700 transition-colors">
                  {field.label}
                </label>
                <Sparkles className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 opacity-0 group-focus-within:opacity-100 transition-opacity ${field.iconColor}`} />
              </div>
              
              <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-5 font-medium italic opacity-80">{field.desc}</p>
              
              <textarea
                value={formData[field.id]}
                onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                placeholder={field.placeholder}
                className="w-full bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-sm sm:text-base text-slate-800 font-medium placeholder:text-slate-400 focus:bg-white focus:border-blue-300 focus:outline-none min-h-[120px] sm:min-h-[160px] transition-all resize-y shadow-sm"
              />
            </div>
          ))}
          
          {/* Status Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 sm:px-4">
            <div className="flex items-center gap-2 text-[10px] sm:text-sm">
                <AnimatePresence mode='wait'>
                    {savingStatus === 'saving' && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-blue-600 font-bold"
                        >
                            <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                            Syncing...
                        </motion.div>
                    )}
                    {savingStatus === 'saved' && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-2 text-emerald-600 font-bold"
                        >
                            <Cloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            Saved {lastSavedTime && `at ${lastSavedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                        </motion.div>
                    )}
                     {savingStatus === 'idle' && (
                        <span className="text-slate-400 font-medium italic text-center sm:text-left">Your progress is auto-saved</span>
                    )}
                </AnimatePresence>
            </div>

            <button 
              onClick={handleManualSave}
              className="text-slate-500 cursor-pointer hover:text-blue-600 text-xs sm:text-sm font-bold underline decoration-2 underline-offset-4 transition-colors"
            >
              Force Save
            </button>
          </div>
        </motion.div>

        {/* --- Footer / Completion --- */}
        <motion.footer 
          variants={fadeInUp}
          className="flex flex-col items-center justify-center pt-6 sm:pt-10 border-t-2 border-slate-100"
        >
          <motion.button
            whileHover={!isComplete ? { scale: 1.02, y: -2 } : {}}
            whileTap={!isComplete ? { scale: 0.98 } : {}}
            onClick={handleComplete}
            disabled={isComplete}
            className={`
              relative flex cursor-pointer items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg transition-all shadow-xl sm:shadow-2xl
              ${isComplete 
                ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed shadow-emerald-100 border border-emerald-200' 
                : 'bg-slate-900 text-white shadow-slate-400 hover:shadow-blue-300 hover:bg-blue-600'
              }
            `}
          >
            {isComplete ? (
              <>
                <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3px]" />
                Week 1 Review Complete
              </>
            ) : (
              <>
                Finalize Day 6
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3px]" />
              </>
            )}
          </motion.button>
        </motion.footer>

      </div>
    </motion.div>
  );
}