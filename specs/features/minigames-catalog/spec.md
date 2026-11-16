# Especificación de Requerimientos: Catálogo de Minijuegos (`MOD-GAMES`)

## 1. Propósito del Módulo
El módulo **Catálogo de Minijuegos** proporciona los generadores procedurales de retos matemáticos de baja complejidad adaptados para niños de 5 a 10 años. Cada generador asegura preguntas aleatorias infinitas, límites numéricos seguros (sin números negativos ni operaciones frustrantes) y variedad lúdica.

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-GAMES-001]` Generador de Sumas Rápidas (Nivel Infantil)
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá generar retos de suma con dos operandos enteros comprendidos entre 1 y 12, garantizando que el resultado de la suma no exceda 24.

### `[REQ-GAMES-002]` Generador de Restas Divertidas (Sin Negativos)
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el generador de restas construye un nuevo ejercicio con dos operandos aleatorios entre 1 y 20, el sistema deberá ordenar los operandos de tal forma que el minuendo sea mayor o igual al sustraendo, garantizando que el resultado sea siempre mayor o igual a 0.

### `[REQ-GAMES-003]` Generador de Mayor, Menor o Igual
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá presentar dos números enteros aleatorios entre 1 y 50 y ofrecer tres opciones de selección rápida (`>`, `<`, `=`), validando la relación de orden correspondiente.

### `[REQ-GAMES-004]` Generador de Multiplicación Básica Infantil
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá generar retos de multiplicación utilizando exclusivamente las tablas de multiplicar del 1, 2, 3, 4, 5 y 10 con factores multiplicadores entre 1 y 10.

### `[REQ-GAMES-005]` Generador de Conteo Visual de Objetos
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá presentar un conjunto visual de entre 1 y 12 iconos atractivos (frutas, animales o estrellas) distribuidos en una cuadrícula clara y solicitar al usuario ingresar o seleccionar la cantidad total de elementos.

### `[REQ-GAMES-006]` Generación Procedural Libre de Repeticiones Inmediatas
- **Tipo:** Comportamiento no deseado / Evento
- **Sintaxis EARS:**
  > SI el generador produce un reto matemático idéntico al reto inmediatamente anterior, ENTONCES el sistema deberá descartarlo y generar uno diferente antes de presentarlo al usuario.
