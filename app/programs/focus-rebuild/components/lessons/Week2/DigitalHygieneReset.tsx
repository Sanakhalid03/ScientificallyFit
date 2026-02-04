import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCourse } from '../../../context/CourseContext';
import { 
  BookOpen, 
  Check, 
  Bell, 
  Mail, 
  Trash2, 
  ArrowUpDown, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DigitalRule {
  key: string;
  label: string;
  description: string;
  icon: any;
  enabled: boolean;
  theme: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    glow: string;
  };
}

const defaultRules: DigitalRule[] = [
  { 
    key: 'notifications', 
    label: 'Notification Batching', 
    description: 'Check notifications only 3x per day', 
    icon: Bell, 
    enabled: false, 
    theme: {
      bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-white',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      glow: 'shadow-blue-100'
    }
  },
  { 
    key: 'email', 
    label: 'Email Windows', 
    description: 'Process email only at scheduled times', 
    icon: Mail, 
    enabled: false, 
    theme: {
      bg: 'bg-gradient-to-br from-fuchsia-50 via-pink-50 to-white',
      border: 'border-fuchsia-200',
      iconBg: 'bg-fuchsia-100',
      iconColor: 'text-fuchsia-600',
      glow: 'shadow-fuchsia-100'
    }
  },
  { 
    key: 'apps', 
    label: 'App Reduction', 
    description: 'Delete 3+ time-wasting apps', 
    icon: Trash2, 
    enabled: false, 
    theme: {
      bg: 'bg-gradient-to-br from-orange-50 via-amber-50 to-white',
      border: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      glow: 'shadow-orange-100'
    }
  },
  { 
    key: 'inputOutput', 
    label: 'Input vs Output', 
    description: 'Separate consumption from creation', 
    icon: ArrowUpDown, 
    enabled: false, 
    theme: {
      bg: 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      glow: 'shadow-emerald-100'
    }
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function DigitalHygieneReset() {
  const { markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['2-3'];
  
  const [rules, setRules] = useState<DigitalRule[]>(defaultRules);
  const [deletedApps, setDeletedApps] = useState('');
  const [emailTimes, setEmailTimes] = useState('');

  const toggleRule = (key: string) => {
    setRules(rules.map(rule => 
      rule.key === key ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const enabledCount = rules.filter(r => r.enabled).length;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 bg-white min-h-screen text-slate-800"
    >
      {/* --- Header Section --- */}
      <motion.div variants={itemVariants} className="mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 md:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-slate-600">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Week 2 • Day 3
            </div>
            {/* Fluid Heading: scales between 32px and 56px based on screen size */}
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-black text-slate-900 tracking-tight leading-[1.1] md:leading-[0.9]">
              Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Hygiene</span> Reset
            </h1>
            <p className="text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed">
              Clean up your digital environment. Establish sustainable rules to protect your most valuable asset: <strong className="text-slate-800">your attention.</strong>
            </p>
          </div>
          
          {/* Progress Circle - Hidden on very small screens, responsive size */}
          <div className="hidden sm:flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100 self-start md:self-center">
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="4" fill="none" className="text-slate-200" />
                <circle cx="50%" cy="50%" r="40%" stroke="currentColor" strokeWidth="4" fill="none" 
                  className="text-indigo-600 transition-all duration-1000 ease-out" 
                  strokeDasharray="100 100"
                  strokeDashoffset={100 - (enabledCount / rules.length) * 100}
                  strokeLinecap="round"
                  pathLength="100"
                />
              </svg>
              <span className="absolute text-base md:text-lg font-bold text-slate-700">{enabledCount}/{rules.length}</span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 mt-2 uppercase tracking-wide">Rules Active</span>
          </div>
        </div>
      </motion.div>

      {/* --- Intro Card --- */}
      <motion.div 
        variants={itemVariants}
        className="mb-10 md:mb-12 relative overflow-hidden rounded-2xl md:rounded-3xl bg-slate-900 text-white p-6 md:p-10 shadow-xl"
      >
        <div className="absolute top-0 right-0 p-24 md:p-32 bg-indigo-500/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
          <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-indigo-300" />
          </div>
          <div className="space-y-3 md:space-y-4 flex-1">
            <h2 className="text-xl md:text-2xl font-bold">The Digital Declutter Philosophy</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
              Every notification is a potential attention leak. Today isn't just about deleting apps; it's about building a fortress around your focus.
            </p>
            <div className="inline-flex items-start gap-3 p-3 md:p-4 rounded-xl bg-indigo-950/50 border border-indigo-500/30">
              <div>
                <h4 className="font-bold text-indigo-100 text-[10px] md:text-xs uppercase tracking-wide mb-1">The Golden Rule</h4>
                <p className="text-indigo-200/80 text-xs md:text-sm">
                  Keep Input apps (consumption) on a tight leash. Give Output apps (creation) the throne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* --- Left Column: Protocols --- */}
        <div className="lg:col-span-7 space-y-5 md:space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              Select Your Protocols
            </h3>
            <span className="hidden sm:block text-xs font-medium text-slate-400">Click to activate</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {rules.map((rule) => {
              const Icon = rule.icon;
              return (
                <motion.button
                  key={rule.key}
                  onClick={() => toggleRule(rule.key)}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full text-left relative group overflow-hidden p-4 md:p-6 rounded-2xl border-2 transition-all duration-300",
                    rule.enabled 
                      ? cn(rule.theme.bg, rule.theme.border, rule.theme.glow, "shadow-md md:shadow-lg") 
                      :cn(rule.theme.bg, rule.theme.border, rule.theme.glow, "shadow-md md:shadow-lg") 
                  )}
                >
                  <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5">
                      <div className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                        rule.enabled ? cn(rule.theme.iconBg, rule.theme.iconColor) : "bg-slate-50 border border-slate-100 text-slate-400"
                      )}>
                        <Icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      
                      <div className="max-w-[180px] sm:max-w-none text-center sm:text-left">
                        <h4 className={cn(
                          "text-base md:text-lg font-bold transition-colors duration-300",
                          rule.enabled ? "text-slate-900" : "text-slate-600"
                        )}>
                          {rule.label}
                        </h4>
                        <p className={cn(
                          "text-xs md:text-sm transition-colors duration-300 line-clamp-2 sm:line-clamp-none",
                          rule.enabled ? "text-slate-600" : "text-slate-400"
                        )}>
                          {rule.description}
                        </p>
                      </div>
                    </div>

                    <div className={cn(
                      "flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      rule.enabled 
                        ? "bg-indigo-600 border-indigo-600 scale-105" 
                        : "bg-transparent border-slate-200 group-hover:border-slate-300"
                    )}>
                      {rule.enabled && <Check className="w-4 h-4 md:w-5 md:h-5 text-white stroke-[3]" />}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* --- Right Column: Action Inputs --- */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-8 space-y-6 md:space-y-8">
            <div className="bg-gradient-to-br from-orange-100 via-amber-100/90 to-white rounded-2xl md:rounded-3xl p-5 md:p-6 border border-slate-200/60 shadow-sm">
              <h3 className="text-base md:text-lg font-bold text-slate-800 mb-5 md:mb-6 flex items-center gap-2">
                <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                Action Plan
              </h3>
              
              <div className="space-y-5 md:space-y-6">
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-semibold text-slate-600 ml-1">Apps to Delete / Hide</label>
                  <div className="relative group">
                    <textarea 
                      value={deletedApps}
                      onChange={(e) => setDeletedApps(e.target.value)}
                      placeholder="e.g., TikTok, Twitter..."
                      className="w-full min-h-[80px] md:min-h-[100px] p-3 md:p-4 text-sm md:text-md rounded-xl bg-white border border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none text-slate-700"
                    />
                    <Trash2 className="absolute top-3 right-3 md:top-4 md:right-4 w-4 h-4 md:w-5 md:h-5 text-slate-200 pointer-events-none group-focus-within:text-indigo-200 transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-semibold text-slate-600 ml-1">Email Check Times</label>
                  <div className="relative group">
                    <textarea 
                      value={emailTimes}
                      onChange={(e) => setEmailTimes(e.target.value)}
                      placeholder="e.g., 10:00 AM, 3:00 PM"
                      className="w-full min-h-[80px] md:min-h-[100px] p-3 md:p-4 text-sm md:text-md rounded-xl bg-white border border-slate-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-500/10 outline-none transition-all resize-none text-slate-700"
                    />
                    <Mail className="absolute top-3 right-3 md:top-4 md:right-4 w-4 h-4 md:w-5 md:h-5 text-slate-200 pointer-events-none group-focus-within:text-fuchsia-200 transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            <motion.div variants={itemVariants}>
              <button
                onClick={() => markDayComplete(2, 3)}
                disabled={isComplete}
                className={cn(
                  "w-full py-4 cursor-pointer md:py-5 rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group relative isolate",
                  isComplete 
                    ? "bg-slate-100 text-slate-400 shadow-none cursor-default border border-slate-200" 
                    : "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-indigo-500/30 active:scale-[0.98]"
                )}
              >
                {!isComplete && (
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                )}

                <AnimatePresence mode="wait">
                  {isComplete ? (
                    <motion.div 
                      key="completed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5 md:w-6 md:h-6" /> Day Complete
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2"
                    >
                      Complete Protocol <ChevronRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              {!isComplete && (
                 <p className="text-center text-[10px] md:text-xs font-medium text-slate-400 mt-3 md:mt-4">
                   Commit to these rules for at least 24 hours.
                 </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}