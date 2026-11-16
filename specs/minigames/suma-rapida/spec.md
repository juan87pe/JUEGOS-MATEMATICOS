# Especificación de Minijuego: Suma Rápida (`MG-ADD`)

## 1. Ficha Pedagógica y de Dominio

| Atributo | Detalle |
|---|---|
| **ID del Minijuego** | `MG-ADD` |
| **Título** | Suma Rápida |
| **Rango de Edad** | 5 a 8 años |
| **Concepto Matemático** | Adición básica de números naturales sin acarreo complejo |
| **Modo de Entrada** | `numeric_keypad` (Teclado numérico táctil en pantalla) |
| **Color Temático** | Verde esmeralda / Lima (`bg-emerald-500`) |
| **Icono** | ➕ ⚡ |
| **Contrato Base** | Implementa `MinigameDefinition` de [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts) |

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-MG-ADD-001]` Rango de Operandos para Adición Infantil
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El generador de retos de Suma Rápida deberá generar dos números enteros $A$ y $B$ comprendidos entre 1 y 12.

### `[REQ-MG-ADD-002]` Límite Máximo del Resultado
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá asegurar que la suma $(A + B)$ no sea superior a 24, facilitando el cálculo mental ágil en niños sin sobrecarga cognitiva.

### `[REQ-MG-ADD-003]` Presentación Visual de la Ecuación
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá renderizar en el centro de la pantalla la ecuación en formato horizontal gigante `A + B = ?` con tipografía de al menos 40px y colores contrastantes.

### `[REQ-MG-ADD-004]` Validación Inmediata contra Respuesta Ingresada
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario introduce un número a través del teclado táctil y coincide exactamente con $(A + B)$, el sistema deberá calificar la respuesta como correcta sin requerir pulsar una tecla adicional de confirmación si el número de dígitos coincide.
