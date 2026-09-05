import React from 'react';
import { UserProgress, LessonId } from '../types';
import { ALL_LESSONS } from '../services/progressService';
import { LargeButton } from '../components/LargeButton';
import { CheckCircle2, Play, Lock, BookOpen } from 'lucide-react';
import { soundService } from '../services/soundService';

interface RoadmapViewProps {
  progress: UserProgress;
  onSelectLesson: (id: LessonId) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  progress,
  onSelectLesson,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-blue-700" />
          <span>Válassz egy leckét!</span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 font-medium mt-2">
          Haladj a saját tempódban! Bármelyik befejezett leckét bármikor újra gyakorolhatod.
        </p>
      </div>

      <div className="grid gap-6">
        {ALL_LESSONS.map((lesson, index) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const isUnlocked = progress.unlockedLessons.includes(lesson.id) || index === 0;

          return (
            <div
              key={lesson.id}
              className={`
                bg-white border-4 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all
                ${isCompleted ? 'border-emerald-400 bg-emerald-50/40' : isUnlocked ? 'border-blue-500' : 'border-slate-300 opacity-60'}
              `}
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-5xl sm:text-6xl flex-shrink-0 shadow-inner">
                  {lesson.icon}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-lg font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                      {index + 1}. lecke
                    </span>
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold text-lg">
                        <CheckCircle2 className="w-5 h-5" />
                        Teljesítve
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {lesson.title}
                  </h2>

                  <p className="text-xl text-slate-700 font-medium">
                    {lesson.subtitle}
                  </p>

                  <p className="text-lg text-slate-500">
                    {lesson.description}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-auto flex-shrink-0">
                {isUnlocked ? (
                  <LargeButton
                    variant={isCompleted ? 'secondary' : 'primary'}
                    onClick={() => {
                      soundService.playClick();
                      onSelectLesson(lesson.id);
                    }}
                    icon={<Play className="w-6 h-6 fill-current" />}
                    className="w-full md:w-auto"
                  >
                    {isCompleted ? 'Újra megnézem' : 'Lecke indítása'}
                  </LargeButton>
                ) : (
                  <div className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-200 text-slate-500 font-bold text-xl border-2 border-slate-300">
                    <Lock className="w-6 h-6" />
                    <span>Zárolva</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
