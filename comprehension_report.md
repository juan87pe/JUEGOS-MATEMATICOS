## What this proposes
The document proposes a mobile web educational mini-game titled "Subitización Rápida con Marco de Diez" (Ten-Frame Quick Subitizing) for children aged 5 to 10 within the MathKids Mobile project. It aims to develop conceptual subitizing and mental arithmetic through brief visual exposures (a 1000–1200 ms flash) on a canonical 2x5 grid, leaving the empty grid visible after the flash as a persistent spatial anchor to prevent sequential finger counting. The game features three curriculum levels: single-count recognition (numbers 1–10) using a 2x5 isomorphic on-screen keypad, two-digit addition using a dual-frame "Make-10" consolidation animation, and subtraction using translucent "Ghost Remnants" silhouettes. To prevent mobile browser layout shifts and maintain sub-50 ms touch latency, it completely eliminates native OS virtual keyboards and external audio assets, relying exclusively on custom in-app keypads and Web Audio API synthesis.

## How the existing system works, per this document
Per this document, the broader system is the MathKids Mobile web application governed by the architectural rules in [`AGENTS.md`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/AGENTS.md) and [`specs/constitution.md`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/constitution.md). The application operates with a purely in-memory session state (no user accounts, persistent storage, or external databases) and follows a strict Spec-Driven Development (SDD) workflow where specifications, atomic task plans, and BDD verification suites precede code implementation. Existing game interactions must fit fixed mobile viewports (100dvh zero-scroll layout between 360px and 430px) and avoid stressful countdown timers or punitive failure feedback, while sound effects are synthesized on the fly via native Web Audio oscillators rather than pre-recorded audio files.

---

### Prioritized Findings

#### 1. [Blocker] Undefined Interaction Lifecycle and Visual Presentation for Level 3 ("Ghost Remnants" Subtraction)
* **Affected Scope**: Section `## Critical User Journeys (CUJs)` (lines 58–79), Section `## Technical Plan -> 3. Contratos de Datos` (lines 179–195), Section `## Technical Plan -> 4. Generador Matemático Procedural` (lines 226–227).
* **Discrepancy Description & Rationale**: The document introduces Level 3 as subtraction with minuends $M \in [5, 15]$ and subtrahends $S \in [1, M]$ using a "desvanecimiento fantasma (Ghost Remnants)" mechanic. However, there is no Critical User Journey (CUJ) defined for Level 3 (CUJs cover only Level 1, Level 2, Peek rescue, and Solution replay). The specification does not define when or how ghost tokens appear relative to the flash:
  1. Does the child see $M$ active tokens during the flash and then $S$ tokens turn into ghost remnants after the flash, or do ghost tokens flash alongside active tokens, or is the subtraction problem presented as symbolic text?
  2. In `TenFrameGridState` (lines 179–185), `filledCells: number` and `ghostCells?: number` are declared, but it is never specified whether `filledCells` represents the original minuend ($M$) or the remaining difference ($M - S$).
  3. When $M > 10$ and two grids are used, the document does not specify how filled and ghost cells are distributed across `gridA` and `gridB`. A fresh developer cannot implement Level 3 from this specification without making unverified assumptions.

#### 2. [Major] Contradictions and Missing State Transitions in the Game Engine FSM
* **Affected Scope**: Section `## Technical Plan -> 2. Máquina de Estados Finita (FSM)` (lines 135–155), Section `## Critical User Journeys -> CUJ 4` (lines 75–79).
* **Discrepancy Description & Rationale**: The FSM state diagram conflicts with user journeys and contains missing transition paths:
  1. **Direct "Ver Solución" access**: CUJ 4 states that the child can trigger the solution by pressing the "Ver Solución" button directly (e.g. before submitting an answer). However, the FSM only allows transitioning to `SOLUTION_REVEAL` from `EVALUATING`. There is no transition path from `AWAITING_INPUT` to `SOLUTION_REVEAL`.
  2. **Advancing after Solution**: CUJ 4 explicitly states that after the pedagogical animation finishes, a button is shown to advance to the next challenge ("...y se muestra un botón para avanzar al siguiente reto"). In contrast, the FSM models an automatic timeout transition `SOLUTION_REVEAL --> ROUND_COMPLETE : Fin de Animación Pedagógica` and `ROUND_COMPLETE --> PRE_FLASH : Siguiente Reto`, leaving the manual button trigger unrepresented in the state machine.
  3. **Undefined `RETRY_HINT` State Behavior**: The FSM includes a `RETRY_HINT` state between attempt 1 and attempt 2, but the document does not define what visual feedback, timer, or stage changes occur during this state before returning to `AWAITING_INPUT`.

