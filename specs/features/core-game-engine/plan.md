# Plan de Implementación Técnica: Core Game Engine (`MOD-CORE`)

## 1. Arquitectura Técnica del Módulo
El motor de juego se estructura como una máquina de estados finitos gestionada a través de un Custom Hook de React (`useGameEngine`) o reductor puro (`gameReducer`) totalmente desacoplado de la interfaz gráfica.

---

## 2. Checklist de Tareas Atómicas

- [ ] **Tarea 1: Definición de Tipos y Estado Inicial**
  - Implementar los tipos TypeScript en base a `specs/contracts/game-engine.types.ts`.
  - Crear constante `INITIAL_GAME_STATE` con estado por defecto (`status: 'idle'`, `timeLeft: 45`, `score: { correct: 0, wrong: 0, streak: 0, maxStreak: 0 }`).

- [ ] **Tarea 2: Implementación de la Máquina de Estados / Reducer**
  - Crear función reductora pura `gameReducer(state, action)` que procese las acciones:
    - `START_GAME`
    - `TICK_TIMER`
    - `SUBMIT_ANSWER`
    - `PAUSE_GAME`
    - `RESUME_GAME`
    - `RESET_GAME`

- [ ] **Tarea 3: Implementación del Hook del Temporizador Preciso**
  - Desarrollar la lógica de decremento en segundos utilizando `setInterval` o `requestAnimationFrame` con sincronización de marcas de tiempo (`performance.now()`) para prevenir desfasajes en dispositivos móviles lentos.
  - Asegurar la limpieza (*cleanup*) del temporizador al desmontar o pausar.

- [ ] **Tarea 4: Implementación de la Lógica de Evaluación y Rachas**
  - Programar la función `evaluateAnswer(userAnswer, challenge)` que verifique equivalencia numérica o textual estricta.
  - Calcular y disparar los hitos de racha al alcanzar 3, 5, 10 aciertos consecutivos.

- [ ] **Tarea 5: Pruebas Unitarias Automatizadas del Motor**
  - Escribir suite de pruebas unitarias en Vitest cubriendo decremento del reloj, cálculo de puntajes, hitos de racha y reseteo en memoria.
