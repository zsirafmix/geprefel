import React, { useState } from 'react';
import { InstructionBox } from '../components/InstructionBox';
import { LargeButton } from '../components/LargeButton';
import { SuccessModal } from '../components/SuccessModal';
import { soundService } from '../services/soundService';
import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface SafetyLessonViewProps {
  onComplete: () => void;
  onNextLesson: () => void;
}

export const SafetyLessonView: React.FC<SafetyLessonViewProps> = ({
  onComplete,
  onNextLesson,
}) => {
  const [scenarioIndex, setScenarioIndex] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'retry' | 'neutral'; message: string } | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState<boolean>(false);

  const scenarios = [
    {
      id: 1,
      title: '1. Helyzet: Gyanús nyeremény',
      prompt: 'Ez az üzenet jelenik meg hirtelen a képernyőn:',
      messageBox: {
        icon: '🎁',
        headline: 'GRATULÁLUNK! Ön nyert 1 000 000 Ft-ot!',
        subtext: 'Kattintson ide MOST a nyeremény átvételéhez, különben elvész!',
        bgClass: 'bg-red-50 border-red-500 text-red-950',
      },
      question: 'Mit tennél ebben a helyzetben?',
      options: [
        {
          text: 'Rákattintok a nyereményre',
          isCorrect: false,
          explanation: 'Vigyázat! A túlságosan szépnek tűnő, azonnali pénzt ígérő és sürgető üzenetek szinte mindig csalások. Nem szabad rájuk kattintani!',
        },
        {
          text: 'Nem kattintok rá, bezárom',
          isCorrect: true,
          explanation: '✅ Helyes döntés! Az ilyen sürgető üzenetek gyakran csalások. A legjobb egyszerűen figyelmen kívül hagyni és bezárni őket.',
        },
      ],
    },
    {
      id: 2,
      title: '2. Helyzet: Banki adatok kérése',
      prompt: 'Egy ismeretlen feladó azt írja: „A bankja kéri a bankkártyája PIN kódját egy űrlapon.”',
      messageBox: {
        icon: '💳',
        headline: 'Banki biztonsági értesítés',
        subtext: 'Kérjük, adja meg bankkártya számát és 4 jegyű PIN kódját az azonosításhoz.',
        bgClass: 'bg-amber-50 border-amber-500 text-amber-950',
      },
      question: 'Mit tennél?',
      options: [
        {
          text: 'Megadom a PIN kódomat',
          isCorrect: false,
          explanation: 'Vigyázat! Egy valódi bank SOHA nem kéri el a PIN kódot vagy a titkos jelszót sem interneten, sem telefonon, sem SMS-ben!',
        },
        {
          text: 'Soha nem adom meg a PIN kódomat',
          isCorrect: true,
          explanation: '✅ Helyes! A bankkártya PIN kódja és a jelszavak szigorúan titkosak, azokat soha senkinek nem szabad megadni.',
        },
      ],
    },
    {
      id: 3,
      title: '3. Helyzet: Ismeretlen letöltés',
      prompt: 'Egy idegen weboldalon egy nagy gomb azt írja: „Töltse le ezt az ismeretlen programot!”',
      messageBox: {
        icon: '⚠️',
        headline: 'Ismeretlen letöltési ajánlat',
        subtext: 'Kattintson ide a gyorsító program azonnali telepítéséhez!',
        bgClass: 'bg-blue-50 border-blue-500 text-blue-950',
      },
      question: 'Mit teszel?',
      options: [
        {
          text: 'Letöltöm és futtatom',
          isCorrect: false,
          explanation: 'Vigyázat! Ismeretlen programokat nem szabad letölteni, mert vírusok vagy kéretlen alkalmazások lehetnek.',
        },
        {
          text: 'Nem töltöm le, segítséget kérek',
          isCorrect: true,
          explanation: '✅ Kitűnő! Ismeretlen programokat soha ne telepítsünk, kétség esetén mindig kérjünk meg egy családtagot vagy hozzáértőt.',
        },
      ],
    },
  ];

  const currentScenario = scenarios[scenarioIndex];

  const handleSelectOption = (isCorrect: boolean, explanation: string) => {
    if (isCorrect) {
      soundService.playSuccess();
      setFeedback({ type: 'success', message: explanation });
      setIsAnsweredCorrectly(true);
    } else {
      soundService.playGentleNotice();
      setFeedback({ type: 'retry', message: explanation });
    }
  };

  const handleNextScenario = () => {
    soundService.playClick();
    if (scenarioIndex + 1 < scenarios.length) {
      setScenarioIndex(prev => prev + 1);
      setFeedback(null);
      setIsAnsweredCorrectly(false);
    } else {
      onComplete();
      setIsSuccessOpen(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <InstructionBox
        stepNumber={scenarioIndex + 1}
        totalSteps={scenarios.length}
        instruction={currentScenario.prompt}
        feedback={feedback}
      />

      {/* Simulated Message Card */}
      <div className={`p-8 rounded-3xl border-8 shadow-xl max-w-3xl mx-auto text-center space-y-4 ${currentScenario.messageBox.bgClass}`}>
        <span className="text-7xl block">{currentScenario.messageBox.icon}</span>
        <h3 className="text-3xl sm:text-4xl font-black">{currentScenario.messageBox.headline}</h3>
        <p className="text-2xl font-bold">{currentScenario.messageBox.subtext}</p>
      </div>

      {/* Question and Decision Buttons */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-10 shadow-lg max-w-3xl mx-auto text-center space-y-6">
        <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {currentScenario.question}
        </h4>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          {currentScenario.options.map((opt, idx) => (
            <LargeButton
              key={idx}
              variant={opt.isCorrect && isAnsweredCorrectly ? 'success' : 'secondary'}
              onClick={() => handleSelectOption(opt.isCorrect, opt.explanation)}
              className="w-full sm:w-1/2 text-2xl py-6"
            >
              {opt.text}
            </LargeButton>
          ))}
        </div>

        {isAnsweredCorrectly && (
          <div className="pt-4">
            <LargeButton
              variant="primary"
              onClick={handleNextScenario}
              className="text-2xl px-10 py-5"
            >
              {scenarioIndex + 1 < scenarios.length ? 'Következő helyzet ➔' : 'Biztonsági összefoglaló ➔'}
            </LargeButton>
          </div>
        )}
      </div>

      {/* Golden Rules Safety Checklist */}
      <div className="bg-emerald-50 border-4 border-emerald-400 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto shadow space-y-4">
        <h3 className="text-2xl sm:text-3xl font-black text-emerald-950 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-700" />
          <span>A biztonság 5 legfontosabb aranyszabálya:</span>
        </h3>

        <ul className="space-y-3 text-xl sm:text-2xl text-emerald-900 font-medium">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-1" />
            <span><strong>1. Titkos jelszavak:</strong> Soha ne add meg jelszavadat vagy PIN kódodat idegennek!</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-1" />
            <span><strong>2. Bankkártya védelem:</strong> Csak jól ismert, megbízható oldalon vásárolj!</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-1" />
            <span><strong>3. Sürgető üzenetek:</strong> Ha egy üzenet azonnali kattintásra sürget, legyél óvatos!</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-1" />
            <span><strong>4. Idegen programok:</strong> Ismeretlen szoftvert ne telepíts a gépedre!</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-600 flex-shrink-0 mt-1" />
            <span><strong>5. Kérj bátran segítséget:</strong> Ha nem vagy biztos valamiben, szólj a családnak!</span>
          </li>
        </ul>
      </div>

      <SuccessModal
        isOpen={isSuccessOpen}
        title="🎉 Gratulálok!"
        message="Sikeresen teljesítetted a biztonsági feladatokat! Most már tudod, hogyan védheted meg magad a csalásoktól az interneten!"
        onNextLesson={onNextLesson}
        nextLessonTitle="Gyakorló sarok"
        onPracticeMore={() => {
          setIsSuccessOpen(false);
          setScenarioIndex(0);
          setIsAnsweredCorrectly(false);
        }}
      />
    </div>
  );
};
