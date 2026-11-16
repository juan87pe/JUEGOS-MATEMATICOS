/**
 * Contrato formal para el Catálogo de Minijuegos Matemáticos Infantiles
 * Define la estructura de cada ejercicio, tipos de respuesta y generadores procedurales.
 */

export type GameType = 
  | 'addition'       // Suma rápida (ej. 3 + 4)
  | 'subtraction'    // Resta divertida (ej. 8 - 3)
  | 'comparison'     // Mayor o Menor (ej. 7 vs 9 -> >, <, =)
  | 'multiplication' // Multiplicación básica (tablas 1 a 5 y 10)
  | 'visual_count';  // Conteo visual de objetos/figuras lúdicas

export type InputMode = 
  | 'numeric_keypad' // Entrada directa por teclado numérico en pantalla
  | 'multiple_choice'// Selección entre 3 o 4 botones grandes
  | 'symbol_selector'// Selección de símbolos (ej. '<', '=', '>');

export interface VisualItem {
  icon: string;   // Emoji o clave de icono (ej. '🍎', '⭐', '🐶')
  count: number;  // Cantidad de elementos
}

export interface MathChallenge {
  /** Identificador único del desafío generado */
  id: string;
  /** Tipo de minijuego */
  type: GameType;
  /** Modo de interacción de entrada recomendado */
  inputMode: InputMode;
  /** Texto o ecuación principal a mostrar en tamaño gigante */
  prompt: string;
  /** Primer operando (si aplica) */
  operandA?: number;
  /** Segundo operando (si aplica) */
  operandB?: number;
  /** Símbolo de la operación (ej. '+', '-', '×', '?') */
  operator?: string;
  /** Representación visual para juegos de conteo */
  visuals?: VisualItem;
  /** Valor numérico o texto exacto de la respuesta correcta */
  correctAnswer: number | string;
  /** Opciones de respuesta para modalidad multiple_choice o symbol_selector */
  options?: (number | string)[];
  /** Pista visual o mensaje de refuerzo */
  hint?: string;
}

export interface MinigameDefinition {
  /** Identificador único del minijuego */
  id: string;
  /** Nombre comercial amigable para niños */
  title: string;
  /** Descripción muy breve y clara */
  description: string;
  /** Icono representativo */
  icon: string;
  /** Color temático distintivo (Tailwind class) */
  themeColor: string;
  /** Rango de edad recomendado */
  ageRange: string;
  /** Función generadora procedural de un nuevo reto matemático */
  generateChallenge: () => MathChallenge;
}
