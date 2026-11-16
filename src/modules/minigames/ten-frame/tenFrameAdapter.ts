import {
  MathChallenge,
  MinigameDefinition,
} from '../../../../specs/contracts/minigames.types';
import {
  RoundChallenge,
  TenFrameLevel,
  TokenType,
} from '../../../../specs/contracts/ten-frame.types';
import { generateRound } from './tenFrameGenerator';

const TOKEN_EMOJI_MAP: Record<TokenType, string> = {
  apple: '🍎',
  star: '⭐',
  circle: '🔵',
  heart: '❤️',
};

/**
 * Adapta un RoundChallenge específico de Marco de Diez al contrato universal MathChallenge
 * usado por MOD-SHELL y MOD-GAMES.
 */
export function mapRoundToMathChallenge(round: RoundChallenge): MathChallenge {
  const operandA = round.gridA.activeTokens + round.gridA.ghostTokens;
  const operandB = round.gridB
    ? round.gridB.activeTokens + round.gridB.ghostTokens
    : undefined;

  return {
    id: round.id,
    type:
      round.level === 1
        ? 'visual_count'
        : round.level === 2
        ? 'addition'
        : 'subtraction',
    inputMode: 'numeric_keypad',
    prompt: round.mathematicalExpression,
    operandA,
    operandB,
    operator: round.operatorSymbol,
    visuals: {
      icon: TOKEN_EMOJI_MAP[round.gridA.tokenType],
      count: round.expectedAnswer,
    },
    correctAnswer: round.expectedAnswer,
    hint: `Nivel ${round.level}: observa la base de 5 y el marco de 10`,
  };
}

/**
 * Definición oficial de MG-TF compatible con MINIGAMES_REGISTRY.
 */
export function createTenFrameDefinition(level: TenFrameLevel = 1): MinigameDefinition {
  return {
    id: 'marco-diez',
    title: 'Marco de Diez',
    description: 'Subitización rápida, cálculo mental en base 5 y 10',
    icon: '🔟',
    themeColor: 'from-[#71B1A1] to-[#559485]',
    ageRange: '5 - 10 años',
    generateChallenge: () => mapRoundToMathChallenge(generateRound(level)),
  };
}

export const tenFrameMinigameDefinition: MinigameDefinition = createTenFrameDefinition(1);
