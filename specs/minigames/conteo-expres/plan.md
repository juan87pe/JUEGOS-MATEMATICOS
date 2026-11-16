# Plan de Implementación Técnica: Conteo Exprés (`MG-CNT`)

## 1. Arquitectura del Generador
Módulo puro `src/minigames/counting/generator.ts` que implementa la función `generateVisualCountChallenge()`.

---

## 2. Checklist de Tareas Atómicas

- [ ] **Tarea 1: Generador Matemático de Conteo Visual**
  - Generar `count` aleatorio $\in [1, 12]$.
  - Seleccionar icono aleatorio de la lista de emojis infantiles.
  - Generar distractores numéricos cercanos ($count \pm 1, count \pm 2$).
  - Construir objeto `MathChallenge` con `type = 'visual_count'`, `visuals = { icon, count }`, `inputMode = 'multiple_choice'`.

- [ ] **Tarea 2: Componente Visual Grid (`VisualCountGrid.tsx`)**
  - Renderizar contenedor con `grid grid-cols-4 gap-3 p-4 justify-items-center`.
  - Animación sutil de entrada para cada icono.

- [ ] **Tarea 3: Suite de Pruebas en Vitest**
  - Validar que $1 \le count \le 12$.
  - Validar que las opciones contengan la respuesta correcta y no haya duplicados.
