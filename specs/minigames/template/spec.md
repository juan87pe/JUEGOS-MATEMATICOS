# Especificación de Minijuego: [NOMBRE_DEL_JUEGO] (`MG-[ID]`)

## 1. Ficha Pedagógica y de Dominio

| Atributo | Detalle |
|---|---|
| **ID del Minijuego** | `MG-[ID]` |
| **Título** | Nombre amigable para niños |
| **Rango de Edad** | Ej. 5 - 8 años |
| **Concepto Matemático** | Ej. Adición / Conteo / Magnitudes |
| **Modo de Entrada** | `numeric_keypad` \| `multiple_choice` \| `symbol_selector` |
| **Contrato Base** | Implementa `MinigameDefinition` de [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts) |

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-MG-[ID]-001]` Regla de Generación Numérica
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El generador deberá producir retos donde los operandos estén contenidos estrictamente en el rango [MIN, MAX].

### `[REQ-MG-[ID]-002]` Restricción de Dominio y Seguridad Infantil
- **Tipo:** Comportamiento no deseado / Evento
- **Sintaxis EARS:**
  > SI [condición no permitida, ej. resultado menor a cero o división inexacta], ENTONCES el generador deberá descartar los operandos y recalcular un reto válido.

### `[REQ-MG-[ID]-003]` Formato de Presentación Visual
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá renderizar el reto con tipografía redondeada de al menos 36px y alto contraste.
