import React, { useState, useEffect } from 'react';
import { useCourse } from '../../context/CourseContext';
import { Check, Play, Pause, RotateCcw, Timer, Brain, Trophy, Target, ShieldAlert, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface SessionReflection {
  session: number;
  focus: string;
  distractions: string;
  notes: string;
  timestamp: string;
}

export function SingleTaskTraining() {
  const { markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['1-5'];

  const TOTAL_TIME = 15 * 60;
  const [currentSession, setCurrentSession] = useState(1);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState<SessionReflection[]>([]);
  const [currentReflection, setCurrentReflection] = useState({ focus: '', distractions: '', notes: '' });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveReflection = () => {
    if (currentReflection.focus) {
      const newSession = {
        ...currentReflection,
        session: currentSession,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions([newSession, ...sessions]);
      setCurrentReflection({ focus: '', distractions: '', notes: '' });
      if (currentSession < 3) {
        setCurrentSession(currentSession + 1);
        setTimeLeft(TOTAL_TIME);
      }
    }
  };

  const protocols = [
    {
      icon: <Target className="w-5 h-5 text-indigo-500" />,
      title: "The 3x15 Rule",
      desc: "Complete 3 distinct 15-minute sessions. Quality over quantity.",
      gradient: "from-indigo-100/40 to-blue-100/40"
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
      title: "Zero Switching",
      desc: "If you switch tabs or tasks, the session is void. Stay locked.",
      gradient: "from-rose-100/40 to-orange-100/40"
    },
    {
      icon: <ListChecks className="w-5 h-5 text-teal-500" />,
      title: "Active Reflection",
      desc: "Note distractions immediately after to identify focus leaks.",
      gradient: "from-teal-100/40 to-emerald-100/40"
    }
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-12 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block */}
        <header className="mb-8 lg:mb-10 text-center md:text-left">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <span className="bg-white/80 backdrop-blur-md border border-indigo-100 px-3 py-1 rounded-full text-indigo-600 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm">
              Week 1 • Session 05
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-rose-500 mb-3 leading-tight">
            Single-Task Training
          </motion.h1>
          <p className="text-gray-500 text-sm md:text-base lg:text-lg font-medium max-w-2xl mx-auto md:mx-0">
            Multitasking is a myth. Every switch has a cognitive cost. Rebuild your ability to stay with one thing.
          </p>
        </header>

        {/* PROTOCOL CARDS SECTION */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {protocols.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn("bg-gradient-to-br p-5 lg:p-6 rounded-3xl border border-white backdrop-blur-md shadow-sm hover:shadow-md transition-all group", p.gradient)}
            >
              <div className="bg-white/80 p-2.5 rounded-xl w-fit mb-3 shadow-sm group-hover:scale-110 transition-transform">
                {p.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-sm lg:text-base mb-1">{p.title}</h3>
              <p className="text-xs lg:text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10">
          
          {/* LEFT: Timer & Input */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div className="relative overflow-hidden bg-gradient-to-br from-white/60 to-indigo-100 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-10 border border-white shadow-[0_20px_50px_rgba(79,70,229,0.06)] flex flex-col items-center">
              
              <div className="relative w-full max-w-[220px] lg:max-w-[260px] aspect-square mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                  <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-indigo-50/50" />
                  <motion.circle
                    cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent"
                    strokeDasharray="754"
                    initial={{ strokeDashoffset: 754 }}
                    animate={{ strokeDashoffset: 754 - (754 * (timeLeft / TOTAL_TIME)) }}
                    className="text-indigo-500 transition-all duration-1000 ease-linear"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-black tabular-nums tracking-tight text-indigo-900">{formatTime(timeLeft)}</span>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-1">Focusing...</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 w-full max-w-md">
                <button onClick={() => setIsRunning(!isRunning)} className={cn("flex-1 min-w-[160px] px-6 py-3.5 cursor-pointer rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg text-sm", isRunning ? "bg-rose-100 text-rose-600 shadow-rose-200/50" : "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-indigo-200/50")}>
                  {isRunning ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  <span className="whitespace-nowrap uppercase tracking-wider ">{isRunning ? 'Pause' : 'Begin'}</span>
                </button>
                <button onClick={() => { setIsRunning(false); setTimeLeft(TOTAL_TIME); }} className="p-3.5 cursor-pointer rounded-xl bg-white border border-indigo-50 text-indigo-400 hover:text-indigo-600 shadow-sm transition-colors"><RotateCcw className="w-5 h-5" /></button>
              </div>
            </motion.div>

            <AnimatePresence>
              {(timeLeft === 0 || sessions.length < currentSession) && sessions.length < 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-gradient-to-br from-white/80 to-teal-50/90 backdrop-blur-xl rounded-[2rem] p-6 lg:p-8 border border-white shadow-xl">
                  <div className="flex flex-col  md:flex-row items-center gap-3 mb-6 ">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 text-white shadow-lg shadow-teal-100"><Brain className="w-5 h-5" /></div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-800 text-center md:text-start">Session {currentSession} Reflection</h3>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">Focus Target</label>
                      <input type="text" value={currentReflection.focus} onChange={(e) => setCurrentReflection({ ...currentReflection, focus: e.target.value })} placeholder="e.g., Deep coding session" className="w-full px-5 py-3 rounded-xl bg-white/50 border border-indigo-50 focus:bg-white transition-all outline-none text-sm lg:text-base shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-1">Distractions</label>
                      <input type="text" value={currentReflection.distractions} onChange={(e) => setCurrentReflection({ ...currentReflection, distractions: e.target.value })} placeholder="Any urges to multitask?" className="w-full px-5 py-3 rounded-xl bg-white/50 border border-rose-50 focus:bg-white transition-all outline-none text-sm lg:text-base shadow-sm" />
                    </div>
                    <button onClick={handleSaveReflection} disabled={!currentReflection.focus} className="w-full py-4 rounded-xl bg-gray-900 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all cursor-pointer disabled:opacity-20 active:scale-[0.98]">Save & Continue</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: History & Progress */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-white/80 to-rose-100 backdrop-blur-lg rounded-[2rem] p-6 lg:p-8 border border-white shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-black text-gray-500 uppercase tracking-widest text-[10px]">Day Progress</h3>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex-1 h-2.5 rounded-full bg-white/80 overflow-hidden border border-indigo-50">
                      <motion.div animate={{ width: sessions.length >= i ? '100%' : i === currentSession ? '40%' : '0%' }} className={cn("h-full transition-all duration-1000", sessions.length >= i ? "bg-gradient-to-r from-teal-400 to-emerald-400" : "bg-indigo-200 animate-pulse")} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-tighter px-2">Focus Activity Log</h3>
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {sessions.length === 0 && (
                    <motion.div className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-3xl border border-dashed border-indigo-100">
                      <p className="text-indigo-300 font-medium italic text-xs">Your sessions will appear here...</p>
                    </motion.div>
                  )}
                  {sessions.map((s) => (
                    <motion.div key={s.session} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-fuchsia-50/90 to-purple-50/90 p-5 rounded-2xl border border-white shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xs font-black border border-indigo-100">{s.session}</div>
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm lg:text-base leading-tight">{s.focus}</h4>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase mt-0.5">{s.timestamp}</p>
                          </div>
                        </div>
                        <Check className="text-emerald-500 w-4 h-4 shrink-0" />
                      </div>
                      {s.distractions && (
                        <div className="mt-3 pt-3 border-t border-indigo-50/50">
                          <p className="text-[9px] font-black text-rose-300 uppercase mb-1">Distractions:</p>
                          <p className="text-xs text-gray-500">{s.distractions}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* FINAL COMPLETE BUTTON SECTION */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full flex justify-center pb-8">
          <button 
            onClick={() => markDayComplete(1, 5)} 
            disabled={isComplete || sessions.length < 3} 
            className={cn(
              "w-full md:w-2/3 cursor-pointer py-5 md:py-6 rounded-2xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all duration-500 text-[10px] md:text-xs shadow-xl active:scale-[0.98]",
              isComplete 
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-teal-100" 
                : sessions.length >= 3 
                  ? "bg-gradient-to-r from-indigo-600 to-violet-700 text-white hover:scale-[1.01] shadow-indigo-200" 
                  : "bg-white/60 text-gray-300 border border-gray-100 cursor-not-allowed opacity-50"
            )}
          >
            {isComplete ? (
              <span className="flex items-center justify-center gap-2"><Check className="w-4 h-4" /> Day Complete</span>
            ) : (
              "Mark Day Complete"
            )}
          </button>
        </motion.div>
      </div>
      <style>{`.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; } .scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}