import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import {
  FSMState,
  ReplayStep,
  TenFrameAction,
  TenFrameEngineState,
  TenFrameLevel,
  TenFrameLevelConfig,
} from '../../../../specs/contracts/ten-frame.types';
import {
  calculateMake10Transfer,
  generateRound,
  TEN_FRAME_LEVELS,
} from './tenFrameGenerator';

export const PRE_FLASH_DURATION_MS = 600;
export const PEEK_DURATION_MS = 600;
export const FEEDBACK_DURATION_MS = 800;
export const ROUND_COMPLETE_TRANSITION_MS = 150;

const INPUT_LOCKED_STATES: ReadonlySet<FSMState> = new Set<FSMState>([
  'IDLE',
  'PRE_FLASH',
  'FLASH_ACTIVE',
  'PEEK_ACTIVE',
  'EVALUATING',
  'SUCCESS_FEEDBACK',
  'RETRY_HINT',
  'SOLUTION_REVEAL',
  'ROUND_COMPLETE',
]);

type InternalAction =
  | TenFrameAction
  | { type: 'PRE_FLASH_TIMEOUT' }
  | { type: 'FEEDBACK_TIMEOUT' }
  | { type: 'RETRY_TIMEOUT' };

interface InternalEngineState {
  level: TenFrameLevel;
  lastAnswer?: number;
  engine: TenFrameEngineState;
}

function createInitialEngineState(): TenFrameEngineState {
  return {
    fsm: 'IDLE',
    currentChallenge: null,
    selectedAnswer: null,
    inputBuffer: '',
    attemptsLeft: 2,
    peekUsedThisRound: false,
    streakCount: 0,
  };
}

function evaluateCandidateAnswer(
  engine: TenFrameEngineState,
  answer: number
): TenFrameEngineState {
  if (!engine.currentChallenge) return engine;

  const isCorrect = answer === engine.currentChallenge.expectedAnswer;
  if (isCorrect) {
    return {
      ...engine,
      fsm: 'SUCCESS_FEEDBACK',
      selectedAnswer: answer,
      streakCount: engine.streakCount + 1,
    };
  }

  const nextAttempts = engine.attemptsLeft - 1;
  if (nextAttempts <= 0) {
    return {
      ...engine,
      fsm: 'SOLUTION_REVEAL',
      selectedAnswer: answer,
      attemptsLeft: 0,
      streakCount: 0,
    };
  }

  return {
    ...engine,
    fsm: 'RETRY_HINT',
    selectedAnswer: answer,
    attemptsLeft: nextAttempts,
    streakCount: 0,
  };
}

function startNewRoundState(
  level: TenFrameLevel,
  streakCount: number,
  lastAnswer?: number
): InternalEngineState {
  const challenge = generateRound(level, lastAnswer);
  return {
    level,
    lastAnswer: challenge.expectedAnswer,
    engine: {
      fsm: 'PRE_FLASH',
      currentChallenge: challenge,
      selectedAnswer: null,
      inputBuffer: '',
      attemptsLeft: 2,
      peekUsedThisRound: false,
      streakCount,
    },
  };
}

