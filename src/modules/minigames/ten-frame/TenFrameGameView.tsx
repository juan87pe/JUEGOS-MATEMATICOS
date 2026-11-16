import React, { useEffect, useRef, useState } from 'react';
import { TenFrameLevel } from '../../../../specs/contracts/ten-frame.types';
import { soundService } from '../../../services/soundEffects';
import {
  triggerMiniConfetti,
  triggerStreakConfetti,
} from '../../../services/confettiHelper';
import {
  ROUND_COMPLETE_TRANSITION_MS,
  useTenFrameEngine,
} from './useTenFrameEngine';
import { TenFrameStage } from './components/TenFrameStage';
import { InAppKeypad } from './components/InAppKeypad';
import { SolutionReplayModal } from './components/SolutionReplayModal';

interface TenFrameGameViewProps {
  onExit?: () => void;
  initialLevel?: TenFrameLevel;
}

/**
 * Vista principal del Minijuego Subitización Rápida con Marco de Diez (MG-TF).
 * Organizada en 4 bandas compactas (<= 568px) sin scroll vertical ni <input>.
 */
export const TenFrameGameView: React.FC<TenFrameGameViewProps> = ({
  onExit,
  initialLevel = 1,
}) => {
  const {
    state,
    level,
    levelConfig,
    replaySteps,
    isInputLocked,
    isTokensVisible,
    startRound,
    inputDigit,
    deleteDigit,
    submitAnswer,
    triggerPeek,
    requestSolution,
    nextRound,
    changeLevel,
  } = useTenFrameEngine(initialLevel);

  const [muted, setMuted] = useState<boolean>(() => soundService.isMuted());
  const lastFeedbackRoundRef = useRef<string | null>(null);

  // Iniciar primera ronda automáticamente al montar en IDLE
  useEffect(() => {
    if (state.fsm === 'IDLE') {
      startRound();
    }
  }, [state.fsm, startRound]);

  // Avance automático tras completar ronda exitosa
  useEffect(() => {
    if (state.fsm !== 'ROUND_COMPLETE') return;
    const timer = setTimeout(() => {
      nextRound();
    }, ROUND_COMPLETE_TRANSITION_MS);
    return () => clearTimeout(timer);
  }, [state.fsm, nextRound]);

  // Efectos sonoros y confeti sincronizados con transiciones de evaluación
  useEffect(() => {
    const roundId = state.currentChallenge?.id ?? null;
    if (!roundId) return;

    if (state.fsm === 'SUCCESS_FEEDBACK' && lastFeedbackRoundRef.current !== `${roundId}-ok`) {
      lastFeedbackRoundRef.current = `${roundId}-ok`;
      const streak = state.streakCount;
      if (streak > 0 && streak % 5 === 0) {
        soundService.playStreakSound(streak);
        triggerStreakConfetti();
      } else if (streak > 0 && streak % 3 === 0) {
        soundService.playStreakSound(streak);
        triggerMiniConfetti();
      } else {
        soundService.playSuccessSound();
        triggerMiniConfetti();
      }
    } else if (
      state.fsm === 'RETRY_HINT' &&
      lastFeedbackRoundRef.current !== `${roundId}-retry-${state.attemptsLeft}`
    ) {
      lastFeedbackRoundRef.current = `${roundId}-retry-${state.attemptsLeft}`;
      soundService.playSoftGongSound();
    }
  }, [state.fsm, state.streakCount, state.attemptsLeft, state.currentChallenge?.id]);

  const handleToggleMute = () => {
    setMuted(soundService.toggleMute());
  };

  return (
    <div
      data-testid="ten-frame-game-view"
      className="flex-1 flex flex-col justify-between px-3 py-2 max-h-[568px] my-auto overflow-hidden gap-1.5"
    >
      {/* Banda 1: Header compacto (Menú, Nivel, Racha, Audio) */}
      <header className="flex items-center justify-between gap-1.5 pb-1 border-b border-cloud-border">
        {onExit ? (
          <button
            type="button"
            onClick={onExit}
            aria-label="Volver al menú"
            className="min-w-[56px] min-h-[56px] px-3 rounded-btn bg-cloud-surface border border-cloud-border text-cloud-text font-semibold text-xs flex items-center justify-center gap-1 shadow-cloud-sm active:scale-95 transition-transform"
          >
            <span>⬅️</span>
            <span>Menú</span>
          </button>
        ) : (
          <div className="min-w-[56px]" />
        )}

        {/* Selector rápido de Niveles */}
        <div className="flex items-center gap-1 bg-cloud-surface p-1 rounded-btn border border-cloud-border">
          {([1, 2, 3] as TenFrameLevel[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => changeLevel(lvl)}
              aria-label={`Nivel ${lvl}`}
              className={`min-w-[56px] min-h-[56px] rounded-xl font-heading font-bold text-sm transition-colors ${
                level === lvl
                  ? 'bg-cloud-sage text-white shadow-sm'
                  : 'bg-transparent text-cloud-muted hover:text-cloud-text'
              }`}
            >
              N{lvl}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <div
            data-testid="streak-pill"
            className="px-2.5 py-1 rounded-pill bg-cloud-sunLight border border-cloud-sun text-cloud-sunDark font-heading font-bold text-xs flex items-center gap-1"
          >
            <span>🔥</span>
            <span>{state.streakCount}</span>
          </div>

          <button
            type="button"
            onClick={handleToggleMute}
            aria-label={muted ? 'Activar sonido' : 'Silenciar sonido'}
            className="min-w-[56px] min-h-[56px] rounded-btn bg-cloud-surface border border-cloud-border flex items-center justify-center text-lg shadow-cloud-sm active:scale-95 transition-transform"
          >
            {muted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>

      {/* Banda 2: Escenario de Marcos de Diez */}
      <TenFrameStage
        challenge={state.currentChallenge}
        fsm={state.fsm}
        isTokensVisible={isTokensVisible}
      />

      {/* Banda 3: Barra de Feedback y Rescates */}
      <div className="flex items-center justify-between gap-2 min-h-[56px] px-1">
        {state.fsm === 'SUCCESS_FEEDBACK' && state.currentChallenge && (
          <div className="w-full py-2 px-3 rounded-btn bg-cloud-sageLight border border-cloud-sage text-cloud-text font-heading font-bold text-sm text-center">
            🎉 ¡Genial! {state.currentChallenge.mathematicalExpression}
          </div>
        )}

        {state.fsm === 'RETRY_HINT' && (
          <div className="w-full py-2 px-3 rounded-btn bg-cloud-errorLight border border-cloud-error text-cloud-text font-heading font-bold text-sm text-center">
            💛 ¡Casi! Intenta una vez más
          </div>
        )}

        {(state.fsm === 'AWAITING_INPUT' ||
          state.fsm === 'PRE_FLASH' ||
          state.fsm === 'FLASH_ACTIVE' ||
          state.fsm === 'PEEK_ACTIVE') && (
          <>
            <div className="text-xs font-semibold text-cloud-muted truncate">
              {state.fsm === 'FLASH_ACTIVE' || state.fsm === 'PEEK_ACTIVE'
                ? '👀 ¡Observa bien!'
                : state.fsm === 'PRE_FLASH'
                ? '⏳ Prepárate...'
                : `${state.currentChallenge?.operatorSymbol ?? '🔢'} ¿Cuántos hay?`}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={triggerPeek}
                disabled={state.fsm !== 'AWAITING_INPUT' || state.peekUsedThisRound}
                className={`min-w-[56px] min-h-[56px] px-2.5 rounded-btn text-xs font-bold border transition-all ${
                  state.fsm === 'AWAITING_INPUT' && !state.peekUsedThisRound
                    ? 'bg-cloud-sunLight border-cloud-sun text-cloud-sunDark active:scale-95'
                    : 'bg-cloud-primaryLight border-cloud-border text-cloud-muted opacity-50 cursor-not-allowed'
                }`}
              >
                👀 Espiar
              </button>

              <button
                type="button"
                onClick={requestSolution}
                disabled={state.fsm !== 'AWAITING_INPUT'}
                className={`min-w-[56px] min-h-[56px] px-2.5 rounded-btn text-xs font-bold border transition-all ${
                  state.fsm === 'AWAITING_INPUT'
                    ? 'bg-cloud-surface border-cloud-border text-cloud-text active:scale-95'
                    : 'bg-cloud-primaryLight border-cloud-border text-cloud-muted opacity-50 cursor-not-allowed'
                }`}
              >
                💡 Solución
              </button>
            </div>
          </>
        )}
      </div>

      {/* Banda 4: Teclado In-App o Modal Pedagógico */}
      <footer className="pb-1">
        {state.fsm === 'SOLUTION_REVEAL' && state.currentChallenge ? (
          <SolutionReplayModal
            challenge={state.currentChallenge}
            steps={replaySteps}
            onNextRound={nextRound}
          />
        ) : (
          <InAppKeypad
            mode={levelConfig.keypadMode}
            disabled={isInputLocked}
            inputBuffer={state.inputBuffer}
            onDigit={inputDigit}
            onDelete={deleteDigit}
            onSubmit={submitAnswer}
          />
        )}
      </footer>
    </div>
  );
};
