# Especificación de Minijuego: Conteo Exprés (`MG-CNT`)

## 1. Ficha Pedagógica y de Dominio

| Atributo | Detalle |
|---|---|
| **ID del Minijuego** | `MG-CNT` |
| **Título** | Conteo Exprés |
| **Rango de Edad** | 4 a 7 años |
| **Concepto Matemático** | Correspondencia uno a uno, conteo visual rápido y reconocimiento de cantidad |
| **Modo de Entrada** | `multiple_choice` (4 botones numéricos grandes) |
| **Color Temático** | Rosa chicle / Coral (`bg-rose-500`) |
| **Icono** | 🍎 🔢 |
| **Contrato Base** | Implementa `MinigameDefinition` de [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts) |

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-MG-CNT-001]` Rango de Elementos Visuales
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá generar un conteo de objetos lúdicos aleatorios comprendido entre 1 y 12 elementos.

### `[REQ-MG-CNT-002]` Catálogo de Iconos Infantiles Lúdicos
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá seleccionar aleatoriamente para cada reto un emoji simpático del catálogo infantil: `['🍎', '⭐', '🐶', '🚀', '🐱', '🍕', '🚗', '🎈']`.

### `[REQ-MG-CNT-003]` Disposición en Cuadrícula Visual Limpia
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá presentar los iconos dispuestos en una cuadrícula ordenada de 3 a 4 columnas con espacio suficiente entre sí para que el niño pueda contarlos fácilmente con el dedo sobre la pantalla táctil.

### `[REQ-MG-CNT-004]` Opciones de Respuesta
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá ofrecer 4 opciones numéricas grandes que incluyan la cantidad exacta y 3 valores numéricos adyacentes (ej. si son 6 elementos, opciones como `[4, 5, 6, 7]`).
