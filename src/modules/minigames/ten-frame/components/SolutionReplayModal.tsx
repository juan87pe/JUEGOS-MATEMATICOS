import React, { useEffect, useState } from 'react';
import { ReplayStep, RoundChallenge } from '../../../../../specs/contracts/ten-frame.types';

interface SolutionReplayModalProps {
  challenge: RoundChallenge;
  steps: ReplayStep[];
  onNextRound: () => void;
}

/**
 * Panel/Modal de revelación pedagógica paso a paso (SOLUTION_REVEAL).
 * Resalta la base 5 dorada (+5) y exige avance manual explícito del niño.
 */
export const SolutionReplayModal: React.FC<SolutionReplayModalProps> = ({
  challenge,
  steps,
  onNextRound,
}) => {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    setVisibleCount(1);
    if (steps.length <= 1) return;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= steps.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 650);

    return () => clearInterval(interval);
  }, [challenge.id, steps.length]);

  const activeStep = steps[Math.min(visibleCount - 1, steps.length - 1)];

  return (
    <div
      data-testid="solution-replay-panel"
      className="w-full rounded-card bg-cloud-surface border-2 border-cloud-sun p-3 shadow-cloud-md flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="font-heading font-bold text-sm text-cloud-text">
          💡 Solución: {challenge.mathematicalExpression}
        </span>
        {activeStep?.highlightBase5 && (
          <span className="px-2 py-0.5 rounded-pill bg-cloud-sunLight border border-cloud-sun text-cloud-sunDark text-xs font-bold">
            +5 Base
          </span>
        )}
      </div>

      <ul className="space-y-1 text-xs text-cloud-text">
        {steps.slice(0, visibleCount).map((step) => (
          <li
            key={step.stepIndex}
            className="px-2.5 py-1 rounded-lg bg-cloud-bg border border-cloud-border"
          >
            {step.description}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onNextRound}
        className="w-full min-h-[56px] rounded-btn bg-cloud-sage text-white font-heading font-bold text-base shadow-cloud-sm active:scale-95 transition-transform"
      >
        ¡Entendido! Siguiente reto
      </button>
    </div>
  );
};
