'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Week, AttentionLogEntry, DistractionItem, FocusScorecard, ReflectionEntry, Ritual } from '@/lib/types';

interface CourseState {
  weeks: Week[];
  currentWeek: number;
  currentDay: number;
  attentionLog: AttentionLogEntry[];
  distractions: DistractionItem[];
  focusScorecard: FocusScorecard | null;
  baselineScorecard: FocusScorecard | null;
  reflections: ReflectionEntry | null;
  rituals: Ritual;
  completedDays: Record<string, boolean>;
  distractionChecklist: Record<string, boolean>;
}

interface CourseContextType extends CourseState {
  markDayComplete: (weekId: number, dayId: number) => void;
  setCurrentView: (weekId: number, dayId: number) => void;
  addAttentionLogEntry: (entry: AttentionLogEntry) => void;
  updateAttentionLogEntry: (id: string, entry: Partial<AttentionLogEntry>) => void;
  deleteAttentionLogEntry: (id: string) => void; // Added fix
  addDistraction: (item: DistractionItem) => void;
  updateDistraction: (id: string, updates: Partial<DistractionItem>) => void;
  saveFocusScorecard: (scorecard: FocusScorecard) => void;
  saveBaselineScorecard: (scorecard: FocusScorecard) => void;
  saveReflections: (reflections: ReflectionEntry) => void;
  updateDistractionChecklist: (key: string, value: boolean) => void;
  saveRituals: (rituals: Ritual) => void;
  unlockNextWeek: () => void;
  getOverallProgress: () => number;
  getWeekProgress: (weekId: number) => number;
}

