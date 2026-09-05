import React from 'react';
import { ViewMode, AppSettings, TextSize } from '../types';
import { Volume2, VolumeX, SunMoon, Home, BookOpen, Target, Award } from 'lucide-react';
import { soundService } from '../services/soundService';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  settings,
  onUpdateSettings,
}) => {
  const cycleTextSize = () => {
    soundService.playClick();
    const sizes: TextSize[] = ['normal', 'large', 'huge'];
    const nextIdx = (sizes.indexOf(settings.textSize) + 1) % sizes.length;
    onUpdateSettings({ textSize: sizes[nextIdx] });
  };

  const toggleContrast = () => {
    soundService.playClick();
    onUpdateSettings({ highContrast: !settings.highContrast });
  };

  const toggleSound = () => {
    const nextVal = !settings.soundEnabled;
    soundService.setEnabled(nextVal);
    onUpdateSettings({ soundEnabled: nextVal });
    if (nextVal) {
      soundService.playClick();
    }
  };

  return (
    <header className="bg-white border-b-4 border-slate-300 shadow-sm sticky top-0 z-30 px-4 sm:px-8 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Home Button */}
        <button
          onClick={() => {
            soundService.playClick();
            onNavigate('home');
          }}
          className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 text-blue-900 transition-colors"
          title="Vissza a kezdőlapra"
        >
          <Home className="w-8 h-8 text-blue-700 flex-shrink-0" />
          <div className="text-left">
            <span className="block text-2xl font-black tracking-wide leading-none">Gépre fel!</span>
            <span className="text-sm font-semibold text-blue-700">Kezdő Számítógépes Tanuló</span>
          </div>
        </button>

        {/* Primary Views Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-1">
          <button
            onClick={() => {
              soundService.playClick();
              onNavigate('roadmap');
            }}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xl transition-all border-2
              ${currentView === 'roadmap' || currentView === 'lesson'
                ? 'bg-blue-700 text-white border-blue-900 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'}
            `}
          >
            <BookOpen className="w-6 h-6" />
            <span>Leckék</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onNavigate('practice');
            }}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xl transition-all border-2
              ${currentView === 'practice'
                ? 'bg-blue-700 text-white border-blue-900 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'}
            `}
          >
            <Target className="w-6 h-6" />
            <span>Gyakorlás</span>
          </button>

          <button
            onClick={() => {
              soundService.playClick();
              onNavigate('progress');
            }}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xl transition-all border-2
              ${currentView === 'progress'
                ? 'bg-blue-700 text-white border-blue-900 shadow-md'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'}
            `}
          >
            <Award className="w-6 h-6" />
            <span>Haladás</span>
          </button>
        </nav>

        {/* Accessibility Tools (Font size, contrast, sound) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Font Size Toggle */}
          <button
            onClick={cycleTextSize}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 border-2 border-slate-400 rounded-xl font-black text-lg text-slate-800 flex items-center gap-1"
            title="Betűméret növelése (Normál / Nagy / Óriási)"
            aria-label="Betűméret váltása"
          >
            <span>Betű:</span>
            <span className="underline font-bold">
              {settings.textSize === 'normal' ? 'Normál' : settings.textSize === 'large' ? 'Nagy' : 'Óriási'}
            </span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleContrast}
            className={`
              p-2.5 rounded-xl border-2 font-bold transition-colors flex items-center gap-1
              ${settings.highContrast
                ? 'bg-yellow-400 text-black border-black'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-400'}
            `}
            title="Erős kontraszt be- és kikapcsolása"
            aria-label="Erős kontraszt"
          >
            <SunMoon className="w-6 h-6" />
            <span className="hidden sm:inline text-base">Kontraszt</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`
              p-2.5 rounded-xl border-2 font-bold transition-colors
              ${settings.soundEnabled
                ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-400'
                : 'bg-red-100 hover:bg-red-200 text-red-800 border-red-400'}
            `}
            title={settings.soundEnabled ? 'Hanghatások bekapcsolva' : 'Hanghatások némítva'}
            aria-label="Hangok némítása vagy engedélyezése"
          >
            {settings.soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
