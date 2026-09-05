import React, { useState } from 'react';
import { InstructionBox } from '../components/InstructionBox';
import { HelpHighlight } from '../components/HelpHighlight';
import { SuccessModal } from '../components/SuccessModal';
import { soundService } from '../services/soundService';
import { Folder, Heart } from 'lucide-react';

interface MouseLessonViewProps {
  onComplete: () => void;
  onNextLesson: () => void;
}

export const MouseLessonView: React.FC<MouseLessonViewProps> = ({
  onComplete,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'retry' | 'neutral'; message: string } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);

  // For step 3: double click tracking with generous tolerance
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);

  // For step 6: folder open state
  const [folderOpen, setFolderOpen] = useState<boolean>(false);

  const getInstruction = () => {
    switch (step) {
      case 1:
        return 'Mozgasd az egeret a nagy kék körre!';
      case 2:
        return 'Nagyon jó! Most kattints egyszer a sárga körre a bal egérgombbal!';
      case 3:
        return 'Ügyes! Most kattints kétszer egymás után gyorsan a zöld körre!';
      case 4:
        return 'Kattints a piros ALMÁRA!';
      case 5:
        return 'Keresd meg és kattints a KUTYUSRA!';
      case 6:
        return 'Nyisd meg a fényképek mappát dupla kattintással!';
      default:
        return 'Egér lecke befejezve!';
    }
  };

  const advanceStep = (successMsg: string = '✅ Nagyon jó!') => {
    soundService.playSuccess();
    setFeedback({ type: 'success', message: successMsg });
    setIsHelpActive(false);
    setTimeout(() => {
      if (step < 6) {
        setStep(prev => prev + 1);
        setFeedback(null);
        setClickCount(0);
      } else {
        onComplete();
        setIsSuccessOpen(true);
      }
    }, 1100);
  };

  // Step 1: Hover detection
  const handleStep1Hover = () => {
    if (step === 1) {
      advanceStep('✅ Sikerült rátolnod az egeret! Nagyszerű!');
    }
  };

  // Step 2: Single click
  const handleStep2Click = () => {
    if (step === 2) {
      advanceStep('✅ Pontos kattintás! Nagyon jó!');
    }
  };

  // Step 3: Double click with patient timer (up to 1200ms)
  const handleStep3Click = () => {
    if (step !== 3) return;
    const now = Date.now();
    soundService.playClick();

    if (now - lastClickTime < 1200 && clickCount >= 1) {
      advanceStep('✅ Sikerült a dupla kattintás! Bravó!');
    } else {
      setLastClickTime(now);
      setClickCount(1);
      setFeedback({
        type: 'neutral',
        message: 'Egy kattintás megvolt, most még egyet gyorsan!'
      });
    }
  };

  // Step 4: Fruit click
  const handleFruitClick = (fruit: string) => {
    soundService.playClick();
    if (fruit === 'apple') {
      advanceStep('✅ Megtaláltad az almát!');
    } else {
      soundService.playGentleNotice();
      setFeedback({
        type: 'retry',
        message: 'Ez nem az alma. Semmi gond, keresd a piros almát!'
      });
    }
  };

  // Step 5: Animal click
  const handleAnimalClick = (animal: string) => {
    soundService.playClick();
    if (animal === 'dog') {
      advanceStep('✅ Ügyes vagy, ez a kutyus!');
    } else {
      soundService.playGentleNotice();
      setFeedback({
        type: 'retry',
        message: 'Ez nem a kutyus. Semmi gond, próbáld meg újra!'
      });
    }
  };

  // Step 6: Folder double click
  const handleFolderClick = () => {
    if (step !== 6) return;
    const now = Date.now();
    soundService.playClick();

    if (now - lastClickTime < 1300 && clickCount >= 1) {
      setFolderOpen(true);
      advanceStep('✅ Sikerült kinyitnod a fényképek mappát!');
    } else {
      setLastClickTime(now);
      setClickCount(1);
      setFeedback({
        type: 'neutral',
        message: 'Egy kattintás kész, kattints rá még egyszer gyorsan a kinyitáshoz!'
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <InstructionBox
        stepNumber={step}
        totalSteps={6}
        instruction={getInstruction()}
        feedback={feedback}
        onHelpClick={() => setIsHelpActive(!isHelpActive)}
        isHelpActive={isHelpActive}
      />

      <HelpHighlight
        active={isHelpActive}
        message="Erre az elemre vidd az egeret vagy kattints:"
      />

      {/* Exercise Arena */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-8 sm:p-12 min-h-[380px] flex items-center justify-center shadow-lg relative">
        {/* Step 1: Hover circle */}
        {step === 1 && (
          <div
            onMouseEnter={handleStep1Hover}
            className={`
              w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-blue-500 hover:bg-emerald-500 border-8 border-blue-700
              flex flex-col items-center justify-center text-white text-center p-6 shadow-2xl transition-all duration-300 cursor-pointer select-none
              ${isHelpActive ? 'help-highlight-target ring-8 ring-amber-300' : ''}
            `}
          >
            <span className="text-6xl mb-2">🎯</span>
            <span className="text-2xl sm:text-3xl font-black">Húzd ide az egeret!</span>
          </div>
        )}

        {/* Step 2: Single click circle */}
        {step === 2 && (
          <button
            onClick={handleStep2Click}
            className={`
              w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-amber-400 hover:bg-amber-500 border-8 border-amber-600
              flex flex-col items-center justify-center text-slate-950 text-center p-6 shadow-2xl transition-transform active:scale-95 cursor-pointer select-none
              ${isHelpActive ? 'help-highlight-target ring-8 ring-amber-300' : ''}
            `}
          >
            <span className="text-6xl mb-2">👆</span>
            <span className="text-2xl sm:text-3xl font-black">Kattints rám 1-szer!</span>
          </button>
        )}

        {/* Step 3: Double click circle */}
        {step === 3 && (
          <button
            onClick={handleStep3Click}
            className={`
              w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-emerald-500 hover:bg-emerald-600 border-8 border-emerald-700
              flex flex-col items-center justify-center text-white text-center p-6 shadow-2xl transition-transform active:scale-95 cursor-pointer select-none
              ${isHelpActive ? 'help-highlight-target ring-8 ring-amber-300' : ''}
            `}
          >
            <span className="text-6xl mb-2">✌️</span>
            <span className="text-2xl sm:text-3xl font-black">
              {clickCount === 1 ? 'Még egyet!' : 'Kattints kétszer gyorsan!'}
            </span>
          </button>
        )}

        {/* Step 4: Fruits */}
        {step === 4 && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            <button
              onClick={() => handleFruitClick('banana')}
              className="p-8 bg-amber-50 hover:bg-amber-100 border-4 border-amber-300 rounded-3xl flex flex-col items-center text-center shadow-md active:scale-95"
            >
              <span className="text-7xl">🍌</span>
              <span className="text-2xl font-black mt-3 text-slate-800">Banán</span>
            </button>

            <button
              onClick={() => handleFruitClick('apple')}
              className={`
                p-8 bg-red-50 hover:bg-red-100 border-4 border-red-400 rounded-3xl flex flex-col items-center text-center shadow-lg active:scale-95
                ${isHelpActive ? 'help-highlight-target ring-8 ring-amber-300 !border-amber-500' : ''}
              `}
            >
              <span className="text-7xl">🍎</span>
              <span className="text-2xl font-black mt-3 text-red-900">Alma</span>
            </button>

            <button
              onClick={() => handleFruitClick('grapes')}
              className="p-8 bg-purple-50 hover:bg-purple-100 border-4 border-purple-300 rounded-3xl flex flex-col items-center text-center shadow-md active:scale-95"
            >
              <span className="text-7xl">🍇</span>
              <span className="text-2xl font-black mt-3 text-slate-800">Szőlő</span>
            </button>
          </div>
        )}

        {/* Step 5: Animals */}
        {step === 5 && (
          <div className="flex flex-wrap items-center justify-center gap-8">
            <button
              onClick={() => handleAnimalClick('cat')}
              className="p-8 bg-slate-50 hover:bg-slate-100 border-4 border-slate-300 rounded-3xl flex flex-col items-center text-center shadow-md active:scale-95"
            >
              <span className="text-7xl">🐱</span>
              <span className="text-2xl font-black mt-3 text-slate-800">Cica</span>
            </button>

            <button
              onClick={() => handleAnimalClick('dog')}
              className={`
                p-8 bg-amber-50 hover:bg-amber-100 border-4 border-amber-400 rounded-3xl flex flex-col items-center text-center shadow-lg active:scale-95
                ${isHelpActive ? 'help-highlight-target ring-8 ring-amber-300 !border-amber-500' : ''}
              `}
            >
              <span className="text-7xl">🐶</span>
              <span className="text-2xl font-black mt-3 text-amber-950">Kutya</span>
            </button>

            <button
              onClick={() => handleAnimalClick('bird')}
              className="p-8 bg-blue-50 hover:bg-blue-100 border-4 border-blue-300 rounded-3xl flex flex-col items-center text-center shadow-md active:scale-95"
            >
              <span className="text-7xl">🐦</span>
              <span className="text-2xl font-black mt-3 text-slate-800">Madárka</span>
            </button>
          </div>
        )}

        {/* Step 6: Folder Double Click */}
        {step === 6 && (
          <div className="flex flex-col items-center text-center">
            {!folderOpen ? (
              <button
                onClick={handleFolderClick}
                className={`
                  p-10 bg-yellow-100 hover:bg-yellow-200 border-4 border-yellow-500 rounded-3xl flex flex-col items-center shadow-xl active:scale-95 transition-all
                  ${isHelpActive ? 'help-highlight-target ring-8 ring-amber-300' : ''}
                `}
              >
                <Folder className="w-28 h-28 text-yellow-600 drop-shadow" />
                <span className="text-3xl font-black mt-4 text-slate-900">
                  📁 Családi fényképek
                </span>
                <span className="text-xl text-slate-600 font-bold mt-2">
                  (Kattints rá kétszer egymás után!)
                </span>
              </button>
            ) : (
              <div className="bg-emerald-50 border-4 border-emerald-500 rounded-3xl p-8 max-w-md shadow-2xl text-center space-y-4 animate-scaleUp">
                <span className="text-6xl">🏡</span>
                <h3 className="text-3xl font-black text-emerald-950">Mappa kinyitva!</h3>
                <p className="text-2xl text-emerald-800 font-bold">
                  Bravó! Láthatod a fényképeket a mappában!
                </p>
                <div className="flex items-center justify-center gap-2 text-emerald-700 text-xl font-bold">
                  <Heart className="w-6 h-6 fill-emerald-600 text-emerald-600" />
                  <span>Kész vagy az egér leckével!</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <SuccessModal
        isOpen={isSuccessOpen}
        title="🎉 Gratulálok!"
        message="Megtanultad az egér alapvető használatát: a mozgatást, a sima kattintást és a dupla kattintást is!"
        onNextLesson={onNextLesson}
        nextLessonTitle="Billentyűzet lecke"
        onPracticeMore={() => {
          setIsSuccessOpen(false);
          setStep(1);
          setFolderOpen(false);
        }}
      />
    </div>
  );
};
