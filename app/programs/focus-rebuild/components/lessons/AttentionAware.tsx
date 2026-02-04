'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Check, BookOpen, Target, AlertCircle, Zap, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCourse } from '../../context/CourseContext'; 
import { AttentionLogEntry } from '@/lib/types';

export function AttentionAwareness() {
  const { 
    attentionLog, 
    addAttentionLogEntry, 
    deleteAttentionLogEntry, 
    markDayComplete, 
    completedDays 
  } = useCourse();

  const isComplete = completedDays['1-1'];
  const hasLoggedEntries = attentionLog.length > 0;
  const canComplete = hasLoggedEntries && !isComplete;

  const [newEntry, setNewEntry] = useState<Partial<AttentionLogEntry>>({
    time: '', activity: '', interruption: '', trigger: '', duration: '', notes: ''
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleTimeChange = (value: string) => {
    if (isComplete) return; // Guard clause
    const digits = value.replace(/\D/g, '');
    let formatted = digits;
    if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
    }
    setNewEntry({ ...newEntry, time: formatted });
    if (errors.time) setErrors(prev => ({ ...prev, time: false }));
  };

  const handleNumericChange = (field: keyof AttentionLogEntry, value: string) => {
    if (isComplete) return;
    const numericValue = value.replace(/[^0-9]/g, '');
    setNewEntry({ ...newEntry, [field]: numericValue });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    if (!newEntry.activity) newErrors.activity = true;
    if (!newEntry.interruption) newErrors.interruption = true;
    if (!newEntry.trigger) newErrors.trigger = true;
    if (!newEntry.duration) newErrors.duration = true;

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!newEntry.time || !timeRegex.test(newEntry.time)) {
      newErrors.time = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEntry = () => {
    if (!isComplete && validateForm()) {
      addAttentionLogEntry({
        ...newEntry,
        id: Date.now().toString(),
      } as AttentionLogEntry);
      setNewEntry({ time: '', activity: '', interruption: '', trigger: '', duration: '', notes: '' });
      setErrors({});
    }
  };

  const handleCompleteDay = () => {
    if (canComplete) {
      markDayComplete(1, 1); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-24 px-4 sm:px-6 space-y-8">
      
      {/* 1. HERO HEADER */}
      <header className="relative py-8 md:py-12 px-6 md:px-8 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white shadow-2xl">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[10px] font-bold tracking-widest uppercase border border-indigo-500/30">
              Week 1 • Day 1
            </span>
            {isComplete && (
              <motion.span 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20"
              >
                <Check size={10}/> Day Complete
              </motion.span>
            )}
          </div>
          
          <div>
            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-4">
              Attention <span className="text-indigo-400">Awareness</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-lg max-w-xl">
              Most focus is lost in "micro-leaks." Track your shifts for one day to see the invisible patterns of your distraction.
            </p>
          </div>

          <div className="flex gap-4 md:gap-6 pt-2">
            <div className="bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10 flex-1 md:flex-none md:min-w-[120px]">
              <p className="text-xl md:text-2xl font-black text-indigo-400">{attentionLog.length}</p>
              <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-bold">Leaks Logged</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10 flex-1 md:flex-none md:min-w-[120px]">
              <p className="text-xl md:text-2xl font-black text-emerald-400">{isComplete ? 'Done' : 'Active'}</p>
              <p className="text-[9px] md:text-[10px] text-slate-500 uppercase font-bold">Session Status</p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. EDUCATIONAL CONTEXT */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group relative p-[1px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-indigo-500/20 to-transparent shadow-xl">
          <div className="relative h-full p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-zinc-950">
            <div className="flex items-center gap-4 mb-4 md:mb-5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-indigo-500" />
              </div>
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight">The Science of Awareness</h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Distractions are usually either <span className="text-indigo-500 font-semibold">External</span> or <span className="text-indigo-500 font-semibold">Internal</span>. By logging them, you move the behavior to your conscious mind.
            </p>
          </div>
        </div>

        <div className="group relative p-[1px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-500/20 to-transparent shadow-xl">
          <div className="relative h-full p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-white dark:bg-zinc-950">
            <div className="flex items-center gap-4 mb-4 md:mb-5">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Target className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
              </div>
              <h2 className="text-lg md:text-xl font-extrabold tracking-tight">Today's Protocol</h2>
            </div>
            <ul className="space-y-3">
              {[
                { icon: <Zap size={14} />, text: "Log every task-shift." },
                { icon: <AlertCircle size={14} />, text: "Identify the 'Trigger'." },
                { icon: <Check size={14} />, text: "Don't judge—just record." }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-500">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. THE LOG SHEET - LOCKED DOWN IF COMPLETE */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-[2.5rem] md:rounded-[3rem] blur opacity-10 transition duration-1000"></div>
        <div className="relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-[2.5rem] md:rounded-[3rem] overflow-hidden">
          {isComplete && (
            <div className="absolute inset-0 z-20 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-[2px] flex items-center justify-center">
              <div className="bg-white dark:bg-zinc-900 px-6 py-3 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                <Lock className="text-indigo-500" size={18} />
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-100 uppercase tracking-widest">Entry Locked</span>
              </div>
            </div>
          )}
          
          <div className={cn("grid grid-cols-1 lg:grid-cols-12", isComplete && "opacity-50 pointer-events-none")}>
            <div className="lg:col-span-3 bg-zinc-50 dark:bg-zinc-900/50 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-zinc-800 flex lg:flex-col justify-between items-center lg:items-start">
              <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/40 lg:mb-6">
                  <Plus className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-zinc-800 dark:text-zinc-100">
                  New <br className="hidden lg:block" /> 
                  <span className="text-indigo-600">Entry</span>
                </h2>
              </div>
            </div>

            <div className="lg:col-span-9 p-6 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-indigo-500 ml-1">Current Focus</label>
                    <input
                      disabled={isComplete}
                      type="text"
                      placeholder="Task in progress..."
                      value={newEntry.activity}
                      onChange={(e) => {
                        setNewEntry({ ...newEntry, activity: e.target.value });
                        if(errors.activity) setErrors(prev => ({...prev, activity: false}));
                      }}
                      className={cn(
                        "w-full bg-transparent border-b-2 py-2 outline-none transition-all text-sm font-medium",
                        errors.activity ? "border-rose-500" : "border-zinc-100 dark:border-zinc-800 focus:border-indigo-500"
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Time (HH:MM)</label>
                      <input
                        disabled={isComplete}
                        type="text"
                        placeholder="09:00"
                        maxLength={5}
                        value={newEntry.time}
                        onChange={(e) => handleTimeChange(e.target.value)}
                        className={cn(
                          "w-full bg-zinc-50 dark:bg-zinc-900 rounded-xl px-4 py-3 border outline-none transition-all text-sm font-bold",
                          errors.time ? "border-rose-500/50" : "border-transparent focus:border-indigo-500/30"
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Duration (M)</label>
                      <input
                        disabled={isComplete}
                        type="text"
                        placeholder="5"
                        value={newEntry.duration}
                        onChange={(e) => handleNumericChange('duration', e.target.value)}
                        className={cn(
                          "w-full bg-zinc-50 dark:bg-zinc-900 rounded-xl px-4 py-3 border outline-none transition-all text-sm font-bold",
                          errors.duration ? "border-rose-500/50" : "border-transparent focus:border-indigo-500/30"
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-rose-500 ml-1">Distraction</label>
                    <input
                      disabled={isComplete}
                      type="text"
                      placeholder="What pulled you away?"
                      value={newEntry.interruption}
                      onChange={(e) => {
                        setNewEntry({ ...newEntry, interruption: e.target.value });
                        if(errors.interruption) setErrors(prev => ({...prev, interruption: false}));
                      }}
                      className={cn(
                        "w-full bg-transparent border-b-2 py-2 outline-none transition-all text-sm font-medium",
                        errors.interruption ? "border-rose-500" : "border-zinc-100 dark:border-zinc-800 focus:border-rose-500"
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">The Trigger</label>
                    <select 
                      disabled={isComplete}
                      value={newEntry.trigger}
                      className={cn(
                        "w-full bg-zinc-50 dark:bg-zinc-900 rounded-xl px-4 py-3 border outline-none transition-all text-sm font-bold appearance-none",
                        errors.trigger ? "border-rose-500/50" : "border-transparent focus:border-indigo-500/30"
                      )}
                      onChange={(e) => {
                        setNewEntry({ ...newEntry, trigger: e.target.value });
                        if(errors.trigger) setErrors(prev => ({...prev, trigger: false}));
                      }}
                    >
                      <option value="">Select Trigger</option>
                      <option value="Boredom">Boredom</option>
                      <option value="Notification">Notification</option>
                      <option value="Anxiety">Anxiety</option>
                      <option value="Fatigue">Fatigue</option>
                      <option value="Social">Social</option>
                    </select>
                  </div>
                </div>
              </div>

              {!isComplete && (
                <div className="mt-8 md:mt-10 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-center sm:text-left">
                    {Object.keys(errors).length > 0 ? (
                      <span className="text-[11px] font-bold text-rose-500 flex items-center gap-1">
                        <AlertCircle size={14} /> Correct the fields above.
                      </span>
                    ) : (
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Zap size={14} className="text-amber-500" />
                        <span className="text-[11px] font-medium">Log within 60s of a leak.</span>
                      </div>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddEntry}
                    className="w-full sm:w-auto px-10 py-4 bg-indigo-600 cursor-pointer text-white rounded-2xl font-black text-sm tracking-tight flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/20"
                  >
                    Log Entry
                    <Plus size={16} />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENTRIES LIST - REMOVE DELETE OPTION IF COMPLETE */}
      <div className="mt-8 md:mt-12 space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Captured Leaks</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        </div>

        <AnimatePresence mode="popLayout">
          {attentionLog.length > 0 ? (
            attentionLog.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="group relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-5 md:p-6 bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/50 rounded-2xl md:rounded-[2rem] hover:border-indigo-500/20 transition-all"
              >
                <div className="flex items-center md:flex-col items-start gap-2 min-w-[80px]">
                  <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md">
                    {entry.time}
                  </span>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">HH:MM</span>
                </div>

                <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 w-full">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Intended</p>
                    <p className="font-bold text-zinc-700 dark:text-zinc-200 text-xs md:text-sm truncate">{entry.activity}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-rose-500/60 uppercase tracking-widest">Distraction</p>
                    <p className="font-bold text-rose-500 text-xs md:text-sm truncate">{entry.interruption}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Trigger</p>
                    <p className="italic text-zinc-500 text-xs md:text-sm">"{entry.trigger}"</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Loss</p>
                    <p className="font-bold text-zinc-600 dark:text-zinc-400 text-xs md:text-sm">{entry.duration}m</p>
                  </div>
                </div>

                {!isComplete && (
                  <button
                    onClick={() => deleteAttentionLogEntry?.(entry.id)}
                    className="absolute top-4 right-4 md:static p-2 text-zinc-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 md:py-24 bg-zinc-50 dark:bg-zinc-800/20 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800">
              <Zap className="w-8 h-8 text-zinc-300 mb-4" />
              <p className="text-zinc-400 font-bold text-sm">No leaks recorded yet.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <footer className="flex flex-col items-center gap-6 py-10">
        <div className="text-center space-y-2">
          <h3 className="font-bold text-lg md:text-xl">Finish Daily Audit</h3>
          <p className="text-xs md:text-sm text-zinc-500 max-w-xs md:max-w-md">
            {!hasLoggedEntries 
              ? "You must log at least one distraction leak before completing the day." 
              : isComplete 
                ? "This day is successfully archived."
                : "Ready to finalize? This updates your progress in the sidebar."}
          </p>
        </div>
        
        <motion.button
          onClick={handleCompleteDay}
          disabled={!canComplete}
          whileHover={{ scale: !canComplete ? 1 : 1.02 }}
          whileTap={{ scale: !canComplete ? 1 : 0.98 }}
          className={cn(
            "w-full max-w-sm py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-black text-base md:text-lg flex items-center justify-center gap-3 transition-all",
            isComplete 
              ? "bg-emerald-500/10 text-emerald-500 cursor-not-allowed border border-emerald-500/20" 
              : hasLoggedEntries
                ? "bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 cursor-pointer"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed grayscale"
          )}
        >
          {isComplete ? (
            <><Check size={20} /> Day Completed</>
          ) : !hasLoggedEntries ? (
            <><Lock size={18} /> Add Entry First</>
          ) : (
            "Complete Day 1"
          )}
        </motion.button>
      </footer>
    </div>
  );
}