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
  const sizeClass = compact ? 'w-[78%] h-[78%] text-lg' : 'w-[78%] h-[78%] text-2xl';
  const circleBorderClass = compact ? 'border-2 border-cloud-text' : 'border-[2.5px] border-cloud-text';

  return (
    <div
      data-testid={`token-cell-${cellIndex}`}
      data-cell-state={state}
      className={`aspect-square flex items-center justify-center rounded-none transition-all duration-100 ${
        base5Glow
          ? 'bg-cloud-sunLight shadow-[inset_0_0_0_2px_rgba(224,179,66,0.85)]'
          : 'bg-cloud-surface'
      }`}
    >
      {state === 'active' && (
        <span
          className={`${sizeClass} rounded-full flex items-center justify-center transition-opacity duration-100 select-none leading-none ${
            tokenType === 'circle'
              ? `${tokenColor} ${circleBorderClass} text-white shadow-sm`
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
