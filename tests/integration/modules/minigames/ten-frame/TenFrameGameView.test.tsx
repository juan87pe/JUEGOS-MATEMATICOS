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
      vi.advanceTimersByTime(3000);
    });
    expect(key5).not.toBeDisabled();
  });

  it('CUJ 3: permite usar Espiar de Nuevo una única vez por reto', () => {
    render(<TenFrameGameView />);

    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const peekBtn = screen.getByRole('button', { name: /Espiar/i });
    expect(peekBtn).not.toBeDisabled();

    fireEvent.click(peekBtn);
    expect(screen.getByText(/¡Observa bien las fichas en el marco!/i)).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(PEEK_DURATION_MS);
    });
    expect(peekBtn).toBeDisabled();
  });

  it('CUJ 4: cambiar a Nivel 2 mediante menú desplegable estilizado muestra doble grilla y teclado compacto 3x4', () => {
    render(<TenFrameGameView />);

    fireEvent.click(screen.getByRole('button', { name: 'Menú de nivel y velocidad' }));
    expect(screen.getByTestId('level-speed-menu')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Nivel 2 · Adición Make-10'));

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
      vi.advanceTimersByTime(3000);
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
      vi.advanceTimersByTime(3000);
    });

    fireEvent.click(screen.getByRole('button', { name: String(activeCells) }));
    expect(screen.getByText(/¡Genial!/i)).toBeInTheDocument();
    expect(soundSpy).toHaveBeenCalled();
    expect(confettiHelper.triggerMiniConfetti).toHaveBeenCalled();
  });

  it('Escenario 1B [REQ-TF-001]: TenFrameGrid y TokenCell usan vértices rectos (rounded-none), bordes gruesos continuos y fichas proporcionales (~78%)', () => {
    render(<TenFrameGameView />);

    const grid = screen.getByTestId('ten-frame-grid-grid-a');
    expect(grid).toHaveClass('rounded-none', 'bg-cloud-text');

    const firstCell = screen.getByTestId('token-cell-0');
    expect(firstCell).toHaveClass('rounded-none', 'aspect-square');

    // Avanzar a FLASH_ACTIVE para verificar la proporción de las fichas activas
    act(() => {
      vi.advanceTimersByTime(PRE_FLASH_DURATION_MS);
    });

    const activeToken = screen.getAllByLabelText('ficha activa')[0];
    expect(activeToken).toHaveClass('w-[78%]', 'h-[78%]');
  });

  it('Escenario 11 [REQ-TF-013/014]: botones puros, menú desplegable estilizado de nivel y velocidad, explicación resumida y reinicio', () => {
    const onExit = vi.fn();
    render(<TenFrameGameView onExit={onExit} />);

    // Botón de retroceso solo icono
    const backBtn = screen.getByRole('button', { name: 'Volver al menú' });
    expect(backBtn.textContent?.trim()).toBe('');

    // Menú desplegable estilizado con niveles y velocidades
    const menuTrigger = screen.getByRole('button', { name: 'Menú de nivel y velocidad' });
    expect(menuTrigger).toHaveTextContent('Nivel 1 · Tranquilo');
    fireEvent.click(menuTrigger);
    expect(screen.getByTestId('level-speed-menu')).toBeInTheDocument();
    expect(screen.getByText('Nivel 1 · Subitización Base 5')).toBeInTheDocument();
    expect(screen.getByText('Sin prisa')).toBeInTheDocument();
    expect(screen.getByText('Flash')).toBeInTheDocument();
    expect(screen.getByText('Turbo')).toBeInTheDocument();

    // Seleccionar modo Sin prisa: fichas permanecen visibles en AWAITING_INPUT
    fireEvent.click(screen.getByText('Sin prisa'));
    expect(menuTrigger).toHaveTextContent('Nivel 1 · Sin prisa');
    const activeCells = document.querySelectorAll('[data-cell-state="active"]').length;
    expect(activeCells).toBeGreaterThanOrEqual(1);

    expect(
      screen.getByText('Observa el marco rápido y toca cuántas fichas viste.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Espiar' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Solución' }).textContent).toBe('Solución');

    // Acertar para subir la racha a 1 y luego reiniciar el minijuego
    fireEvent.click(screen.getByRole('button', { name: String(activeCells) }));
    expect(screen.getByTestId('streak-pill')).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: 'Reiniciar minijuego' }));
    expect(screen.getByTestId('streak-pill')).toHaveTextContent('0');
  });
});
