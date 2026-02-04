import { useState } from 'react';
import { useCourse } from '../../../context/CourseContext';
import { 
  BookOpen, Check, Play, Pause, Square, 
  Plus, Trash2, GripVertical, Sparkles, 
  Clock, Save 
} from 'lucide-react';
import { cn } from '@/lib/utils';

type RitualStep = { id: string; name: string; duration?: string; icon?: string };

const defaultStartRituals: RitualStep[] = [
  { id: '1', name: 'Clear desk', duration: '30s', icon: '🧹' },
  { id: '2', name: 'Set intention', duration: '1min', icon: '🎯' },
];

const defaultSustainRituals: RitualStep[] = [
  { id: '1', name: 'Deep breath', duration: '10s', icon: '🌬️' },
];

const defaultStopRituals: RitualStep[] = [
  { id: '1', name: 'Note progress', duration: '30s', icon: '📝' },
  { id: '2', name: 'Clear workspace', duration: '1min', icon: '✨' },
];

export function FocusRitualDesign() {
  const { markDayComplete, completedDays, saveRituals, rituals: savedRituals } = useCourse();
  const isComplete = completedDays['2-4'];
  
  const [startRituals, setStartRituals] = useState<RitualStep[]>(savedRituals?.start?.length ? savedRituals.start : defaultStartRituals);
  const [sustainRituals, setSustainRituals] = useState<RitualStep[]>(savedRituals?.sustain?.length ? savedRituals.sustain : defaultSustainRituals);
  const [stopRituals, setStopRituals] = useState<RitualStep[]>(savedRituals?.stop?.length ? savedRituals.stop : defaultStopRituals);

  const [newStep, setNewStep] = useState({ name: '', duration: '', category: 'start' as 'start' | 'sustain' | 'stop' });

  const addStep = () => {
    if (!newStep.name) return;
    const step: RitualStep = {
      id: Date.now().toString(),
      name: newStep.name,
      duration: newStep.duration || '1m',
      icon: '⚡',
    };

    if (newStep.category === 'start') setStartRituals([...startRituals, step]);
    else if (newStep.category === 'sustain') setSustainRituals([...sustainRituals, step]);
    else setStopRituals([...stopRituals, step]);

    setNewStep({ ...newStep, name: '', duration: '' });
  };

  const removeStep = (category: string, id: string) => {
    if (category === 'start') setStartRituals(startRituals.filter(s => s.id !== id));
    else if (category === 'sustain') setSustainRituals(sustainRituals.filter(s => s.id !== id));
    else setStopRituals(stopRituals.filter(s => s.id !== id));
  };

  const renderRitualList = (title: string, icon: React.ReactNode, rituals: RitualStep[], category: string, accentClass: string, gradientBg: string) => (
    <div className={cn("flex flex-col h-full border rounded-2xl overflow-hidden transition-all hover:shadow-lg", accentClass, gradientBg)}>
      <div className="p-4 border-b bg-white/40 dark:bg-black/20 backdrop-blur-md flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="p-1.5 rounded-lg bg-background shadow-sm">{icon}</div>
          <h3 className="font-bold text-sm uppercase tracking-wider text-foreground/80">{title}</h3>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-background/50 border">
          {rituals.length} STEPS
        </span>
      </div>
      
      <div className="p-3 space-y-2 flex-1">
        {rituals.map(step => (
          <div key={step.id} className="group flex items-center gap-3 p-3 bg-background/60 backdrop-blur-sm border rounded-xl transition-all hover:border-primary/30 shadow-sm">
            <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab shrink-0" />
            <span className="hidden md:block text-xl shrink-0 leading-none">{step.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground ">{step.name}</p>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase font-medium">
                <Clock className="w-3 h-3" /> {step.duration}
              </div>
            </div>
            <button 
              onClick={() => removeStep(category, step.id)}
              className="p-2 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {rituals.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 opacity-40">
            <Sparkles className="w-8 h-8 mb-2" />
            <p className="text-xs font-medium">Empty slot</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <header className="mb-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest">Week 2</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Day 4</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight bg-gradient-to-br from-foreground via-foreground/80 to-primary bg-clip-text text-transparent">
          Focus <span className='text-purple-500'> Ritual</span> Design
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Stop relying on willpower. Design the triggers that bridge the gap between "distracted" and "deep focus."
        </p>
      </header>

      {/* Main Builder Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {renderRitualList("Pre-Focus", <Play className="w-4 h-4 text-emerald-500" />, startRituals, 'start', "border-t-4 border-t-emerald-500", "bg-gradient-to-b from-emerald-500/5 to-transparent")}
        {renderRitualList("In-Focus", <Pause className="w-4 h-4 text-amber-500" />, sustainRituals, 'sustain', "border-t-4 border-t-amber-500", "bg-gradient-to-b from-amber-500/5 to-transparent")}
        {renderRitualList("Post-Focus", <Square className="w-4 h-4 text-rose-500" />, stopRituals, 'stop', "border-t-4 border-t-rose-500", "bg-gradient-to-b from-rose-500/5 to-transparent")}
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 gap-6">
        <div className="lg:col-span-8 bg-gradient-to-br from-card to-muted/30 border rounded-2xl p-6 shadow-sm">
          <h3 className="flex items-center gap-2 font-bold text-foreground mb-6">
            <Plus className="w-5 h-5 text-primary" />
            New Ritual Step
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block ml-1">What action?</label>
              <input
                type="text"
                value={newStep.name}
                onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
                placeholder="e.g. Put phone in drawer"
                className="w-full bg-background/50 border border-muted rounded-xl p-3 text-sm focus:ring-2 ring-primary transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block ml-1">Time</label>
              <input
                type="text"
                value={newStep.duration}
                onChange={(e) => setNewStep({ ...newStep, duration: e.target.value })}
                placeholder="30s / 1m"
                className="w-full bg-background/50 border border-muted rounded-xl p-3 text-sm focus:ring-2 ring-primary transition-all"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block ml-1">Phase</label>
              <select
                value={newStep.category}
                onChange={(e) => setNewStep({ ...newStep, category: e.target.value as any })}
                className="w-full bg-background/50 border border-muted rounded-xl p-3 text-sm focus:ring-2 ring-primary transition-all appearance-none"
              >
                <option value="start">Pre-Focus</option>
                <option value="sustain">In-Focus</option>
                <option value="stop">Post-Focus</option>
              </select>
            </div>
          </div>
          <button 
            onClick={addStep} 
            className="w-full mt-6 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="hidden md:block w-5 h-5" /> Add to Ritual
          </button>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center gap-3">
          <button
            onClick={() => markDayComplete(2, 4)}
            disabled={isComplete}
            className={cn(
              "flex-[2] sm:w-[14rem] text-sm md:text-md md:w-[18rem] lg:w-[20rem] flex flex-col md:flex-row items-center justify-center gap-2 p-4 px-6 rounded-2xl font-bold transition-all shadow-xl",
              isComplete 
                ? "bg-muted text-muted-foreground cursor-not-allowed" 
                : "bg-foreground text-background hover:scale-[1.02] active:scale-95"
            )}
          >
            <Check className={cn("hidden md:block w-8 h-8", isComplete ? "text-muted-foreground" : "text-emerald-500")} />
            {isComplete ? "DAY COMPLETE" : "COMPLETE LESSON"}
          </button>
        </div>
      </div>
    </div>
  );
}