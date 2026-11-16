# Plan de Implementación Técnica: [NOMBRE_DEL_JUEGO] (`MG-[ID]`)

## 1. Arquitectura del Generador
El minijuego se implementa como un módulo TypeScript puro que exporta un objeto de tipo `MinigameDefinition` compatible con el registro central.

---

## 2. Checklist de Tareas Atómicas

- [ ] **Tarea 1: Implementación de la función generadora procedural**
  - Implementar lógica matemática con generación aleatoria controlada.
  - Asegurar cálculo de `correctAnswer` e inferencia de `options` (distractores) si aplica.

- [ ] **Tarea 2: Componente o Vista de Renderizado Específico**
  - Adaptar la vista del reto según el `inputMode` seleccionado.

- [ ] **Tarea 3: Pruebas Unitarias de Generación**
  - Escribir test en Vitest con 100 ejecuciones aleatorias validando límites y tipos.

- [ ] **Tarea 4: Registro en `MINIGAMES_REGISTRY`**
  - Añadir el objeto del juego al catálogo del sistema.