function tenFrameReducer(
  state: InternalEngineState,
  action: InternalAction
): InternalEngineState {
  const { engine, level } = state;

  switch (action.type) {
    case 'START_ROUND':
    case 'NEXT_ROUND': {
      return startNewRoundState(level, engine.streakCount, state.lastAnswer);
    }

    case 'CHANGE_LEVEL': {
      const nextLevel = action.newLevel;
      return startNewRoundState(nextLevel, 0, undefined);
    }

    case 'PRE_FLASH_TIMEOUT': {
      if (engine.fsm !== 'PRE_FLASH') return state;
      return {
        ...state,
        engine: { ...engine, fsm: 'FLASH_ACTIVE' },
      };
    }

    case 'FLASH_TIMEOUT': {
      if (engine.fsm !== 'FLASH_ACTIVE') return state;
      return {
        ...state,
        engine: { ...engine, fsm: 'AWAITING_INPUT' },
      };
    }

    case 'TRIGGER_PEEK': {
      if (engine.fsm !== 'AWAITING_INPUT' || engine.peekUsedThisRound) {
        return state;
      }
      return {
        ...state,
        engine: {
          ...engine,
          fsm: 'PEEK_ACTIVE',
          peekUsedThisRound: true,
        },
      };
    }

    case 'PEEK_TIMEOUT': {
      if (engine.fsm !== 'PEEK_ACTIVE') return state;
      return {
        ...state,
        engine: { ...engine, fsm: 'AWAITING_INPUT' },
      };
    }

    case 'INPUT_DIGIT': {
      if (engine.fsm !== 'AWAITING_INPUT') return state;

      // Nivel 1: teclado isomórfico 2x5 con envío automático al toque único
      if (level === 1) {
        if (action.digit < 1 || action.digit > 10) return state;
        const evaluatingState: TenFrameEngineState = {
          ...engine,
          fsm: 'EVALUATING',
          inputBuffer: String(action.digit),
          selectedAnswer: action.digit,
        };
        return {
          ...state,
          engine: evaluateCandidateAnswer(evaluatingState, action.digit),
        };
      }

      // Niveles 2 y 3: teclado compacto 3x4 con búfer de hasta 2 dígitos
      if (action.digit < 0 || action.digit > 9) return state;
      if (engine.inputBuffer.length >= 2) return state;

      const nextBuffer =
        engine.inputBuffer === '0'
          ? String(action.digit)
          : `${engine.inputBuffer}${action.digit}`;

      return {
        ...state,
        engine: {
          ...engine,
          inputBuffer: nextBuffer,
        },
      };
    }

    case 'DELETE_DIGIT': {
      if (engine.fsm !== 'AWAITING_INPUT') return state;
      if (engine.inputBuffer.length === 0) return state;
      return {
        ...state,
        engine: {
          ...engine,
          inputBuffer: engine.inputBuffer.slice(0, -1),
        },
      };
    }

    case 'SUBMIT_ANSWER': {
      if (engine.fsm !== 'AWAITING_INPUT') return state;
      if (engine.inputBuffer.length === 0) return state;

      const parsed = Number.parseInt(engine.inputBuffer, 10);
      if (Number.isNaN(parsed)) return state;

      const evaluatingState: TenFrameEngineState = {
        ...engine,
        fsm: 'EVALUATING',
        selectedAnswer: parsed,
      };
      return {
        ...state,
        engine: evaluateCandidateAnswer(evaluatingState, parsed),
      };
    }

    case 'FEEDBACK_TIMEOUT': {
      if (engine.fsm !== 'SUCCESS_FEEDBACK') return state;
      return {
        ...state,
        engine: { ...engine, fsm: 'ROUND_COMPLETE' },
      };
    }

    case 'RETRY_TIMEOUT': {
      if (engine.fsm !== 'RETRY_HINT') return state;
      return {
        ...state,
        engine: {
          ...engine,
          fsm: 'AWAITING_INPUT',
          inputBuffer: '',
          selectedAnswer: null,
        },
      };
    }

    case 'REQUEST_SOLUTION': {
      if (
        engine.fsm !== 'AWAITING_INPUT' &&
        engine.fsm !== 'RETRY_HINT'
      ) {
        return state;
      }
      return {
        ...state,
        engine: {
          ...engine,
          fsm: 'SOLUTION_REVEAL',
          streakCount: 0,
        },
      };
    }

    default:
      return state;
  }
}

export interface UseTenFrameEngineReturn {
  state: TenFrameEngineState;
  level: TenFrameLevel;
  levelConfig: TenFrameLevelConfig;
  replaySteps: ReplayStep[];
  isInputLocked: boolean;
  isTokensVisible: boolean;
  lastTransitionTimestamp: number;
  dispatch: (action: TenFrameAction) => void;
  startRound: () => void;
  inputDigit: (digit: number) => void;
  deleteDigit: () => void;
  submitAnswer: () => void;
  triggerPeek: () => void;
  requestSolution: () => void;
  nextRound: () => void;
  changeLevel: (newLevel: TenFrameLevel) => void;
}

