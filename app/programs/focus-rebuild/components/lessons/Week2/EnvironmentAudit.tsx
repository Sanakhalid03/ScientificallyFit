import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Target, Check, Camera, Eye, Volume2, 
  Sun, Laptop, User, Trash2, RotateCcw 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCourse } from '../../../context/CourseContext';

const auditItems = [
  { key: 'visual', label: 'Visual Clutter', description: 'Papers, objects, and visual noise', icon: Eye, color: 'from-blue-50 to-indigo-50' },
  { key: 'noise', label: 'Noise Level', description: 'Background sounds and distractions', icon: Volume2, color: 'from-purple-50 to-fuchsia-50' },
  { key: 'light', label: 'Lighting Quality', description: 'Natural light, glare, and eye strain', icon: Sun, color: 'from-amber-50 to-yellow-50' },
  { key: 'posture', label: 'Posture & Ergonomics', description: 'Chair height and physical comfort', icon: User, color: 'from-emerald-50 to-teal-50' },
  { key: 'tools', label: 'Tool Overload', description: 'Too many devices or apps in view', icon: Laptop, color: 'from-rose-50 to-orange-50' },
];

type Rating = 1 | 2 | 3 | 4 | 5;

export function EnvironmentAudit() {
  const { markDayComplete, completedDays } = useCourse();
  const isComplete = completedDays['2-1'];
  
  const [ratings, setRatings] = useState<Record<string, Rating>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('audit-photo-2-1');
    const savedRatings = localStorage.getItem('audit-ratings-2-1');
    const savedNotes = localStorage.getItem('audit-notes-2-1');

    if (savedImage) setCapturedImage(savedImage);
    if (savedRatings) setRatings(JSON.parse(savedRatings));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    if (Object.keys(ratings).length > 0) localStorage.setItem('audit-ratings-2-1', JSON.stringify(ratings));
    if (Object.keys(notes).length > 0) localStorage.setItem('audit-notes-2-1', JSON.stringify(notes));
  }, [ratings, notes]);

  const startCamera = async () => {
    setIsCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setIsCapturing(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context?.drawImage(videoRef.current, 0, 0);
      
      const imageData = canvasRef.current.toDataURL('image/png');
      setCapturedImage(imageData);
      localStorage.setItem('audit-photo-2-1', imageData);
      stopCamera();
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach(track => track.stop());
    setIsCapturing(false);
  };

  const deletePhoto = () => {
    setCapturedImage(null);
    localStorage.removeItem('audit-photo-2-1');
  };

  const allRated = auditItems.every(item => ratings[item.key]);

  return (
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-12 px-4 bg-white min-h-screen">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 sm:mb-12 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-sm mb-4">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full font-semibold tracking-wide uppercase text-[10px] sm:text-xs">Week 2</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium">Day 1</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-600 leading-tight">
          Focus Environment Audit
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto px-2">
          Assess your physical workspace to identify improvement opportunities.
        </p>
      </motion.div>

      {/* Intro Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/40 border border-indigo-100/50 p-5 sm:p-8 rounded-2xl sm:rounded-3xl mb-8 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600">
              Environment Shapes Behavior
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Rate each dimension from 1 (poor) to 5 (excellent). We'll use this data to prioritize changes tomorrow.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Audit List */}
      <div className="space-y-4 mb-8">
        {auditItems.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "group p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-transparent transition-all duration-300 bg-gradient-to-br shadow-sm hover:shadow-md",
              item.color,
              ratings[item.key] ? "border-slate-200" : "border-slate-100"
            )}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">
                    {item.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500">{item.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full lg:w-80">
                <div className="flex gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <motion.button
                      key={value}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRatings(prev => ({ ...prev, [item.key]: value as Rating }))}
                      className={cn(
                        "flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all",
                        ratings[item.key] === value
                          ? value <= 2 ? "bg-rose-500 text-white shadow-md shadow-rose-100" 
                            : value === 3 ? "bg-amber-400 text-white shadow-md shadow-amber-100"
                            : "bg-emerald-500 text-white shadow-md shadow-emerald-100"
                          : "bg-white/80 text-slate-400 hover:bg-white"
                      )}
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Notes..."
                  className="w-full bg-white/50 border-none rounded-lg sm:rounded-xl px-4 py-2 text-xs sm:text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-100 transition-all"
                  value={notes[item.key] || ''}
                  onChange={(e) => setNotes(prev => ({ ...prev, [item.key]: e.target.value }))}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Photo Capture Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 mb-8 sm:mb-12 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-xl sm:rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-600">
            <Camera className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-600">
            Capture the "Before" State
          </h3>
          
          <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-200 mb-4 shadow-inner group">
            <AnimatePresence mode="wait">
              {!isCapturing && !capturedImage && (
                <motion.button
                  key="start"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={startCamera}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-500 hover:bg-slate-100 transition-colors px-4"
                >
                  <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Enable Camera</span>
                </motion.button>
              )}

              {isCapturing && (
                <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  <button 
                    onClick={takePhoto}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-5 sm:px-6 py-2 rounded-full font-bold shadow-xl text-xs sm:text-sm active:scale-95 transition-transform"
                  >
                    Take Photo
                  </button>
                </motion.div>
              )}

              {capturedImage && (
                <motion.div key="preview" initial={{ scale: 1.05 }} animate={{ scale: 1 }} className="absolute inset-0">
                  <img src={capturedImage} alt="Saved Workspace" className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-2">
                    <button onClick={deletePhoto} className="p-2 bg-white/90 rounded-lg text-rose-500 shadow-md hover:bg-white transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button onClick={startCamera} className="p-2 bg-white/90 rounded-lg text-slate-600 shadow-md hover:bg-white transition-colors">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <canvas ref={canvasRef} className="hidden" />
          <p className="text-slate-400 text-[10px] sm:text-xs italic px-4">
            {capturedImage ? "✓ Photo saved locally" : "Visual evidence helps track your workspace evolution"}
          </p>
        </div>
      </motion.div>

      {/* Complete Button */}
      <div className="flex flex-col items-center gap-4 pb-8 sm:pb-0">
        <motion.button
          whileHover={(!isComplete && allRated) ? { scale: 1.02 } : {}}
          whileTap={(!isComplete && allRated) ? { scale: 0.98 } : {}}
          onClick={() => markDayComplete(2, 1)}
          disabled={isComplete || !allRated}
          className={cn(
            "w-full max-w-sm py-3.5 cursor-pointer sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-sm md:text-lg flex items-center justify-center gap-3 transition-all duration-300",
            isComplete 
              ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
              : allRated 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100 hover:bg-indigo-700" 
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
        >
          {isComplete ? <Check className="hidden md:block w-4 h-4" /> : <Target className="hidden md:block w-4 h-4" />}
          {isComplete ? "Day 1 Complete" : "Mark Day Complete"}
        </motion.button>
        {!allRated && !isComplete && (
          <p className="text-[10px] sm:text-xs text-slate-400 animate-pulse uppercase tracking-widest font-medium">Rate all 5 items to finish</p>
        )}
      </div>
    </div>
  );
}