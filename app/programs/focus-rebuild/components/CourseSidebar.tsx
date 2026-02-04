'use client'
import { useCourse } from '../context/CourseContext';
import { Lock, Check, Zap, Flame, Target, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function CourseSidebar() {
  const { weeks, currentWeek, currentDay, setCurrentView, getWeekProgress } = useCourse();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (weekId: number, dayId: number) => {
    setCurrentView(weekId, dayId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button - Placed at bottom right to avoid navbar overlap */}
      <button
        className="md:hidden fixed bottom-6 right-6 z-[60] p-4 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-500/40 hover:scale-110 transition-transform active:scale-95"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop - Starts below the navbar */}
      {isOpen && (
        <div 
          className="fixed inset-0 top-16 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "flex flex-col bg-[#FDFDFF] dark:bg-[#09090b] border-r border-zinc-200/50 dark:border-zinc-800/50 relative overflow-hidden transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          
          // MOBILE: Starts 64px from top, Height is screen minus 64px
          "fixed top-16 left-0 z-50 w-[85vw] sm:w-80 h-[calc(100dvh-64px)]",
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
          
          // DESKTOP: Also starts 64px down and stays sticky
          "md:translate-x-0 md:sticky md:top-16 md:h-[calc(100vh-64px)] md:w-80 md:shadow-none"
        )}
      >
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[30%] bg-indigo-400/20 blur-[100px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[40%] bg-rose-400/20 blur-[100px] rounded-full" />
        </div>

        {/* Sidebar Header */}
        <div className="p-6 relative z-10">
          <div className="p-4 rounded-3xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white dark:border-zinc-700/30 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Focus Rebuild</h1>
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">Course Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-6 py-4 custom-scrollbar relative z-10">
          {weeks.map((week) => {
            const isWeekActive = currentWeek === week.id;
            const progress = getWeekProgress(week.id);

            return (
              <div key={week.id} className="space-y-2">
                <div className="px-2 flex justify-between items-end">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Module 0{week.id}</span>
                  {!week.isLocked && <span className="text-[10px] font-bold text-indigo-500">{progress}%</span>}
                </div>

                <motion.button
                  whileHover={!week.isLocked ? { y: -2 } : {}}
                  whileTap={!week.isLocked ? { scale: 0.98 } : {}}
                  onClick={() => !week.isLocked && handleSelection(week.id, 0)}
                  className={cn(
                    "w-full cursor-pointer text-left p-4 rounded-2xl transition-all duration-300 relative group",
                    week.isLocked ? "opacity-40 cursor-not-allowed" : "bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200/60 dark:border-zinc-800",
                    isWeekActive && "ring-2 ring-indigo-500/20 border-indigo-500/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors shadow-inner",
                      isWeekActive 
                        ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400" 
                        : "bg-zinc-50 text-zinc-400 dark:bg-zinc-800"
                    )}>
                      {week.isLocked ? <Lock className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 truncate leading-tight">
                        {week.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex -space-x-1">
                          {[1,2,3].map(i => (
                            <div key={i} className="h-1.5 w-1.5 rounded-full bg-zinc-200 dark:bg-zinc-700 border border-white dark:border-zinc-900" />
                          ))}
                        </div>
                        <span className="text-[10px] font-medium text-zinc-400">{week.days.length} Lessons</span>
                      </div>
                    </div>
                  </div>
                </motion.button>

                <AnimatePresence>
                  {isWeekActive && !week.isLocked && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="grid grid-cols-1 gap-1 pl-2"
                    >
                      {week.days.map((day) => {
                        const isActive = currentDay === day.id;
                        return (
                          <button
                            key={day.id}
                            onClick={() => handleSelection(week.id, day.id)}
                            className={cn(
                              "group cursor-pointer relative flex items-center gap-3 p-3 rounded-xl transition-all",
                              isActive 
                                ? "bg-gradient-to-r from-indigo-500/10 to-transparent" 
                                : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                            )}
                          >
                            {isActive && (
                              <motion.div 
                                layoutId="active-indicator"
                                className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full"
                              />
                            )}
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold",
                              day.isComplete 
                                ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                : isActive 
                                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                                  : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
                            )}>
                              {day.isComplete ? <Check className="w-4 h-4" /> : day.id}
                            </div>
                            <span className={cn(
                              "text-xs font-semibold",
                              isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500"
                            )}>
                              Lesson {day.id}
                            </span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>


      </aside>
    </>
  );
}