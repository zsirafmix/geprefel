import React, { useState, useEffect } from 'react';
import { ViewMode, LessonId, UserProgress, AppSettings } from './types';
import { progressService, ALL_LESSONS } from './services/progressService';
import { soundService } from './services/soundService';
import { Header } from './components/Header';
import { HomeView } from './views/HomeView';
import { RoadmapView } from './views/RoadmapView';
import { ComputerIntroView } from './views/ComputerIntroView';
import { MouseLessonView } from './views/MouseLessonView';
import { KeyboardLessonView } from './views/KeyboardLessonView';
import { VirtualDesktopView } from './views/VirtualDesktopView';
import { InternetLessonView } from './views/InternetLessonView';
import { SafetyLessonView } from './views/SafetyLessonView';
import { PracticeView } from './views/PracticeView';
import { ProgressView } from './views/ProgressView';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [activeLessonId, setActiveLessonId] = useState<LessonId>('intro');
  const [progress, setProgress] = useState<UserProgress>(() => progressService.getProgress());
  const [settings, setSettings] = useState<AppSettings>(() => progressService.getSettings());

  // Apply settings to document body
  useEffect(() => {
    document.body.classList.remove('text-size-normal', 'text-size-large', 'text-size-huge');
    document.body.classList.add(`text-size-${settings.textSize}`);

    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    soundService.setEnabled(settings.soundEnabled);
  }, [settings]);

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    progressService.saveSettings(updated);
  };

  const handleStartCourse = () => {
    soundService.playClick();
    setActiveLessonId('intro');
    setCurrentView('lesson');
  };

  const handleResumeCourse = () => {
    soundService.playClick();
    // Find first unfinished lesson
    const nextLesson = ALL_LESSONS.find(l => !progress.completedLessons.includes(l.id));
    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
    } else {
      setActiveLessonId('intro');
    }
    setCurrentView('lesson');
  };

  const handleSelectLesson = (id: LessonId) => {
    setActiveLessonId(id);
    setCurrentView('lesson');
  };

  const handleCompleteLesson = (id: LessonId) => {
    const updated = progressService.completeLesson(id);
    setProgress(updated);
  };

  const handleNextLesson = (currentId: LessonId) => {
    const currentIndex = ALL_LESSONS.findIndex(l => l.id === currentId);
    if (currentIndex + 1 < ALL_LESSONS.length) {
      const nextId = ALL_LESSONS[currentIndex + 1].id;
      setActiveLessonId(nextId);
      setCurrentView('lesson');
    } else {
      // All lessons completed! Navigate to progress
      setCurrentView('progress');
    }
  };

  const handleResetProgress = () => {
    const reset = progressService.resetProgress();
    setProgress(reset);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1E293B]">
      {/* Accessible Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentView === 'home' && (
          <HomeView
            progress={progress}
            onStartCourse={handleStartCourse}
            onResumeCourse={handleResumeCourse}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {currentView === 'roadmap' && (
          <RoadmapView
            progress={progress}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {currentView === 'practice' && <PracticeView />}

        {currentView === 'progress' && (
          <ProgressView
            progress={progress}
            onResetProgress={handleResetProgress}
            onSelectLesson={handleSelectLesson}
          />
        )}

        {currentView === 'lesson' && (
          <div>
            {activeLessonId === 'intro' && (
              <ComputerIntroView
                onComplete={() => handleCompleteLesson('intro')}
                onNextLesson={() => handleNextLesson('intro')}
              />
            )}

            {activeLessonId === 'mouse' && (
              <MouseLessonView
                onComplete={() => handleCompleteLesson('mouse')}
                onNextLesson={() => handleNextLesson('mouse')}
              />
            )}

            {activeLessonId === 'keyboard' && (
              <KeyboardLessonView
                onComplete={() => handleCompleteLesson('keyboard')}
                onNextLesson={() => handleNextLesson('keyboard')}
              />
            )}

            {activeLessonId === 'desktop' && (
              <VirtualDesktopView
                onComplete={() => handleCompleteLesson('desktop')}
                onNextLesson={() => handleNextLesson('desktop')}
              />
            )}

            {activeLessonId === 'internet' && (
              <InternetLessonView
                onComplete={() => handleCompleteLesson('internet')}
                onNextLesson={() => handleNextLesson('internet')}
              />
            )}

            {activeLessonId === 'safety' && (
              <SafetyLessonView
                onComplete={() => handleCompleteLesson('safety')}
                onNextLesson={() => handleNextLesson('safety')}
              />
            )}
          </div>
        )}
      </main>

      {/* Reassuring, Calm Footer */}
      <footer className="border-t-4 border-slate-300 bg-white py-6 px-4 text-center text-slate-600 font-medium">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-xl font-bold text-slate-800">
            Gépre fel! – Barátságos számítógépes oktatóprogram idős tanulóknak
          </p>
          <p className="text-lg">
            A haladásodat a rendszer automatikusan megjegyzi ezen a készüléken. Nem szükséges regisztráció!
          </p>
        </div>
      </footer>
    </div>
  );
};
