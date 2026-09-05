import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { speechService } from '../services/speechService';

interface InstructionBoxProps {
  stepNumber?: number;
  totalSteps?: number;
  instruction: string;
  subtext?: string;
  feedback?: {
    type: 'success' | 'retry' | 'neutral';
    message: string;
  } | null;
  onHelpClick?: () => void;
  isHelpActive?: boolean;
}

export const InstructionBox: React.FC<InstructionBoxProps> = ({
  stepNumber,
  totalSteps,
  instruction,
  subtext,
  feedback,
  onHelpClick,
  isHelpActive = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speaking if instruction changes or unmounts
  useEffect(() => {
    speechService.stop();
    setIsSpeaking(false);
  }, [instruction]);

  const toggleSpeech = () => {
    if (isSpeaking) {
      speechService.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${instruction}. ${subtext || ''} ${feedback ? feedback.message : ''}`;
      speechService.speak(textToRead, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md transition-colors">
      {/* Top row: step indicator and Help + Audio action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b-2 border-slate-200">
        {stepNumber && totalSteps && (
          <span className="text-xl font-extrabold text-blue-800 bg-blue-100 px-4 py-1.5 rounded-full">
            {stepNumber}. lépés a {totalSteps}-ből
          </span>
        )}

        <div className="flex items-center gap-3 ml-auto">
          {/* Audio narration button */}
          <button
            onClick={toggleSpeech}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xl transition-all
              ${isSpeaking 
                ? 'bg-amber-500 hover:bg-amber-600 text-white border-2 border-amber-700 animate-pulse' 
                : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-2 border-emerald-400'}
            `}
            title="Felolvassa az instrukciót magyarul"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-7 h-7 text-white" />
                <span>⏹ Megállítás</span>
              </>
            ) : (
              <>
                <Volume2 className="w-7 h-7 text-emerald-800" />
                <span>🔊 Meghallgatom</span>
              </>
            )}
          </button>

          {/* Help toggle button */}
          {onHelpClick && (
            <button
              onClick={onHelpClick}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xl transition-all
                ${isHelpActive 
                  ? 'bg-amber-600 text-white border-2 border-amber-800 shadow-md ring-4 ring-amber-300' 
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-2 border-amber-400'}
              `}
              title="Megmutatja, melyik gombra kell kattintani"
            >
              <HelpCircle className="w-7 h-7 text-amber-800" />
              <span>❓ SEGÍTSÉG</span>
            </button>
          )}
        </div>
      </div>

      {/* Main instruction text */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug tracking-normal">
        {instruction}
      </h2>

      {subtext && (
        <p className="mt-2 text-xl sm:text-2xl text-slate-600 font-medium">
          {subtext}
        </p>
      )}

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`
            mt-5 p-4 rounded-2xl border-4 text-xl sm:text-2xl font-bold flex items-center gap-3 transition-all
            ${feedback.type === 'success' ? 'bg-emerald-100 text-emerald-900 border-emerald-500' : ''}
            ${feedback.type === 'retry' ? 'bg-amber-100 text-amber-900 border-amber-500' : ''}
            ${feedback.type === 'neutral' ? 'bg-blue-100 text-blue-900 border-blue-400' : ''}
          `}
          role="status"
          aria-live="polite"
        >
          <span>{feedback.message}</span>
        </div>
      )}
    </div>
  );
};
