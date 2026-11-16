# Plan de Implementación Técnica: Suma Rápida (`MG-ADD`)

## 1. Arquitectura del Generador
Módulo puro `src/minigames/addition/generator.ts` que implementa la función `generateAdditionChallenge()`.

---

## 2. Checklist de Tareas Atómicas

- [ ] **Tarea 1: Generador Matemático `generateAdditionChallenge`**
  - Generar $A \in [1, 12]$ y $B \in [1, 12]$.
  - Calcular `correctAnswer = A + B`.
  - Construir objeto `MathChallenge` con `prompt = "${A} + ${B} = ?"`, `type = 'addition'`, `inputMode = 'numeric_keypad'`.

- [ ] **Tarea 2: Lógica de Auto-Envío Inteligente**
  - Si `correctAnswer >= 10`, esperar 2 dígitos antes de evaluar o permitir tecla check `✓`.
  - Si `correctAnswer < 10`, permitir envío directo de 1 dígito.

- [ ] **Tarea 3: Suite de Pruebas en Vitest**
  - Generar 100 sumas y asegurar:
    - $1 \le A \le 12$
    - $1 \le B \le 12$
    - $correctAnswer == A + B$
    - $correctAnswer \le 24$
