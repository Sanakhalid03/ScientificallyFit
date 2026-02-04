import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  BookOpen, 
  Target, 
  GripVertical, 
  CheckCircle2, 
  Zap, 
  ShieldAlert, 
  Clock, 
  Coffee,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCourse } from '../../context/CourseContext';
import { DistractionItem } from '@/lib/types';

// --- Configuration ---
const categories = ['digital', 'physical', 'mental', 'social'] as const;

const quadrants = [
  { 
    id: 'eliminate', 
    label: 'Eliminate', 
    description: 'High frequency, High damage', 
    color: 'bg-gradient-to-br from-rose-100/95 via-white/40 to-orange-100/95', 
    border: 'border-rose-200/60', 
    dotColor: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]',
    text: 'text-rose-900',
    iconColor: 'text-rose-600',
    iconBg: 'bg-rose-100',
    icon: <ShieldAlert className="w-5 h-5" />
  },
  { 
    id: 'reduce', 
    label: 'Reduce', 
    description: 'High frequency, Low damage', 
    color: 'bg-gradient-to-br from-amber-100/95 via-white/40 to-yellow-100/95', 
    border: 'border-amber-200/60', 
    dotColor: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]',
    text: 'text-amber-900',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    icon: <Clock className="w-5 h-5" />
  },
  { 
    id: 'contain', 
    label: 'Contain', 
    description: 'Low frequency, High damage', 
    color: 'bg-gradient-to-br from-indigo-100/95 via-white/40 to-blue-100/95', 
    border: 'border-indigo-200/60', 
    dotColor: 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]',
    text: 'text-indigo-900',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    icon: <Zap className="w-5 h-5" />
  },
  { 
    id: 'ignore', 
    label: 'Ignore', 
    description: 'Low frequency, Low damage', 
    color: 'bg-gradient-to-br from-slate-100/95 via-white/40 to-gray-100/95', 
    border: 'border-slate-200/60', 
    dotColor: 'bg-slate-400',
    text: 'text-slate-800',
    iconColor: 'text-slate-600',
    iconBg: 'bg-slate-100',
    icon: <Coffee className="w-5 h-5" />
  },
] as const;

// --- Sub-Components ---

