import React from 'react';
import { soundService } from '../services/soundService';

interface LargeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'amber' | 'neutral';
  isHighlighted?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  variant = 'primary',
  isHighlighted = false,
  icon,
  children,
  onClick,
  className = '',
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundService.playClick();
    if (onClick) {
      onClick(e);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-700 hover:bg-blue-800 text-white border-4 border-blue-900 shadow-lg';
      case 'success':
        return 'bg-emerald-700 hover:bg-emerald-800 text-white border-4 border-emerald-900 shadow-lg';
      case 'amber':
        return 'bg-amber-600 hover:bg-amber-700 text-white border-4 border-amber-800 shadow-lg';
      case 'secondary':
        return 'bg-white hover:bg-slate-100 text-slate-800 border-4 border-slate-400 shadow';
      case 'neutral':
      default:
        return 'bg-slate-200 hover:bg-slate-300 text-slate-900 border-4 border-slate-400 shadow';
    }
  };

  return (
    <button
      {...props}
      disabled={disabled}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl
        font-bold text-2xl tracking-wide transition-all duration-200
        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer select-none
        ${getVariantStyles()}
        ${isHighlighted ? 'help-highlight-target' : ''}
        ${className}
      `}
    >
      {icon && <span className="text-3xl flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
