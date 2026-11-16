# Goldfish Review Report — Stage 9 (Implementation Readiness Test)

**Target:** `c:\Users\juan8\antigravity\JUEGOS MATEMATICOS\docs\designs\subitizacion_ten_frame.md` (`Lines 332-450`)  
**Document Standard:** `implementation-readiness-standard`  
**Mode:** REVIEW  
**Report Destination:** `c:\Users\juan8\antigravity\JUEGOS MATEMATICOS\implementation_readiness_report.md`  

---

## Reviewer Status

| Reviewer | Status |
| --- | --- |
| `egm-implementation-readiness` | completed |
| `egm-codebase-details` | completed |
| `egm-style` | completed |

---

## Severity Summary
* 🔴 **Blocker:** 3
* 🟡 **Major:** 6
* 🟢 **Nit:** 3
* **Total Findings:** 12

---

## Prioritized Findings (Blockers -> Major -> Nits)

### 1. Missing Application Integration & Router Registration (Dead Subsystem Gap) - Severity: Blocker
* **Reviewer Lens:** `egm-implementation-readiness`
* **Affected Scope:** `Lines 334-365` (Target Files 1–6), `Lines 411-415` (Target File 16: `TenFrameGameView.tsx`), `specs/contracts/minigames.types.ts`
* **Discrepancy Description**: 
  The 19 planned target files provide complete internal components for the minigame, but completely omit the integration mechanism into the running application:
  1. `specs/contracts/minigames.types.ts` requires all games to implement `MinigameDefinition` with a procedural `generateChallenge: () => MathChallenge`. Target File 8 only defines `generateRound(level): RoundChallenge` with no adapter or bridge to `MathChallenge`.
  2. None of the target files register the new minigame into the application's runtime catalog registry (e.g., `src/modules/minigames/registry.ts` or `src/minigames/catalog.ts`).
  3. No target file integrates `TenFrameGameView.tsx` into the active game router or shell container (`MobileAppLayout.tsx`).
  If a developer executes the 19 target files exactly as written, the code will remain an unreferenced, dead subsystem unreachable from the user interface.
* **Rationale & Recommendation**: 
  Add explicit integration target files to the plan:
  - Create a catalog adapter: `src/modules/minigames/ten-frame/tenFrameAdapter.ts` that implements `MinigameDefinition` and maps `RoundChallenge` to `MathChallenge`.
  - Add a target entry to modify the central minigames registry/router to register `MG-TF` and route its view to `TenFrameGameView`.

---

### 2. Deprecated and Incompatible Testing Dependency (`@testing-library/react-hooks`) - Severity: Blocker
* **Reviewer Lens:** `egm-implementation-readiness`
* **Affected Scope:** `Lines 421-425` (Target File 18: `tests/unit/minigames/ten-frame/useTenFrameEngine.test.ts`)
* **Discrepancy Description**: 
  Target File 18 specifies testing the hook FSM with `@testing-library/react-hooks`.
  However, the approved technology stack (`AGENTS.md`, Section 2) specifies **React 18.x / 19.x** with Vitest. The package `@testing-library/react-hooks` has been formally deprecated since React 18 and fails at runtime with React 18/19 concurrent rendering, throwing fatal errors. `renderHook` and `act` have been built directly into `@testing-library/react` since v13+.
* **Rationale & Recommendation**: 
  Update Target File 18 to explicitly use `renderHook` and `act` from `@testing-library/react` (or `@testing-library/react` + Vitest), removing all references to `@testing-library/react-hooks`.

---

