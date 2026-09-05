import React, { useState } from 'react';
import { UserProgress, LessonId } from '../types';
import { ALL_LESSONS } from '../services/progressService';
import { LargeButton } from '../components/LargeButton';
import { soundService } from '../services/soundService';
import { Award, CheckCircle2, RotateCcw, Star, Calendar } from 'lucide-react';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onSelectLesson: (id: LessonId) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onResetProgress,
  onSelectLesson,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const completedCount = progress.completedLessons.length;
  const totalCount = ALL_LESSONS.length;
  const isAllDone = completedCount === totalCount;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 flex items-center gap-4">
          <Award className="w-12 h-12 text-amber-500" />
          <span>A te eredményeid</span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 font-medium mt-2">
          Minden egyes lépés nagy büszkeség! Nézd meg, mit tanultál eddig:
        </p>
      </div>

      {/* Diploma Certificate Banner */}
      <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-yellow-100 border-8 border-amber-500 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Star className="w-10 h-10 text-amber-500 fill-amber-500" />
          <span className="text-2xl font-black tracking-widest text-amber-900 uppercase">
            Digitális Kezdő Elismerés
          </span>
          <Star className="w-10 h-10 text-amber-500 fill-amber-500" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-black text-slate-900">
          {isAllDone ? 'Gratulálunk! Mindent megtanultál!' : 'Szépen haladsz a tanulásban!'}
        </h2>

        <p className="text-2xl sm:text-3xl font-bold text-amber-950 max-w-2xl mx-auto leading-relaxed">
          {completedCount === 0
            ? 'Kezdd el az első leckét, és itt fognak megjelenni a gyönyörű arany csillagok!'
            : `Már sikeresen teljesítettél ${completedCount} leckét a ${totalCount}-ből!`}
        </p>

        <div className="flex items-center justify-center gap-2 pt-2">
          {ALL_LESSONS.map((_, i) => (
            <div
              key={i}
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl border-4 ${
                i < completedCount
                  ? 'bg-amber-400 border-amber-600 shadow-md text-white'
                  : 'bg-slate-200 border-slate-300 text-slate-400'
              }`}
            >
              ⭐
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Lesson Status List */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
          Leckék állapota
        </h3>

        <div className="grid gap-4">
          {ALL_LESSONS.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`
                  p-5 rounded-2xl border-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4
                  ${isCompleted ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-50 border-slate-300'}
                `}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{lesson.icon}</span>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900">{lesson.title}</h4>
                    <p className="text-lg text-slate-600 font-medium">{lesson.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-200 text-emerald-950 font-black text-xl">
                      <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                      <span>Teljesítve</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-slate-200 text-slate-600 font-bold text-lg">
                      Még hátravan
                    </span>
                  )}

                  <button
                    onClick={() => {
                      soundService.playClick();
                      onSelectLesson(lesson.id);
                    }}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg"
                  >
                    Megnyitás
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Progress Section */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow text-center space-y-4">
        <h4 className="text-2xl font-bold text-slate-700">
          Szeretnéd újra az elejétől kezdeni a teljes tanfolyamot?
        </h4>

        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-400 text-slate-700 font-bold text-xl"
          >
            <RotateCcw className="w-6 h-6" />
            <span>Tanulási haladás törlése és újrakezdés</span>
          </button>
        ) : (
          <div className="p-6 bg-red-50 border-4 border-red-300 rounded-2xl max-w-lg mx-auto space-y-4">
            <p className="text-xl font-bold text-red-900">
              Biztosan törölni szeretnéd a haladásodat, és elölről kezded?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  soundService.playClick();
                  onResetProgress();
                  setShowConfirmReset(false);
                }}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black text-xl"
              >
                Igen, újrakezdem
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xl"
              >
                Mégse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
