/**
 * specs/contracts/ten-frame.types.ts
 * Contratos formales de tipos para el Minijuego de Subitización Rápida con Marco de Diez (MG-TF)
 * Cumple con la arquitectura SDD y la metodología de Singapur (base 5 y complementos a 10).
 */

export type TenFrameLevel = 1 | 2 | 3;

export type TenFrameSpeedMode = 'steady' | 'calm' | 'flash' | 'turbo';

export type TokenType = 'apple' | 'star' | 'circle' | 'heart';

export type KeypadMode = 'isomorphic-2x5' | 'compact-3x4';

export type GameOperationMode = 'single-count' | 'make-10-add' | 'ghost-subtract';

export interface TenFrameLevelConfig {
  /** Nivel de dificultad didáctica */
  levelId: TenFrameLevel;
  /** Nombre amigable para niños */
  name: string;
  /** Número de marcos de diez activos (1 para conteo unitario, 2 para operaciones) */
  gridCount: 1 | 2;
  /** Modo de operación aritmética */
  operationMode: GameOperationMode;
  /** Disposición del teclado táctil in-app */
  keypadMode: KeypadMode;
  /** Ventana de exposición visual ultra-corta en milisegundos */
  flashDurationMs: number;
  /** Rango mínimo de respuesta */
  minTarget: number;
  /** Rango máximo de respuesta */
  maxTarget: number;
}

export interface TenFrameGridState {
  /** Identificador de la grilla en el escenario */
  gridId: 'grid-a' | 'grid-b';
  /** Fichas activas visibles durante el flash (o resultado visible en resta) (0 a 10) */
  activeTokens: number;
  /** Fichas convertidas en siluetas fantasma en Nivel 3 (0 a 10) */
  ghostTokens: number;
  /** Tipo de token visual renderizado */
  tokenType: TokenType;
  /** Clave de color Tailwind para tokens circulares */
  tokenColor: string;
}

export interface RoundChallenge {
  /** Identificador único del desafío procedural */
  id: string;
  /** Nivel en el que se generó */
  level: TenFrameLevel;
  /** Grilla superior (Marco A) */
  gridA: TenFrameGridState;
  /** Grilla inferior (Marco B), presente en Niveles 2 y 3 */
  gridB?: TenFrameGridState;
  /** Valor numérico exacto esperado como respuesta */
  expectedAnswer: number;
  /** Expresión matemática representativa (ej. "5 + 3 = 8", "8 + 5 = 13", "14 - 5 = 9") */
  mathematicalExpression: string;
  /** Insignia visual de operador a mostrar en Zona 3 durante la respuesta */
  operatorSymbol?: '+' | '-' | '🔢';
}

export type FSMState =
  | 'IDLE'              // Estado inicial de carga
  | 'PRE_FLASH'         // Pulso de atención visual ("¡Ojos listos!", 600 ms)
  | 'FLASH_ACTIVE'      // Tokens visibles en orden canónico (1100-1300 ms)
  | 'AWAITING_INPUT'    // Tokens ocultos / marco vacío persistente, teclado activo
  | 'PEEK_ACTIVE'       // Pulso de rescate temporal (600 ms, 1 uso por reto)
  | 'EVALUATING'        // Comprobación de respuesta
  | 'SUCCESS_FEEDBACK'  // Refuerzo positivo: acorde festivo y confeti (800 ms)
  | 'RETRY_HINT'        // Sacudida visual sutil ante error (800 ms)
  | 'SOLUTION_REVEAL'   // Revelación pedagógica animada paso a paso
  | 'ROUND_COMPLETE';   // Transición a la siguiente ronda

export type TenFrameAction =
  | { type: 'START_ROUND' }
  | { type: 'FLASH_TIMEOUT' }
  | { type: 'INPUT_DIGIT'; digit: number }
  | { type: 'DELETE_DIGIT' }
  | { type: 'SUBMIT_ANSWER' }
  | { type: 'TRIGGER_PEEK' }
  | { type: 'PEEK_TIMEOUT' }
  | { type: 'REQUEST_SOLUTION' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET_GAME' }
  | { type: 'CHANGE_LEVEL'; newLevel: TenFrameLevel }
  | { type: 'CHANGE_SPEED'; newSpeed: TenFrameSpeedMode };

export interface ReplayStep {
  /** Índice del paso pedagógico */
  stepIndex: number;
  /** Descripción del razonamiento (ej. "Primero vemos la fila completa de 5") */
  description: string;
  /** Coordenada de celda de origen en animación de trasvase Make-10 */
  sourceCell?: { grid: 1 | 2; index: number };
  /** Coordenada de celda de destino en animación de trasvase Make-10 */
  targetCell?: { grid: 1 | 2; index: number };
  /** Indica si se resalta con resplandor dorado la base 5 superior */
  highlightBase5?: boolean;
}

export interface TenFrameEngineState {
  /** Estado activo de la FSM */
  fsm: FSMState;
  /** Reto procedural en curso */
  currentChallenge: RoundChallenge | null;
  /** Respuesta numérica final confirmada */
  selectedAnswer: number | null;
  /** Búfer de entrada de texto para teclados multidígito (ej. "", "1", "13") */
  inputBuffer: string;
  /** Intentos restantes en la ronda activa (máximo 2) */
  attemptsLeft: number;
  /** Bandera de control para limitar a 1 rescate "Espiar de Nuevo" por reto */
  peekUsedThisRound: boolean;
  /** Contador de racha de aciertos consecutivos */
  streakCount: number;
}
