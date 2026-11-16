# Goldfish Review Report — Stage 5 (Initial Zoom Out Review)

**Target:** `c:\Users\juan8\antigravity\JUEGOS MATEMATICOS\docs\designs\subitizacion_ten_frame.md` (`Lines 1-414`)
**Document Standard:** `zoom-out-standard`
**Mode:** REVIEW
**Report Destination:** `c:\Users\juan8\antigravity\JUEGOS MATEMATICOS\zoom_out_report.md`

---

## Reviewer Status

| Reviewer | Status |
| --- | --- |
| `egm-zoom-out` | completed |
| `egm-inventive-catalyst` | completed |

---

## Severity Summary
* 🔴 **Blocker:** 2
* 🟡 **Major:** 4
* 🟢 **Nit:** 3
* **Total Findings:** 9

---

## Prioritized Findings (Blockers -> Major -> Nits)

### 1. Architectural Disconnect with Core Game Engine (`MOD-CORE`) Lifecycle and Timer Contract - Severity: Blocker
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** Lines 82-156 (Technical Plan: Architecture & FSM), Lines 242-246 (Alternatives Considered: Alternative A)
* **Discrepancy Description**: The system's foundational architecture (`specs/features/core-game-engine/spec.md`) establishes that games operate under a standardized 45-second countdown timer (`[REQ-CORE-001]`, `[REQ-CORE-002]`, `timeLeftSeconds`) managed by `MOD-CORE`. In contrast, `subitizacion_ten_frame.md` explicitly rejects continuous timers in Alternative A ("Desencadena frustración y bloqueo cognitivo...") and architects an isolated, self-governed hook (`useTenFrameEngine`) with an independent 10-state FSM that has no concept of a 45-second round or session termination. There is zero integration or lifecycle mediation defined between `useTenFrameEngine` and `GameEngineState`/`GameEngineActions`.
* **Rationale & Recommendation**: If minigames can operate in an untimed or challenge-count mode (e.g. 10 discrete rounds instead of 45 seconds), this represents a core architectural change that must be formalized in `specs/contracts/game-engine.types.ts` and `MOD-CORE`. Specify in the design document whether `subitizacion_ten_frame` adapts to `MOD-CORE`'s time-boxed session (with flash rounds running inside the 45s window) or if an ADR/extension to `MOD-CORE` is required to introduce a "Challenge-Based / Untimed Session Mode".

---

### 2. Contract Incompatibility with System Minigame Contract (`minigames.types.ts`) and Catalog Shell - Severity: Blocker
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** Lines 159-217 (Section 3: Contratos de Datos y Tipos), Lines 298-334 (Target Files 1 & 7)
* **Discrepancy Description**: `specs/contracts/minigames.types.ts` defines the contract for all catalog games: `MinigameDefinition` requires `generateChallenge: () => MathChallenge`, where `MathChallenge` defines `prompt: string`, `operandA?`, `operandB?`, `correctAnswer: number | string`, and `type: GameType` (restricted to `'addition' | 'subtraction' | 'comparison' | 'multiplication' | 'visual_count'`). Instead of adhering to or extending this shared contract, the design specifies an entirely isolated contract file `specs/contracts/ten-frame.types.ts` with `RoundChallenge` and `TenFrameGridState`. The design provides no adapter or bridge explaining how `MOD-GAMES` (`MinigamesCatalog`) or `MOD-SHELL` launches, renders, or validates `MG-TF`.
* **Rationale & Recommendation**: Do not create a disjointed, incompatible silo. Specify in the design document an adapter pattern (or formally extend `specs/contracts/minigames.types.ts`) adding `'ten_frame'` to `GameType` and allowing polymorphic `visualPayload?: TenFrameGridState` in `MathChallenge`. This ensures `MG-TF` can be registered in the catalog and launched cleanly by the shell.

---

### 3. Redundant Subsystem Siloing: Duplication of Audio Synthesis and Reward/Confetti Logic - Severity: Major
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** Lines 230-237 (Motor de Síntesis de Sonido Nativo), Lines 340-344 (audioSynth.ts), Lines 375-378 (TenFrameGameView.tsx)
* **Discrepancy Description**: The design proposes creating a local `src/modules/minigames/ten-frame/audioSynth.ts` and directly orchestrating canvas-confetti within `TenFrameGameView.tsx`. However, the system architecture already provides `MOD-REWARD` (`specs/features/visual-rewards-streaks/spec.md`) and `ADR-0003` to centralize audio tone generation, streak milestones (x3, x5, x10), and confetti particles globally. Creating a local `AudioSynth` duplicates Web Audio API code, fractures global sound toggling (`soundEnabled` in `GameEngineState` / `[REQ-SHELL-003]`), and instantiates uncoordinated `AudioContext` instances in mobile browsers.
* **Rationale & Recommendation**: Eliminate `src/modules/minigames/ten-frame/audioSynth.ts`. Define how `useTenFrameEngine` integrates with the shared audio and reward hooks from `MOD-REWARD` (`useRewardEffects` / `soundService`), delegating milestone tracking and confetti bursts to the centralized system engine.

---

