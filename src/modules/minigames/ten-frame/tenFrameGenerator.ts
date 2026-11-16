import {
  ReplayStep,
  RoundChallenge,
  TenFrameLevel,
  TenFrameLevelConfig,
  TokenType,
} from '../../../../specs/contracts/ten-frame.types';

export const TEN_FRAME_LEVELS: Record<TenFrameLevel, TenFrameLevelConfig> = {
  1: {
    levelId: 1,
    name: 'Subitización Base 5',
    gridCount: 1,
    operationMode: 'single-count',
    keypadMode: 'isomorphic-2x5',
    flashDurationMs: 1100,
    minTarget: 1,
    maxTarget: 10,
  },
  2: {
    levelId: 2,
    name: 'Adición Make-10',
    gridCount: 2,
    operationMode: 'make-10-add',
    keypadMode: 'compact-3x4',
    flashDurationMs: 1300,
    minTarget: 11,
    maxTarget: 18,
  },
  3: {
    levelId: 3,
    name: 'Resta Fantasma',
    gridCount: 2,
    operationMode: 'ghost-subtract',
    keypadMode: 'compact-3x4',
    flashDurationMs: 1200,
    minTarget: 1,
    maxTarget: 14,
  },
};

const TOKEN_TYPES: TokenType[] = ['apple', 'star', 'circle', 'heart'];
const TOKEN_COLORS = ['bg-cloud-sage', 'bg-cloud-sun', 'bg-cloud-primary', 'bg-cloud-error'];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function createChallengeId(level: TenFrameLevel): string {
  const rand = Math.random().toString(36).slice(2, 8);
  return `tf-l${level}-${Date.now()}-${rand}`;
}

/**
 * Genera un reto procedural para Subitización Rápida con Marco de Diez (MG-TF).
 * Evita repetir inmediatamente la misma respuesta esperada que la ronda anterior.
 */
export function generateRound(level: TenFrameLevel, lastAnswer?: number): RoundChallenge {
  const tokenType = pickRandom(TOKEN_TYPES);
  const tokenColor = pickRandom(TOKEN_COLORS);

  if (level === 1) {
    let target = randomInt(1, 10);
    if (lastAnswer !== undefined && target === lastAnswer) {
      target = (target % 10) + 1;
    }

    const expression = target > 5 ? `5 + ${target - 5} = ${target}` : `${target}`;

    return {
      id: createChallengeId(level),
      level: 1,
      gridA: {
        gridId: 'grid-a',
        activeTokens: target,
        ghostTokens: 0,
        tokenType,
        tokenColor,
      },
      expectedAnswer: target,
      mathematicalExpression: expression,
      operatorSymbol: '🔢',
    };
  }

  if (level === 2) {
    let a = randomInt(6, 9);
    let b = randomInt(Math.max(2, 11 - a), 9);

    // Evitar repetición inmediata de la suma esperada
    for (let tries = 0; tries < 5 && lastAnswer !== undefined && a + b === lastAnswer; tries++) {
      a = randomInt(6, 9);
      b = randomInt(Math.max(2, 11 - a), 9);
    }

    const sum = a + b;

    return {
      id: createChallengeId(level),
      level: 2,
      gridA: {
        gridId: 'grid-a',
        activeTokens: a,
        ghostTokens: 0,
        tokenType,
        tokenColor,
      },
      gridB: {
        gridId: 'grid-b',
        activeTokens: b,
        ghostTokens: 0,
        tokenType,
        tokenColor,
      },
      expectedAnswer: sum,
      mathematicalExpression: `${a} + ${b} = ${sum}`,
      operatorSymbol: '+',
    };
  }

  // Nivel 3: Resta Fantasma (M in [5, 15], S in [1, M - 1], resultado >= 1)
  let minuend = randomInt(5, 15);
  let subtrahend = randomInt(1, minuend - 1);

  for (
    let tries = 0;
    tries < 5 && lastAnswer !== undefined && minuend - subtrahend === lastAnswer;
    tries++
  ) {
    minuend = randomInt(5, 15);
    subtrahend = randomInt(1, minuend - 1);
  }

  const difference = minuend - subtrahend;
  const occupiedA = Math.min(minuend, 10);
  const activeA = Math.min(difference, 10);
  const ghostA = occupiedA - activeA;

  const occupiedB = Math.max(0, minuend - 10);
  const activeB = Math.max(0, difference - 10);
  const ghostB = occupiedB - activeB;

  return {
    id: createChallengeId(level),
    level: 3,
    gridA: {
      gridId: 'grid-a',
      activeTokens: activeA,
      ghostTokens: ghostA,
      tokenType,
      tokenColor,
    },
    gridB: {
      gridId: 'grid-b',
      activeTokens: activeB,
      ghostTokens: ghostB,
      tokenType,
      tokenColor,
    },
    expectedAnswer: difference,
    mathematicalExpression: `${minuend} - ${subtrahend} = ${difference}`,
    operatorSymbol: '-',
  };
}

