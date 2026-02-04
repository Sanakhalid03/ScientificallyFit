import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourse } from '../../context/CourseContext';
import { FocusScorecard } from '@/lib/types';
import { 
  ShieldCheck, Activity, Zap, Fingerprint, RefreshCw, 
  Target, CheckCircle2, Ban, BrainCircuit, Dna, 
  ChevronRight, BarChart4, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

const scorecardItems = [
  { key: 'startResistance', label: 'Activation Energy', description: 'Resistance felt when initiating', color: 'from-violet-400 to-indigo-500', icon: Zap },
  { key: 'mindWandering', label: 'Attentional Drift', description: 'Internal distractions/stray thoughts', color: 'from-fuchsia-400 to-purple-500', icon: BrainCircuit },
  { key: 'urgeToSwitch', label: 'Task Friction', description: 'Impulse to switch contexts', color: 'from-pink-400 to-rose-500', icon: Target },
  { key: 'mentalFatigue', label: 'Neural Drain', description: 'Energy depletion during work', color: 'from-orange-300 to-amber-500', icon: Dna },
  { key: 'completion', label: 'Output Velocity', description: 'Ratio of intended vs actual work', color: 'from-emerald-300 to-teal-500', icon: BarChart4 },
] as const;

export function BaselineFocusTest() {
  const { saveBaselineScorecard, baselineScorecard, markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['1-3'];
  
  const [scorecard, setScorecard] = useState<FocusScorecard>(baselineScorecard || {
    startResistance: 3, mindWandering: 3, urgeToSwitch: 3, mentalFatigue: 3, completion: 3,
  });

  const fci = useMemo(() => {
    const adjusted = [6-scorecard.startResistance, 6-scorecard.mindWandering, 6-scorecard.urgeToSwitch, 6-scorecard.mentalFatigue, scorecard.completion];
    return Math.round((adjusted.reduce((a, b) => a + b, 0) / 25) * 100);
  }, [scorecard]);

  return (
    <div className="min-h-screen bg-white py-6 md:py-12 px-4 sm:px-6 selection:bg-violet-200 selection:text-indigo-900 font-sans overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-gradient-to-br from-violet-100/40 to-transparent blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-rose-100/30 to-transparent blur-[80px] md:blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-16 gap-6 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center shadow-xl shadow-violet-100 border border-violet-50">
                <Activity className="text-violet-600 w-7 h-7 md:w-8 md:h-8" />
              </div>
            </div>
            <div>
              <h2 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-violet-400/80 mb-1">System Architecture</h2>
              <p className="font-extrabold text-indigo-950 text-2xl md:text-4xl tracking-tight">Focus <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Baseline</span></p>
            </div>
          </motion.div>
        </header>

        {/* BREAKPOINT ADJUSTMENT: 
            Switches to 1 column at 'xl' (1280px) instead of 'lg' (1024px) 
            to prevent the chart from getting too narrow.
        */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Stats Profile (Graph Card) */}
          <div className="xl:col-span-4 order-1 max-w-2xl mx-auto xl:max-w-none w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="xl:sticky xl:top-8 bg-gradient-to-b from-white via-violet-50/20 to-white p-6 md:p-8 rounded-[2.5rem] border border-violet-100 shadow-2xl shadow-violet-100/40"
            >
              <h3 className="text-[10px] md:text-sm font-black text-indigo-900/60 mb-6 uppercase tracking-widest flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-violet-500" /> Neural Snapshot
              </h3>
              
              <div className="relative h-56 sm:h-72 flex items-center justify-center mb-8 bg-white/60 backdrop-blur-sm rounded-[2rem] border border-violet-50/50 shadow-inner overflow-hidden px-4 sm:px-8">
                <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-[70%] w-full relative z-10">
                  {scorecardItems.map((item, i) => (
                    <div key={i} className="relative w-full h-full flex flex-col justify-end items-center group/bar">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${scorecard[item.key] * 20}%` }}
                        className={cn(
                          "bg-gradient-to-t rounded-full w-full max-w-[32px] sm:max-w-[48px] shadow-lg transition-all duration-1000 ease-out relative",
                          item.color
                        )}
                      >
                        <div className="absolute inset-0 w-full h-full bg-white/20 rounded-full blur-[1px]" />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[11px] font-black text-indigo-600">
                          {scorecard[item.key]}
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-between px-4 py-12 opacity-10 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-[1px] bg-indigo-950" />
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-violet-950 to-indigo-900 text-white shadow-2xl relative overflow-hidden text-center">
                <Activity className="absolute -right-4 -top-4 w-20 h-20 text-white/5 rotate-12" />
                <p className="text-[10px] font-bold uppercase text-violet-300/60 mb-1 tracking-[0.2em]">Efficiency Coefficient</p>
                <span className="text-4xl md:text-5xl font-black tracking-tighter">{fci}%</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Main Content */}
          <div className="xl:col-span-8 space-y-8 order-2">
            
            {/* Mission Briefing Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-white via-indigo-50/20 to-rose-50/20 p-6 md:p-10 rounded-[2.5rem] border border-indigo-100 shadow-sm relative overflow-hidden"
            >
              <h3 className="text-lg md:text-xl font-black text-indigo-950 mb-8 flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm border border-indigo-50">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                Pre-Session Protocol
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="h-[2px] w-4 bg-indigo-200" /> Constraints
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Clock, text: "Fixed 25m Deep Work Window", color: "text-violet-600" },
                      { icon: Target, text: "Zero-Context Switch Environment", color: "text-fuchsia-600" },
                      { icon: Ban, text: "Digital & Physical Distraction Block", color: "text-rose-500" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-50/50 hover:border-indigo-200 transition-colors group">
                        <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110", item.color)} />
                        <p className="text-sm font-bold text-indigo-900/80">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                    <div className="h-[2px] w-4 bg-emerald-200" /> Desired Outcomes
                  </div>
                  <div className="space-y-3">
                    {["Identify Resistance Peaks", "Calibrate Output Speed", "Establish Focus Anchor"].map((text, i) => (
                      <motion.div whileHover={{ x: 5 }} key={i} className="flex items-center gap-3 p-4 bg-white/40 rounded-2xl border border-emerald-50">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm font-bold text-indigo-900/70">{text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Biometric Scaling Card */}
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-violet-100 shadow-2xl shadow-violet-100/20">
              <header className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-2xl font-black text-indigo-950 tracking-tight">Biometric Scaling</h3>
                  <p className="text-sm text-indigo-400 font-medium">Quantify your cognitive performance</p>
                </div>
                <motion.button 
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() => setScorecard({startResistance:3, mindWandering:3, urgeToSwitch:3, mentalFatigue:3, completion:3})} 
                  className="p-3 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.button>
              </header>

              <div className="space-y-10 md:space-y-14">
                {scorecardItems.map((item) => (
                  <div key={item.key} className="group relative">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={cn("flex-shrink-0 p-2.5 rounded-xl bg-gradient-to-br shadow-sm", item.color)}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="space-y-0.5">
                          <label className="text-xs font-black text-indigo-950 uppercase tracking-widest leading-none block">{item.label}</label>
                          <p className="text-xs md:text-sm text-indigo-400 font-medium max-w-sm">{item.description}</p>
                        </div>
                      </div>
                      <span className="hidden sm:block text-4xl font-black text-indigo-100 group-hover:text-indigo-200 transition-colors tabular-nums">{scorecard[item.key]}</span>
                    </div>
                    
                    <div className="relative h-3 bg-indigo-50 rounded-full flex items-center px-1">
                      <motion.div 
                        initial={false}
                        animate={{ width: `${(scorecard[item.key] - 1) * 25}%` }}
                        className={cn("h-1.5 rounded-full transition-all duration-700 bg-gradient-to-r", item.color)}
                      />
                      
                      <div className="absolute inset-0 flex justify-between items-center z-20">
                        {[1, 2, 3, 4, 5].map(v => (
                          <button
                            key={v}
                            onClick={() => setScorecard(s => ({...s, [item.key]: v}))}
                            className={cn(
                              "w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center outline-none group/node",
                              scorecard[item.key] === v 
                                ? "bg-white scale-110 shadow-xl border border-indigo-100" 
                                : "bg-transparent hover:bg-white/60"
                            )}
                          >
                            <div className={cn(
                              "w-3 h-3 rounded-full transition-all",
                              scorecard[item.key] === v ? "bg-gradient-to-br " + item.color : "bg-indigo-200/50"
                            )} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <footer className="mt-16 md:mt-24 border-t border-indigo-50 pt-10">
                <motion.button 
                  whileHover={!isComplete ? { scale: 1.01, y: -2 } : {}}
                  whileTap={!isComplete ? { scale: 0.99 } : {}}
                  onClick={() => { saveBaselineScorecard(scorecard); markDayComplete(1, 3); }}
                  disabled={isComplete}
                  className={cn(
                    "w-full py-6 cursor-pointer rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center gap-3 relative overflow-hidden group",
                    isComplete 
                    ? "bg-emerald-500 text-white shadow-emerald-100 cursor-default" 
                    : "bg-indigo-950 text-white shadow-indigo-200 hover:bg-indigo-900"
                  )}
                >
                  {isComplete ? (
                    <><ShieldCheck className="w-6 h-6" /> Day Complete</>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-indigo-300 group-hover:text-white transition-colors" /> 
                      Mark Day Complete
                      <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </>
                  )}
                </motion.button>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}