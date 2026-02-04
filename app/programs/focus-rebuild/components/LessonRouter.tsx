"use client"
import { useCourse } from '../context/CourseContext';
import { WeekOverview } from './WeekOverview';

// Week 1 Lessons (match actual filenames)
import { AttentionAwareness } from './lessons/AttentionAware';
import { DistractionHeatmap } from './lessons/DistractionHeatmap';
import { BaselineFocusTest } from './lessons/Baselinefocus';
import { DistractionRemovalSprint } from './lessons/DistractionRemovalSprint';
import { SingleTaskTraining } from './lessons/SingleTaskTraining';
import { ReflectionPatternReview } from './lessons/ReflectionPatternReview';
import { FoundationResetRitual } from './lessons/FoundationResetRitual';

// Week 2 Lessons (use Folder casing 'Week2' and actual filenames)
import { EnvironmentAudit } from './lessons/Week2/EnvironmentAudit';
import { WorkspaceRedesign } from './lessons/Week2/WorkplaceRedesign';
import { DigitalHygieneReset } from './lessons/Week2/DigitalHygieneReset';
import { FocusRitualDesign } from './lessons/Week2/FocusRitualDesign';
import { DeepWorkTraining } from './lessons/Week2/DeepWorkTraining';
import { FrictionRemoval } from './lessons/Week2/FrictionRemoval';
import { EnvironmentLockIn } from './lessons/Week2/EnvironmentLockIn';

const week1Lessons = [
  null, // index 0 = overview
  AttentionAwareness,
  DistractionHeatmap,
  BaselineFocusTest,
  DistractionRemovalSprint,
  SingleTaskTraining,
  ReflectionPatternReview,
  FoundationResetRitual,
];

const week2Lessons = [
  null, // index 0 = overview
  EnvironmentAudit,
  WorkspaceRedesign,
  DigitalHygieneReset,
  FocusRitualDesign,
  DeepWorkTraining,
  FrictionRemoval,
  EnvironmentLockIn,
];

export function LessonRouter() {
  const { currentWeek, currentDay } = useCourse();

  // Show overview if day is 0
  if (currentDay === 0) {
    return <WeekOverview />;
  }

  // Get the appropriate lesson component
  const lessons = currentWeek === 1 ? week1Lessons : week2Lessons;
  const LessonComponent = lessons[currentDay];

  if (!LessonComponent) {
    return <WeekOverview />;
  }

  return <LessonComponent />;
}
