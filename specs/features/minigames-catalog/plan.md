# Plan de Implementación Técnica: Catálogo de Minijuegos (`MOD-GAMES`)

## 1. Arquitectura Técnica del Módulo
Cada minijuego implementa la interfaz `MinigameDefinition` definida en `specs/contracts/minigames.types.ts`. Los generadores son funciones puras sin dependencias externas, lo que permite testear exhaustivamente miles de combinaciones en milisegundos.

---

## 2. Checklist de Tareas Atómicas

- [ ] **Tarea 1: Estructura Base y Registro de Juegos**
  - Crear el diccionario maestro de minijuegos `MINIGAMES_REGISTRY`.
  - Crear utilidades matemáticas puras `getRandomInt(min, max)` y `shuffleArray(array)`.

- [ ] **Tarea 2: Implementación de Generadores Matemáticos**
  - `generateAdditionChallenge()`: Sumas de 1 a 12 (resultado máximo 24).
  - `generateSubtractionChallenge()`: Restas sin resultados negativos.
  - `generateComparisonChallenge()`: Retos de comparación con opciones `['<', '=', '>']`.
  - `generateMultiplicationChallenge()`: Tablas sencillas (1, 2, 3, 4, 5, 10).
  - `generateVisualCountChallenge()`: Conteo con arrays de emojis atractivos (ej. 🐶, 🍎, 🚀, ⭐).

- [ ] **Tarea 3: Mecanismo Antirrepetición Inmediata**
  - Implementar memoria de último reto en `generateNextChallenge(gameId, lastChallengeId)` para evitar mostrar dos veces consecutivas la misma operación.

- [ ] **Tarea 4: Batería de Pruebas Automatizadas de Generadores**
  - Validar mediante 100 iteraciones aleatorias por minijuego que nunca se generen números negativos en restas, nunca se excedan los límites infantiles y los valores esperados sean matemáticamente exactos.
