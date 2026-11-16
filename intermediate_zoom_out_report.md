# Goldfish Review Report — Stage 8 (Intermediate Zoom Out Review)

**Target:** `c:\Users\juan8\antigravity\JUEGOS MATEMATICOS\docs\designs\subitizacion_ten_frame.md` (`Lines 1-450`)  
**Document Standard:** `zoom-out-standard`  
**Mode:** REVIEW  
**Report Destination:** `c:\Users\juan8\antigravity\JUEGOS MATEMATICOS\intermediate_zoom_out_report.md`  

---

## Reviewer Status

| Reviewer | Status |
| --- | --- |
| `egm-zoom-out` | completed |

---

## Severity Summary
* 🔴 **Blocker:** 2
* 🟡 **Major:** 4
* 🟢 **Nit:** 2
* **Total Findings:** 8

---

## Prioritized Findings (Blockers -> Major -> Nits)

### 1. Macro-Architectural Siloing and Total Platform Bypassing (Core Engine, Shell, Rewards, Audio) - Severity: Blocker
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** `Lines 94-177` (Technical Plan: Component Architecture & FSM), `Lines 240-250` (`TenFrameEngineState`), `Lines 263-272` (`audioSynth.ts`), `Lines 336-415` (`Detailed Implementation Plan`), `Lines 277-281` (Alternative A)
* **Discrepancy Description**: 
  The system's foundational architecture (`specs/constitution.md`, `specs/index.md`, `MOD-CORE`, `MOD-SHELL`, `MOD-REWARD`) is structured as a shared, cohesive platform:
  1. `MOD-CORE` (`specs/features/core-game-engine/spec.md`) governs game sessions, lifecycle states (`GameStatus`), 45-second round countdowns (`[REQ-CORE-001]`), scoring (`GameSessionScore`), and pause/resume (`[REQ-CORE-006]`).
  2. `MOD-SHELL` (`specs/features/mobile-shell-ui/spec.md`) provides the universal top status bar (`[REQ-SHELL-003]`), game navigation, and on-screen keypad.
  3. `MOD-REWARD` (`specs/features/visual-rewards-streaks/spec.md`, `ADR-0003`) centralizes reward celebrations, canvas-confetti bursts, streak multipliers (x3, x5, x10), and Web Audio sound synthesis.

  Despite the mitigations introduced in the Comprehension and Critic stages, `subitizacion_ten_frame.md` still defines an entirely isolated, monolithic subsystem that bypasses the core platform:
  - `useTenFrameEngine` implements a self-governed 10-state FSM with an infinite round loop (`ROUND_COMPLETE --> PRE_FLASH : Siguiente Reto`) with zero connection to `MOD-CORE`'s 45-second round timer or session lifecycle.
  - It maintains its own duplicate streak tracker (`TenFrameEngineState.streakCount`) and mute flag (`isAudioMuted`), completely disconnected from `GameEngineState.score.currentStreak` and `GameEngineState.soundEnabled`.
  - It creates a private Web Audio singleton (`audioSynth.ts`) and triggers `canvas-confetti` directly within `TenFrameGameView.tsx`, duplicating code and instantiating uncoordinated `AudioContext` instances.
* **Rationale & Recommendation**: 
  A minigame cannot operate as an unintegrated silo. The design must define an adapter pattern or mediator hook (e.g. `useTenFrameCoreAdapter`) that binds `useTenFrameEngine` events to `GameEngineActions` (`submitAnswer`, `startGame`, `resetGame`), delegates streak tracking and audio to `MOD-REWARD`, and formally specifies whether `MOD-CORE` will be extended via an ADR to support a challenge-count or untimed mode alongside its 45-second countdown timer.

---

