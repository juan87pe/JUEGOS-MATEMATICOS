import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  FEEDBACK_DURATION_MS,
  PEEK_DURATION_MS,
  PRE_FLASH_DURATION_MS,
  useTenFrameEngine,
} from '../../../../../src/modules/minigames/ten-frame/useTenFrameEngine';

describe('useTenFrameEngine (FSM & Timers MG-TF)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('transiciona por PRE_FLASH (600ms) -> FLASH_ACTIVE (3000ms en Tranquilo) -> AWAITING_INPUT', () => {
    const { result } = renderHook(() => useTenFrameEngine(1));
    expect(result.current.state.fsm).toBe('IDLE');
    expect(result.current.isInputLocked).toBe(true);

    act(() => {
      result.current.startRound();
    });
    expect(result.current.state.fsm).toBe('PRE_FLASH');
    expect(result.current.isInputLocked).toBe(true);
    expect(result.current.isTokensVisible).toBe(false);

    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    expect(result.current.state.fsm).toBe('FLASH_ACTIVE');
    expect(result.current.isInputLocked).toBe(true);
    expect(result.current.isTokensVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');
    expect(result.current.isInputLocked).toBe(false);
    expect(result.current.isTokensVisible).toBe(false);
  });

  it('bloquea entradas táctiles (input-lock) durante PRE_FLASH, FLASH_ACTIVE y PEEK_ACTIVE', () => {
    const { result } = renderHook(() => useTenFrameEngine(1));

    act(() => {
      result.current.startRound();
      result.current.inputDigit(5);
    });
    expect(result.current.state.fsm).toBe('PRE_FLASH');
    expect(result.current.state.selectedAnswer).toBeNull();

    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
      result.current.inputDigit(5);
    });
    expect(result.current.state.fsm).toBe('FLASH_ACTIVE');
    expect(result.current.state.selectedAnswer).toBeNull();

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');

    // Activar rescate y verificar input-lock durante PEEK_ACTIVE
    act(() => {
      result.current.triggerPeek();
    });
    expect(result.current.state.fsm).toBe('PEEK_ACTIVE');
    expect(result.current.isInputLocked).toBe(true);

    act(() => {
      result.current.inputDigit(5);
    });
    expect(result.current.state.fsm).toBe('PEEK_ACTIVE');
    expect(result.current.state.selectedAnswer).toBeNull();
  });

  it('Nivel 1: auto-envía al primer toque, suma racha y transiciona a ROUND_COMPLETE tras 800ms', () => {
    const { result } = renderHook(() => useTenFrameEngine(1));

    act(() => {
      result.current.startRound();
    });
    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const expected = result.current.state.currentChallenge!.expectedAnswer;

    act(() => {
      result.current.inputDigit(expected);
    });
    expect(result.current.state.fsm).toBe('SUCCESS_FEEDBACK');
    expect(result.current.state.streakCount).toBe(1);

    act(() => {
      vi.advanceTimersByTime(FEEDBACK_DURATION_MS);
    });
    expect(result.current.state.fsm).toBe('ROUND_COMPLETE');
  });

  it('Nivel 2: acumula dígitos en búfer, soporta borrado y exige confirmación [✓]', () => {
    const { result } = renderHook(() => useTenFrameEngine(2));

    act(() => {
      result.current.startRound();
    });
    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');

    const expected = result.current.state.currentChallenge!.expectedAnswer;
    const digits = String(expected).split('').map(Number);

    act(() => {
      result.current.inputDigit(digits[0]);
    });
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');
    expect(result.current.state.inputBuffer).toBe(String(digits[0]));

    act(() => {
      result.current.inputDigit(9);
      result.current.deleteDigit();
      result.current.inputDigit(digits[1]);
    });
    expect(result.current.state.inputBuffer).toBe(String(expected));
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');

    act(() => {
      result.current.submitAnswer();
    });
    expect(result.current.state.fsm).toBe('SUCCESS_FEEDBACK');
    expect(result.current.state.streakCount).toBe(1);
  });

  it('Rescate Espiar de Nuevo dura 600ms, se limita a 1 uso por reto y no penaliza racha', () => {
    const { result } = renderHook(() => useTenFrameEngine(1));

    act(() => {
      result.current.startRound();
    });
    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    act(() => {
      result.current.triggerPeek();
    });
    expect(result.current.state.fsm).toBe('PEEK_ACTIVE');
    expect(result.current.state.peekUsedThisRound).toBe(true);
    expect(result.current.isTokensVisible).toBe(true);

    act(() => {
      vi.advanceTimersByTime(PEEK_DURATION_MS);
    });
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');

    // Segundo intento de espiar debe ser ignorado
    act(() => {
      result.current.triggerPeek();
    });
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');
  });

  it('maneja 1er error con RETRY_HINT (800ms) y 2do error con SOLUTION_REVEAL permanente hasta NEXT_ROUND', () => {
    const { result } = renderHook(() => useTenFrameEngine(1));

    act(() => {
      result.current.startRound();
    });
    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const expected = result.current.state.currentChallenge!.expectedAnswer;
    const wrong = expected === 1 ? 2 : 1;

    // Primer error -> RETRY_HINT
    act(() => {
      result.current.inputDigit(wrong);
    });
    expect(result.current.state.fsm).toBe('RETRY_HINT');
    expect(result.current.state.attemptsLeft).toBe(1);
    expect(result.current.state.streakCount).toBe(0);

    act(() => {
      vi.advanceTimersByTime(FEEDBACK_DURATION_MS);
    });
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');
    expect(result.current.state.inputBuffer).toBe('');

    // Segundo error -> SOLUTION_REVEAL
    act(() => {
      result.current.inputDigit(wrong);
    });
    expect(result.current.state.fsm).toBe('SOLUTION_REVEAL');
    expect(result.current.state.attemptsLeft).toBe(0);

    // Permanece en SOLUTION_REVEAL aunque pase el tiempo
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.state.fsm).toBe('SOLUTION_REVEAL');

    // Avanza manualmente con NEXT_ROUND
    act(() => {
      result.current.nextRound();
    });
    expect(result.current.state.fsm).toBe('PRE_FLASH');
    expect(result.current.state.attemptsLeft).toBe(2);
  });

  it('permite cambiar velocidad a Sin prisa (permanente), Flash (1800ms) y Turbo (1000ms)', () => {
    const { result } = renderHook(() => useTenFrameEngine(1));

    act(() => {
      result.current.changeSpeed('steady');
    });
    expect(result.current.speed).toBe('steady');
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');
    expect(result.current.isTokensVisible).toBe(true);

    act(() => {
      result.current.changeSpeed('turbo');
    });
    expect(result.current.speed).toBe('turbo');
    expect(result.current.state.fsm).toBe('PRE_FLASH');

    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    expect(result.current.state.fsm).toBe('FLASH_ACTIVE');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.state.fsm).toBe('AWAITING_INPUT');
  });
});
