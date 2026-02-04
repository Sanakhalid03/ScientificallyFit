import { useState } from 'react';
import { useCourse } from '../../../context/CourseContext';
import { BookOpen, Check, Plus, Trash2, ArrowRight } from 'lucide-react';

interface FrictionItem {
  id: string;
  task: string;
  friction: string;
  fix: string;
  automation: string;
}

export function FrictionRemoval() {
  const { markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['2-6'];

  const [items, setItems] = useState<FrictionItem[]>([
    { id: '1', task: '', friction: '', fix: '', automation: '' }
  ]);

  // ENHANCED: High-end mesh-inspired soft gradients
  const cardGradients = [
    'from-blue-50/80 via-indigo-50/40 to-white',
    'from-violet-50/80 via-purple-50/40 to-white',
    'from-rose-50/80 via-pink-50/40 to-white',
    'from-amber-50/80 via-orange-50/40 to-white',
  ];

  // ENHANCED: Matching accent colors for the glow effect
  const glowColors = [
    'bg-blue-400/20',
    'bg-purple-400/20',
    'bg-rose-400/20',
    'bg-orange-400/20',
  ];

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), task: '', friction: '', fix: '', automation: '' }]);
  };

  const updateItem = (id: string, field: keyof FrictionItem, value: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-8 lg:py-16 selection:bg-indigo-100">
      <div className="max-w-screen-md lg:max-w-4xl xl:max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 lg:mb-14 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] sm:text-xs font-bold tracking-tight border border-indigo-100">
              Week 2 • Day 6
            </span>
          </div>
          <h1 className="text-[clamp(1.875rem,5vw,3rem)] font-black text-slate-900 tracking-tight mb-4 leading-tight">
            Friction <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">Removal</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-xl leading-relaxed">
            Eliminate the invisible taxes on your productivity. Identify, solve, and automate your workflow.
          </p>
        </header>

        {/* Lesson Intro Card */}
        <div className="relative mb-10 lg:mb-16 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] p-6 md:p-10 transition-transform duration-500 hover:scale-[1.005] shadow-2xl shadow-indigo-100/50">
          <div className="absolute inset-0 bg-[#fdfeff]" />
          <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-100/40 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white shadow-sm border border-slate-100">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">The Friction Map Strategy</h2>
            </div>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Every point of friction is a potential failure point. By mapping these out, you move from 
              reacting to your environment to <span className="font-bold text-indigo-600">engineering it.</span>
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              {['Identify', 'Fix', 'Automate'].map((step, i) => (
                <div key={step} className="bg-white/60 backdrop-blur-md border border-white p-4 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <span className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Step 0{i+1}</span>
                  <p className="font-bold text-slate-800 text-sm sm:text-base">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Friction Items Section */}
        <div className="space-y-6 sm:space-y-8 mb-12">
          <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest px-2">Live Friction Log</h3>
          
          {items.map((item, index) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.5rem] p-[1px] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)]"
            >
              {/* Card Border Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
              
              {/* NEW: Background Glowy Mesh Blurs */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px] transition-colors duration-500 ${glowColors[index % glowColors.length]}`} />
              <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full blur-[80px] transition-colors duration-500 ${glowColors[index % glowColors.length]}`} />

              {/* MAIN CARD BODY */}
              <div className={`relative rounded-[1.75rem] sm:rounded-[2.4rem] p-6 md:p-8 transition-all duration-500 bg-gradient-to-br ${cardGradients[index % cardGradients.length]}`}>
                
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-lg group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <span className="text-slate-900 font-bold tracking-tight text-sm sm:text-base">Friction Point</span>
                  </div>
                  
                  {items.length > 1 && (
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 sm:p-2.5 bg-white/80 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-xl sm:rounded-2xl transition-all active:scale-90 border border-slate-100 shadow-sm"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10 gap-y-5">
                  {[
                    { label: 'What is the task?', field: 'task', placeholder: 'Morning deep work session' },
                    { label: 'Current Friction', field: 'friction', placeholder: 'Cleaning desk before start' },
                    { label: 'The Fix', field: 'fix', placeholder: 'Clean desk night before' },
                    { label: 'The Automation', field: 'automation', placeholder: 'Smart light turns red at 8pm' },
                  ].map((input) => (
                    <div key={input.field} className="space-y-1.5 sm:space-y-2">
                      <label className="text-[9px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1">
                        {input.label}
                      </label>
                      <input
                        type="text"
                        value={item[input.field as keyof FrictionItem]}
                        onChange={(e) => updateItem(item.id, input.field as keyof FrictionItem, e.target.value)}
                        placeholder={input.placeholder}
                        className="w-full bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-xs sm:text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 focus:bg-white transition-all text-slate-700 placeholder:text-slate-400 shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-8 border-t border-slate-100">
          <button 
            onClick={addItem}
            className="flex items-center gap-2 cursor-pointer text-indigo-600 font-bold text-xs sm:text-sm hover:gap-3 transition-all group py-2"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
            Add Another Point
          </button>

          <button
            onClick={() => markDayComplete(2, 6)}
            disabled={isComplete}
            className={`
              w-full sm:w-auto cursor-pointer px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-3
              ${isComplete 
                ? 'bg-emerald-50 text-emerald-600 cursor-not-allowed border border-emerald-100' 
                : 'bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-[0_20px_40px_rgba(79,70,229,0.3)] active:scale-95'
              }
            `}
          >
            {isComplete ? (
              <>
                <Check className="w-4 h-4 sm:w-5 sm:h-5" /> Day Completed
              </>
            ) : (
              <>
                Mark Day Complete <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}