### 2. Viewport Horizontal Blowout on 360px Mobile Screens Caused by the 2x6 Keypad Mitigation - Severity: Blocker
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** `Lines 34-35` (`[GOAL-03]`, `[GOAL-04]`), `Lines 118-121` (Zone 4 ASCII Wireframe), `Lines 136-137` (`CompactNumericKeypad`), `Lines 311-314` (Accessibility & Ergonomics: Hit Targets)
* **Discrepancy Description**: 
  To mitigate Critic Blocker 1 (vertical height overflow of a 4-row telephone keypad in dual-frame mode), the design introduced `CompactNumericKeypad` in a 2-row $\times$ 6-column layout:
  - Row 1: `[ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ] [ ⌫ ]`
  - Row 2: `[ 6 ] [ 7 ] [ 8 ] [ 9 ] [ 0 ] [ ✓ ]`
  specifying $56 \times 56\text{px}$ touch targets and $\ge 12\text{px}$ spacing (Lines 118–121, 312).

  However, on standard mobile displays of 360px width (the explicit baseline in `constitution.md` T2, `AGENTS.md`, and `[REQ-SHELL-002]`):
  $$\text{Key Width} = 6 \text{ buttons} \times 56\text{px} = 336\text{px}$$
  $$\text{Gap Width} = 5 \text{ gaps} \times 12\text{px} = 60\text{px}$$
  $$\text{Minimum Required Width} = 336\text{px} + 60\text{px} = \mathbf{396\text{px}}$$
  Adding standard container padding of 12–16px per side increases the required width to **420px–428px**.
  On 360px or 375px screens, this causes an immediate **36px to 68px horizontal overflow**, resulting in clipped buttons, horizontal scrolling (violating `[REQ-SHELL-002]`), or buttons shrinking below the mandatory 56px child-ergonomic standard.
* **Rationale & Recommendation**: 
  Re-architect multi-digit input under the 360px constraint:
  - **Option A (3x4 Layout):** 3 rows of 4 buttons (e.g. Row 1: `[1][2][3][⌫]`, Row 2: `[4][5][6][0]`, Row 3: `[7][8][9][✓]`). Width: $4 \times 56\text{px} + 3 \times 12\text{px} = 260\text{px}$ (comfortably fits 360px with 50px side margins); Height: $3 \times 56\text{px} + 2 \times 8\text{px} = 184\text{px}$.
  - **Option B (Decomposed Base-10 Keypad):** Maintain Singapore math alignment by offering a dedicated `[+10]` macro chip alongside a 1–9 single-row selector, satisfying both horizontal and vertical budgets while reinforcing base-10 decomposition.

---

### 3. Singapore Math Cognitive Inversion in Level 3 Subtraction (Ghost Remnants vs Blank Background) - Severity: Major
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** `Lines 85-89` (CUJ 5: Sustracción Fantasma en Nivel 3), `Lines 129-132` (`TokenCell` ghost state), `Lines 201-203` (`TenFrameGridState`)
* **Discrepancy Description**: 
  CUJ 5 specifies that for $14 - 5$, after the 1200 ms flash:
  *"las 5 fichas a sustraer se transforman en siluetas fantasma (`ghost`) con borde discontinuo y cruz sutil... Las 9 fichas de la diferencia desaparecen dejando las casillas vacías... El niño observa la cantidad restante como 9 casillas vacías estructuradas. Introduce '9' en el teclado y presiona `[ ✓ ]`."*

  In a dual ten-frame stage with minuend 14, 6 cells were already empty before the subtraction. If the 9 difference tokens also disappear into empty cells, the child sees $9 + 6 = 15$ empty cells. Young children cannot visually distinguish the 9 "meaningful empty difference cells" from the 6 "always-empty boundary cells".
* **Rationale & Recommendation**: 
  Invert the visual representation: upon flash expiration, the 5 subtracted tokens transition to ghost silhouettes (crossed out / dim), while the **9 remaining difference tokens stay visible** (or highlight with a subtle glow) so the child can subitize the difference directly ($10 - 1 = 9$).

---

### 4. Missing Contract Bridge / Extension to Catalog Contract (`minigames.types.ts`) - Severity: Major
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** `Lines 181-215` (Section 3: Contratos de Datos y Tipos), `Lines 336-340` (Target File 1), `Lines 371-375` (Target File 8)
* **Discrepancy Description**: 
  `specs/contracts/minigames.types.ts` defines the contract for all catalog games: `MinigameDefinition` requires `generateChallenge: () => MathChallenge`, with `type: GameType` restricted to `'addition' | 'subtraction' | 'comparison' | 'multiplication' | 'visual_count'`.
  `subitizacion_ten_frame.md` creates a completely standalone `RoundChallenge` and `tenFrameGenerator.ts` returning `RoundChallenge`, without defining how it maps to `MathChallenge` or `MinigameDefinition`.
