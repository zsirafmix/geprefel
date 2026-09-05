import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, X, Search } from 'lucide-react';
import { soundService } from '../services/soundService';

interface VirtualBrowserProps {
  onSearchSubmit?: (query: string) => void;
  onLinkClick?: (destination: string) => void;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  highlightSearchBox?: boolean;
  highlightSearchBtn?: boolean;
  highlightBackBtn?: boolean;
  highlightCloseBtn?: boolean;
  highlightRecipeLink?: boolean;
  activePage?: 'search' | 'results' | 'recipe';
}

export const VirtualBrowser: React.FC<VirtualBrowserProps> = ({
  onSearchSubmit,
  onLinkClick,
  onBackClick,
  onCloseClick,
  highlightSearchBox = false,
  highlightSearchBtn = false,
  highlightBackBtn = false,
  highlightCloseBtn = false,
  highlightRecipeLink = false,
  activePage = 'search',
}) => {
  const [query, setQuery] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState<'search' | 'results' | 'recipe'>(activePage);

  // Sync if parent overrides activePage
  React.useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundService.playClick();
    if (query.trim().length > 0 || true) {
      setSearchSubmitted(true);
      setCurrentPage('results');
      if (onSearchSubmit) {
        onSearchSubmit(query);
      }
    }
  };

  const handleGoBack = () => {
    soundService.playClick();
    if (currentPage === 'recipe') {
      setCurrentPage('results');
    } else if (currentPage === 'results') {
      setCurrentPage('search');
    }
    if (onBackClick) onBackClick();
  };

  const handleOpenRecipe = () => {
    soundService.playClick();
    setCurrentPage('recipe');
    if (onLinkClick) onLinkClick('recipe');
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border-4 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col min-h-[540px]">
      {/* Browser Window Header */}
      <div className="bg-slate-800 text-white px-4 py-3 flex items-center justify-between border-b-4 border-slate-700">
        {/* Left window indicator */}
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button
              onClick={onCloseClick}
              className={`
                w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center font-bold text-white transition-all
                ${highlightCloseBtn ? 'help-highlight-target ring-4 ring-yellow-400' : ''}
              `}
              title="Ablak bezárása"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-amber-500"></div>
            <div className="w-7 h-7 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xl font-bold ml-2 hidden sm:inline text-slate-200">
            🌐 Internetes Böngésző (Biztonságos felület)
          </span>
        </div>

        {/* Navigation Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleGoBack}
            className={`
              flex items-center gap-1 px-4 py-2 rounded-xl text-lg font-bold border-2 transition-all
              ${highlightBackBtn
                ? 'help-highlight-target bg-amber-400 text-black border-amber-600 ring-4 ring-yellow-300'
                : 'bg-slate-700 hover:bg-slate-600 text-white border-slate-500'}
            `}
            title="Visszalépés az előző oldalra"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Vissza</span>
          </button>

          <button
            className="p-2 rounded-xl bg-slate-700 text-slate-400 border-2 border-slate-600 cursor-not-allowed"
            disabled
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          <button
            onClick={() => soundService.playClick()}
            className="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white border-2 border-slate-500"
            title="Oldal újratöltése"
          >
            <RotateCw className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="bg-slate-100 border-b-2 border-slate-300 px-6 py-2 flex items-center gap-3">
        <span className="text-xl font-bold text-slate-500">Cím:</span>
        <div className="flex-1 bg-white border-2 border-slate-400 rounded-xl px-4 py-1.5 text-lg font-mono text-slate-700 select-all">
          {currentPage === 'search' && 'https://www.kereso.hu'}
          {currentPage === 'results' && 'https://www.kereso.hu/talalatok?q=idojaras'}
          {currentPage === 'recipe' && 'https://www.nagyi-receptek.hu/almas-pite'}
        </div>
      </div>

      {/* Browser Body */}
      <div className="flex-1 p-6 sm:p-10 bg-slate-50 overflow-y-auto">
        {/* Page 1: Search Landing */}
        {currentPage === 'search' && (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-6">
            <div className="text-5xl sm:text-6xl font-black text-blue-700 tracking-tight">
              🔍 Magyar Kereső
            </div>
            <p className="text-2xl text-slate-600 max-w-xl font-medium">
              Írd be a keresőmezőbe, amit meg szeretnél találni az interneten!
            </p>

            <form onSubmit={handleSearch} className="w-full max-w-2xl flex flex-col sm:flex-row gap-3 mt-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pl.: időjárás"
                className={`
                  flex-1 text-2xl font-bold px-6 py-4 rounded-2xl border-4 transition-all outline-none
                  ${highlightSearchBox
                    ? 'help-highlight-target border-amber-500 ring-4 ring-amber-300'
                    : 'border-blue-500 focus:border-blue-700'}
                `}
              />

              <button
                type="submit"
                className={`
                  px-8 py-4 rounded-2xl text-2xl font-black flex items-center justify-center gap-2 border-4 transition-all
                  ${highlightSearchBtn
                    ? 'help-highlight-target bg-amber-400 text-black border-amber-600 ring-4 ring-amber-300'
                    : 'bg-blue-700 hover:bg-blue-800 text-white border-blue-900'}
                `}
              >
                <Search className="w-7 h-7" />
                <span>Keresés</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <span className="text-xl text-slate-500 font-bold">Gyakorló gombok:</span>
              <button
                type="button"
                onClick={() => {
                  setQuery('időjárás');
                  soundService.playClick();
                }}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 text-blue-900 rounded-xl font-bold text-lg"
              >
                Beírás: „időjárás”
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery('almás pite');
                  soundService.playClick();
                }}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 border-2 border-blue-400 text-blue-900 rounded-xl font-bold text-lg"
              >
                Beírás: „almás pite”
              </button>
            </div>
          </div>
        )}

        {/* Page 2: Search Results */}
        {currentPage === 'results' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="text-xl text-slate-500 font-semibold border-b pb-2">
              Találatok erre: <span className="font-bold text-slate-800">„{query || 'időjárás'}”</span>
            </div>

            {/* Weather Card Result */}
            <div className="bg-amber-50 border-4 border-amber-300 rounded-2xl p-6 shadow-md flex items-center gap-6">
              <span className="text-6xl">☀️</span>
              <div>
                <h3 className="text-3xl font-extrabold text-amber-950">Budapesti Időjárás Előrejelzés</h3>
                <p className="text-2xl font-bold text-amber-800 mt-1">Ma: 22°C – Kellemes napos idő, tiszta égbolt.</p>
                <p className="text-lg text-slate-600 mt-1">Holnap: 24°C, szintén kellemes kirándulóidő várható.</p>
              </div>
            </div>

            {/* Clickable Recipe Link Result */}
            <div
              onClick={handleOpenRecipe}
              className={`
                bg-white border-4 rounded-2xl p-6 shadow-md cursor-pointer transition-all hover:bg-blue-50
                ${highlightRecipeLink
                  ? 'help-highlight-target border-amber-500 ring-4 ring-amber-300'
                  : 'border-blue-400 hover:border-blue-600'}
              `}
            >
              <div className="text-blue-700 text-2xl sm:text-3xl font-black underline flex items-center gap-2">
                <span>🍰 Hagyományos Nagymama-féle Almás Pite Recept</span>
              </div>
              <p className="text-xl text-slate-700 font-medium mt-2">
                Omlós tészta, bőséges fahéjas almatöltelékkel, pont úgy, ahogy a családi vasárnapokon szeretjük...
              </p>
              <span className="inline-block mt-3 px-4 py-1 bg-emerald-100 text-emerald-800 border-2 border-emerald-400 rounded-lg font-bold text-lg">
                👉 Kattints ide a recept megnyitásához!
              </span>
            </div>

            {/* Music Result */}
            <div className="bg-white border-4 border-slate-300 rounded-2xl p-6 shadow">
              <div className="text-blue-700 text-2xl font-bold underline">
                🎵 Kedvenc Régi Magyar Slágerek és Dallamok
              </div>
              <p className="text-xl text-slate-600 mt-1">
                Válogatás az 1960-as, 70-es és 80-as évek legszebb dalaiból.
              </p>
            </div>
          </div>
        )}

        {/* Page 3: Recipe Page */}
        {currentPage === 'recipe' && (
          <div className="bg-white border-4 border-emerald-400 rounded-3xl p-8 max-w-3xl mx-auto shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                🍎 Finom Almás Pite
              </h2>
              <span className="text-5xl">🥧</span>
            </div>

            <p className="text-2xl text-slate-700 font-medium">
              Gratulálok! Sikeresen rákattintottál egy internetes linkre, és megnyitottad ezt a receptet!
            </p>

            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 text-xl text-emerald-950 font-bold space-y-2">
              <div>Hozzávalók:</div>
              <ul className="list-disc list-inside font-normal space-y-1">
                <li>50 dkg finomliszt, 25 dkg vaj</li>
                <li>1,5 kg édeskés alma lereszelve</li>
                <li>Ízlés szerint fahéj és kristálycukor</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-100 border-2 border-amber-400 rounded-xl text-xl text-amber-950 font-bold">
              💡 Következő feladat: Lépj vissza az előző oldalra a böngésző bal felső „Vissza” gombjával!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
