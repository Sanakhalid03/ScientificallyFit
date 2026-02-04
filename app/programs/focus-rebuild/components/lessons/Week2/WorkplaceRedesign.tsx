import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Check, Camera, Trash2, MapPin, 
  Sun, Monitor, RotateCcw, ArrowRight, Sparkles 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCourse } from '../../../context/CourseContext';

const redesignChecklist = [
  { 
    key: 'clearDesk', 
    label: 'Clear desk completely', 
    description: 'Remove everything, then add back only essentials', 
    icon: Trash2, 
    bgGradient: 'from-cyan-400/20 via-cyan-50/50 to-white',
    iconColor: 'text-cyan-600',
    iconBg: 'bg-cyan-100',
    accent: 'border-cyan-200'
  },
  { 
    key: 'focusZone', 
    label: 'Define focus zone', 
    description: 'Mark a clear boundary for deep work activities', 
    icon: MapPin, 
    bgGradient: 'from-fuchsia-400/20 via-fuchsia-50/50 to-white',
    iconColor: 'text-fuchsia-600',
    iconBg: 'bg-fuchsia-100',
    accent: 'border-fuchsia-200'
  },
  { 
    key: 'lightAdjust', 
    label: 'Adjust lighting', 
    description: 'Position desk for natural light, reduce glare', 
    icon: Sun, 
    bgGradient: 'from-amber-400/20 via-amber-50/50 to-white',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    accent: 'border-amber-200'
  },
  { 
    key: 'screenHeight', 
    label: 'Correct screen height', 
    description: 'Top of screen at or slightly below eye level', 
    icon: Monitor, 
    bgGradient: 'from-indigo-400/20 via-indigo-50/50 to-white',
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    accent: 'border-indigo-200'
  },
];

