# Especificación de Minijuego: Resta Divertida (`MG-SUB`)

## 1. Ficha Pedagógica y de Dominio

| Atributo | Detalle |
|---|---|
| **ID del Minijuego** | `MG-SUB` |
| **Título** | Resta Divertida |
| **Rango de Edad** | 6 a 9 años |
| **Concepto Matemático** | Sustracción básica de enteros no negativos |
| **Modo de Entrada** | `numeric_keypad` (Teclado numérico táctil en pantalla) |
| **Color Temático** | Azul cielo / Índigo (`bg-sky-500`) |
| **Icono** | ➖ 🎈 |
| **Contrato Base** | Implementa `MinigameDefinition` de [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts) |

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-MG-SUB-001]` Regla Inviolable de No Negatividad
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el generador de restas selecciona dos números $X$ e $Y$ entre 1 y 20, el sistema deberá asignar como minuendo $A = \max(X, Y)$ y como sustraendo $B = \min(X, Y)$, asegurando que la resta $A - B$ resulte siempre en un entero mayor o igual a 0.

### `[REQ-MG-SUB-002]` Rango Máximo de Minuendo
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá limitar el minuendo a un valor máximo de 20 para mantener una complejidad baja adaptada a la agilidad mental infantil.

### `[REQ-MG-SUB-003]` Presentación Visual de la Ecuación
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá renderizar en pantalla la operación `A - B = ?` con símbolos de sustracción destacados y colores relajantes que no induzcan ansiedad.

### `[REQ-MG-SUB-004]` Validación Inmediata contra Respuesta Ingresada
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario introduce un número a través del teclado numérico que coincide con $A - B$, el sistema deberá calificar el intento como correcto y avanzar al siguiente reto.