* **Rationale & Recommendation**: 
  Formally define the integration contract in `specs/contracts/minigames.types.ts`:
  1. Extend `GameType` to include `'ten_frame'` (or register under `'visual_count'`).
  2. Add `payload?: TenFrameGridState | RoundChallenge` to `MathChallenge`, or document an adapter function `tenFrameChallengeAdapter(round: RoundChallenge): MathChallenge` that fulfills `MinigameDefinition.generateChallenge`.

---

### 5. Premature Symbolic Equation Display Subverting the Iconic Visual Anchor - Severity: Major
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** `Lines 72-73` (CUJ 2), `Line 87` (CUJ 5), `Lines 111-113` (Zone 3 ASCII Layout)
* **Discrepancy Description**: 
  Displaying the complete symbolic equation in plain text (e.g. "$8 + 5 = ?$") immediately after the flash ends allows children aged 7–10 to ignore the ten-frame visual anchor entirely and solve using fingers or rote memory directly from the text. This subverts `[GOAL-01]` and `[GOAL-02]`.
* **Rationale & Recommendation**: 
  In Level 2 and Level 3, keep the in-game prompt visual (e.g. displaying only the operator badge "$+$" or "$-$" between the frames, or using ten-frame miniature badges). Reserve the full symbolic equation ("$8 + 5 = 13$") for post-submission feedback and the `SolutionReplayModal`.

---

### 6. Sound State Fragmentation and Web Audio Context Desynchronization - Severity: Major
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** `Lines 174-176` (Audio Lazy Unlock), `Line 248` (`isAudioMuted`), `Lines 263-272` (`audioSynth.ts`), `specs/features/mobile-shell-ui/spec.md` (`[REQ-SHELL-003]`), `specs/contracts/game-engine.types.ts` (`soundEnabled`)
* **Discrepancy Description**: 
  `useTenFrameEngine` maintains its own independent `isAudioMuted` boolean and an isolated `AudioSynth` singleton, conflicting with `GameEngineState.soundEnabled` and `MOD-SHELL` (`[REQ-SHELL-003]`).
* **Rationale & Recommendation**: 
  Remove local audio state management from `useTenFrameEngine`. Pass `soundEnabled` from the parent shell / `GameEngineState`, and delegate sound synthesis to the shared `soundService` defined in `MOD-REWARD` (`ADR-0003`).

---

### 7. Asynchronous Race Conditions on Rapid Level Switching during Active Flash Timers - Severity: Nit
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** `Lines 168-170` (FSM Transitions on `CHANGE_LEVEL`), `Lines 381-384` (`useTenFrameEngine.ts`)
* **Discrepancy Description**: 
  The FSM includes transitions `FLASH_ACTIVE --> PRE_FLASH : CHANGE_LEVEL`, but does not specify how pending asynchronous timers are cancelled during rapid switching.
* **Rationale & Recommendation**: 
  Specify that `useTenFrameEngine` implements an explicit cleanup pattern with `useRef<NodeJS.Timeout[]>` cancelling all pending timers and Web Audio ramps immediately on `CHANGE_LEVEL`.

---

### 8. Scope Enumeration in `constitution.md` and Naming Harmonization - Severity: Nit
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** `Lines 11-18` (Overview), `Lines 341-365` (Target Files 2, 5, 6), `specs/constitution.md` (Section 4)
* **Discrepancy Description**: 
  `specs/constitution.md` Section 4 should explicitly list "Subitización conceptual y Marcos de Diez" as an approved domain, and folder/identifier naming should be harmonized.
* **Rationale & Recommendation**: 
  Harmonize module naming across specs, source folders, and catalog IDs, and add the domain to `constitution.md`.

---
*Synthesized and Compiled by EGM Synthesizer Persona*