export function WorkspaceRedesign() {
  const { markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['2-2'];
  
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progress = Math.round((completedCount / redesignChecklist.length) * 100);

  const startCamera = async () => {
    setIsCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) { setIsCapturing(false); }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvasRef.current.toDataURL('image/png'));
      stopCamera();
    }
  };

  const stopCamera = () => {
    (videoRef.current?.srcObject as MediaStream)?.getTracks().forEach(t => t.stop());
    setIsCapturing(false);
  };

  const handleFinishSprint = () => {
    if (progress === 100 && !isComplete) {
      markDayComplete(2, 2);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-8 lg:py-12 px-4 bg-white min-h-screen text-slate-900 overflow-x-hidden">
      <style>{`
        @keyframes rotBGimg {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .camera-animated-card {
          position: relative;
          display: flex;
          place-content: center;
          place-items: center;
          overflow: hidden;
          border-radius: 24px;
          @media (min-width: 640px) { border-radius: 32px; }
          width: 100%;
        }
        .camera-animated-card::before {
          content: '';
          position: absolute;
          width: 150px;
          height: 250%; 
          background-image: linear-gradient(180deg, #00b7ff, #ff30ff);
          animation: rotBGimg 3s linear infinite;
        }
        .camera-animated-card::after {
          content: '';
          position: absolute;
          background: white;
          inset: 3px; 
          @media (min-width: 640px) { inset: 4px; }
          border-radius: 21px;
          @media (min-width: 640px) { border-radius: 28px; }
        }
        .inner-relative { z-index: 10; width: 100%; position: relative; }
      `}</style>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-3 text-slate-900 px-2">
          Workspace <span className="text-indigo-600">Sprint</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base lg:text-lg font-medium px-4 max-w-md mx-auto">
          Convert your desk into a high-focus cockpit.
        </p>
      </motion.div>

      {/* Intro Card */}
      <motion.div 
        className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 sm:p-7 rounded-[1.5rem] sm:rounded-[2rem] mb-6 sm:mb-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border border-indigo-100 shadow-sm"
      >
        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 shrink-0">
          <BookOpen className="w-6 h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg lg:text-xl font-black">Quick Wins First</h2>
          <p className="text-slate-600 text-xs sm:text-sm lg:text-base font-medium">Optimize your physical space in 30 minutes or less.</p>
        </div>
      </motion.div>

      {/* Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4 mb-10 lg:mb-14">
        {redesignChecklist.map((item, idx) => {
          const isChecked = checklist[item.key];
          return (
            <motion.button
              key={item.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setChecklist(prev => ({...prev, [item.key]: !isChecked}))}
              className={cn(
                "flex flex-col md:flex-row items-center gap-3 sm:gap-5 p-4 lg:p-5 rounded-[1.25rem] lg:rounded-[1.75rem] transition-all duration-300 text-left border shadow-sm touch-manipulation",
                isChecked 
                  ? "bg-emerald-50 border-emerald-200" 
                  : cn("bg-gradient-to-r hover:translate-x-1 hover:shadow-md", item.bgGradient, item.accent)
              )}
            >
              <div className={cn(
                "w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-colors",
                isChecked ? "bg-emerald-500 text-white" : cn(item.iconBg, item.iconColor)
              )}>
                {isChecked ? <Check className="w-5 h-5 lg:w-6 lg:h-6 stroke-[4]" /> : <item.icon className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0 text-center md:text-left">
                <h4 className={cn("text-sm sm:text-base lg:text-lg font-bold truncate transition-all", isChecked ? "text-emerald-800/40 line-through" : "text-slate-900")}>
                  {item.label}
                </h4>
                <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-medium line-clamp-2">{item.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Camera Action Card */}
      <div className="camera-animated-card mb-10 lg:mb-14 shadow-xl shadow-indigo-100/50">
        <div className="inner-relative p-1 text-center">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[1.5rem] sm:rounded-[1.85rem] p-5 sm:p-8 lg:p-10 border border-indigo-100">
            <div className="w-12 h-12 sm:w-14 lg:w-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
              <Camera className="w-6 h-6 sm:w-7 lg:w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl lg:text-2xl font-black mb-1 italic tracking-tight">Lock In The Progress</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px] sm:text-[9px] mb-6">Take your after photo now</p>

            <div className="w-full max-w-sm mx-auto aspect-video rounded-[1.25rem] sm:rounded-[1.5rem] bg-white border-2 border-dashed border-slate-200 overflow-hidden relative group shadow-inner">
              <AnimatePresence mode="wait">
                {!isCapturing && !capturedImage && (
                  <button onClick={startCamera} className="absolute inset-0 flex flex-col items-center justify-center gap-2 group-hover:bg-slate-50 transition-colors w-full h-full">
                    <Sparkles className="w-5 h-5 sm:w-6 text-indigo-400" />
                    <span className="font-black text-[9px] sm:text-[10px] text-slate-400 tracking-widest">START CAMERA</span>
                  </button>
                )}

                {isCapturing && (
                  <div className="absolute inset-0">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <button onClick={takePhoto} className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-5 sm:px-6 py-2 rounded-lg sm:rounded-xl font-black shadow-xl text-[10px] sm:text-xs uppercase tracking-tighter">
                      CAPTURE
                    </button>
                  </div>
                )}

                {capturedImage && (
                  <div className="absolute inset-0">
                    <img src={capturedImage} className="w-full h-full object-cover" alt="Redesign" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button onClick={() => setCapturedImage(null)} className="p-1.5 sm:p-2 bg-white text-rose-500 rounded-lg shadow-lg hover:bg-rose-50 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button onClick={startCamera} className="p-1.5 sm:p-2 bg-white text-indigo-600 rounded-lg shadow-lg hover:bg-indigo-50 transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Summary of changes..."
              className="mt-6 w-full max-w-sm mx-auto block bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:border-indigo-500 transition-colors outline-none font-medium text-xs lg:text-sm shadow-sm"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Completion Button */}
      <div className="flex flex-col items-center gap-4 px-2">
        <motion.button
          whileHover={progress === 100 ? { scale: 1.02 } : {}}
          whileTap={progress === 100 ? { scale: 0.98 } : {}}
          onClick={handleFinishSprint}
          disabled={isComplete || progress < 100}
          className={cn(
            "w-full max-w-xs py-4 lg:py-5 rounded-[1.25rem] sm:rounded-[1.5rem] lg:rounded-[2rem] font-black text-base sm:text-lg lg:text-xl flex items-center justify-center gap-3 transition-all duration-500 shadow-lg",
            isComplete 
              ? "bg-emerald-50 text-emerald-600 border-2 border-emerald-200" 
              : progress === 100 
                ? "bg-indigo-600 text-white shadow-indigo-200 active:bg-indigo-700" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
          )}
        >
          <span className="whitespace-nowrap uppercase tracking-tight">{isComplete ? "DAY COMPLETE" : "FINISH SPRINT"}</span>
          {!isComplete && <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={3} />}
        </motion.button>
        {progress < 100 && (
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-indigo-400 animate-pulse text-center">
            Finish tasks to unlock
          </p>
        )}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}