import React, { useState } from 'react';
import { LargeButton } from '../components/LargeButton';
import { VirtualKeyboard } from '../components/VirtualKeyboard';
import { VirtualBrowser } from '../components/VirtualBrowser';
import { soundService } from '../services/soundService';
import { Target, Folder, Keyboard, Globe, Sparkles, Check } from 'lucide-react';

export const PracticeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mouse' | 'doubleClick' | 'typing' | 'browser'>('mouse');

  // Mini-game 1: Mouse Catcher
  const [mouseScore, setMouseScore] = useState<number>(0);
  const [targetPos, setTargetPos] = useState<{ top: number; left: number }>({ top: 40, left: 45 });
  const [currentEmoji, setCurrentEmoji] = useState<string>('🍎');
  const emojis = ['🍎', '🌸', '☕', '🐱', '🌻', '🎁', '⭐', '🎈'];

  const handleCatchMouseTarget = () => {
    soundService.playSuccess();
    setMouseScore(prev => prev + 1);
    // Random position within 15% - 75%
    const nextTop = Math.floor(Math.random() * 60) + 15;
    const nextLeft = Math.floor(Math.random() * 65) + 15;
    const nextEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setTargetPos({ top: nextTop, left: nextLeft });
    setCurrentEmoji(nextEmoji);
  };

  // Mini-game 2: Double Click Folders
  const [openFolders, setOpenFolders] = useState<number[]>([]);
  const [lastFolderClickTime, setLastFolderClickTime] = useState<{ [id: number]: number }>({});
  const folders = [
    { id: 1, name: 'Kiskert virágai', reward: '🌹 Gyönyörű vörös rózsa' },
    { id: 2, name: 'Kedvenc állatok', reward: '🐾 Játékos kiskutya' },
    { id: 3, name: 'Családi kirándulás', reward: '🌄 Naplemente a Balatonnál' },
    { id: 4, name: 'Finom sütemények', reward: '🍰 Friss diós bejgli' },
  ];

  const handleFolderClick = (id: number) => {
    const now = Date.now();
    soundService.playClick();
    const lastTime = lastFolderClickTime[id] || 0;

    if (now - lastTime < 1300) {
      soundService.playSuccess();
      setOpenFolders(prev => (prev.includes(id) ? prev : [...prev, id]));
    } else {
      setLastFolderClickTime({ ...lastFolderClickTime, [id]: now });
    }
  };

  // Mini-game 3: Typing Gym
  const practiceWords = ['unoka', 'család', 'kert', 'szeretet', 'virág', 'kávé'];
  const [wordIdx, setWordIdx] = useState<number>(0);
  const [typedWord, setTypedWord] = useState<string>('');
  const [typingScore, setTypingScore] = useState<number>(0);

  const currentPracticeWord = practiceWords[wordIdx];

  const handleVirtualKey = (key: string) => {
    if (key === 'Backspace') {
      setTypedWord(prev => prev.slice(0, -1));
      return;
    }
    if (key === 'Enter') {
      checkTypingWord(typedWord);
      return;
    }
    const next = typedWord + key;
    setTypedWord(next);
    checkTypingWord(next);
  };

  const checkTypingWord = (str: string) => {
    if (str.trim().toLowerCase() === currentPracticeWord.toLowerCase()) {
      soundService.playSuccess();
      setTypingScore(prev => prev + 1);
      setTimeout(() => {
        setTypedWord('');
        setWordIdx(prev => (prev + 1) % practiceWords.length);
      }, 500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-md text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 flex items-center justify-center gap-3">
          <Target className="w-10 h-10 text-emerald-600" />
          <span>Gyakorló sarok</span>
        </h1>
        <p className="text-xl sm:text-2xl text-slate-600 font-medium">
          Itt kötetlenül, játékos formában gyakorolhatsz bármit, amíg csak kedved tartja!
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => {
            soundService.playClick();
            setActiveTab('mouse');
          }}
          className={`
            p-4 rounded-2xl font-black text-xl flex flex-col items-center gap-2 border-4 transition-all
            ${activeTab === 'mouse'
              ? 'bg-blue-700 text-white border-blue-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}
          `}
        >
          <span className="text-3xl">🎯</span>
          <span>Egérgyakorlat</span>
        </button>

        <button
          onClick={() => {
            soundService.playClick();
            setActiveTab('doubleClick');
          }}
          className={`
            p-4 rounded-2xl font-black text-xl flex flex-col items-center gap-2 border-4 transition-all
            ${activeTab === 'doubleClick'
              ? 'bg-blue-700 text-white border-blue-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}
          `}
        >
          <span className="text-3xl">📁</span>
          <span>Dupla kattintás</span>
        </button>

        <button
          onClick={() => {
            soundService.playClick();
            setActiveTab('typing');
          }}
          className={`
            p-4 rounded-2xl font-black text-xl flex flex-col items-center gap-2 border-4 transition-all
            ${activeTab === 'typing'
              ? 'bg-blue-700 text-white border-blue-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}
          `}
        >
          <span className="text-3xl">⌨️</span>
          <span>Gépelés</span>
        </button>

        <button
          onClick={() => {
            soundService.playClick();
            setActiveTab('browser');
          }}
          className={`
            p-4 rounded-2xl font-black text-xl flex flex-col items-center gap-2 border-4 transition-all
            ${activeTab === 'browser'
              ? 'bg-blue-700 text-white border-blue-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}
          `}
        >
          <span className="text-3xl">🌐</span>
          <span>Internet</span>
        </button>
      </div>

      {/* Tab 1: Mouse Catcher Mini-Game */}
      {activeTab === 'mouse' && (
        <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Kattints a megjelenő formákra!
            </h2>
            <div className="bg-emerald-100 border-2 border-emerald-400 px-5 py-2 rounded-2xl font-black text-2xl text-emerald-900">
              Sikeres kattintások: {mouseScore}
            </div>
          </div>

          <p className="text-xl text-slate-600 font-medium">
            Mozgasd az egeret a tárgyra, majd nyomd meg a bal egérgombot!
          </p>

          <div className="relative w-full h-[420px] bg-slate-100 border-4 border-dashed border-slate-400 rounded-3xl overflow-hidden select-none">
            <button
              onClick={handleCatchMouseTarget}
              style={{ top: `${targetPos.top}%`, left: `${targetPos.left}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-amber-400 hover:bg-amber-500 border-4 border-amber-600 flex items-center justify-center text-6xl shadow-xl transition-transform active:scale-90 cursor-pointer animate-pulse"
              title="Kattints rám!"
            >
              {currentEmoji}
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Double Click Practice */}
      {activeTab === 'doubleClick' && (
        <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Mappanyitogató: Kattints kétszer gyorsan egy mappára!
            </h2>
            <div className="bg-blue-100 border-2 border-blue-400 px-5 py-2 rounded-2xl font-black text-2xl text-blue-900">
              Nyitva: {openFolders.length} / {folders.length}
            </div>
          </div>

          <p className="text-xl text-slate-600 font-medium">
            Minden mappában egy kellemes kép vagy emlék rejtőzik!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {folders.map((f) => {
              const isOpen = openFolders.includes(f.id);

              return (
                <div
                  key={f.id}
                  onClick={() => handleFolderClick(f.id)}
                  className={`
                    p-8 rounded-3xl border-4 transition-all cursor-pointer select-none flex flex-col items-center text-center
                    ${isOpen
                      ? 'bg-emerald-50 border-emerald-500 shadow-md'
                      : 'bg-amber-50 hover:bg-amber-100 border-amber-400 shadow-lg active:scale-95'}
                  `}
                >
                  <span className="text-6xl mb-3">{isOpen ? '📂' : '📁'}</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{f.name}</h3>

                  {isOpen ? (
                    <div className="mt-4 p-4 bg-white border-2 border-emerald-400 rounded-2xl text-xl font-bold text-emerald-900 flex items-center gap-2">
                      <Check className="w-6 h-6 text-emerald-600" />
                      <span>{f.reward}</span>
                    </div>
                  ) : (
                    <span className="mt-3 text-lg font-bold text-amber-800 bg-amber-200/60 px-4 py-1.5 rounded-xl">
                      Kattints rá kétszer gyorsan!
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Typing Gym */}
      {activeTab === 'typing' && (
        <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Szavak gépelése
            </h2>
            <div className="bg-purple-100 border-2 border-purple-400 px-5 py-2 rounded-2xl font-black text-2xl text-purple-900">
              Sikeres szavak: {typingScore}
            </div>
          </div>

          <div className="text-center space-y-4 max-w-xl mx-auto py-4">
            <div className="text-2xl font-bold text-slate-600">Begépelendő szó:</div>
            <div className="text-5xl font-black text-blue-900 tracking-wider bg-blue-100 p-4 rounded-3xl border-4 border-blue-400">
              {currentPracticeWord}
            </div>

            <div className="text-3xl font-bold text-slate-800 pt-4">
              Amit most gépeltél: <span className="underline text-emerald-700">{typedWord || '...'}</span>
            </div>
          </div>

          <VirtualKeyboard
            onKeyPress={handleVirtualKey}
            targetKey={currentPracticeWord[typedWord.length] || undefined}
          />
        </div>
      )}

      {/* Tab 4: Safe Web Browsing Free Exploration */}
      {activeTab === 'browser' && (
        <div className="space-y-4">
          <div className="bg-white border-4 border-slate-300 rounded-3xl p-6 shadow-md">
            <h2 className="text-3xl font-black text-slate-900">
              Szabad internetes kereső
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              Próbálj meg rákeresni az „időjárás” vagy az „almás pite” szavakra, és nézd meg az eredményeket!
            </p>
          </div>

          <VirtualBrowser />
        </div>
      )}
    </div>
  );
};