#### 3. [Major] Ambiguous Submission Contract and Missing Layout Specification for `StandardNumericKeypad`
* **Affected Scope**: Section `## Open Questions -> [Q-02]` (lines 54–55), Section `## Critical User Journeys -> CUJ 2` (lines 65–69), Section `## Technical Plan -> 1. Arquitectura de Componentes UI` (lines 104–110, 126).
* **Discrepancy Description & Rationale**: Open Question `[Q-02]` leaves unresolved whether the numeric keypad for Levels 2 and 3 requires an explicit "OK/Comprobar" button or auto-submits on the second digit. However:
  1. CUJ 2 (line 67) already assumes the child "introduce '13' en el teclado táctil numérico y presiona comprobar".
  2. Section 1.1 (line 126) defines `StandardNumericKeypad` as only having buttons 0–9, a preview display, and a quick-delete button, omitting any confirm button.
  3. The ASCII layout diagram (lines 104–109) only defines the dimensions for the $2 \times 5$ isomorphic keypad. A multi-row numeric keypad with a preview screen, delete button, and possible confirm button has not been mapped into the ~180–220px height budget, leaving mobile viewport fit unvalidated.

#### 4. [Major] Timing and State Contradiction for the "Make-10" Transfer Animation
* **Affected Scope**: Section `## Critical User Journeys -> CUJ 2` (lines 68–69), Section `## Technical Plan -> 2. Máquina de Estados Finita (FSM)` (line 152), Section `## Detailed Implementation Plan -> Component 15` (lines 370–374).
* **Discrepancy Description & Rationale**: CUJ 2 describes that immediately upon submitting the correct answer ("13"), the system activates the Make-10 animation where individual tokens smoothly travel one by one from the bottom frame to the top frame accompanied by progressive pentatonic tones (`playTokenMoveTone(stepIndex)`). However:
  1. The FSM allocates only 800 ms for `SUCCESS_FEEDBACK` before completing the round (`SUCCESS_FEEDBACK --> ROUND_COMPLETE : Confeti & Audio (800ms)`), which is insufficient for a sequential multi-token animation.
  2. Section 15 states that `SolutionReplayModal` orchestrates the Make-10 transfer animation, creating ambiguity over whether this animation plays during standard success feedback, inside a modal during solution replay, or both.

#### 5. [Nit] Unspecified Flash Durations for Levels 2 and 3
* **Affected Scope**: Section `## Goals -> [GOAL-01]` (line 32), Section `## Technical Plan -> 3. Contratos de Datos` (line 174).
* **Discrepancy Description & Rationale**: While the document specifies flash exposure windows of 1000 ms to 1200 ms for Level 1, it leaves `flashDurationMs` in `TenFrameLevelConfig` without default or target values for Level 2 (where the child must observe up to 18 tokens across two stacked frames) and Level 3. A fresh developer does not have explicit criteria for configuring exposure times for multi-frame levels.

#### 6. [Nit] Unmapped Placement of Auxiliary Action Buttons in the Wireframe
* **Affected Scope**: Section `## Technical Plan -> 1. Arquitectura de Componentes UI` (lines 88–111).
* **Discrepancy Description & Rationale**: The ASCII layout diagram details the Header, Stage, Feedback area, and Keypad, but does not indicate where secondary interaction triggers reside, such as the "Ver Solución" button (referenced in CUJ 4) or keypad modification buttons ("Borrar" / "Comprobar"). Specifying their designated zone prevents visual crowding on compact 360px mobile viewports.
