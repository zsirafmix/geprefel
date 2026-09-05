import React from 'react';
import { UserProgress, LessonId } from '../types';
import { ALL_LESSONS } from '../services/progressService';
import { LargeButton } from '../components/LargeButton';
import { Play, CheckCircle2, Lock, ArrowRight, BookOpen } from 'lucide-react';
import { soundService } from '../services/soundService';

interface HomeViewProps {
  progress: UserProgress;
  onStartCourse: () => void;
  onResumeCourse: () => void;
  onSelectLesson: (id: LessonId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onStartCourse,
  onResumeCourse,
  onSelectLesson,
}) => {
  const completedCount = progress.completedLessons.length;
  const hasStarted = completedCount > 0 || progress.currentStepIndex > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Friendly Hero Greeting */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-8 sm:p-12 text-center shadow-lg space-y-6">
        <div className="text-7xl sm:text-8xl mb-2">👋</div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
          Üdvözöllek!
        </h1>

        <p className="text-2xl sm:text-3xl font-medium text-slate-700 max-w-2xl mx-auto leading-relaxed">
          Itt lépésről lépésre, nyugodt tempóban tanulhatod meg használni a számítógépet.
        </p>

        <p className="text-xl sm:text-2xl text-slate-500 font-normal">
          Nem lehet semmit elrontani, minden feladat biztonságos és bármikor újrakezdhető.
        </p>

        {/* Primary Call to Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
          {!hasStarted ? (
            <LargeButton
              variant="primary"
              onClick={onStartCourse}
              icon={<Play className="w-8 h-8 fill-current" />}
              className="w-full sm:w-auto text-3xl px-12 py-6"
            >
              KEZDJÜK EL
            </LargeButton>
          ) : (
            <>
              <LargeButton
                variant="success"
                onClick={onResumeCourse}
                icon={<ArrowRight className="w-8 h-8" />}
                className="w-full sm:w-auto text-3xl px-10 py-6"
              >
                FOLYTATOM
              </LargeButton>

              <LargeButton
                variant="secondary"
                onClick={onStartCourse}
                className="w-full sm:w-auto text-2xl px-8 py-6"
              >
                Kezdés elölről
              </LargeButton>
            </>
          )}
        </div>
      </div>

      {/* Simple, Non-intimidating Progress Summary */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-md space-y-6">
        <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-700" />
            <span>Tanulási útvonal</span>
          </h2>

          <span className="text-xl sm:text-2xl font-bold text-slate-600 bg-slate-100 px-5 py-2 rounded-2xl border">
            {completedCount === 0
              ? 'Még nem kezdtél leckét'
              : `Már ${completedCount} leckét teljesítettél a ${ALL_LESSONS.length}-ből`}
          </span>
        </div>

        {/* Simple visual steps list */}
        <div className="grid gap-4">
          {ALL_LESSONS.map((lesson, idx) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isUnlocked = progress.unlockedLessons.includes(lesson.id) || idx === 0;
            const isNextToLearn = !isCompleted && isUnlocked;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  if (isUnlocked) {
                    soundService.playClick();
                    onSelectLesson(lesson.id);
                  }
                }}
                className={`
                  flex items-center justify-between p-5 sm:p-6 rounded-2xl border-4 transition-all
                  ${isCompleted 
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 cursor-pointer hover:bg-emerald-100' 
                    : isNextToLearn 
                    ? 'bg-blue-50 border-blue-600 text-blue-950 shadow-md cursor-pointer hover:bg-blue-100 scale-[1.01]' 
                    : 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed'}
                `}
              >
                <div className="flex items-center gap-5">
                  <span className="text-4xl sm:text-5xl">{lesson.icon}</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                      {lesson.title}
                    </h3>
                    <p className="text-lg sm:text-xl font-medium text-slate-600 mt-1">
                      {lesson.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {isCompleted && (
                    <div className="flex items-center gap-2 text-emerald-700 font-black text-xl bg-emerald-200/80 px-4 py-2 rounded-xl">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                      <span>Kész</span>
                    </div>
                  )}

                  {isNextToLearn && (
                    <div className="flex items-center gap-2 text-blue-700 font-black text-xl bg-blue-200/80 px-4 py-2 rounded-xl animate-pulse">
                      <Play className="w-6 h-6 fill-current text-blue-700" />
                      <span>Következő</span>
                    </div>
                  )}

                  {!isUnlocked && !isCompleted && (
                    <div className="flex items-center gap-2 text-slate-400 font-bold text-lg">
                      <Lock className="w-6 h-6 text-slate-400" />
                      <span>Zárt</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
