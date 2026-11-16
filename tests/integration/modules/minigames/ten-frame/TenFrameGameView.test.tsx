import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { TenFrameGameView } from '../../../../../src/modules/minigames/ten-frame/TenFrameGameView';
import {
  PRE_FLASH_DURATION_MS,
  PEEK_DURATION_MS,
} from '../../../../../src/modules/minigames/ten-frame/useTenFrameEngine';
import * as confettiHelper from '../../../../../src/services/confettiHelper';
import { soundService } from '../../../../../src/services/soundEffects';

vi.mock('../../../../../src/services/confettiHelper', () => ({
  triggerMiniConfetti: vi.fn(),
  triggerStreakConfetti: vi.fn(),
}));

describe('TenFrameGameView Integration (CUJ 1 - CUJ 5)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('CUJ 1: no renderiza ningún tag <input> y muestra teclado isomórfico 2x5 en Nivel 1', () => {
    const { container } = render(<TenFrameGameView />);
    expect(container.querySelectorAll('input')).toHaveLength(0);
    expect(screen.getByTestId('inapp-keypad-isomorphic')).toBeInTheDocument();
    expect(screen.getByTestId('ten-frame-grid-grid-a')).toBeInTheDocument();
  });

  it('CUJ 2: bloquea el teclado durante PRE_FLASH y FLASH_ACTIVE y lo habilita en AWAITING_INPUT', () => {
    render(<TenFrameGameView />);

    const key5 = screen.getByRole('button', { name: '5' });
    expect(key5).toBeDisabled();

    // PRE_FLASH -> FLASH_ACTIVE
    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    expect(key5).toBeDisabled();

    // FLASH_ACTIVE (1100 ms) -> AWAITING_INPUT
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(key5).not.toBeDisabled();
  });

  it('CUJ 3: permite usar Espiar de Nuevo una única vez por reto', () => {
    render(<TenFrameGameView />);

    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    const peekBtn = screen.getByRole('button', { name: /Espiar/i });
    expect(peekBtn).not.toBeDisabled();

    fireEvent.click(peekBtn);
    expect(screen.getByText(/¡Observa bien!/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(PEEK_DURATION_MS);
    });
    expect(peekBtn).toBeDisabled();
  });

  it('CUJ 4: cambiar a Nivel 2 muestra doble grilla y teclado compacto 3x4', () => {
    render(<TenFrameGameView />);

    fireEvent.click(screen.getByRole('button', { name: 'Nivel 2' }));

    expect(screen.getByTestId('ten-frame-grid-grid-a')).toBeInTheDocument();
    expect(screen.getByTestId('ten-frame-grid-grid-b')).toBeInTheDocument();
    expect(screen.getByTestId('inapp-keypad-compact')).toBeInTheDocument();
    expect(screen.getByTestId('keypad-buffer-display')).toBeInTheDocument();
  });

  it('CUJ 5: abrir Solución muestra SolutionReplayModal con avance manual y dispara confeti al acertar', () => {
    const soundSpy = vi.spyOn(soundService, 'playSuccessSound');
    render(<TenFrameGameView />);

    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    // Abrir solución manualmente
    fireEvent.click(screen.getByRole('button', { name: /Solución/i }));
    expect(screen.getByTestId('solution-replay-panel')).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /¡Entendido! Siguiente reto/i });
    fireEvent.click(nextBtn);

    // En la nueva ronda tras el flash, acertar contando las celdas activas visibles durante FLASH_ACTIVE
    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    const activeCells = document.querySelectorAll('[data-cell-state="active"]').length;
    expect(activeCells).toBeGreaterThanOrEqual(1);

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    fireEvent.click(screen.getByRole('button', { name: String(activeCells) }));
    expect(screen.getByText(/¡Genial!/i)).toBeInTheDocument();
    expect(soundSpy).toHaveBeenCalled();
    expect(confettiHelper.triggerMiniConfetti).toHaveBeenCalled();
  });
});
