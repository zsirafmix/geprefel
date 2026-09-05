import React from 'react';
import { soundService } from '../services/soundService';

interface VirtualKeyboardProps {
  onKeyPress: (key: string) => void;
  targetKey?: string;
  showShift?: boolean;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  targetKey,
  showShift = false,
}) => {
  const row1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'ö', 'ü', 'ó'];
  const row2 = ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'ő', 'ú'];
  const row3 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'é', 'á', 'ű'];
  const row4 = ['í', 'y', 'x', 'c', 'v', 'b', 'n', 'm'];

  const handleKey = (key: string) => {
    soundService.playClick();
    onKeyPress(key);
  };

  const isTarget = (k: string) => {
    if (!targetKey) return false;
    return targetKey.toLowerCase() === k.toLowerCase();
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-200 border-4 border-slate-400 rounded-3xl p-4 sm:p-6 shadow-xl select-none">
      <div className="text-center mb-3 text-slate-700 font-bold text-lg">
        ⌨️ Vizuális Segédbillentyűzet (Kattinthatsz ide is, vagy nyomhatod a valódi gombokat!)
      </div>

      <div className="flex flex-col gap-2">
        {/* Row 1 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {row1.map((k) => (
            <button
              key={k}
              onClick={() => handleKey(k)}
              className={`
                h-12 sm:h-14 min-w-[2.2rem] sm:min-w-[2.75rem] px-2 rounded-xl font-black text-xl sm:text-2xl border-2 transition-transform active:scale-90
                ${isTarget(k)
                  ? 'bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300 animate-pulse'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}
              `}
            >
              {k}
            </button>
          ))}
          <button
            onClick={() => handleKey('Backspace')}
            className={`
              h-12 sm:h-14 px-3 sm:px-4 rounded-xl font-black text-lg sm:text-xl border-2 transition-transform active:scale-90 flex items-center justify-center
              ${isTarget('Backspace')
                ? 'bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300 animate-pulse'
                : 'bg-red-100 hover:bg-red-200 text-red-900 border-red-300'}
            `}
            title="Utolsó betű törlése"
          >
            ⌫ Törlés
          </button>
        </div>

        {/* Row 2 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {row2.map((k) => (
            <button
              key={k}
              onClick={() => handleKey(showShift ? k.toUpperCase() : k)}
              className={`
                h-12 sm:h-14 min-w-[2.2rem] sm:min-w-[2.75rem] px-2 rounded-xl font-black text-xl sm:text-2xl border-2 transition-transform active:scale-90
                ${isTarget(k)
                  ? 'bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300 animate-pulse'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}
              `}
            >
              {showShift ? k.toUpperCase() : k}
            </button>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          {row3.map((k) => (
            <button
              key={k}
              onClick={() => handleKey(showShift ? k.toUpperCase() : k)}
              className={`
                h-12 sm:h-14 min-w-[2.2rem] sm:min-w-[2.75rem] px-2 rounded-xl font-black text-xl sm:text-2xl border-2 transition-transform active:scale-90
                ${isTarget(k)
                  ? 'bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300 animate-pulse'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}
              `}
            >
              {showShift ? k.toUpperCase() : k}
            </button>
          ))}
          <button
            onClick={() => handleKey('Enter')}
            className={`
              h-12 sm:h-14 px-4 rounded-xl font-black text-lg sm:text-xl border-2 transition-transform active:scale-90 flex items-center justify-center
              ${isTarget('Enter')
                ? 'bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300 animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-800'}
            `}
          >
            ⏎ Enter
          </button>
        </div>

        {/* Row 4: Shift & letters */}
        <div className="flex justify-center gap-1.5 sm:gap-2">
          <button
            onClick={() => handleKey('Shift')}
            className={`
              h-12 sm:h-14 px-4 sm:px-6 rounded-xl font-black text-lg sm:text-xl border-2 transition-transform active:scale-90
              ${isTarget('Shift') || showShift
                ? 'bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300 animate-pulse'
                : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border-indigo-300'}
            `}
          >
            ⇧ Shift (Nagybetű)
          </button>
          {row4.map((k) => (
            <button
              key={k}
              onClick={() => handleKey(showShift ? k.toUpperCase() : k)}
              className={`
                h-12 sm:h-14 min-w-[2.2rem] sm:min-w-[2.75rem] px-2 rounded-xl font-black text-xl sm:text-2xl border-2 transition-transform active:scale-90
                ${isTarget(k)
                  ? 'bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300 animate-pulse'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'}
              `}
            >
              {showShift ? k.toUpperCase() : k}
            </button>
          ))}
        </div>

        {/* Row 5: Spacebar */}
        <div className="flex justify-center mt-1">
          <button
            onClick={() => handleKey(' ')}
            className={`
              h-14 w-3/5 rounded-2xl font-black text-2xl border-4 transition-transform active:scale-95 flex items-center justify-center shadow-md
              ${isTarget(' ')
                ? 'bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300 animate-pulse'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-400'}
            `}
          >
            ␣ Szóköz (Hosszú gomb)
          </button>
        </div>
      </div>
    </div>
  );
};