const FancySelect = ({ 
  label, 
  value, 
  options, 
  onChange 
}: { 
  label: string; 
  value: string; 
  options: readonly string[]; 
  onChange: (val: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-1.5 relative w-full" ref={containerRef}>
      <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider whitespace-nowrap">
        {label}
      </label>
      <motion.button
        type="button"
        whileHover={{ backgroundColor: "rgba(248, 250, 252, 1)" }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-white border rounded-xl px-3 py-2.5 text-[11px] sm:text-xs font-medium flex items-center justify-between transition-all duration-200 outline-none gap-2",
          isOpen ? "border-indigo-300 ring-2 ring-indigo-50" : "border-slate-200 hover:border-indigo-200"
        )}
      >
        <span className="capitalize text-slate-700 leading-none text-left truncate">
          {value}
        </span>
        <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0", isOpen && "rotate-180")} />
      </motion.button>

      <div className="absolute left-0 right-0 z-[100]">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.95 }}
              animate={{ opacity: 1, y: 4, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.95 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              className="min-w-full w-full max-h-60 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-2xl"
            >
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "px-4 py-2.5 text-xs font-medium cursor-pointer capitalize flex items-center justify-between gap-4 transition-colors",
                    value === opt ? "text-indigo-600 bg-indigo-50/50" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <span className="whitespace-nowrap">{opt}</span>
                  {value === opt && <CheckCircle2 className="w-3 h-3 text-indigo-500 shrink-0" />}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Main Component ---

export function DistractionHeatmap() {
  const { distractions, addDistraction, updateDistraction, markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['1-2'];
  
  const [newDistraction, setNewDistraction] = useState({
    name: '',
    category: 'digital' as DistractionItem['category'],
    frequency: 'medium' as DistractionItem['frequency'],
    damage: 'medium' as DistractionItem['damage'],
  });

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleAddDistraction = () => {
    if (newDistraction.name) {
      addDistraction({
        ...newDistraction,
        id: Date.now().toString(),
      });
      setNewDistraction({
        name: '',
        category: 'digital',
        frequency: 'medium',
        damage: 'medium',
      });
    }
  };

  const handleDrop = (quadrant: DistractionItem['quadrant']) => {
    if (draggedItem) {
      updateDistraction(draggedItem, { quadrant });
      setDraggedItem(null);
    }
  };

  const getQuadrantItems = (quadrantId: string) => 
    distractions.filter(d => d.quadrant === quadrantId);

  const unassignedItems = distractions.filter(d => !d.quadrant);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-12 min-h-screen font-sans selection:bg-indigo-100 overflow-x-hidden">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes borderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-border-flow {
          background-size: 200% 200%;
          animation: borderRotate 7s linear infinite;
        }
      `}} />

      {/* Lesson Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 md:mb-16 relative z-10"
      >
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-20 hidden lg:block" />
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-white border border-indigo-100 text-indigo-600 text-[10px] sm:text-xs font-bold rounded-full tracking-wider uppercase shadow-sm">
            Week 1 • Day 2
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-4">
          Distraction <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Heatmap</span>
        </h1>
        <p className="text-base sm:text-xl text-slate-500 max-w-2xl leading-relaxed">
          The first step to focus is awareness. Map your triggers to see which 20% of distractions cause 80% of your friction.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start mb-12">
        
        {/* Left Column: Config & Form */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8 order-2 lg:order-1">
          
          <motion.div 
            whileHover={{ y: -4 }}
            className="relative p-[2px] rounded-[30px] overflow-hidden shadow-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-border-flow"
          >
            <div className="relative bg-white/95 backdrop-blur-xl p-5 sm:p-8 rounded-[28px] h-full shadow-inner">
              <div className="flex items-center gap-4 mb-4 md:mb-6">
                <div className="p-2.5 bg-indigo-50 rounded-2xl text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-lg md:text-xl font-extrabold text-slate-800 tracking-tight">The 80/20 Strategy</h2>
              </div>
              <p className="text-slate-600 mb-6 md:mb-8 text-sm leading-relaxed font-medium">
                Prioritize your energy by targeting <span className="text-indigo-600 font-bold">high-damage</span> distractions first.
              </p>
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                {quadrants.map((q) => (
                  <div key={q.id} className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-tight">
                    <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", q.dotColor)} />
                    <span className="truncate">{q.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="bg-white border border-slate-100 p-5 sm:p-6 rounded-3xl shadow-sm overflow-visible relative z-30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2.5 bg-amber-50 rounded-2xl text-amber-600">
                <Target className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Identify Distraction</h2>
            </div>

            <div className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-wider">Name</label>
                <input
                  type="text"
                  placeholder="e.g., Infinite Scrolling"
                  value={newDistraction.name}
                  onChange={(e) => setNewDistraction({ ...newDistraction, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all outline-none text-slate-700 shadow-sm text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
                 <FancySelect 
                    label="Category" 
                    value={newDistraction.category} 
                    options={categories}
                    onChange={(v) => setNewDistraction({...newDistraction, category: v as any})}
                 />
                 <FancySelect 
                    label="Frequency" 
                    value={newDistraction.frequency} 
                    options={['low', 'medium', 'high']}
                    onChange={(v) => setNewDistraction({...newDistraction, frequency: v as any})}
                 />
                 <FancySelect 
                    label="Damage" 
                    value={newDistraction.damage} 
                    options={['low', 'medium', 'high']}
                    onChange={(v) => setNewDistraction({...newDistraction, damage: v as any})}
                 />
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddDistraction} 
                className="w-full py-3.5 cursor-pointer bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 mt-4"
              >
                <Plus className="w-4 h-4" />
                Add to List
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Column: Heatmap & Pending */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8 order-1 lg:order-2">
          
          <AnimatePresence>
            {unassignedItems.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 sm:p-6 bg-white border-2 border-dashed border-indigo-100 rounded-3xl">
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2 tracking-wider">
                    <GripVertical className="w-3 h-3" />
                    Pending Assignment ({unassignedItems.length})
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {unassignedItems.map(item => (
                      <motion.div
                        key={item.id}
                        layoutId={item.id}
                        draggable
                        onDragStart={() => setDraggedItem(item.id)}
                        onDragEnd={() => setDraggedItem(null)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-3.5 py-2 bg-white border border-slate-200 rounded-full shadow-sm cursor-grab active:cursor-grabbing flex items-center gap-2.5 group select-none hover:border-indigo-300 transition-all"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-slate-700">{item.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-50 rounded-full text-slate-500 uppercase font-bold border border-slate-100">
                          {item.category}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {quadrants.map((quadrant) => (
              <div
                key={quadrant.id}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(quadrant.id as DistractionItem['quadrant']);
                }}
                className={cn(
                  "p-5 md:p-6 rounded-[28px] min-h-[180px] sm:min-h-[240px] transition-all duration-300 border-2 relative overflow-hidden flex flex-col",
                  quadrant.border,
                  quadrant.color
                )}
              >
                <div className="flex items-center justify-between mb-5 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-xl shadow-sm bg-white shrink-0", quadrant.iconColor)}>
                      {React.cloneElement(quadrant.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4 md:w-5 md:h-5" })}
                    </div>
                    <div>
                        <h4 className={cn("font-bold text-base md:text-lg leading-none", quadrant.text)}>{quadrant.label}</h4>
                        <p className="text-[9px] md:text-[10px] font-semibold uppercase tracking-wide opacity-70 mt-1 text-slate-800">{quadrant.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2.5 relative z-10 flex-grow">
                  <AnimatePresence mode="popLayout">
                    {getQuadrantItems(quadrant.id).map(item => (
                      <motion.div
                        key={item.id}
                        layoutId={item.id}
                        draggable
                        onDragStart={() => setDraggedItem(item.id)}
                        className="flex items-center gap-3 p-3 bg-white/70 backdrop-blur-md rounded-xl shadow-sm border border-white/40 text-sm font-bold text-slate-800 cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {getQuadrantItems(quadrant.id).length === 0 && (
                    <div className="h-full min-h-[80px] border-2 border-dashed border-black/5 rounded-xl flex items-center justify-center">
                        <span className="text-[10px] font-bold text-black/20 uppercase tracking-tight">Drop items</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Action Section - Now at the end of the scroll flow */}
      <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-200">
        <div className="flex items-center gap-4 text-slate-500 w-full sm:w-auto">
           <div className={cn(
               "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors",
               isComplete ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 border border-slate-100 text-slate-300"
           )}>
             <CheckCircle2 className="w-6 h-6" />
           </div>
           <div>
             <p className="text-sm font-bold text-slate-900">{isComplete ? 'Day Accomplished' : 'Ready to wrap up?'}</p>
             <p className="text-xs opacity-70">Your progress is being synced</p>
           </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => markDayComplete(1, 2)}
          disabled={isComplete}
          className={cn(
            "w-full sm:w-auto cursor-pointer px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg text-base",
            isComplete 
              ? "bg-emerald-50 text-emerald-600 cursor-not-allowed border border-emerald-100 shadow-none" 
              : "bg-slate-900 text-white hover:bg-slate-800"
          )}
        >
          {isComplete ? 'Completed' : 'Complete Lesson'}
        </motion.button>
      </div>
    </div>
  );
}