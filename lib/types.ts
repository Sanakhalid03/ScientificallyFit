// app/programs/focus-rebuild/types.ts
export interface Day {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;
  isLocked: boolean;
}

export interface Week {
  id: number;
  title: string;
  theme: string;
  description: string;
  isLocked: boolean;
  isComplete: boolean;
  days: Day[];
}

export interface AttentionLogEntry { id: string; [key: string]: any; }
export interface DistractionItem { id: string; [key: string]: any; }
export interface FocusScorecard { [key: string]: any; }
export interface ReflectionEntry { [key: string]: any; }

export interface RitualStep { id: string; name: string; duration?: string; icon?: string }
export interface Ritual { start: RitualStep[]; sustain: RitualStep[]; stop: RitualStep[] }