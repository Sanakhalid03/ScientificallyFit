import { useState, useEffect } from 'react';
import { useCourse } from '../../../context/CourseContext';
import { FocusScorecard } from '@/lib/types';
import { Check, Play, Pause, RotateCcw, Gauge, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

const scorecardItems = [
  { key: 'startResistance', label: 'Start Friction', desc: 'How hard was it to begin?', color: 'from-rose-400/20 to-orange-400/20', text: 'text-rose-600' },
  { key: 'mindWandering', label: 'Focus Depth', desc: 'Mental stillness vs chatter', color: 'from-violet-400/20 to-fuchsia-400/20', text: 'text-violet-600' },
  { key: 'urgeToSwitch', label: 'Distraction Resistance', desc: 'Urge to check phone/tabs', color: 'from-blue-400/20 to-cyan-400/20', text: 'text-blue-600' },
  { key: 'mentalFatigue', label: 'Energy Level', desc: 'Brain fog vs clarity', color: 'from-emerald-400/20 to-teal-400/20', text: 'text-emerald-600' },
  { key: 'completion', label: 'Output Quality', desc: 'Standard of work produced', color: 'from-amber-400/20 to-yellow-400/20', text: 'text-amber-600' },
] as const;

export function DeepWorkTraining() {
  const { markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['2-5'];
  
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [scorecard, setScorecard] = useState<FocusScorecard>({
    startResistance: 3,
    mindWandering: 3,
    urgeToSwitch: 3,
    mentalFatigue: 3,
    completion: 3,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setSessionComplete(true);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Logic: 0 offset = full circle. 100 offset = empty.
  // We want (timeLeft / totalTime) * 100 to represent the stroke length.
  const remainingPercentage = (timeLeft / 3600) * 100;

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-900">
      <div className="max-w-5xl mx-auto pt-8 md:pt-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        
        {/* Header Section */}
        <header className="mb-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/50 border border-indigo-200 mb-6">
           
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-700 uppercase">
              Phase 02 • Deep Integration
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            60-Minute <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600">Deep Work</span> Training
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
            Push past the 25-minute cognitive barrier to access elite-level flow states.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Protocol Card */}
          <section className="lg:col-span-4 space-y-6">
            <div className="bg-gradient-to-br from-white via-white to-indigo-50/50 backdrop-blur-xl rounded-[2rem] p-6 border border-white shadow-sm hover:shadow-md transition-all duration-500">
              <div className="flex flex-row md:flex-col lg:flex-row items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-indigo-200 shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Mission Protocol</h2>
              </div>
              
              <ul className="space-y-3">
                {[
                  { text: "Initiate Start Ritual", sub: "Clear physical & digital space" },
                  { text: "High-Challenge Task", sub: "Avoid 'busy work' / emails" },
                  { text: "Sustain Ritual", sub: "Breathe if focus wavers" },
                  { text: "Hard Shutdown", sub: "Complete Stop Ritual" }
                ].map((item, i) => (
                  <li key={i} className="group flex  flex-row md:flex-col lg:flex-row items-start gap-4 p-3 rounded-2xl hover:bg-white/50 transition-colors border border-transparent hover:border-indigo-100">
                    <div className="mt-1 h-5 w-5 rounded-full bg-white border-2 border-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600 group-hover:border-indigo-500 transition-colors">
                      {i + 1}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-800 leading-none mb-1">{item.text}</p>
                        <p className="text-xs text-slate-500">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className=" p-6 rounded-[2rem] bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-300 mb-2 relative z-10">Pro Tip</h3>
                <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                    Research shows that deep focus usually hits its peak at the 40-minute mark. Don't quit early.
                </p>
            </div>
          </section>

          {/* Main Timer Card */}
          <section className="lg:col-span-8">
            <div className="relative bg-gradient-to-b from-white via-white/80 to-indigo-50/30 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white shadow-2xl shadow-indigo-100/50 overflow-hidden">
              {/* Animated Glow */}
              <div className={cn(
                "absolute -top-24 -right-24 w-80 h-80 bg-indigo-400/15 rounded-full blur-[100px] transition-opacity duration-1000",
                isRunning && "opacity-100 animate-pulse"
              )} />

              <div className="relative z-10 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-10 bg-white px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                  <div className={cn("w-2 h-2 rounded-full", isRunning ? "bg-emerald-500 animate-pulse" : "bg-slate-300")} />
                  <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                    {isRunning ? 'Flow State Active' : 'Ready for Immersion'}
                  </span>
                </div>

                {/* Main Timer Circle */}
                <div className="relative w-full max-w-[280px] md:max-w-[340px] aspect-square mb-12">
                  <svg className="w-full h-full transform -rotate-90 drop-shadow-md">
                    <circle
                      cx="50%" cy="50%" r="46%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-slate-100/50"
                    />
                    <circle
                      cx="50%" cy="50%" r="46%"
                      fill="none"
                      stroke="url(#timerGradient)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray="100 100"
                      style={{ 
                        // Offset 0 is full circle, 100 is empty.
                        // We subtract the remaining percentage from 100 to get the gap.
                        strokeDashoffset: 100 - remainingPercentage,
                        transition: 'stroke-dashoffset 1s linear'
                      }}
                      pathLength="100"
                    />
                    <defs>
                      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl md:text-5xl font-light text-slate-900 font-mono tracking-tight">
                      {formatTime(timeLeft)}
                    </span>
                    <p className="hidden md:block md:text-xs font-bold text-slate-400 tracking-[0.3em] uppercase mt-2">
                        Time Remaining
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-sm">
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    disabled={sessionComplete}
                    className={cn(
                      "flex-1 group  cursor-pointer w-full relative flex items-center justify-center gap-3 py-4 md:py-5 rounded-2xl font-bold text-base transition-all active:scale-95 shadow-xl",
                      isRunning 
                        ? "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50" 
                        : "bg-slate-900 text-white hover:bg-indigo-950 hover:shadow-indigo-200/50",
                      sessionComplete && "opacity-0 scale-90 pointer-events-none"
                    )}
                  >
                    {isRunning ? <Pause className="hidden md:block w-5 h-5 fill-current" /> : <Play className="hidden md:block w-5 h-5 fill-current" />}
                    {timeLeft === 3600 ? 'Start Session' : isRunning ? 'Pause Flow' : 'Resume Flow'}
                  </button>

                  <button
                    onClick={() => { setIsRunning(false); setTimeLeft(3600); setSessionComplete(false); }}
                    className="p-4 md:p-5 cursor-pointer rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-slate-600 hover:border-indigo-200 transition-all shadow-sm"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Post-Session Scorecard */}
          {sessionComplete && (
            <section className="lg:col-span-12 animate-in zoom-in-95 fade-in duration-700 mt-8">
              <div className="bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-indigo-50">
                      <Gauge className="w-7 h-7 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Focus Scorecard</h2>
                      <p className="text-sm text-slate-500">Self-report your session metrics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                    <Zap className="w-4 h-4" />
                    SESSION ANALYTICS READY
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {scorecardItems.map(item => (
                    <div key={item.key} className="p-1 rounded-2xl bg-gradient-to-b from-white to-transparent">
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <label className="text-sm font-bold text-slate-800 block mb-1">{item.label}</label>
                            <p className="text-[11px] text-slate-400 leading-tight">{item.desc}</p>
                          </div>
                          <span className={cn("text-2xl font-mono font-bold", item.text)}>
                            {scorecard[item.key as keyof FocusScorecard]}
                          </span>
                        </div>
                        
                        <div className="flex justify-between gap-2">
                          {[1, 2, 3, 4, 5].map(val => (
                            <button
                              key={val}
                              onClick={() => setScorecard({ ...scorecard, [item.key]: val })}
                              className={cn(
                                "flex-1 py-3 rounded-xl text-xs font-bold transition-all border",
                                scorecard[item.key as keyof FocusScorecard] === val
                                  ? "bg-slate-900 border-slate-900 text-white shadow-lg scale-105"
                                  : "bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600"
                              )}
                            >
                              {val}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Navigation */}
          <footer className="lg:col-span-12 flex flex-col md:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-slate-200/60">
            <div className="text-slate-400 text-sm font-medium italic">
                {isComplete ? 'Focus session archived successfully.' : 'Metrics help visualize your cognitive evolution.'}
            </div>
            
            <button
              onClick={() => markDayComplete(2, 5)}
              disabled={isComplete || !sessionComplete}
              className={cn(
                "group relative cursor-pointer px-10 py-4 rounded-full font-bold text-sm transition-all shadow-xl w-full md:w-auto overflow-hidden",
                isComplete 
                  ? "bg-emerald-500 text-white cursor-default" 
                  : !sessionComplete 
                    ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 shadow-indigo-200"
              )}
            >
              <div className="flex items-center justify-center gap-2 relative z-10">
                {isComplete ? <Check className="w-5 h-5" /> : <Check className="w-4 h-4" />}
                {isComplete ? "Session Logged" : "Finalize & Save Session"}
              </div>
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}