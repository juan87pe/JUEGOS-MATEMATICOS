import React from 'react';
import { TokenType } from '../../../../../specs/contracts/ten-frame.types';

export type TokenCellState = 'empty' | 'active' | 'ghost';

interface TokenCellProps {
  state: TokenCellState;
  tokenType: TokenType;
  tokenColor: string;
  base5Glow?: boolean;
  compact?: boolean;
  cellIndex: number;
}

const TOKEN_GLYPH: Record<TokenType, string> = {
  apple: '🍎',
  star: '⭐',
  circle: '●',
  heart: '❤️',
};

/**
 * Celda atómica 1:1 del Marco de Diez (MG-TF).
 * Soporta estados: empty, active, ghost (borde discontinuo + cruz sutil) y base5-glow.
 */
export const TokenCell: React.FC<TokenCellProps> = ({
  state,
  tokenType,
  tokenColor,
  base5Glow = false,
  compact = false,
  cellIndex,
}) => {
  const sizeClass = compact ? 'w-7 h-7 text-base' : 'w-9 h-9 text-xl';

  return (
    <div
      data-testid={`token-cell-${cellIndex}`}
      data-cell-state={state}
      className={`aspect-square flex items-center justify-center rounded-lg border transition-all duration-100 ${
        base5Glow
          ? 'bg-cloud-sunLight border-cloud-sun ring-2 ring-cloud-sun/70 shadow-sm'
          : 'bg-cloud-surface border-cloud-border'
      }`}
    >
      {state === 'active' && (
        <span
          className={`${sizeClass} rounded-full flex items-center justify-center transition-opacity duration-100 select-none ${
            tokenType === 'circle'
              ? `${tokenColor} text-white shadow-sm`
              : 'bg-transparent'
          }`}
          aria-label="ficha activa"
        >
          {tokenType === 'circle' ? '' : TOKEN_GLYPH[tokenType]}
        </span>
      )}

      {state === 'ghost' && (
        <span
          className={`${sizeClass} rounded-full border-2 border-dashed border-cloud-error bg-cloud-errorLight/70 text-cloud-error font-bold flex items-center justify-center transition-opacity duration-100 select-none`}
          aria-label="ficha fantasma"
        >
          ✕
        </span>
      )}
    </div>
  );
};
