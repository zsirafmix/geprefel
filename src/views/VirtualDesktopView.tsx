import React, { useState } from 'react';
import { InstructionBox } from '../components/InstructionBox';
import { HelpHighlight } from '../components/HelpHighlight';
import { SuccessModal } from '../components/SuccessModal';
import { VirtualDesktop } from '../components/VirtualDesktop';
import { soundService } from '../services/soundService';

interface VirtualDesktopViewProps {
  onComplete: () => void;
  onNextLesson: () => void;
}

export const VirtualDesktopView: React.FC<VirtualDesktopViewProps> = ({
  onComplete,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'retry' | 'neutral'; message: string } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);

  const getInstruction = () => {
    switch (step) {
      case 1:
        return 'Ismerkedj meg a virtuális Asztallal! Kattints a 📁 KÉPEK ikonra!';
      case 2:
        return 'Nagyon szép! Most kattints a 📝 JEGYZET ikonra a jegyzetfüzet kipróbálásához!';
      case 3:
        return 'Bravó! Most indítsd el a böngészőt: kattints a 🌐 INTERNET ikonra!';
      default:
        return 'Virtuális Asztal feladatok teljesítve!';
    }
  };

  const advanceStep = (msg: string) => {
    soundService.playSuccess();
    setFeedback({ type: 'success', message: msg });
    setIsHelpActive(false);
    setTimeout(() => {
      if (step < 3) {
        setStep(prev => prev + 1);
        setFeedback(null);
      } else {
        onComplete();
        setIsSuccessOpen(true);
      }
    }, 1100);
  };

  const handleOpenFolder = () => {
    if (step === 1) {
      advanceStep('✅ Sikerült megnyitni a Képek mappát!');
    }
  };

  const handleOpenNotes = () => {
    if (step === 2) {
      advanceStep('✅ Megnyitottad a Jegyzetfüzetet!');
    }
  };

  const handleOpenInternet = () => {
    if (step === 3) {
      advanceStep('✅ Sikeresen elindítottad az Internetet!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <InstructionBox
        stepNumber={step}
        totalSteps={3}
        instruction={getInstruction()}
        feedback={feedback}
        onHelpClick={() => setIsHelpActive(!isHelpActive)}
        isHelpActive={isHelpActive}
      />

      <HelpHighlight
        active={isHelpActive}
        message="Erre az asztali ikonra kattints:"
      />

      <VirtualDesktop
        onOpenFolder={handleOpenFolder}
        onOpenNotes={handleOpenNotes}
        onOpenInternet={handleOpenInternet}
        highlightFolderIcon={isHelpActive && step === 1}
        highlightNotesIcon={isHelpActive && step === 2}
        highlightInternetIcon={isHelpActive && step === 3}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        title="🎉 Gratulálok!"
        message="Megtanultad használni a számítógép Asztalát, és magabiztosan meg tudod nyitni az ikonokat és mappákat!"
        onNextLesson={onNextLesson}
        nextLessonTitle="Internet használata"
        onPracticeMore={() => {
          setIsSuccessOpen(false);
          setStep(1);
        }}
      />
    </div>
  );
};
