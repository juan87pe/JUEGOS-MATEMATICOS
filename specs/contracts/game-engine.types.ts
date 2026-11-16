/**
 * Contrato formal para el Motor del Juego (Core Game Engine)
 * Define las estructuras de datos, estados de la partida, temporizadores y eventos de puntuación.
 */

export type GameStatus = 'idle' | 'ready' | 'playing' | 'time_up' | 'paused';

export type StreakMilestone = 3 | 5 | 10 | 15;

export interface GameSessionScore {
  /** Cantidad de respuestas correctas acumuladas en la ronda */
  correctCount: number;
  /** Cantidad de respuestas erróneas en la ronda */
  wrongCount: number;
  /** Racha actual de respuestas correctas consecutivas */
  currentStreak: number;
  /** Mayor racha alcanzada durante la ronda actual */
  maxStreak: number;
  /** Puntuación calculada en memoria (considera bonus por racha) */
  totalScore: number;
}

export interface GameEngineState {
  /** Estado de ciclo de vida del juego */
  status: GameStatus;
  /** Identificador del minijuego activo */
  activeGameId: string | null;
  /** Duración total de la ronda en segundos (ej. 30 o 60) */
  roundDurationSeconds: number;
  /** Segundos restantes de la ronda */
  timeLeftSeconds: number;
  /** Puntuación y estadísticas de la sesión activa */
  score: GameSessionScore;
  /** Hito de racha recién alcanzado para disparar animación especial */
  activeMilestone: StreakMilestone | null;
  /** Indicador para saber si los efectos de sonido están habilitados */
  soundEnabled: boolean;
}

export interface EvaluationResult {
  /** Indica si la respuesta introducida por el niño es correcta */
  isCorrect: boolean;
  /** Valor esperado correcto */
  expectedAnswer: number | string;
  /** Valor proporcionado por el usuario */
  userAnswer: number | string;
  /** Racha resultante tras la evaluación */
  newStreak: number;
  /** Si se activó un hito de felicitación festiva */
  milestoneReached?: StreakMilestone;
}

export interface GameEngineActions {
  /** Inicia una nueva ronda de juego con el tiempo asignado */
  startGame: (gameId: string, durationSeconds?: number) => void;
  /** Pausa o reanuda la partida */
  togglePause: () => void;
  /** Envía la respuesta ingresada por el usuario para su validación */
  submitAnswer: (answer: number | string) => EvaluationResult;
  /** Finaliza forzosamente la partida actual o reinicia al menú */
  resetGame: () => void;
  /** Alterna el estado del sonido */
  toggleSound: () => void;
}
