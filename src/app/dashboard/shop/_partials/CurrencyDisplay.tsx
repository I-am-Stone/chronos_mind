import React from 'react';

interface CurrencyDisplayProps {
  value?: number;
  currency?: 'points';
  points?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({
                                                           value,
                                                           currency,
                                                           points,
                                                           label,
                                                           size = 'md'
                                                         }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base'
  };

  if (points !== undefined) {
    return (
        <div className="flex items-center justify-center">
          {label && <span className="mr-2">{label}</span>}
          <div className="flex items-center mr-2">
            <div className={`${sizeClasses[size]} bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-1`}>
              ♦
            </div>
            <span>{points}</span>
          </div>
        </div>
    );
  }

  return (
      <div className="flex items-center">
        <div className={`${sizeClasses[size]} ${currency === 'points' ? 'bg-green-500' : 'bg-yellow-500'} rounded-full flex items-center justify-center text-white font-bold mr-1`}>
          {currency === 'points' ? '♦' : '$'}
        </div>
        <span>{value}</span>
      </div>
  );
};

export default CurrencyDisplay;
