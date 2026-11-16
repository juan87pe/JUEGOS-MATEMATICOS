# Plan de Implementación Técnica: Multiplicación Mágica (`MG-MUL`)

## 1. Arquitectura del Generador
Módulo puro `src/minigames/multiplication/generator.ts` que implementa la función `generateMultiplicationChallenge()`.

---

## 2. Checklist de Tareas Atómicas

- [ ] **Tarea 1: Generador Matemático de Multiplicación**
  - Factor $A \in [1, 2, 3, 4, 5, 10]$.
  - Factor $B \in [1, 10]$.
  - Calcular `correctAnswer = A * B`.

- [ ] **Tarea 2: Algoritmo de Distractores Plausibles**
  - Implementar función auxiliar `generatePlausibleDistractors(correctAnswer, factorA, count = 3)`:
    - Incluir resultados de factores adyacentes (ej. $A \times (B \pm 1)$).
    - Barajar aleatoriamente las 4 opciones (`shuffleArray`).

- [ ] **Tarea 3: Suite de Pruebas en Vitest**
  - Verificar en 100 pruebas:
    - Que el factor $A$ pertenezca a $[1, 2, 3, 4, 5, 10]$.
    - Que las 4 opciones sean todas distintas (sin duplicados).
    - Que la respuesta correcta esté contenida en el array de opciones.
