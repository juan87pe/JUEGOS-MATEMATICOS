import { describe, it, expect, vi, beforeEach } from 'vitest';
import { soundService } from '../../../src/services/soundEffects';
import * as confettiModule from '../../../src/services/confettiHelper';
import confetti from 'canvas-confetti';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('MOD-REWARD Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('SoundEffectsService', () => {
    it('permite alternar el estado de mute correctamente', () => {
      soundService.setMuted(false);
      expect(soundService.isMuted()).toBe(false);

      soundService.toggleMute();
      expect(soundService.isMuted()).toBe(true);

      soundService.toggleMute();
      expect(soundService.isMuted()).toBe(false);
    });

    it('no lanza errores al invocar efectos de sonido en entorno de prueba', () => {
      expect(() => soundService.playSuccessSound()).not.toThrow();
      expect(() => soundService.playStreakSound(3)).not.toThrow();
      expect(() => soundService.playSoftGongSound()).not.toThrow();
      expect(() => soundService.playGameOverSound()).not.toThrow();
    });
  });

  describe('ConfettiHelper', () => {
    it('triggerMiniConfetti dispara 25 partículas centradas con la paleta oficial', () => {
      confettiModule.triggerMiniConfetti();
      expect(confetti).toHaveBeenCalledWith(
        expect.objectContaining({
          particleCount: 25,
          spread: 45,
          colors: expect.arrayContaining(['#E0B342', '#71B1A1', '#FFFFFF']),
        })
      );
    });

    it('triggerStreakConfetti dispara cañones laterales dobles con 60 partículas cada uno', () => {
      confettiModule.triggerStreakConfetti();
      expect(confetti).toHaveBeenCalledTimes(2);
      expect(confetti).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          particleCount: 60,
          angle: 60,
          origin: { x: 0, y: 0.75 },
        })
      );
      expect(confetti).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          particleCount: 60,
          angle: 120,
          origin: { x: 1, y: 0.75 },
        })
      );
    });
  });
});
