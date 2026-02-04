export interface DayContent {
  id: number;
  title: string;
  duration: string;
  description: string;
  tasks: string[];
}

export interface Week {
  weekNumber: number;
  days: DayContent[];
}

export const focusRebuildData: Week[] = [
  {
    weekNumber: 1,
    days: [
      {
        id: 1,
        title: "Dopamine Baseline",
        duration: "15 min",
        description: "Today we identify your high-friction tasks versus low-effort dopamine triggers. Establishing a baseline is critical for understanding where your attention is currently leaking.",
        tasks: [
          "Record screen time for the last 24 hours",
          "Identify your top 3 'infinite scroll' triggers",
          "Complete a 5-minute non-sleep deep rest session"
        ]
      },
      {
        id: 2,
        title: "Digital Minimalism",
        duration: "20 min",
        description: "Cleanse your digital environment. We focus on removing the visual and auditory cues that trigger involuntary context switching.",
        tasks: [
          "Disable all non-essential notifications",
          "Delete one app that causes unnecessary stress",
          "Organize your home screen for utility only"
        ]
      },
      {
        id: 3,
        title: "Circadian Alignment",
        duration: "12 min",
        description: "Your focus is dictated by your biological clock. Learn how to use light to anchor your energy levels for deep work.",
        tasks: [
          "Get 10 minutes of direct sunlight before 10 AM",
          "Avoid blue light 1 hour before sleep",
          "Set a consistent 'wake-up' anchor time"
        ]
      },
      {
        id: 4,
        title: "Attention Span Testing",
        duration: "30 min",
        description: "We begin active training. Today involves a baseline test of how long you can hold focus on a single difficult task before the 'itch' to switch occurs.",
        tasks: [
          "Set a timer for 25 minutes of reading/work",
          "Note down every time your mind wanders",
          "Practice the 'breath-focus' reset technique"
        ]
      },
      {
        id: 5,
        title: "Monotasking Protocol",
        duration: "18 min",
        description: "The myth of multitasking is the enemy of focus. Today we implement a zero-switching protocol for your primary work block.",
        tasks: [
          "Close all browser tabs except the current task",
          "Work in one 45-minute block with phone in another room",
          "Log your resistance levels during the session"
        ]
      },
      {
        id: 6,
        title: "Environment Engineering",
        duration: "15 min",
        description: "Your physical space dictates your mental state. We will optimize your desk for high-output cognitive work.",
        tasks: [
          "Remove all non-work related items from your line of sight",
          "Ensure your screen is at eye level",
          "Introduce white noise or binaural beats for focus"
        ]
      },
      {
        id: 7,
        title: "Week 1 Integration",
        duration: "25 min",
        description: "Reviewing the first 7 days. We look at the data collected to adapt the protocol for Week 2's deep work expansion.",
        tasks: [
          "Review your focus logs from the week",
          "Plan your 90-minute deep work cycles for next week",
          "Rest: No high-stimulation digital content for 4 hours"
        ]
      }
    ]
  },
  {
    weekNumber: 2,
    days: [
      {
        id: 1,
        title: "Deep Work Initiation",
        duration: "45 min",
        description: "Week 2 moves from baseline to execution. We start our first formal Deep Work cycles.",
        tasks: ["Select a 'Big Rocks' task", "Set a 90-minute timer", "No digital exits permitted"]
      }
      // You can add Days 2-7 for Week 2 here following the same pattern
    ]
  }
];