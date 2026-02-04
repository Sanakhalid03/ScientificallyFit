import { useCourse } from '../context/CourseContext'
import { Target } from 'lucide-react'

export function ProgressHeader() {
  const { getOverallProgress, weeks } = useCourse()
  const progress = getOverallProgress()
  const completedDays = weeks.reduce(
    (acc, week) => acc + week.days.filter(d => d.isComplete).length,
    0
  )
  const totalDays = weeks.reduce((acc, week) => acc + week.days.length, 0)

  return (
    <header className="sticky top-0 z-20 px-4 sm:px-6 lg:px-8 py-4 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-5xl mx-auto flex flex-row items-center justify-between gap-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center text-purple-800 shadow-lg animate-pulse shrink-0">
            <Target className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Your Progress</h2>
            <p className="text-xs text-gray-500 whitespace-nowrap">
              {completedDays} / {totalDays} days
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 w-full md:w-auto max-w-[50%] md:max-w-none justify-end">
          {/* Hide bar on very small screens, show only % */}
          <div className="hidden sm:block flex-1 md:flex-none relative w-full sm:w-32 md:w-48 h-3 rounded-full bg-gray-200 overflow-hidden shadow-inner">
            {/* Gradient Fill */}
            <div
              className="absolute left-0 top-0 h-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer / wave effect */}
            <div
              className="absolute left-0 top-0 h-3 w-full bg-gradient-to-r from-white/20 via-white/40 to-white/20 animate-[shine_2s_infinite]"
              style={{ maskImage: 'linear-gradient(to right, black 0%, transparent 50%, black 100%)' }}
            />
          </div>
          <span className="text-sm sm:text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            {progress}%
          </span>
        </div>
      </div>

      {/* Tailwind animation keyframes */}
      <style>
        {`
          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </header>
  )
}