### 3. Structural Path and Folder Naming Divergence across Spec Hierarchy and Source - Severity: Blocker
* **Reviewer Lens:** `egm-codebase-details`
* **Affected Scope:** `Lines 341-355` (Target Files 2, 3, 4), `Lines 366-415` (Target Files 7–16), `Lines 416-430` (Target Files 17–19), `specs/minigames/README.md`
* **Discrepancy Description**: 
  The implementation plan introduces three conflicting directory naming and structural conventions:
  - Specs are placed in `specs/minigames/marco-diez-subitizacion/` (Spanish kebab-case, multi-word).
  - Source code is placed in `src/modules/minigames/ten-frame/` (English kebab-case, nested under `modules/`).
  - Unit tests are placed in `tests/unit/minigames/ten-frame/` (no `modules/` nesting).
  - Existing specs in the repo follow `specs/minigames/<id-kebab>/` (e.g., `specs/minigames/suma-rapida/`).
  This inconsistency breaks automated script resolution, documentation links, and project uniformity.
* **Rationale & Recommendation**: 
  Harmonize paths across all three tiers:
  - Spec directory: `specs/minigames/marco-diez/`.
  - Source directory: `src/modules/minigames/ten-frame/`.
  - Test directory: `tests/unit/modules/minigames/ten-frame/` mirroring the exact source tree.

---

### 4. Persistence of 2x6 Keypad Layout in Target File 14 Violating 360px Viewport Constraints - Severity: Major
* **Reviewer Lens:** `egm-implementation-readiness`
* **Affected Scope:** `Lines 401-405` (Target File 14: `InAppKeypad.tsx`), `Lines 445-447` (Mobile Touch & Viewport Emulation)
* **Discrepancy Description**: 
  Target File 14 proposes rendering a 2x6 layout with 56px buttons and 12px gaps requiring a minimum of **396px of width** without container padding, and **420px–428px with padding**.
  On a 360px mobile screen (the baseline in `constitution.md` T2 and `AGENTS.md`), this causes an immediate 36px–68px horizontal blowout, directly contradicting the Verification Plan.
* **Rationale & Recommendation**: 
  Replace the 2x6 layout specification in Target File 14 with a 3-row x 4-column layout (`[1-3, ⌫]`, `[4-6, 0]`, `[7-9, ✓]`) requiring only 260px width, fully compliant with 360px viewports.

---

### 5. Web Audio Context Fragmentation & Direct Hardware Competition with `MOD-REWARD` - Severity: Major
* **Reviewer Lens:** `egm-codebase-details`
* **Affected Scope:** `Lines 376-380` (Target File 9: `audioSynth.ts`), `specs/features/visual-rewards-streaks/plan.md` (`soundEffects.ts`), `ADR-0003`
* **Discrepancy Description**: 
  Target File 9 plans a standalone singleton class `AudioSynth` with its own `AudioContext` instantiation and lazy unlock, conflicting with `MOD-REWARD`'s centralized audio synthesizer and causing context exhaustion on iOS Safari/Chrome Android.
* **Rationale & Recommendation**: 
  Eliminate the independent `audioSynth.ts` target file. Replace it with integration into the shared `soundService` from `MOD-REWARD`, registering procedural tone signatures (`playAttentionTone`, `playTokenMoveTone`) within the centralized audio manager.

---

### 6. Undefined State Machine & Animation Choreography for `SolutionReplayModal.tsx` - Severity: Major
* **Reviewer Lens:** `egm-implementation-readiness`
* **Affected Scope:** `Lines 406-410` (Target File 15: `SolutionReplayModal.tsx`)
* **Discrepancy Description**: 
  No contract, step interface, or animation lifecycle is specified for `SolutionReplayModal`. It is unclear whether step transitions are timer-driven or user-tapped, how tokens communicate their destination coordinates between grids, or how completion is notified to `useTenFrameEngine`.
* **Rationale & Recommendation**: 
  Define the formal props and step interface in `ten-frame.types.ts`:
  ```typescript
  export interface ReplayStep {
    stepIndex: number;
    description: string;
    sourceCell?: { grid: 1 | 2; index: number };
    targetCell?: { grid: 1 | 2; index: number };
    highlightBase5?: boolean;
  }
  ```
  Specify in Target 15 whether progression is automatic via timer or interactive via a "Siguiente Paso" tap.

