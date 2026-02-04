"use client";

import { CourseProvider } from './context/CourseContext';
import { CourseSidebar } from './components/CourseSidebar';
import { ProgressHeader } from './components/ProgressHeader';
import { LessonRouter } from './components/LessonRouter';

export default function FocusRebuildPage() {
  return (
    <CourseProvider>
      {/* Responsive Layout: 
        - Mobile: Block layout (Sidebar is fixed/overlay)
        - Desktop (md+): Flex row (Sidebar takes physical space)
      */}
      <div className="flex min-h-screen bg-background text-foreground relative">
        
        {/* Sidebar Component handles its own responsive positioning */}
        <CourseSidebar />

        <div className="flex-1 flex flex-col w-full min-w-0">
          {/* Top Progress Bar */}
          <ProgressHeader />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto pb-24 md:pb-0"> {/* Added bottom padding for mobile fab */}
              <LessonRouter />
            </div>
          </main>
        </div>
      </div>
    </CourseProvider>
  );
}