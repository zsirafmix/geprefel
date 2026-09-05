import React, { useState, useEffect, useRef } from 'react';
import { InstructionBox } from '../components/InstructionBox';
import { HelpHighlight } from '../components/HelpHighlight';
import { SuccessModal } from '../components/SuccessModal';
import { VirtualKeyboard } from '../components/VirtualKeyboard';
import { soundService } from '../services/soundService';

interface KeyboardLessonViewProps {
  onComplete: () => void;
  onNextLesson: () => void;
}

export const KeyboardLessonView: React.FC<KeyboardLessonViewProps> = ({
  onComplete,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'retry' | 'neutral'; message: string } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);

  // User input buffers
  const [inputText, setInputText] = useState<string>('');
  const [shiftActive, setShiftActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  // Set initial text for step 4 (Backspace practice with typo: "kávvé")
  useEffect(() => {
    if (step === 4) {
      setInputText('kávvé');
    } else if (step === 5) {
      setInputText('');
    }
  }, [step]);

  const getInstruction = () => {
    switch (step) {
      case 1:
        return 'Írd be a keresztnevedet a fehér mezőbe!';
      case 2:
        return 'Nagyon jó! Most nyomd meg az ENTER billentyűt a jóváhagyáshoz!';
      case 3:
        return 'Gyakoroljuk a SZÓKÖZT: írd be, hogy „Jó napot”! (A két szó közé nyomd meg a hosszú szóköz billentyűt)';
      case 4:
        return 'Javítsunk hibát a BACKSPACE (törlés) gombbal: töröld ki a felesleges „v” betűt a „kávvé” szóból!';
      case 5:
        return 'Nagybetű írása a SHIFT billentyűvel: Írj be egy nagy „A” betűt!';
      case 6:
        return 'Írd le pontosan ezt a mondatot: „Ma szép idő van.”';
      default:
        return 'Gépelési feladatok befejezve!';
    }
  };

  const getTargetKey = (): string | undefined => {
    if (step === 2) return 'Enter';
    if (step === 3 && (inputText === 'Jó' || inputText === 'jó')) return ' ';
    if (step === 4 && inputText.includes('kávv')) return 'Backspace';
    if (step === 5 && inputText.length === 0) return 'Shift';
    return undefined;
  };

  const advanceStep = (msg: string = '✅ Nagyon jó!') => {
    soundService.playSuccess();
    setFeedback({ type: 'success', message: msg });
    setIsHelpActive(false);
    setTimeout(() => {
      if (step < 6) {
        setStep(prev => prev + 1);
        setInputText('');
        setFeedback(null);
      } else {
        onComplete();
        setIsSuccessOpen(true);
      }
    }, 1200);
  };

  const handleKeyPress = (key: string) => {
    if (key === 'Shift') {
      setShiftActive(!shiftActive);
      return;
    }

    if (key === 'Enter') {
      handleEnterPress();
      return;
    }

    if (key === 'Backspace') {
      setInputText(prev => prev.slice(0, -1));
      checkStepConditions(inputText.slice(0, -1));
      return;
    }

    // Normal character
    const char = shiftActive ? key.toUpperCase() : key;
    const nextText = inputText + char;
    setInputText(nextText);
    setShiftActive(false);
    checkStepConditions(nextText);
  };

  const checkStepConditions = (text: string) => {
    if (step === 1 && text.trim().length >= 2) {
      // Name entered
      setTimeout(() => {
        advanceStep(`✅ Kedves ${text}! Örülünk neked!`);
      }, 500);
    } else if (step === 3 && text.trim().toLowerCase() === 'jó napot') {
      advanceStep('✅ Sikerült szóközzel elválasztani a szavakat!');
    } else if (step === 4 && text.trim().toLowerCase() === 'kávé') {
      advanceStep('✅ Ügyes javítás! A Backspace-szel bármikor javíthatsz!');
    } else if (step === 5 && text === 'A') {
      advanceStep('✅ Bravó! Sikerült nagybetűt írni a Shift gombbal!');
    } else if (step === 6 && (text.trim() === 'Ma szép idő van.' || text.trim() === 'Ma szép idő van')) {
      advanceStep('✅ Fantasztikus! Teljes magyar mondatot gépeltél be!');
    }
  };

  const handleEnterPress = () => {
    if (step === 2) {
      advanceStep('✅ Megnyomtad az Entert! Ezzel adhatsz utasítást a gépnek!');
    } else if (step === 6) {
      if (inputText.trim() === 'Ma szép idő van.' || inputText.trim() === 'Ma szép idő van') {
        advanceStep('✅ Teljes siker!');
      } else {
        soundService.playGentleNotice();
        setFeedback({
          type: 'retry',
          message: 'Majdnem sikerült. Próbáld meg pontosan így leírni: „Ma szép idő van.”'
        });
      }
    }
  };

  const handlePhysicalKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEnterPress();
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
        message="Erre a billentyűre vagy beviteli mezőre koncentrálj:"
      />

      {/* Input Display Area */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-4">
        <label htmlFor="keyboard-lesson-input" className="block text-2xl font-bold text-slate-700">
          Amit beírtál:
        </label>
        
        <div className="relative max-w-xl mx-auto">
          <input
            id="keyboard-lesson-input"
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
              checkStepConditions(e.target.value);
            }}
            onKeyDown={handlePhysicalKeyDown}
            placeholder="Kattints ide és gépelj..."
            className={`
              w-full text-center text-3xl sm:text-4xl font-extrabold px-6 py-4 rounded-2xl border-4 outline-none transition-all
              ${isHelpActive && !getTargetKey()
                ? 'help-highlight-target border-amber-500 ring-4 ring-amber-300'
                : 'border-blue-500 focus:border-blue-700 bg-blue-50/20'}
            `}
          />
        </div>

        {step === 6 && (
          <div className="text-xl sm:text-2xl text-slate-600 font-medium">
            Cél: <span className="font-bold text-blue-900 bg-blue-100 px-3 py-1 rounded-xl">Ma szép idő van.</span>
          </div>
        )}
      </div>

      {/* Onscreen visual keyboard */}
      <VirtualKeyboard
        onKeyPress={handleKeyPress}
        targetKey={isHelpActive ? getTargetKey() : undefined}
        showShift={shiftActive}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        title="🎉 Gratulálok!"
        message="Megtanultad a billentyűzet legfontosabb funkcióit: a betűk beírását, a szóközt, az Entert, a visszatörlést és a nagybetűket!"
        onNextLesson={onNextLesson}
        nextLessonTitle="Virtuális számítógép"
        onPracticeMore={() => {
          setIsSuccessOpen(false);
          setStep(1);
          setInputText('');
        }}
      />
    </div>
  );
};
