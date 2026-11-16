import React from 'react';
import { FSMState, RoundChallenge } from '../../../../../specs/contracts/ten-frame.types';
import { TenFrameGrid } from './TenFrameGrid';

interface TenFrameStageProps {
  challenge: RoundChallenge | null;
  fsm: FSMState;
  isTokensVisible: boolean;
}

/**
 * Escenario adaptativo del Marco de Diez (1 grilla en N1, 2 grillas apiladas en N2/N3).
 * Mantiene altura <= 200px para preservar las 4 bandas móviles sin scroll.
 */
export const TenFrameStage: React.FC<TenFrameStageProps> = ({
  challenge,
  fsm,
  isTokensVisible,
}) => {
  if (!challenge) return null;

  const isDoubleGrid = Boolean(challenge.gridB);
  const isGhostSubtract = challenge.level === 3;

  // En Nivel 3 (Resta Fantasma), tras el flash se muestran las siluetas fantasma y diferencia activa
  const showActive =
    isTokensVisible || (isGhostSubtract && (fsm === 'AWAITING_INPUT' || fsm === 'RETRY_HINT'));
  const showGhost =
    isGhostSubtract &&
    (fsm === 'FLASH_ACTIVE' ||
      fsm === 'PEEK_ACTIVE' ||
      fsm === 'AWAITING_INPUT' ||
      fsm === 'RETRY_HINT' ||
      fsm === 'SUCCESS_FEEDBACK' ||
      fsm === 'SOLUTION_REVEAL');

  const highlightBase5 = fsm === 'SOLUTION_REVEAL' || fsm === 'SUCCESS_FEEDBACK';

  return (
    <section
      data-testid="ten-frame-stage"
      className="w-full max-h-[200px] flex flex-col items-center justify-center relative py-1"
    >
      {fsm === 'PRE_FLASH' && (
        <div className="mb-1.5 px-3 py-0.5 rounded-pill bg-cloud-sunLight border border-cloud-sun text-cloud-sunDark text-xs font-bold animate-pulse">
          👀 ¡Ojos listos!
        </div>
      )}

      <div
        className={`w-full flex flex-col items-center ${
          isDoubleGrid ? 'gap-1.5 max-w-[260px]' : 'max-w-[300px]'
        } ${fsm === 'RETRY_HINT' ? 'animate-bounce' : ''}`}
      >
        <TenFrameGrid
          grid={challenge.gridA}
          showActiveTokens={showActive}
          showGhostTokens={showGhost}
          highlightBase5={highlightBase5}
          compact={isDoubleGrid}
        />

        {challenge.gridB && (
          <TenFrameGrid
            grid={challenge.gridB}
            showActiveTokens={showActive}
            showGhostTokens={showGhost}
            highlightBase5={false}
            compact={true}
          />
        )}
      </div>
    </section>
  );
};
