# Plan de Implementación Técnica: Resta Divertida (`MG-SUB`)

## 1. Arquitectura del Generador
Módulo puro `src/minigames/subtraction/generator.ts` que implementa la función `generateSubtractionChallenge()`.

---

## 2. Checklist de Tareas Atómicas

- [ ] **Tarea 1: Generador Matemático `generateSubtractionChallenge`**
  - Generar dos números aleatorios $X, Y \in [1, 20]$.
  - Asignar $A = \max(X, Y)$ y $B = \min(X, Y)$.
  - Calcular `correctAnswer = A - B`.
  - Construir objeto `MathChallenge` con `prompt = "${A} - ${B} = ?"`, `type = 'subtraction'`, `inputMode = 'numeric_keypad'`.

- [ ] **Tarea 2: Validación de Casos Borde (Resta Cero y Resta Mismo Número)**
  - Asegurar que retos como `7 - 7 = 0` sean válidos y que el teclado admita la tecla `0` como respuesta legítima.

- [ ] **Tarea 3: Suite de Pruebas en Vitest**
  - Ejecutar 100 iteraciones automáticas y verificar que en el 100% de los casos:
    - $A \ge B$
    - $correctAnswer \ge 0$
    - $correctAnswer == A - B$