---

### 7. Missing Teardown & Reset Lifecycle Contract in Hook Specification - Severity: Major
* **Reviewer Lens:** `egm-implementation-readiness`
* **Affected Scope:** `Lines 381-385` (Target File 10: `useTenFrameEngine.ts`), `constitution.md` (T4)
* **Discrepancy Description**: 
  Target File 10 mentions timer transitions and cleanup, but fails to specify the external API contract exposed to React consumers.
* **Rationale & Recommendation**: 
  Explicitly specify the public interface of `useTenFrameEngine` in Target File 10:
  ```typescript
  export interface UseTenFrameEngineReturn {
    state: TenFrameEngineState;
    submitDigit: (digit: string) => void;
    deleteDigit: () => void;
    confirmAnswer: () => void;
    peek: () => void;
    changeLevel: (level: TenFrameLevel) => void;
    resetGame: () => void;
  }
  ```

---

### 8. Missing TypeScript Type Declarations for `canvas-confetti` in Verification Plan - Severity: Major
* **Reviewer Lens:** `egm-codebase-details`
* **Affected Scope:** `Lines 411-415` (Target File 16: `TenFrameGameView.tsx`), `Lines 435-436` (Compilation/Build Verification)
* **Discrepancy Description**: 
  Target File 16 directly incorporates `canvas-confetti`. Under TypeScript strict mode, importing `canvas-confetti` without `@types/canvas-confetti` will cause build failure `TS7016`.
* **Rationale & Recommendation**: 
  Modify Target File 16 to import `triggerStreakConfetti` from `MOD-REWARD` (`src/modules/rewards/confettiHelper.ts`).

---

### 9. Unspecified Scope and Mapping for Requirements `[REQ-TF-001]` to `[REQ-TF-012]` - Severity: Major
* **Reviewer Lens:** `egm-style`
* **Affected Scope:** `Lines 341-345` (Target File 2: `specs/minigames/marco-diez-subitizacion/spec.md`)
* **Discrepancy Description**: 
  Target File 2 mentions requirement numbers `[REQ-TF-001]` a `[REQ-TF-012]` without titles, EARS categories, or acceptance criteria.
* **Rationale & Recommendation**: 
  Explicitly enumerate the 12 requirements in Target File 2 with their exact EARS classification and titles.

---

### 10. Missing Strict Level Union Type Definition (`TenFrameLevel`) - Severity: Nit
* **Reviewer Lens:** `egm-codebase-details`
* **Affected Scope:** `Lines 336-339` (Target File 1), `Lines 371-375` (Target File 8)
* **Discrepancy Description**: 
  Function signatures use raw literal unions `level: 1 | 2 | 3` across multiple target files instead of a named domain type `TenFrameLevel`.
* **Rationale & Recommendation**: 
  Define `export type TenFrameLevel = 1 | 2 | 3;` in `ten-frame.types.ts`.

---

### 11. Viewport Vertical Budget Inconsistency (560px vs 568px) - Severity: Nit
* **Reviewer Lens:** `egm-style`
* **Affected Scope:** `Line 446` (Mobile Touch & Viewport Emulation)
* **Discrepancy Description**: 
  Line 446 states 560px, whereas standard iPhone SE viewport is 568px.
* **Rationale & Recommendation**: 
  Harmonize to 568px across the document.

---

### 12. Mixed Language Nomenclature in SDD Architecture Artifacts - Severity: Nit
* **Reviewer Lens:** `egm-style`
* **Affected Scope:** `Lines 336-430` (Target Files 1–19)
* **Discrepancy Description**: 
  Target file descriptions oscillate between English identifiers and Spanish structural explanations.
* **Rationale & Recommendation**: 
  Confirm standard: English for code/types/identifiers, Spanish for pedagogical requirements and SDD specs.

---
*Synthesized and Compiled by EGM Synthesizer Persona*
