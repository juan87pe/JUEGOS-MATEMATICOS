# Especificación de Minijuego: Multiplicación Mágica (`MG-MUL`)

## 1. Ficha Pedagógica y de Dominio

| Atributo | Detalle |
|---|---|
| **ID del Minijuego** | `MG-MUL` |
| **Título** | Multiplicación Mágica |
| **Rango de Edad** | 7 a 10 años |
| **Concepto Matemático** | Tablas de multiplicar básicas e intuitivas (1, 2, 3, 4, 5 y 10) |
| **Modo de Entrada** | `multiple_choice` (4 opciones de respuesta) o `numeric_keypad` |
| **Color Temático** | Púrpura mágico / Violeta (`bg-purple-600`) |
| **Icono** | ✖️ 🧙‍♂️ |
| **Contrato Base** | Implementa `MinigameDefinition` de [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts) |

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-MG-MUL-001]` Restricción de Tablas Permitidas
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El generador deberá seleccionar como primer factor $A$ un número perteneciente exclusivamente al conjunto de tablas infantiles básicas $\{1, 2, 3, 4, 5, 10\}$.

### `[REQ-MG-MUL-002]` Rango del Segundo Factor
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El generador deberá seleccionar como segundo factor $B$ un número entero entre 1 y 10.

### `[REQ-MG-MUL-003]` Generación de Distractores Inteligentes para Opciones
- **Tipo:** Universal
- **Sintaxis EARS:**
  > DONDE el modo de entrada sea selección múltiple (`multiple_choice`), el sistema deberá presentar 4 opciones únicas donde una sea la respuesta correcta $(A \times B)$ y las otras tres sean distractores cercanos numéricamente (ej. $\pm 1, \pm 2$ o factores adyacentes) pero estrictamente mayores a cero.

### `[REQ-MG-MUL-004]` Presentación Visual
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá renderizar la operación en formato `A × B = ?` con el símbolo `×` claramente visible para evitar confusión con el signo de suma `+`.
