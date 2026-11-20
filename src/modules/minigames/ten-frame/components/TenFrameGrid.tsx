import React from 'react';
import { TenFrameGridState } from '../../../../../specs/contracts/ten-frame.types';
import { TokenCell, TokenCellState } from './TokenCell';

interface TenFrameGridProps {
  grid: TenFrameGridState;
  showActiveTokens: boolean;
  showGhostTokens?: boolean;
  highlightBase5?: boolean;
  compact?: boolean;
}

const CELL_INDICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

/**
 * Grilla canónica de 2x5 horizontal con llenado estructurado en base 5:
 * Fila superior (0..4) de izquierda a derecha, luego fila inferior (5..9).
 */
export const TenFrameGrid: React.FC<TenFrameGridProps> = ({
  grid,
  showActiveTokens,
  showGhostTokens = false,
  highlightBase5 = false,
  compact = false,
}) => {
  const activeCount = showActiveTokens ? Math.min(10, Math.max(0, grid.activeTokens)) : 0;
  const ghostCount = showGhostTokens ? Math.min(10 - activeCount, Math.max(0, grid.ghostTokens)) : 0;

  const getCellState = (index: number): TokenCellState => {
    if (index < activeCount) return 'active';
    if (index < activeCount + ghostCount) return 'ghost';
    return 'empty';
  };

  return (
    <div
      data-testid={`ten-frame-grid-${grid.gridId}`}
      className={`grid grid-cols-5 grid-rows-2 w-full rounded-none bg-cloud-text shadow-cloud-sm ${
        compact ? 'p-[2px] gap-[2px]' : 'p-[3px] gap-[3px]'
      }`}
    >
      {CELL_INDICES.map((index) => (
        <TokenCell
          key={index}
          cellIndex={index}
          state={getCellState(index)}
          tokenType={grid.tokenType}
          tokenColor={grid.tokenColor}
          base5Glow={highlightBase5 && index < 5}
          compact={compact}
        />
      ))}
    </div>
  );
};
