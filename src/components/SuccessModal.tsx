import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LargeButton } from './LargeButton';
import { soundService } from '../services/soundService';
import { Award, ArrowRight, RotateCcw } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onNextLesson: () => void;
  onPracticeMore: () => void;
  nextLessonTitle?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  title = '🎉 Gratulálok!',
  message,
  onNextLesson,
  onPracticeMore,
  nextLessonTitle,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundService.playFanfare();
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white border-8 border-emerald-600 rounded-3xl p-8 sm:p-12 max-w-2xl w-full text-center shadow-2xl space-y-6 animate-scaleUp"
        role="dialog"
        aria-modal="true"
      >
        <div className="w-24 h-24 bg-emerald-100 border-4 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-5xl text-emerald-700 shadow-inner">
          <Award className="w-16 h-16 text-emerald-600" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h2>

        <p className="text-2xl sm:text-3xl text-slate-700 font-medium leading-relaxed max-w-xl mx-auto">
          {message}
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5">
          <LargeButton
            variant="secondary"
            onClick={onPracticeMore}
            icon={<RotateCcw className="w-7 h-7" />}
          >
            Gyakorlok még
          </LargeButton>

          <LargeButton
            variant="success"
            onClick={onNextLesson}
            icon={<ArrowRight className="w-7 h-7" />}
          >
            {nextLessonTitle ? `Következő: ${nextLessonTitle}` : 'Következő lecke'}
          </LargeButton>
        </div>
      </div>
    </div>
  );
};
