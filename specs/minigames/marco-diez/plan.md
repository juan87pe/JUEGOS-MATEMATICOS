# Plan de Implementación Técnica: Subitización con Marco de Diez (`MG-TF`)

## 1. Arquitectura del Módulo
El minijuego opera como un módulo desacoplado dentro de `src/modules/minigames/ten-frame/`, conectado al shell y al motor de sesiones mediante un adaptador formal que implementa `MinigameDefinition` de [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts).

---

## 2. Checklist de Tareas Atómicas

### Fase 1: Contratos y Adaptador de Plataforma
- [x] **Tarea 1.1: Formalización de Contratos TypeScript**
  - Implementado en [`specs/contracts/ten-frame.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/ten-frame.types.ts) (`TenFrameLevel`, `TenFrameGridState`, `RoundChallenge`, `TenFrameAction`, `ReplayStep`, `TenFrameEngineState`).
- [x] **Tarea 1.2: Adaptador de Integración para el Catálogo**
  - Crear `src/modules/minigames/ten-frame/tenFrameAdapter.ts`.
  - Implementar `MinigameDefinition` mapeando `RoundChallenge` a `MathChallenge` para compatibilidad universal con `MOD-SHELL` y `MOD-GAMES`.

### Fase 2: Motor Matemático Procedural
- [x] **Tarea 2.1: Generador Determinista de Retos**
  - Crear `src/modules/minigames/ten-frame/tenFrameGenerator.ts`.
  - Implementar generación de Nivel 1 (1 a 10 sin repetición inmediata).
  - Implementar generación de Nivel 2 ($A \in [6, 9]$, $B \in [2, 9]$, suma $> 10$).
  - Implementar generación de Nivel 3 ($M \in [5, 15]$, $S \in [1, M - 1]$, resultado $\ge 1$).
  - Implementar función pura `calculateMake10Transfer(challenge)` retornando `ReplayStep[]`.
- [x] **Tarea 2.2: Suite de Pruebas Unitarias del Generador**
  - Crear `tests/unit/modules/minigames/ten-frame/tenFrameGenerator.test.ts`.
  - Ejecutar 500 pruebas aleatorias con Vitest validando rangos, base 5 y ausencia de diferencias cero o negativas.

### Fase 3: Hook de Ciclo de Vida y FSM
- [x] **Tarea 3.1: Implementación de `useTenFrameEngine`**
  - Crear `src/modules/minigames/ten-frame/useTenFrameEngine.ts`.
  - Implementar máquina de estados con 10 estados y acciones tipadas `TenFrameAction`.
  - Gestionar timers reactivos con `performance.now()` y cancelación limpia en `useEffect`.
  - Incorporar guards de `input-lock` durante flash y peek.
  - Exponer interfaz pública `UseTenFrameEngineReturn`.
- [x] **Tarea 3.2: Pruebas de Integración de la FSM con Vitest**
  - Crear `tests/unit/modules/minigames/ten-frame/useTenFrameEngine.test.ts`.
  - Validar transiciones de timer, auto-envío en N1, confirmación con `[ ✓ ]` en N2/N3, y rescate de 600 ms con `renderHook` y `act` de `@testing-library/react`.

### Fase 4: Componentes Visuales Desacoplados
- [x] **Tarea 4.1: Componente Celda Atómica (`TokenCell.tsx`)**
  - Crear `src/modules/minigames/ten-frame/components/TokenCell.tsx`.
  - Renderizar estados: `empty`, `active` (manzanas SVG/círculos), `ghost` (borde discontinuo y cruz sutil), y `base5-glow`.
- [x] **Tarea 4.2: Grilla Canónica $2 \times 5$ (`TenFrameGrid.tsx`)**
  - Crear `src/modules/minigames/ten-frame/components/TenFrameGrid.tsx`.
  - Matriz de $2 \times 5$ con bordes contrastados y celdas 1:1.
- [x] **Tarea 4.3: Escenario de Marcos Adaptativo (`TenFrameStage.tsx`)**
  - Crear `src/modules/minigames/ten-frame/components/TenFrameStage.tsx`.
  - Renderizar 1 grilla en N1 o 2 grillas apiladas en N2/N3 con tokens de 28px (altura $\le 200\text{px}$).
- [x] **Tarea 4.4: Teclados Táctiles In-App (`InAppKeypad.tsx`)**
  - Crear `src/modules/minigames/ten-frame/components/InAppKeypad.tsx`.
  - Renderizar `IsomorphicKeypad` (matriz $2 \times 5$, ancho 328px) para Nivel 1.
  - Renderizar `CompactNumericKeypad` (matriz $3 \times 4$, ancho 260px) para Niveles 2 y 3.
  - Asegurar hit targets de mínimo $56 \times 56$ px y `touch-action: manipulation`.
- [x] **Tarea 4.5: Modal de Animación Pedagógica (`SolutionReplayModal.tsx`)**
  - Crear `src/modules/minigames/ten-frame/components/SolutionReplayModal.tsx`.
  - Orquestar revelación paso a paso de `ReplayStep[]` y botón de avance manual.

### Fase 5: Integración, Registro y Pruebas UI
- [x] **Tarea 5.1: Vista Principal (`TenFrameGameView.tsx`)**
  - Crear `src/modules/minigames/ten-frame/TenFrameGameView.tsx`.
  - Integrar Header, Escenario, Feedback y Teclado dentro del contenedor de 4 bandas $\le 568\text{px}$ de altura.
  - Conectar sonidos con `MOD-REWARD` (`soundService`) y confeti con `confettiHelper.ts`.
- [x] **Tarea 5.2: Registro en Catálogo del Sistema**
  - Modificar `src/modules/minigames/registry.ts` registrando `MG-TF`.
- [x] **Tarea 5.3: Pruebas de Integración de Componentes UI**
  - Crear `tests/integration/modules/minigames/ten-frame/TenFrameGameView.test.tsx`.
  - Simular CUJ 1 a CUJ 5 con React Testing Library y verificar ausencia de tags `<input>`.
