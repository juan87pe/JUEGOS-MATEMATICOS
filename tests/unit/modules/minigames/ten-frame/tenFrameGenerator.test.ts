import { describe, it, expect } from 'vitest';
import {
  calculateMake10Transfer,
  generateRound,
  TEN_FRAME_LEVELS,
} from '../../../../../src/modules/minigames/ten-frame/tenFrameGenerator';
import {
  mapRoundToMathChallenge,
  tenFrameMinigameDefinition,
} from '../../../../../src/modules/minigames/ten-frame/tenFrameAdapter';

describe('tenFrameGenerator & tenFrameAdapter (MG-TF)', () => {
  it('configura correctamente los 3 niveles curriculares según la especificación', () => {
    expect(TEN_FRAME_LEVELS[1].flashDurationMs).toBe(1100);
    expect(TEN_FRAME_LEVELS[1].gridCount).toBe(1);
    expect(TEN_FRAME_LEVELS[1].keypadMode).toBe('isomorphic-2x5');

    expect(TEN_FRAME_LEVELS[2].flashDurationMs).toBe(1300);
    expect(TEN_FRAME_LEVELS[2].gridCount).toBe(2);
    expect(TEN_FRAME_LEVELS[2].keypadMode).toBe('compact-3x4');

    expect(TEN_FRAME_LEVELS[3].flashDurationMs).toBe(1200);
    expect(TEN_FRAME_LEVELS[3].gridCount).toBe(2);
    expect(TEN_FRAME_LEVELS[3].keypadMode).toBe('compact-3x4');
  });

  it('Nivel 1: genera 500 retos válidos entre 1 y 10 sin repetición inmediata y con 1 sola grilla', () => {
    let lastAnswer: number | undefined;
    for (let i = 0; i < 500; i++) {
      const round = generateRound(1, lastAnswer);
      expect(round.level).toBe(1);
      expect(round.expectedAnswer).toBeGreaterThanOrEqual(1);
      expect(round.expectedAnswer).toBeLessThanOrEqual(10);
      expect(round.gridA.activeTokens).toBe(round.expectedAnswer);
      expect(round.gridA.ghostTokens).toBe(0);
      expect(round.gridB).toBeUndefined();
      if (lastAnswer !== undefined) {
        expect(round.expectedAnswer).not.toBe(lastAnswer);
      }
      lastAnswer = round.expectedAnswer;
    }
  });

  it('Nivel 2: genera 500 retos Make-10 válidos (A in [6,9], B in [2,9], suma > 10) y calcula trasvase exacto', () => {
    for (let i = 0; i < 500; i++) {
      const round = generateRound(2);
      expect(round.level).toBe(2);
      expect(round.gridB).toBeDefined();

      const a = round.gridA.activeTokens;
      const b = round.gridB!.activeTokens;

      expect(a).toBeGreaterThanOrEqual(6);
      expect(a).toBeLessThanOrEqual(9);
      expect(b).toBeGreaterThanOrEqual(2);
      expect(b).toBeLessThanOrEqual(9);
      expect(a + b).toBeGreaterThan(10);
      expect(round.expectedAnswer).toBe(a + b);

      const steps = calculateMake10Transfer(round);
      const transferSteps = steps.filter((s) => s.sourceCell && s.targetCell);
      expect(transferSteps).toHaveLength(10 - a);
      for (const step of transferSteps) {
        expect(step.sourceCell?.grid).toBe(2);
        expect(step.targetCell?.grid).toBe(1);
      }
    }
  });

  it('Nivel 3: genera 500 retos de Resta Fantasma válidos sin diferencias cero ni negativas', () => {
    for (let i = 0; i < 500; i++) {
      const round = generateRound(3);
      expect(round.level).toBe(3);
      expect(round.gridB).toBeDefined();

      const totalA = round.gridA.activeTokens + round.gridA.ghostTokens;
      const totalB = round.gridB!.activeTokens + round.gridB!.ghostTokens;
      expect(totalA).toBeLessThanOrEqual(10);
      expect(totalB).toBeLessThanOrEqual(10);

      const totalActive = round.gridA.activeTokens + round.gridB!.activeTokens;
      const totalGhost = round.gridA.ghostTokens + round.gridB!.ghostTokens;
      const minuend = totalActive + totalGhost;

      expect(minuend).toBeGreaterThanOrEqual(5);
      expect(minuend).toBeLessThanOrEqual(15);
      expect(totalGhost).toBeGreaterThanOrEqual(1);
      expect(totalActive).toBeGreaterThanOrEqual(1);
      expect(round.expectedAnswer).toBe(totalActive);
    }
  });

  it('tenFrameAdapter mapea RoundChallenge a MathChallenge y cumple MinigameDefinition', () => {
    const round = generateRound(2);
    const challenge = mapRoundToMathChallenge(round);

    expect(challenge.id).toBe(round.id);
    expect(challenge.type).toBe('addition');
    expect(challenge.inputMode).toBe('numeric_keypad');
    expect(challenge.correctAnswer).toBe(round.expectedAnswer);

    const defChallenge = tenFrameMinigameDefinition.generateChallenge();
    expect(defChallenge.id).toBeTruthy();
    expect(typeof defChallenge.correctAnswer).toBe('number');
  });
});
