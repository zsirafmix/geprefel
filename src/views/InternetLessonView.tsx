import React, { useState } from 'react';
import { InstructionBox } from '../components/InstructionBox';
import { HelpHighlight } from '../components/HelpHighlight';
import { SuccessModal } from '../components/SuccessModal';
import { VirtualBrowser } from '../components/VirtualBrowser';
import { soundService } from '../services/soundService';

interface InternetLessonViewProps {
  onComplete: () => void;
  onNextLesson: () => void;
}

export const InternetLessonView: React.FC<InternetLessonViewProps> = ({
  onComplete,
  onNextLesson,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isHelpActive, setIsHelpActive] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'retry' | 'neutral'; message: string } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<'search' | 'results' | 'recipe'>('search');

  const getInstruction = () => {
    switch (step) {
      case 1:
        return 'Keressünk rá az időjárásra! Kattints a keresőmezőbe, írd be, hogy „időjárás”, majd nyomd meg a Keresés gombot!';
      case 2:
        return 'Megjelentek a találatok! Kattints a kék színű Almás Pite Recept hivatkozásra!';
      case 3:
        return 'Nagyszerű! Most lépj vissza a találatokhoz a bal felső VISSZA nyíllal (←)!';
      case 4:
        return 'Végül zárd be a böngészőt a bal felső piros X gomb megnyomásával!';
      default:
        return 'Internet lecke befejezve!';
    }
  };

  const advanceStep = (msg: string) => {
    soundService.playSuccess();
    setFeedback({ type: 'success', message: msg });
    setIsHelpActive(false);
    setTimeout(() => {
      if (step < 4) {
        setStep(prev => prev + 1);
        setFeedback(null);
      } else {
        onComplete();
        setIsSuccessOpen(true);
      }
    }, 1100);
  };

  const handleSearchSubmit = () => {
    if (step === 1) {
      setActivePage('results');
      advanceStep('✅ Sikeres keresés! Megtaláltad a mai időjárást és a recepteket!');
    }
  };

  const handleLinkClick = () => {
    if (step === 2) {
      setActivePage('recipe');
      advanceStep('✅ Sikeresen megnyitottad a receptet egy linkre kattintva!');
    }
  };

  const handleBackClick = () => {
    if (step === 3) {
      setActivePage('results');
      advanceStep('✅ Bravó! Sikeresen visszaléptél az előző oldalra a Vissza gombbal!');
    }
  };

  const handleCloseClick = () => {
    if (step === 4) {
      advanceStep('✅ Sikerült bezárni a böngészőt!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <InstructionBox
        stepNumber={step}
        totalSteps={4}
        instruction={getInstruction()}
        feedback={feedback}
        onHelpClick={() => setIsHelpActive(!isHelpActive)}
        isHelpActive={isHelpActive}
      />

      <HelpHighlight
        active={isHelpActive}
        message="Erre a gombra vagy hivatkozásra kattints a böngészőben:"
      />

      <VirtualBrowser
        activePage={activePage}
        onSearchSubmit={handleSearchSubmit}
        onLinkClick={handleLinkClick}
        onBackClick={handleBackClick}
        onCloseClick={handleCloseClick}
        highlightSearchBox={isHelpActive && step === 1}
        highlightSearchBtn={isHelpActive && step === 1}
        highlightRecipeLink={isHelpActive && step === 2}
        highlightBackBtn={isHelpActive && step === 3}
        highlightCloseBtn={isHelpActive && step === 4}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        title="🎉 Gratulálok!"
        message="Megtanultad az internet alapjait: hogyan kell keresni, linkre kattintani, visszalépni és bezárni az ablakot!"
        onNextLesson={onNextLesson}
        nextLessonTitle="Biztonság a neten"
        onPracticeMore={() => {
          setIsSuccessOpen(false);
          setStep(1);
          setActivePage('search');
        }}
      />
    </div>
  );
};
