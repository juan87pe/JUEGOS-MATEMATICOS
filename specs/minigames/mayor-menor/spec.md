# Especificación de Minijuego: Mayor o Menor (`MG-CMP`)

## 1. Ficha Pedagógica y de Dominio

| Atributo | Detalle |
|---|---|
| **ID del Minijuego** | `MG-CMP` |
| **Título** | Mayor, Menor o Igual |
| **Rango de Edad** | 5 a 8 años |
| **Concepto Matemático** | Comparación de magnitudes numéricas y comprensión de símbolos $<, =, >$ |
| **Modo de Entrada** | `symbol_selector` (Tres botones táctiles grandes: `<` (Menor), `=` (Igual), `>` (Mayor)) |
| **Color Temático** | Naranja cálido / Ámbar (`bg-amber-500`) |
| **Icono** | ⚖️ 🐊 |
| **Contrato Base** | Implementa `MinigameDefinition` de [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts) |

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-MG-CMP-001]` Rango de Números a Comparar
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá generar dos números enteros $A$ y $B$ comprendidos entre 1 y 50.

### `[REQ-MG-CMP-002]` Frecuencia Controlada de Casos de Igualdad
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El generador deberá calibrar una probabilidad del 20% de generar números iguales ($A = B$) para que el símbolo `=` aparezca de manera natural y no excesivamente infrecuente.

### `[REQ-MG-CMP-003]` Presentación Visual de Comparación
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá renderizar los números enfrentados con un signo de interrogación central `A [ ? ] B` en tarjetas de color destacado.

### `[REQ-MG-CMP-004]` Opciones Táctiles de Símbolos
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá mostrar tres botones táctiles amplios etiquetados con `<`, `=` y `>` acompañados de texto aclaratorio ("Menor que", "Igual que", "Mayor que") para facilitar la comprensión lectora del niño.
