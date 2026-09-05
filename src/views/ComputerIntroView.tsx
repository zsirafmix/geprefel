import React, { useState } from 'react';
import { InstructionBox } from '../components/InstructionBox';
import { HelpHighlight } from '../components/HelpHighlight';
import { SuccessModal } from '../components/SuccessModal';
import { soundService } from '../services/soundService';
import { Power, Monitor, Mouse, Keyboard } from 'lucide-react';

interface ComputerIntroViewProps {
  onComplete: () => void;
  onNextLesson: () => void;
}

export const ComputerIntroView: React.FC<ComputerIntroViewProps> = ({
  onComplete,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'retry' | 'neutral'; message: string } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [activeExplanation, setActiveExplanation] = useState<string>('Kattints bármelyik eszközre a képernyőn, hogy megtudd, mire való!');

  const items = [
    {
      id: 'mouse',
      name: 'Egér',
      icon: <Mouse className="w-16 h-16 text-blue-600" />,
      desc: 'Ez az egér. Segítségével tudod megmutatni a számítógépnek, hogy mire szeretnél kattintani.',
      instructionStep: 1,
    },
    {
      id: 'monitor',
      name: 'Monitor (Képernyő)',
      icon: <Monitor className="w-16 h-16 text-purple-600" />,
      desc: 'Ez a monitor. Olyan, mint egy kis televízió: ezen látod a betűket, képeket és az oldalakat.',
      instructionStep: 2,
    },
    {
      id: 'keyboard',
      name: 'Billentyűzet',
      icon: <Keyboard className="w-16 h-16 text-emerald-600" />,
      desc: 'Ez a billentyűzet. Rajta vannak a betűk és számok, ezzel tudsz szöveget beírni a gépbe.',
      instructionStep: 3,
    },
    {
      id: 'power',
      name: 'Bekapcsológomb',
      icon: <Power className="w-16 h-16 text-amber-600" />,
      desc: 'Ez a bekapcsológomb. Ennek megnyomásával indul el vagy alszik el a számítógép.',
      instructionStep: 4,
    },
  ];

  const getInstruction = () => {
    switch (step) {
      case 1:
        return 'Kattints az EGÉR kártyájára!';
      case 2:
        return 'Nagyon jó! Most kattints a MONITOR (képernyő) kártyájára!';
      case 3:
        return 'Ügyes vagy! Most kattints a BILLENTYŰZET kártyájára!';
      case 4:
        return 'Utolsó lépés: Kapcsold be a gépet a BEKAPCSOLÓGOMB megnyomásával!';
      default:
        return 'Minden fő részt megismertél!';
    }
  };

  const handleCardClick = (id: string) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    soundService.playClick();
    setActiveExplanation(item.desc);

    if (
      (step === 1 && id === 'mouse') ||
      (step === 2 && id === 'monitor') ||
      (step === 3 && id === 'keyboard')
    ) {
      soundService.playSuccess();
      setFeedback({ type: 'success', message: '✅ Nagyon jó!' });
      setIsHelpActive(false);
      setTimeout(() => {
        setStep(prev => prev + 1);
        setFeedback(null);
      }, 1000);
    } else if (step === 4 && id === 'power') {
      soundService.playSuccess();
      setFeedback({ type: 'success', message: '✅ Csodálatos! A számítógép készen áll a tanulásra!' });
      setIsHelpActive(false);
      onComplete();
      setTimeout(() => {
        setIsSuccessOpen(true);
      }, 800);
    } else {
      soundService.playGentleNotice();
      setFeedback({
        type: 'retry',
        message: `Ez a(z) ${item.name}. Semmi gond, próbáld meg megkeresni az instrukcióban kért elemet!`
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <InstructionBox
        stepNumber={step}
        totalSteps={4}
        instruction={getInstruction()}
        subtext={activeExplanation}
        feedback={feedback}
        onHelpClick={() => setIsHelpActive(!isHelpActive)}
        isHelpActive={isHelpActive}
      />

      <HelpHighlight
        active={isHelpActive}
        message="Erre az eszközre kattints a képernyőn:"
      />

      {/* 4 Large Interactive Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
        {items.map((item) => {
          const isCurrentTarget = item.instructionStep === step;

          return (
            <button
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className={`
                bg-white border-4 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg transition-all duration-300 active:scale-95
                hover:border-blue-500 hover:shadow-xl
                ${isHelpActive && isCurrentTarget ? 'help-highlight-target ring-8 ring-amber-300 !border-amber-500' : 'border-slate-300'}
              `}
            >
              <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center mb-4 shadow-inner">
                {item.icon}
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-2">
                {item.name}
              </h3>
              <p className="text-xl text-slate-600 font-medium">
                {item.desc}
              </p>
            </button>
          );
        })}
      </div>

      <SuccessModal
        isOpen={isSuccessOpen}
        title="🎉 Gratulálok!"
        message="Sikeresen megismerted a számítógép legfontosabb részeit: a monitort, az egeret, a billentyűzetet és a bekapcsolást!"
        onNextLesson={onNextLesson}
        nextLessonTitle="Egér használata"
        onPracticeMore={() => {
          setIsSuccessOpen(false);
          setStep(1);
        }}
      />
    </div>
  );
};