/**
 * Calcula los pasos pedagógicos de revelación / trasvase Make-10 (Singapur).
 * Función pura sin efectos secundarios.
 */
export function calculateMake10Transfer(challenge: RoundChallenge): ReplayStep[] {
  const steps: ReplayStep[] = [];

  if (challenge.level === 1) {
    const target = challenge.expectedAnswer;
    if (target >= 5) {
      steps.push({
        stepIndex: 0,
        description: 'Primero vemos la fila superior completa de 5',
        highlightBase5: true,
      });
      if (target > 5) {
        steps.push({
          stepIndex: 1,
          description: `Sumamos ${target - 5} abajo: 5 + ${target - 5} = ${target}`,
          highlightBase5: true,
        });
      }
    } else {
      steps.push({
        stepIndex: 0,
        description: `Contamos ${target} ${target === 1 ? 'ficha' : 'fichas'} de izquierda a derecha`,
        highlightBase5: false,
      });
    }
    return steps;
  }

  if (challenge.level === 2 && challenge.gridB) {
    const a = challenge.gridA.activeTokens;
    const b = challenge.gridB.activeTokens;
    const neededFor10 = Math.max(0, 10 - a);
    const remainderB = b - neededFor10;

    steps.push({
      stepIndex: 0,
      description: `Arriba hay ${a} fichas (5 + ${a - 5}) y abajo ${b}`,
      highlightBase5: true,
    });

    for (let i = 0; i < neededFor10; i++) {
      steps.push({
        stepIndex: i + 1,
        description: `Pasamos 1 ficha arriba para acercarnos a 10 (${i + 1}/${neededFor10})`,
        sourceCell: { grid: 2, index: b - 1 - i },
        targetCell: { grid: 1, index: a + i },
        highlightBase5: true,
      });
    }

    steps.push({
      stepIndex: neededFor10 + 1,
      description: `¡Completamos 10! 10 + ${remainderB} = ${a + b}`,
      highlightBase5: true,
    });

    return steps;
  }

  // Nivel 3: Resta Fantasma
  const totalActive = challenge.gridA.activeTokens + (challenge.gridB?.activeTokens ?? 0);
  const totalGhost = challenge.gridA.ghostTokens + (challenge.gridB?.ghostTokens ?? 0);
  const minuend = totalActive + totalGhost;

  steps.push({
    stepIndex: 0,
    description: `Empezamos con ${minuend} fichas en los marcos`,
    highlightBase5: minuend >= 5,
  });

  steps.push({
    stepIndex: 1,
    description: `Quitamos ${totalGhost} fichas fantasma`,
    highlightBase5: totalActive >= 5,
  });

  steps.push({
    stepIndex: 2,
    description: `Quedan ${totalActive} fichas activas: ${minuend} - ${totalGhost} = ${totalActive}`,
    highlightBase5: totalActive >= 5,
  });

  return steps;
}