/**
 * Hook principal y máquina de estados finitos (FSM) para Marco de Diez (MG-TF).
 * Gestiona timers reactivos calibrados con performance.now() y cancelación limpia.
 */
export function useTenFrameEngine(
  initialLevel: TenFrameLevel = 1
): UseTenFrameEngineReturn {
  const [internalState, rawDispatch] = useReducer(tenFrameReducer, initialLevel, (lvl) => ({
    level: lvl,
    lastAnswer: undefined,
    engine: createInitialEngineState(),
  }));

  const transitionTimestampRef = useRef<number>(
    typeof performance !== 'undefined' ? performance.now() : Date.now()
  );

  const { engine, level } = internalState;
  const levelConfig = TEN_FRAME_LEVELS[level];

  useEffect(() => {
    transitionTimestampRef.current =
      typeof performance !== 'undefined' ? performance.now() : Date.now();

    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (engine.fsm === 'PRE_FLASH') {
      timerId = setTimeout(() => {
        rawDispatch({ type: 'PRE_FLASH_TIMEOUT' });
      }, PRE_FLASH_DURATION_MS);
    } else if (engine.fsm === 'FLASH_ACTIVE') {
      timerId = setTimeout(() => {
        rawDispatch({ type: 'FLASH_TIMEOUT' });
      }, levelConfig.flashDurationMs);
    } else if (engine.fsm === 'PEEK_ACTIVE') {
      timerId = setTimeout(() => {
        rawDispatch({ type: 'PEEK_TIMEOUT' });
      }, PEEK_DURATION_MS);
    } else if (engine.fsm === 'SUCCESS_FEEDBACK') {
      timerId = setTimeout(() => {
        rawDispatch({ type: 'FEEDBACK_TIMEOUT' });
      }, FEEDBACK_DURATION_MS);
    } else if (engine.fsm === 'RETRY_HINT') {
      timerId = setTimeout(() => {
        rawDispatch({ type: 'RETRY_TIMEOUT' });
      }, FEEDBACK_DURATION_MS);
    }

    return () => {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
    };
  }, [engine.fsm, engine.currentChallenge?.id, levelConfig.flashDurationMs]);

  const dispatch = useCallback((action: TenFrameAction) => {
    rawDispatch(action);
  }, []);

  const startRound = useCallback(() => rawDispatch({ type: 'START_ROUND' }), []);
  const inputDigit = useCallback(
    (digit: number) => rawDispatch({ type: 'INPUT_DIGIT', digit }),
    []
  );
  const deleteDigit = useCallback(() => rawDispatch({ type: 'DELETE_DIGIT' }), []);
  const submitAnswer = useCallback(() => rawDispatch({ type: 'SUBMIT_ANSWER' }), []);
  const triggerPeek = useCallback(() => rawDispatch({ type: 'TRIGGER_PEEK' }), []);
  const requestSolution = useCallback(
    () => rawDispatch({ type: 'REQUEST_SOLUTION' }),
    []
  );
  const nextRound = useCallback(() => rawDispatch({ type: 'NEXT_ROUND' }), []);
  const changeLevel = useCallback(
    (newLevel: TenFrameLevel) => rawDispatch({ type: 'CHANGE_LEVEL', newLevel }),
    []
  );

  const replaySteps = useMemo(() => {
    if (!engine.currentChallenge) return [];
    return calculateMake10Transfer(engine.currentChallenge);
  }, [engine.currentChallenge]);

  const isInputLocked = INPUT_LOCKED_STATES.has(engine.fsm);
  const isTokensVisible =
    engine.fsm === 'FLASH_ACTIVE' ||
    engine.fsm === 'PEEK_ACTIVE' ||
    engine.fsm === 'SUCCESS_FEEDBACK' ||
    engine.fsm === 'SOLUTION_REVEAL';

  return {
    state: engine,
    level,
    levelConfig,
    replaySteps,
    isInputLocked,
    isTokensVisible,
    lastTransitionTimestamp: transitionTimestampRef.current,
    dispatch,
    startRound,
    inputDigit,
    deleteDigit,
    submitAnswer,
    triggerPeek,
    requestSolution,
    nextRound,
    changeLevel,
  };
}
