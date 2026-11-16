# Goldfish Annotated Review Report — Stage 9 Resolution

**Target:** `docs/designs/subitizacion_ten_frame.md` (`Lines 332-450`)

## Prioritized Findings & AI Suggestions

### 1. Missing Application Integration & Router Registration [`egm-implementation-readiness`] - Severity: Blocker
* **Affected Scope:** Target Files 1–6, Target File 16 (`TenFrameGameView.tsx`)
* **Discrepancy Description:** Falta el puente que conecta el minijuego con el catálogo de `MOD-GAMES` y el enrutador de `MOD-SHELL`.
* **Rationale:** El juego debe ser invocable desde la interfaz del usuario.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Incorporar `tenFrameAdapter.ts` implementando `MinigameDefinition` y añadir la entrada de registro en el catálogo de minijuegos.

---

### 2. Deprecated and Incompatible Testing Dependency [`egm-implementation-readiness`] - Severity: Blocker
* **Affected Scope:** Target File 18 (`useTenFrameEngine.test.ts`)
* **Discrepancy Description:** `@testing-library/react-hooks` está deprecado y falla en React 18/19.
* **Rationale:** La suite de tests debe usar herramientas modernas y estables.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Reemplazar por `renderHook` y `act` de `@testing-library/react` nativo con Vitest.

---

### 3. Structural Path and Folder Naming Divergence [`egm-codebase-details`] - Severity: Blocker
* **Affected Scope:** Target Files 2–4, 7–19
* **Discrepancy Description:** Inconsistencia entre nombres de carpetas en specs (`marco-diez-subitizacion`), source (`modules/minigames/ten-frame`) y tests.
* **Rationale:** Consistencia en la estructura de directorios del proyecto.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Homogeneizar: `specs/minigames/marco-diez/`, `src/modules/minigames/ten-frame/`, `tests/unit/modules/minigames/ten-frame/`.

---

### 4. Layout de Teclado Compacto $3 \times 4$ para 360px [`egm-implementation-readiness`] - Severity: Major
* **Affected Scope:** Target File 14 (`InAppKeypad.tsx`)
* **Discrepancy Description:** El teclado 2x6 requiere 396px de ancho, desbordando pantallas de 360px.
* **Rationale:** Cumplimiento riguroso de ergonomía táctil infantil en 360px.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Reemplazar el layout por una matriz $3 \times 4$ de botones de $56 \times 56$ px (ancho total 260px, altura 184px).

---

### 5. Integración con `MOD-REWARD` para Síntesis de Sonido y Confeti [`egm-codebase-details`] - Severity: Major
* **Affected Scope:** Target File 9 (`audioSynth.ts`), Target File 16
* **Discrepancy Description:** Duplicación de `AudioContext` y helpers de confeti.
* **Rationale:** Reutilización de arquitectura compartida y prevención de context exhaustion en móviles.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Reemplazar `audioSynth.ts` por integración con `soundService` de `MOD-REWARD` e importar confeti desde `confettiHelper.ts`.

---

### 6. Interfaz Formal de Animación `ReplayStep` [`egm-implementation-readiness`] - Severity: Major
* **Affected Scope:** Target File 15 (`SolutionReplayModal.tsx`)
* **Discrepancy Description:** Falta definir el contrato de pasos de animación para la solución guiada.
* **Rationale:** Desacoplamiento tipado de la animación Make-10.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Definir `ReplayStep` en `ten-frame.types.ts`.

---

### 7. Contrato Público de Retorno de `useTenFrameEngine` [`egm-implementation-readiness`] - Severity: Major
* **Affected Scope:** Target File 10 (`useTenFrameEngine.ts`)
* **Discrepancy Description:** Falta especificar la firma de retorno del hook.
* **Rationale:** Especificación formal no ambigua para desarrolladores.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Declarar `UseTenFrameEngineReturn` en Target File 10.

---

### 8. Enumeración de Requerimientos `[REQ-TF-001]` a `[REQ-TF-012]` [`egm-style`] - Severity: Major
* **Affected Scope:** Target File 2 (`specs/minigames/marco-diez/spec.md`)
* **Discrepancy Description:** Números de requerimiento sin títulos ni tipos EARS.
* **Rationale:** Trazabilidad estricta SDD.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Enlistar los 12 requerimientos con sus títulos y categorías EARS en la tabla de Target File 2.

---

### 9. Tipo Formal `TenFrameLevel` y Presupuesto de 568px [`egm-codebase-details`, `egm-style`] - Severity: Nit
* **Affected Scope:** Target Files 1, 8; Verification Plan
* **Discrepancy Description:** Literales dispersos `1 | 2 | 3` y límite de 560px vs 568px.
* **Rationale:** Rigor de tipado y alineación con iPhone SE.
* ***AI Suggestion:*** PROPOSE FIX
* ***Proposed Edit:*** Definir `export type TenFrameLevel = 1 | 2 | 3;` y ajustar límite a 568px.
