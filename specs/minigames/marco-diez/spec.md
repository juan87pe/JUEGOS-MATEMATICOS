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
  > El sistema deberá renderizar cada marco de diez como una grilla fija y continua de 2 filas por 5 columnas ($2 \times 5$ horizontal) con bordes exteriores y divisores internos gruesos de alto contraste (mínimo ratio 4.5:1), vértices rectos sin suavización de ángulos (`rounded-none`), celdas individuales con relación de aspecto cuadrada 1:1 y fichas (círculos u otros objetos) dimensionadas proporcionalmente al ~78% del espacio interior de cada celda.

> **Estándar Visual Compartido:** Esta geometría canónica (bordes gruesos continuos, vértices rectos sin redondeo y proporción ficha-celda ~78%) aplica tanto a `MG-TF` como a cualquier otro minijuego del catálogo que reutilice el componente Marco de Diez.

### `[REQ-TF-002]` Llenado Canónico Estructurado en Base 5
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá ubicar los elementos visuales activos en estricto orden canónico de base 5: poblando primero las celdas 1 a 5 de la fila superior de izquierda a derecha, y posteriormente las celdas 6 a 10 de la fila inferior de izquierda a derecha.

### `[REQ-TF-003]` Exposición Temporal Calibrada por Velocidad del Marco
- **Tipo:** State-driven (Orientado a estado)
- **Sintaxis EARS:**
  > MIENTRAS el juego opere en modo **Tranquilo** (por defecto, `3000 ms`), **Flash** (`1800 ms`) o **Turbo** (`1000 ms`), el sistema deberá mostrar los elementos en el marco durante esa ventana fija en `FLASH_ACTIVE` antes de ocultarlos; MIENTRAS opere en modo **Sin prisa**, las fichas permanecerán visibles de forma permanente durante `AWAITING_INPUT` sin ocultarse.

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

### `[REQ-TF-013]` Menú Desplegable Estilizado de Nivel y Velocidad, Botones Puros y Reinicio
- **Tipo:** Universal / Event-driven
- **Sintaxis EARS:**
  > El sistema deberá presentar en la cabecera un botón de solo texto (ej. `Nivel 1 · Tranquilo ▾`) que abra un menú desplegable personalizado con estética "Cielo Nublado" conteniendo: (a) las tarjetas de nivel con título y descripción (`Nivel 1 · Subitización Base 5`, `Nivel 2 · Adición Make-10`, `Nivel 3 · Resta Fantasma`), y (b) el selector de velocidad del marco (**Sin prisa**, **Tranquilo**, **Flash**, **Turbo**); además de un botón de retroceso por icono, un botón de reinicio por icono y botones de rescate (`Espiar`, `Solución`) en solo texto.

### `[REQ-TF-014]` Explicación Resumida Contextual del Juego
- **Tipo:** State-driven (Orientado a estado)
- **Sintaxis EARS:**
  > MIENTRAS el juego esté en espera de respuesta o preparación (`PRE_FLASH`, `FLASH_ACTIVE`, `PEEK_ACTIVE`, `AWAITING_INPUT`), el sistema deberá mostrar en la banda de instrucción una explicación resumida y comprensible para niños sobre el objetivo del nivel activo.

---

## 3. Matriz de Niveles y Configuración Curricular

| Nivel | Nombre Didáctico | Marcos Activos | Operación | Ventana Flash (por defecto) | Disposición de Teclado | Rango de Respuestas |
|---|---|---|---|---|---|---|
| **1** | Subitización Base 5 | 1 marco ($2 \times 5$) | Conteo Unitario | 3000 ms (Tranquilo) · configurable | Isomórfico $2 \times 5$ (1 a 10) | 1 a 10 |
| **2** | Adición Make-10 | 2 marcos apilados | Suma ($A + B > 10$) | 3000 ms (Tranquilo) · configurable | Compacto $3 \times 4$ (0 a 9 + ⌫ + ✓) | 11 a 18 |
| **3** | Resta Fantasma | 1 o 2 marcos apilados | Resta ($M - S \ge 1$) | 3000 ms (Tranquilo) · configurable | Compacto $3 \times 4$ (0 a 9 + ⌫ + ✓) | 1 a 14 |