const initialWeeks: Week[] = [
  {
    id: 1,
    title: "Week 1",
    theme: "Attention Audit & Foundation Reset",
    description: "Awareness before control. This week you'll discover your attention patterns and build the foundation for deep focus.",
    isLocked: false,
    isComplete: false,
    days: [
      { id: 1, title: "Attention Awareness", description: "Track your attention leaks and discover patterns", isComplete: false, isLocked: false },
      { id: 2, title: "Distraction Heatmap", description: "Categorize and visualize your distractions", isComplete: false, isLocked: false },
      { id: 3, title: "Baseline Focus Test", description: "Measure your current focus capacity", isComplete: false, isLocked: false },
      { id: 4, title: "Distraction Removal Sprint", description: "Remove your top distractions", isComplete: false, isLocked: false },
      { id: 5, title: "Single-Task Training", description: "Rebuild your mono-tasking ability", isComplete: false, isLocked: false },
      { id: 6, title: "Reflection & Pattern Review", description: "Identify patterns and leverage points", isComplete: false, isLocked: false },
      { id: 7, title: "Foundation Reset Ritual", description: "Lock in your progress and set intentions", isComplete: false, isLocked: false },
    ]
  },
  {
    id: 2,
    title: "Week 2",
    theme: "Environmental & Digital Architecture",
    description: "Make focus the default. Design your environment and digital spaces to support deep work automatically.",
    isLocked: true,
    isComplete: false,
    days: [
      { id: 1, title: "Focus Environment Audit", description: "Assess your physical workspace", isComplete: false, isLocked: true },
      { id: 2, title: "Workspace Redesign Sprint", description: "Transform your work environment", isComplete: false, isLocked: true },
      { id: 3, title: "Digital Hygiene Reset", description: "Clean up your digital life", isComplete: false, isLocked: true },
      { id: 4, title: "Focus Ritual Design", description: "Create your personal focus rituals", isComplete: false, isLocked: true },
      { id: 5, title: "60-Min Deep Work Training", description: "Extend your focus capacity", isComplete: false, isLocked: true },
      { id: 6, title: "Friction Removal & Automation", description: "Eliminate remaining friction", isComplete: false, isLocked: true },
      { id: 7, title: "Environment Lock-In", description: "Finalize your focus architecture", isComplete: false, isLocked: true },
    ]
  }
];

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CourseState>({
    weeks: initialWeeks,
    currentWeek: 1,
    currentDay: 0,
    attentionLog: [],
    distractions: [],
    focusScorecard: null,
    baselineScorecard: null,
    reflections: null,
    rituals: { start: [], sustain: [], stop: [] },
    completedDays: {},
    distractionChecklist: {},
  });

  const markDayComplete = (weekId: number, dayId: number) => {
    setState(prev => {
      const key = `${weekId}-${dayId}`;
      const newCompletedDays = { ...prev.completedDays, [key]: true };
      
      const newWeeks = prev.weeks.map(week => {
        if (week.id === weekId) {
          const newDays = week.days.map(day => 
            day.id === dayId ? { ...day, isComplete: true } : day
          );
          const allComplete = newDays.every(d => d.isComplete);
          return { ...week, days: newDays, isComplete: allComplete };
        }
        return week;
      });
      
      return { ...prev, weeks: newWeeks, completedDays: newCompletedDays };
    });
  };

  const setCurrentView = (weekId: number, dayId: number) => {
    setState(prev => ({ ...prev, currentWeek: weekId, currentDay: dayId }));
  };

  const addAttentionLogEntry = (entry: AttentionLogEntry) => {
    setState(prev => ({
      ...prev,
      attentionLog: [...prev.attentionLog, entry]
    }));
  };

  const updateAttentionLogEntry = (id: string, updates: Partial<AttentionLogEntry>) => {
    setState(prev => ({
      ...prev,
      attentionLog: prev.attentionLog.map(entry =>
        entry.id === id ? { ...entry, ...updates } : entry
      )
    }));
  };

  // Added logic for the deletion fix
  const deleteAttentionLogEntry = (id: string) => {
    setState(prev => ({
      ...prev,
      attentionLog: prev.attentionLog.filter(entry => entry.id !== id)
    }));
  };

  const addDistraction = (item: DistractionItem) => {
    setState(prev => ({
      ...prev,
      distractions: [...prev.distractions, item]
    }));
  };

  const updateDistraction = (id: string, updates: Partial<DistractionItem>) => {
    setState(prev => ({
      ...prev,
      distractions: prev.distractions.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const saveFocusScorecard = (scorecard: FocusScorecard) => {
    setState(prev => ({ ...prev, focusScorecard: scorecard }));
  };

  const saveBaselineScorecard = (scorecard: FocusScorecard) => {
    setState(prev => ({ ...prev, baselineScorecard: scorecard }));
  };

  const saveReflections = (reflections: ReflectionEntry) => {
    setState(prev => ({ ...prev, reflections }));
  };

  const updateDistractionChecklist = (key: string, value: boolean) => {
    setState(prev => ({
      ...prev,
      distractionChecklist: { ...prev.distractionChecklist, [key]: value }
    }));
  };

  const saveRituals = (rituals: Ritual) => {
    setState(prev => ({ ...prev, rituals }));
  };

  const unlockNextWeek = () => {
    setState(prev => {
      const newWeeks = prev.weeks.map((week, index) => {
        if (index === 1 && prev.weeks[0].isComplete) {
          return {
            ...week,
            isLocked: false,
            days: week.days.map(day => ({ ...day, isLocked: false }))
          };
        }
        return week;
      });
      return { ...prev, weeks: newWeeks };
    });
  };

  const getOverallProgress = () => {
    const totalDays = state.weeks.reduce((acc, week) => acc + week.days.length, 0);
    const completedCount = Object.keys(state.completedDays).length;
    return totalDays === 0 ? 0 : Math.round((completedCount / totalDays) * 100);
  };

  const getWeekProgress = (weekId: number) => {
    const week = state.weeks.find(w => w.id === weekId);
    if (!week) return 0;
    const completedDaysCount = week.days.filter(d => d.isComplete).length;
    return Math.round((completedDaysCount / week.days.length) * 100);
  };

  return (
    <CourseContext.Provider value={{
      ...state,
      markDayComplete,
      setCurrentView,
      addAttentionLogEntry,
      updateAttentionLogEntry,
      deleteAttentionLogEntry, // Provided in context value
      addDistraction,
      updateDistraction,
      saveFocusScorecard,
      saveBaselineScorecard,
      saveReflections,
      updateDistractionChecklist,
      saveRituals,
      unlockNextWeek,
      getOverallProgress,
      getWeekProgress,
    }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}