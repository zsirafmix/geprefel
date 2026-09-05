import React from 'react';
import { ArrowDown } from 'lucide-react';

interface HelpHighlightProps {
  active: boolean;
  message?: string;
}

export const HelpHighlight: React.FC<HelpHighlightProps> = ({
  active,
  message = 'Ezt az elemet keresd a képernyőn (sárgán világít):'
}) => {
  if (!active) return null;

  return (
    <div className="flex flex-col items-center justify-center my-3 py-3 px-6 bg-amber-200 border-4 border-amber-600 rounded-2xl shadow-lg max-w-lg mx-auto animate-bounce-gentle">
      <div className="flex items-center gap-2 text-2xl font-black text-amber-950">
        <span>👉 {message}</span>
      </div>
      <ArrowDown className="w-8 h-8 text-amber-800 animate-pulse mt-1" />
    </div>
  );
};
