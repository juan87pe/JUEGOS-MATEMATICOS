# Especificación de Minijuego: Subitización Rápida con Marco de Diez (`MG-TF`)

## 1. Ficha Pedagógica y de Dominio

| Atributo | Detalle |
|---|---|
| **ID del Minijuego** | `MG-TF` |
| **Título** | Subitización Rápida con Marco de Diez |
| **Rango de Edad** | 5 a 10 años |
| **Concepto Matemático** | Subitización conceptual (visuoespacial), descomposición en base 5, adición Make-10 y sustracción fantasma (método Singapur) |
| **Modo de Entrada** | Teclado táctil *in-app* (`isomorphic-2x5` en Nivel 1; `compact-3x4` en Niveles 2 y 3) |
| **Color Temático** | Esmeralda / Menta (`bg-emerald-500` / `border-emerald-600`) |
| **Icono** | 🔟 👁️ 🍎 |
| **Contrato Base** | Implementa `MinigameDefinition` de [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts) mediante adaptador y contratos específicos en [`specs/contracts/ten-frame.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/ten-frame.types.ts) |

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-TF-001]` Estructura Física y Geometría del Marco de Diez
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá renderizar cada marco de diez como una grilla fija de 2 filas por 5 columnas ($2 \times 5$ horizontal) con bordes contrastados (mínimo ratio 4.5:1), esquinas redondeadas y celdas individuales con relación de aspecto cuadrada 1:1.

### `[REQ-TF-002]` Llenado Canónico Estructurado en Base 5
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá ubicar los elementos visuales activos en estricto orden canónico de base 5: poblando primero las celdas 1 a 5 de la fila superior de izquierda a derecha, y posteriormente las celdas 6 a 10 de la fila inferior de izquierda a derecha.

### `[REQ-TF-003]` Exposición Temporal Flash Calibrada por Nivel
- **Tipo:** State-driven (Orientado a estado)
- **Sintaxis EARS:**
  > MIENTRAS el juego se encuentre en el estado `FLASH_ACTIVE`, el sistema deberá mostrar los elementos en el marco durante una ventana fija ininterrumpida de 1100 ms en Nivel 1, 1300 ms en Nivel 2 y 1200 ms en Nivel 3 antes de ocultarlos.

### `[REQ-TF-004]` Persistencia del Marco Vacío como Anclaje Espacial
- **Tipo:** State-driven (Orientado a estado)
- **Sintaxis EARS:**
  > CUANDO expire el tiempo de exposición flash, el sistema deberá desvanecer las fichas en un lapso de 100 ms manteniendo visible la cuadrícula de $2 \times 5$ con sus bordes y celdas vacías para preservar el mapa visoespacial en la memoria de trabajo infantil.

### `[REQ-TF-005]` Bloqueo de Entrada Táctil Durante Estímulos Fugaces (Input-Lock)
- **Tipo:** Event-driven (Orientado a eventos)
- **Sintaxis EARS:**
  > MIENTRAS el sistema se encuentre en los estados `PRE_FLASH`, `FLASH_ACTIVE` o `PEEK_ACTIVE`, el sistema deberá desactivar todos los controles del teclado táctil para impedir pulsaciones accidentales o anticipadas.

### `[REQ-TF-006]` Mecánica de Rescate Anti-Frustración ("Espiar de Nuevo")
- **Tipo:** Event-driven (Orientado a eventos)
- **Sintaxis EARS:**
  > CUANDO el niño presione el botón "Espiar de Nuevo" durante el estado `AWAITING_INPUT` y no haya consumido el rescate de la ronda activa, el sistema deberá reactivar la visualización de los elementos en un pulso flash de 600 ms y deshabilitar el botón para el resto del reto sin penalizar la racha.

### `[REQ-TF-007]` Teclado Táctil Isomórfico para Nivel 1
- **Tipo:** State-driven (Orientado a estado)
- **Sintaxis EARS:**
  > MIENTRAS el usuario juegue en el Nivel 1 (cantidades de 1 a 10), el sistema deberá presentar un teclado táctil *in-app* dispuesto en una matriz isomórfica de $2 \times 5$ (teclas 1 a 5 arriba, 6 a 10 abajo) de al menos $56 \times 56$ px por botón con envío automático al toque único (*single tap submit*).

### `[REQ-TF-008]` Teclado Compacto $3 \times 4$ para Niveles Multidígito (2 y 3)
- **Tipo:** State-driven (Orientado a estado)
- **Sintaxis EARS:**
  > MIENTRAS el usuario juegue en los Niveles 2 o 3 (respuestas hasta 20), el sistema deberá presentar un teclado táctil *in-app* de 3 filas por 4 columnas (`[1-3, ⌫]`, `[4-6, 0]`, `[7-9, ✓]`) con visor numérico de 2 dígitos y ancho restringido a $\le 260\text{px}$, exigiendo pulsar `[ ✓ ]` para evaluar la respuesta.

### `[REQ-TF-009]` Adición con Doble Grilla y Estrategia Make-10
- **Tipo:** State-driven (Orientado a estado)
- **Sintaxis EARS:**
  > MIENTRAS el juego opere en Nivel 2, el sistema deberá presentar dos marcos apilados verticalmente (sumandos $A \in [6, 9]$ y $B \in [2, 9]$ con suma $> 10$) y ejecutar en la solución o acierto el traslado animado de fichas desde el marco inferior hacia el superior para completar 10 y visualizar la decena consolidada ($10 + n$).

### `[REQ-TF-010]` Sustracción Fantasma con Siluetas Traslúcidas
- **Tipo:** State-driven (Orientado a estado)
- **Sintaxis EARS:**
  > MIENTRAS el juego opere en Nivel 3, el sistema deberá generar un reto de resta ($M \in [5, 15]$ y $S \in [1, M - 1]$), mostrando tras el flash las $S$ fichas sustraídas como siluetas fantasma con borde discontinuo rojo y las $M - S$ fichas restantes activas con resplandor suave para subitizar la diferencia.

### `[REQ-TF-011]` Modo Explicativo Pedagógico ("Ver Solución")
- **Tipo:** Event-driven (Orientado a eventos)
- **Sintaxis EARS:**
  > CUANDO el usuario presione "Ver Solución" o cometa dos errores consecutivos, el sistema deberá transicionar a `SOLUTION_REVEAL`, repoblar el marco e iluminar secuencialmente la base 5 dorada y los complementos, deteniéndose hasta que el usuario pulse explícitamente "¡Entendido! Siguiente reto".

### `[REQ-TF-012]` Tolerancia a la Frustración y Manejo de Audio Móvil
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá sintetizar todos los tonos mediante `soundService` de `MOD-REWARD` sin descargas de audio externas, inicializar el contexto de audio únicamente tras el primer toque táctil del usuario, y evitar cualquier sonido estruendoso o penalización punitiva ante respuestas incorrectas.

---

## 3. Matriz de Niveles y Configuración Curricular

| Nivel | Nombre Didáctico | Marcos Activos | Operación | Ventana Flash | Disposición de Teclado | Rango de Respuestas |
|---|---|---|---|---|---|---|
| **1** | Subitización Base 5 | 1 marco ($2 \times 5$) | Conteo Unitario | 1100 ms | Isomórfico $2 \times 5$ (1 a 10) | 1 a 10 |
| **2** | Adición Make-10 | 2 marcos apilados | Suma ($A + B > 10$) | 1300 ms | Compacto $3 \times 4$ (0 a 9 + ⌫ + ✓) | 11 a 18 |
| **3** | Resta Fantasma | 1 o 2 marcos apilados | Resta ($M - S \ge 1$) | 1200 ms | Compacto $3 \times 4$ (0 a 9 + ⌫ + ✓) | 1 a 14 |
