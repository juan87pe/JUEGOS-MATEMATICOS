# Plan de Implementation Técnica: Mayor o Menor (`MG-CMP`)

## 1. Arquitectura del Generador
Módulo puro `src/minigames/comparison/generator.ts` que implementa la función `generateComparisonChallenge()`.

---

## 2. Checklist de Tareas Atómicas

- [ ] **Tarea 1: Generador Matemático `generateComparisonChallenge`**
  - Generar $A \in [1, 50]$.
  - Con 20% probabilidad, asignar $B = A$. De lo contrario, generar $B \in [1, 50]$ con $B \ne A$.
  - Calcular `correctAnswer`:
    - Si $A > B \rightarrow '>'$
    - Si $A < B \rightarrow '<'$
    - Si $A == B \rightarrow '='$
  - Construir objeto `MathChallenge` con `options: ['<', '=', '>']`, `inputMode: 'symbol_selector'`.

- [ ] **Tarea 2: Componente Selector de Símbolos (`SymbolSelector.tsx`)**
  - Crear 3 botones táctiles gigantes con hit-target de $70 \times 70\text{ px}$.
  - Efectos visuales de presión inmediata al toque (`active:scale-90`).

- [ ] **Tarea 3: Suite de Pruebas en Vitest**
  - Probar coherencia lógica en 100 ejecuciones:
    - Cuando $A > B$, `correctAnswer` debe ser `>`
    - Cuando $A < B$, `correctAnswer` debe ser `<`
    - Cuando $A == B$, `correctAnswer` debe ser `=`
