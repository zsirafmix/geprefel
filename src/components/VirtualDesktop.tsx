import React, { useState } from 'react';
import { X, Image, FileText, Globe, Trash2, Folder } from 'lucide-react';
import { soundService } from '../services/soundService';

interface VirtualDesktopProps {
  onOpenInternet?: () => void;
  onOpenFolder?: () => void;
  onOpenNotes?: () => void;
  highlightInternetIcon?: boolean;
  highlightFolderIcon?: boolean;
  highlightNotesIcon?: boolean;
}

export const VirtualDesktop: React.FC<VirtualDesktopProps> = ({
  onOpenInternet,
  onOpenFolder,
  onOpenNotes,
  highlightInternetIcon = false,
  highlightFolderIcon = false,
  highlightNotesIcon = false,
}) => {
  const [openWindow, setOpenWindow] = useState<'folder' | 'notes' | null>(null);
  const [noteText, setNoteText] = useState('Kedves Naplóm! Ma megtanultam használni a számítógépet.');

  const handleIconClick = (target: 'internet' | 'folder' | 'notes') => {
    soundService.playClick();
    if (target === 'internet' && onOpenInternet) {
      onOpenInternet();
    } else if (target === 'folder') {
      setOpenWindow('folder');
      if (onOpenFolder) onOpenFolder();
    } else if (target === 'notes') {
      setOpenWindow('notes');
      if (onOpenNotes) onOpenNotes();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-[540px] rounded-3xl border-8 border-slate-700 bg-gradient-to-b from-sky-400 to-blue-600 shadow-2xl relative overflow-hidden flex flex-col select-none">
      {/* Desktop Area with Icons */}
      <div className="flex-1 p-8 grid grid-flow-col auto-cols-max gap-8 items-start relative">
        {/* 1. Képek mappa */}
        <button
          onClick={() => handleIconClick('folder')}
          className={`
            flex flex-col items-center justify-center p-4 rounded-2xl w-36 h-36 bg-black/20 hover:bg-black/30 backdrop-blur-xs transition-all text-white border-2 border-white/40
            ${highlightFolderIcon ? 'help-highlight-target ring-4 ring-amber-300 !bg-amber-500/80 !text-black font-black' : ''}
          `}
          title="Képek mappa megnyitása"
        >
          <Folder className="w-16 h-16 text-yellow-300 drop-shadow-md" />
          <span className="text-xl font-bold mt-2 drop-shadow">📁 Képek</span>
        </button>

        {/* 2. Internet ikon */}
        <button
          onClick={() => handleIconClick('internet')}
          className={`
            flex flex-col items-center justify-center p-4 rounded-2xl w-36 h-36 bg-black/20 hover:bg-black/30 backdrop-blur-xs transition-all text-white border-2 border-white/40
            ${highlightInternetIcon ? 'help-highlight-target ring-4 ring-amber-300 !bg-amber-500/80 !text-black font-black' : ''}
          `}
          title="Internet böngésző megnyitása"
        >
          <Globe className="w-16 h-16 text-blue-200 drop-shadow-md" />
          <span className="text-xl font-bold mt-2 drop-shadow">🌐 Internet</span>
        </button>

        {/* 3. Jegyzet ikon */}
        <button
          onClick={() => handleIconClick('notes')}
          className={`
            flex flex-col items-center justify-center p-4 rounded-2xl w-36 h-36 bg-black/20 hover:bg-black/30 backdrop-blur-xs transition-all text-white border-2 border-white/40
            ${highlightNotesIcon ? 'help-highlight-target ring-4 ring-amber-300 !bg-amber-500/80 !text-black font-black' : ''}
          `}
          title="Jegyzetfüzet megnyitása"
        >
          <FileText className="w-16 h-16 text-emerald-200 drop-shadow-md" />
          <span className="text-xl font-bold mt-2 drop-shadow">📝 Jegyzet</span>
        </button>

        {/* 4. Lomtár */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl w-36 h-36 text-white/70">
          <Trash2 className="w-16 h-16 drop-shadow-md" />
          <span className="text-lg font-semibold mt-2">Lomtár</span>
        </div>

        {/* Opened Window: Képek */}
        {openWindow === 'folder' && (
          <div className="absolute inset-x-8 top-8 bottom-8 bg-white border-4 border-slate-700 rounded-2xl shadow-2xl flex flex-col z-20 animate-scaleUp">
            <div className="bg-slate-700 text-white px-4 py-2.5 flex items-center justify-between font-bold text-xl">
              <span className="flex items-center gap-2">📁 Képek Mappa</span>
              <button
                onClick={() => setOpenWindow(null)}
                className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 overflow-y-auto">
              <div className="p-4 bg-white border-2 border-slate-300 rounded-xl text-center shadow-sm">
                <span className="text-5xl block mb-2">🌸</span>
                <span className="text-lg font-bold text-slate-800">Tavaszi virágok.jpg</span>
              </div>
              <div className="p-4 bg-white border-2 border-slate-300 rounded-xl text-center shadow-sm">
                <span className="text-5xl block mb-2">🐈</span>
                <span className="text-lg font-bold text-slate-800">Cica a napon.jpg</span>
              </div>
              <div className="p-4 bg-white border-2 border-slate-300 rounded-xl text-center shadow-sm">
                <span className="text-5xl block mb-2">🏔️</span>
                <span className="text-lg font-bold text-slate-800">Hegyvidék.jpg</span>
              </div>
            </div>
          </div>
        )}

        {/* Opened Window: Jegyzet */}
        {openWindow === 'notes' && (
          <div className="absolute inset-x-8 top-8 bottom-8 bg-white border-4 border-slate-700 rounded-2xl shadow-2xl flex flex-col z-20 animate-scaleUp">
            <div className="bg-slate-700 text-white px-4 py-2.5 flex items-center justify-between font-bold text-xl">
              <span className="flex items-center gap-2">📝 Jegyzetfüzet</span>
              <button
                onClick={() => setOpenWindow(null)}
                className="w-8 h-8 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-4 bg-amber-50">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                className="w-full h-full p-4 text-2xl font-sans bg-transparent resize-none border-none outline-none text-slate-800 leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* Taskbar at bottom */}
      <div className="h-16 bg-slate-800 border-t-4 border-slate-700 flex items-center justify-between px-6 z-10">
        <button
          onClick={() => soundService.playClick()}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl shadow"
        >
          <span>🏁</span>
          <span>Start</span>
        </button>

        <div className="text-white text-xl font-bold font-mono tracking-wider">
          🕒 10:30 • Szombat
        </div>
      </div>
    </div>
  );
};