### 4. Constructivist Scaffolding Paradox: Post-Facto Make-10 Animation vs Active Discovery - Severity: Major
* **Reviewer Lens:** `egm-inventive-catalyst`
* **Affected Scope:** Lines 65-69 (CUJ 2: Adición Make-10), Lines 121-123 (TokenCell: transferring), Lines 370-374 (SolutionReplayModal)
* **Discrepancy Description**: In CUJ 2, the child is exposed to two frames (8 red tokens and 5 yellow tokens) for 1200 ms, after which the tokens disappear. The child must input "13" while looking at empty frames. Only *after* submitting the correct answer does the system display the Make-10 transfer animation (2 yellow tokens migrating to fill the top ten-frame). This inverts the pedagogical paradigm: the Singapore math Make-10 strategy is meant to be a conceptual tool that helps a struggling child figure out the answer, yet here it is rendered as a passive reward cutscene only after the child has already solved the problem mentally.
* **Rationale & Recommendation**: Inventive Scaffolding: Transform Make-10 into an interactive manipulative bridge. During introductory Level 2 rounds or when the child triggers hint/rescue mode, allow the child to tap or drag tokens from the bottom frame to physically saturate the top frame ($8 + 2 \rightarrow 10$, leaving 3), letting tactile interaction construct the arithmetic solution before demanding numeric recall.

---

### 5. Keypad Discontinuity: Abrupt Loss of Visual-Tactile Isomorphism from Level 1 to Level 2 - Severity: Major
* **Reviewer Lens:** `egm-inventive-catalyst`
* **Affected Scope:** Lines 34-35 ([GOAL-04]), Lines 104-109 (Layout Zone 4), Lines 124-126 (InAppKeypad), Lines 365-369 (Target File 14)
* **Discrepancy Description**: A cornerstone of Level 1 is `[GOAL-04] Isomorfismo Táctil-Visual`: placing buttons in a 2x5 grid (1-5 top, 6-10 bottom) so that physical hand-eye geometry directly matches the spatial layout of the ten-frame. However, in Level 2 and Level 3 (numbers up to 20), the design discards this spatial mapping and reverts to a generic `StandardNumericKeypad` (telephone layout 0-9). This breaks the child's newly acquired motor-spatial mental model exactly when arithmetic complexity increases.
* **Rationale & Recommendation**: Inventive Keypad Design: Rather than falling back to a telephone pad, introduce a "Decomposed Base-10 Keypad" for Level 2/3. For example: a dedicated "[10]" macro button paired with a 1-9 sub-register, or a 2-stage input representing tens and units ([10] + [3] = 13). This preserves and reinforces the base-10 decomposition strategy directly at the motor/tactile level.

---

### 6. Web Audio Lifecycle Hazard on Mobile Browsers (Autoplay Policy Violation) - Severity: Major
* **Reviewer Lens:** `egm-inventive-catalyst`
* **Affected Scope:** Lines 137-140 (FSM PRE_FLASH -> FLASH_ACTIVE), Lines 233-234 (playAttentionTone)
* **Discrepancy Description**: The FSM transitions `IDLE -> PRE_FLASH`, playing `playAttentionTone()` (330 Hz, 80 ms) automatically after a 600 ms timer. On iOS Safari and Chrome Android, browsers block programmatic audio execution until an explicit user gesture (`pointerdown`/`touchend`) activates the `AudioContext`. If the minigame transitions to `PRE_FLASH` without direct child interaction on the game canvas, the tone will be silently dropped or trigger unhandled audio context warnings.
* **Rationale & Recommendation**: Explicitly model the audio context unlock in the FSM: require a user action to launch the round ("¡Toca para empezar!"), or bind the audio unlock to the initial level selection / screen tap before triggering `PRE_FLASH`.

---

### 7. Viewport Budget Congestion on Compact Mobile Screens (360x640px) for Dual-Grid Mode - Severity: Nit
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** Lines 86-110 (Component UI Architecture), Lines 93-99 (Escenario de Marcos de Diez)
* **Discrepancy Description**: The layout budget assumes: Header (~48px) + Dual Stage (~280px) + Feedback (~40px) + Keypad (~220px) = 588px. In 360x640px viewports with browser address bars (URL bar + bottom navigation in Safari/Chrome), available `100dvh` is often under 560px. This leaves negative margin budget, risking clipping of the bottom keypad buttons or triggering unwanted layout shrinkage.
* **Rationale & Recommendation**: Add explicit responsive constraints for small screens ($\le 640\text{px}$ height), scaling token cells down or reducing stage padding so that the minimum $56\times56\text{px}$ touch target requirement is strictly preserved without clipping.

---

### 8. Scope Alignment with `specs/constitution.md` - Severity: Nit
* **Reviewer Lens:** `egm-zoom-out`
* **Affected Scope:** Lines 11-18 (Overview), `constitution.md` (Section 4)
* **Discrepancy Description**: `specs/constitution.md` lists five explicit minigames: "Sumas rápidas, Restas lúdicas, Mayor/Menor, Multiplicación básica, Conteo visual". Subitization with Ten-Frames is not explicitly enumerated in the constitution's In-Scope list.
* **Rationale & Recommendation**: Update `specs/constitution.md` Section 4 to explicitly include "Subitización conceptual y Marcos de Diez (Ten-Frames)" as part of foundational visual calculation, or document it in the design as an approved extension under `MOD-GAMES`.

---

### 9. Ghost Remnant Subtraction Contrast and Visual Clutter on Low-Tier Displays - Severity: Nit
* **Reviewer Lens:** `egm-inventive-catalyst`
* **Affected Scope:** Lines 121-122 (TokenCell ghost state), Lines 257-261 (Alternative D)
* **Discrepancy Description**: The ghost cell uses `opacity-35` with a fine cross overlay inside a cell that may only be 28px wide. On low-contrast displays under outdoor lighting, 35% opacity can blend into the slate background (`bg-slate-50/50`), failing WCAG AA (4.5:1) and confusing young children as to whether a cell is empty or ghosted.
* **Rationale & Recommendation**: Use a dashed border outline and a saturated contrasting symbol (e.g. dashed red border with an unmistakable cutout or minus icon) rather than pure opacity decay to maintain WCAG AA compliance.

---
*Synthesized and Compiled by EGM Synthesizer Persona*
