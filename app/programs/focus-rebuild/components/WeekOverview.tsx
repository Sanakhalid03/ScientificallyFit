import { useCourse } from '../context/CourseContext';
import { DayCard } from './DayCard';
import { BookOpen, Target, Wrench, Sparkles, ArrowRight, Lock } from 'lucide-react';

const weekData = {
  1: {
    goal: "Build awareness of your attention patterns and establish a foundation for deep focus",
    learnings: [
      "How attention fragmentation happens",
      "Your personal distraction patterns",
      "Your baseline focus capacity",
      "Single-task vs multi-task modes"
    ],
    tools: [
      "Attention Log Sheet",
      "Distraction Heatmap",
      "Focus Baseline Scorecard",
      "Distraction Removal Checklist"
    ],
    outcome: "By the end of this week, you'll have a clear map of what steals your attention and a measurable baseline to improve from."
  },
  2: {
    goal: "Design your environment and digital spaces to make focus the default state",
    learnings: [
      "Environment beats willpower",
      "Physical workspace optimization",
      "Digital hygiene principles",
      "Focus ritual design"
    ],
    tools: [
      "Environment Audit Worksheet",
      "Digital Hygiene Protocol",
      "Ritual Builder",
      "Friction Removal Map"
    ],
    outcome: "By the end of this week, you'll have a fully optimized focus environment and be able to sustain 60-minute deep work sessions."
  }
};

export function WeekOverview() {
  const { weeks, currentWeek, setCurrentView, getWeekProgress, unlockNextWeek } = useCourse();
  const week = weeks.find(w => w.id === currentWeek);
  const data = weekData[currentWeek as keyof typeof weekData];
  const progress = getWeekProgress(currentWeek);
   
  if (!week) return null;

  const handleUnlockNextWeek = () => {
    if (week.isComplete && currentWeek === 1) {
      unlockNextWeek();
      setCurrentView(2, 0);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6 animate-fade-up">

      {/* Week Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-medium shadow-md text-xs sm:text-sm">
            {week.title}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="font-semibold text-gray-700">{progress}% complete</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">{week.theme}</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">{week.description}</p>
      </div>

      {/* Week Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        {[
          {
            icon: <Target className="w-5 h-5 text-white" />,
            title: "Weekly Goal",
            content: data.goal,
            bg: "bg-gradient-to-tr from-purple-400 to-pink-400"
          },
          {
            icon: <Sparkles className="w-5 h-5 text-white" />,
            title: "Expected Outcome",
            content: data.outcome,
            bg: "bg-gradient-to-tr from-yellow-400 to-orange-400"
          },
          {
            icon: <BookOpen className="w-5 h-5 text-white" />,
            title: "What You'll Learn",
            contentList: data.learnings,
            bg: "bg-gradient-to-tr from-green-400 to-teal-400"
          },
          {
            icon: <Wrench className="w-5 h-5 text-white" />,
            title: "Tools You'll Use",
            contentList: data.tools,
            bg: "bg-gradient-to-tr from-cyan-400 to-blue-500"
          }
        ].map((card, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.bg} shadow-md shrink-0`}>
                {card.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">{card.title}</h3>
            </div>
            {card.content && (
              <p className="text-gray-600 dark:text-gray-300 text-sm">{card.content}</p>
            )}
            {card.contentList && (
              <ul className="space-y-2 mt-2">
                {card.contentList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-200 text-sm">
                    <span className="w-2 h-2 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Daily Lessons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {week.days.map((day) => (
            <DayCard 
              key={day.id} 
              day={day} 
              weekId={week.id}
              onClick={() => setCurrentView(week.id, day.id)} 
            />
          ))}
        </div>
      </div>

      {/* Week Complete / Unlock Next Week */}
      {week.isComplete && currentWeek === 1 && (
        <div className="p-6 sm:p-8 rounded-2xl shadow-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white text-center mb-6 animate-bounce">
        
          <h3 className="text-2xl font-bold mb-2">Week 1 Complete!</h3>
          <p className="mb-6 text-sm sm:text-base">You've built a strong foundation. Ready to optimize your environment?</p>
          <button
            onClick={handleUnlockNextWeek}
            className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Unlock Week 2
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {week.isLocked && (
        <div className="p-6 sm:p-8 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-700 text-center opacity-80 mb-6">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-gray-600 dark:text-gray-300" />
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">Complete Week 1 First</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Finish all lessons in Week 1 to unlock this content.</p>
        </div>
      )}

   
    </div>
  );
}