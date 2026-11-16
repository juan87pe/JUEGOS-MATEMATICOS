# Minijuego de Subitización Rápida con Marco de Diez (Ten-Frame)
## Documento de Concepto y Síntesis Arquitectónica Multi-Lente (SDD)

* **Author:** juan8 & EGM Multi-Lens Swarm Synthesizer
* **Date:** 2026-11-11
* **Version:** 1.0.0
* **Status:** Aprobado para Especificación Formal (SDD Phase 1)

---

## 1. Overview y Tesis Pedagógica

El **Minijuego de Subitización Rápida con Marco de Diez** es una experiencia interactiva *mobile-first* diseñada para niños de 5 a 10 años, cuyo propósito es entrenar y consolidar la **subitización conceptual** (la habilidad cognitiva de reconocer instantáneamente cantidades compuestas sin recurrir al conteo unitario secuencial $1, 2, 3...$).

Utilizando la estructura espacial canónica de una grilla de $2 \times 5$ (marco de diez del método Singapur), el minijuego expone patrones numéricos durante ventanas de tiempo ultracortas calibradas por nivel ("flash exposure"). Al expirar el tiempo de exposición, los objetos desaparecen pero el marco vacío permanece como **anclaje espacial persistente**, permitiendo al niño proyectar la huella visual en su memoria de trabajo visuoespacial y responder a través de un teclado numérico táctil *in-app*.

La progresión didáctica escala desde el reconocimiento unitario y base 5 (1 a 10), pasando por la adición por complementos a diez (**Make-10**) mediante doble grilla apilada, hasta la sustracción con mecánica de **desvanecimiento fantasma (Ghost Remnants)**.

---

## 2. Síntesis Multi-Lente de Hallazgos y Perspectivas

### 2.1. Lente UX & Ergonomía Táctil (`egm-design`)
* **Distribución del Viewport Móvil (360px - 430px):**
  * Toda la interfaz debe organizarse verticalmente en 4 bandas sin scroll:
    1. **Banda Superior (~50px):** Nivel, racha de fuego (*streak*), botón de audio y vidas/intentos amigables.
    2. **Banda de Estimulación Visual (~220px - 260px):** Marco de diez único o doble marco vertical. Proporción de celda 1:1 o 1.1:1 con borde suave redondeado (8px) y contraste de 4.5:1 contra el fondo.
    3. **Banda de Estado/Feedback (~40px):** Indicador visual de exposición (barra de recarga/ojo atento) y mensajes de ánimo.
    4. **Banda de Entrada Táctil (~200px):** Teclado numérico táctil *in-app* ergonómico ubicado en la "Thumb Zone" inferior.
* **Calibración Temporal del Flash:**
  * *Hallazgo crítico:* Un tiempo de 2.5s permite el conteo serial subvocal. Para entrenar subitización real, los tiempos deben ajustarse a la ventana psicométrica:
    * **Nivel 1 (1 a 10, Base 5 canónica):** 1000 ms - 1200 ms.
    * **Nivel 2 (Adición Make-10, Doble grilla):** 1200 ms - 1500 ms (mayor carga de elementos).
    * **Nivel 3 (Sustracción Rápida):** 1200 ms.
    * **Modo Rápido / Racha Avanzada:** 800 ms.
* **Anclaje Espacial:** El marco exterior y las 10 casillas vacías deben mantenerse con un trazo sutil (`#CBD5E1`) para evitar la fatiga retiniana y permitir al niño calcular $10 - \text{espacios vacíos}$.

### 2.2. Lente Técnica y Código Mobile-First (`egm-codebase-details`)
* **Stack Estricto (Cumplimiento de `constitution.md` y `AGENTS.md`):**
  * React 18/19 + Vite 5.x + TypeScript 5.x + Tailwind CSS 3.4+.
  * **Cero Teclado Nativo:** Prohibición absoluta de `<input type="number">` o `<input type="text">` que despliegue el teclado virtual del sistema operativo (iOS/Android), el cual encoge el viewport entre un 40% y 50% y descompone el layout.
  * **Teclado Táctil DOM Puro:** Botones `<button type="button">` con `touch-action: manipulation`, `user-select: none`, y dimensiones mínimas de **56x56 px** con espaciado de 12 px.
  * **Efectos de Audio Algorítmicos (Web Audio API):** Cero descargas de MP3/WAV. Tonos sintetizados con `OscillatorNode` y `GainNode` (ej. tríada mayor ascendente C5-E5-G5 para aciertos; tono suave de madera 180 Hz para fallos, sin estridencias punitivas).
  * **Efectos Festivos:** `canvas-confetti` ejecutado en canvas superpuesto sin bloquear el hilo principal.
  * **Estado Efímero en Memoria:** Custom Hook `useTenFrameEngine` con máquina de estados finita (FSM), sin `localStorage` ni cookies.

### 2.3. Lente Pedagógica y Visión Curricular (`egm-zoom-out`)
* **Fundamento en Neuroeducación:**
  * La subitización es el predictor neurobiológico más potente del éxito posterior en cálculo algebraico formal (Clements & Sarama, Butterworth).
  * Llenado canónico en base 5: La fila superior completa (5) actúa como punto de referencia instantáneo. Cantidades como 7 se procesan como $5 + 2$ de inmediato.
* **Puente hacia la Aritmética Mental (Make-10):**
  * La adición con doble marco traslada elementos de la grilla inferior para saturar la grilla superior ($8 + 5 \to 10 + 3 = 13$). Este andamiaje elimina la necesidad de contar con los dedos y prepara para el sistema decimal posicional.
* **Mastery Mode (Llenado no canónico):** Una vez dominado el orden canónico, se recomienda habilitar retos con agrupaciones en pares (2, 4, 6...) para profundizar la flexibilidad numérica.

### 2.4. Lente de Comprensión y Carga Cognitiva Infantil (`egm-comprehension`)
* **Adaptación para Niños de 5 a 10 Años:**
  * En niños de 5-6 años, la frustración ante un estímulo que desaparece rápido puede generar bloqueo.
  * **Tolerancia Cero a la Ansiedad:** Se descarta el temporizador que descuenta tiempo en la fase de respuesta. El flash es breve, pero el tiempo para ingresar la respuesta es libre y relajado.
* **Resolución del Dilema de Sustracción (Modo A vs Modo B):**
  * *Modo B (Superposición de capas):* Requiere razonamiento espacial abstracto que confunde a niños menores de 8 años.
  * *Modo A (Desvanecimiento / Take-Away):* Altamente intuitivo y alineado con la acción física de "quitar". Se adopta el **Desvanecimiento Fantasma**: las fichas eliminadas se transforman en siluetas traslúcidas con una pequeña cruz, permitiendo ver a la vez el minuendo original, el sustraendo y la diferencia resultante.
* **Mecánica "Ver Solución":**
  * No debe sentirse como castigo. Se presenta como una revelación animada paso a paso a velocidad pedagógica (1.5s), iluminando la fila de 5 y sumando el remanente.

### 2.5. Lente de Viabilidad y Preparación de Implementación (`egm-implementation-readiness`)
* **Gestión Precisa de Timers:** Uso de `requestAnimationFrame` y referencias `useRef<number>` para garantizar la cancelación limpia de timers cuando el componente se desmonta o el usuario cambia de nivel rápidamente.
* **Configuración del Teclado según el Nivel:**
  * *Nivel 1 (Respuestas 1-10):* Disposición del teclado en **grilla 2x5** (fila 1: 1 a 5; fila 2: 6 a 10), creando un isomorfismo directo con el marco de diez.
  * *Niveles 2 y 3 (Respuestas 0 a 20):* Teclado numérico estándar 0-9 con visor de display y botón de borrado rápido.
* **Animaciones Livianas:** Transiciones CSS puras (`transition: opacity 150ms ease-out, transform 200ms cubic-bezier(...)`) para mantener 60 FPS fijos en smartphones de gama baja.

### 2.6. Lente Estructural y Contratos de Datos (`egm-structural`)
* **Arquitectura de Componentes:**
  * `TenFrameContainer`: Orquestador principal de pantalla.
  * `TenFrameGrid`: Renderizador puro de la matriz 2x5.
  * `TokenCell`: Celda individual con estados `empty`, `active`, `ghost`, `highlight-base5`.
  * `InAppKeypad`: Teclado desacoplado con soporte de layouts `isomorphic-2x5` y `numeric-keypad`.
  * `SolutionAnimator`: Motor de reproducción paso a paso.
* **Definición de Máquina de Estados Finita (FSM):**
  `IDLE` $\to$ `COUNTDOWN_ATTENTION` (800ms) $\to$ `FLASH_ACTIVE` (1000-1500ms) $\to$ `AWAITING_INPUT` $\to$ `EVALUATING` $\to$ `SUCCESS_CELEBRATION` / `RETRY_HINT` $\to$ `SOLUTION_REVEAL` $\to$ `ROUND_COMPLETE`.

### 2.7. Lente Catalizadora e Innovación TRIZ (`egm-inventive-catalyst`)
* **Contradicción 1: Rapidez del Flash vs Pánico Infantil.**
  * *Principio TRIZ 19 (Acción Periódica) & 10 (Acción Previa):* Indicador preparatorio ("¡Ojos listos!") de 600ms antes del flash, seguido de flash rápido, pero fase de respuesta completamente estática y sin prisas.
* **Contradicción 2: Parpadeo accidental o distracción del niño.**
  * *Principio TRIZ 11 (Compensación Previa):* **"Botón Ojo / Espiar de Nuevo" (Peek Button)**: Permite 1 re-flash de 600ms por ronda sin anular la racha, convirtiendo un posible momento de frustración en una herramienta de autonomía.
* **Contradicción 3: Isomorfismo Táctil-Visual.**
  * *Principio TRIZ 15 (Dinamismo y Similitud):* El teclado táctil de Nivel 1 replica la geometría del marco de 10. Tocar el 7 en el teclado activa la memoria motora correspondiente a la posición de la 7ma casilla del marco.

---

## 3. Matriz de Contradicciones y Resoluciones TRIZ

| # | Contradicción Técnica / Pedagógica | Parámetro en Conflicto | Principio TRIZ Aplicado | Solución de Diseño Adoptada |
|---|---|---|---|---|
| **C1** | El estímulo debe ser muy veloz para evitar conteo, pero la velocidad genera ansiedad en niños pequeños. | Rapidez de exposición vs. Seguridad psicológica del usuario. | **Principio 19 (Acción Periódica) y 10 (Acción Previa)** | Flash ultracorto (1s) precedido de aviso lúdico, pero con tiempo de respuesta libre sin penalización por segundos transcurridos. |
| **C2** | Si el niño parpadea o mira hacia otro lado durante el flash, pierde la ronda injustamente. | Confiabilidad de percepción vs. Fugacidad del estímulo visual. | **Principio 11 (Amortiguación / Rescate Previo)** | Mecánica de "Espiar de Nuevo" (1 uso por partida) que repite un pulso flash de 600ms sin castigo punitivo. |
| **C3** | La sustracción por superposición es elegante matemáticamente pero cognitivamente inaccesible para 5-7 años. | Precisión formal vs. Comprensión infantil intuitiva. | **Principio 32 (Cambio Óptico) y 15 (Dinamismo)** | Desvanecimiento Fantasma (*Ghost Remnants*): las fichas restadas se vuelven aros traslúcidos con textura suave, preservando el minuendo y la resta visualmente. |
| **C4** | Los teclados telefónicos estándar 3x3 no refuerzan la base 5 ni el marco espacial. | Familiaridad numérica vs. Transferencia espacial del concepto. | **Principio 13 (Hacerlo a la Inversa / Similitud Estructural)** | Teclado Isomórfico en 2 filas de 5 botones (1-5 superior, 6-10 inferior) en Nivel 1. |

---

## 4. Arquitectura de Niveles y Progresión Didáctica

```
┌────────────────────────────────────────────────────────────────────────┐
│                   NIVEL 1: SUBITIZACIÓN BASE 5 (1 a 10)                 │
│  - 1 Marco de Diez (2x5 horizontal)                                    │
│  - Flash: 1000ms a 1200ms                                              │
│  - Llenado Canónico: Fila superior (1-5) -> Fila inferior (6-10)       │
│  - Teclado: Isomórfico 2x5 (1 botón por número)                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Superar 5 aciertos seguidos
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   NIVEL 2: ADICIÓN MAKE-10 (Hasta 20)                  │
│  - Doble Marco de Diez vertical (Marco A superior, Marco B inferior)   │
│  - Flash: 1200ms a 1500ms                                              │
│  - Mecánica: Transferencia de fichas de Marco B a Marco A para hacer 10 │
│  - Teclado: Numérico táctil in-app (0-9 + display numérico)            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Superar 5 aciertos seguidos
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   NIVEL 3: SUSTRACCIÓN FANTASMA (Dentro de 10 y 20)    │
│  - Marco con Minuendo expuesto -> Fichas restadas en Desvanecimiento   │
│  - Flash: 1200ms                                                       │
│  - Mecánica: Sustracción con rastro de silueta traslúcida (Ghost)      │
│  - Teclado: Numérico táctil in-app (0-9 + display numérico)            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Especificación de Mecánicas Interactivas Clave

### 5.1. Mecánica Temporal Flash y Anclaje Espacial
1. **Fase de Preparación (600ms):** El marco de diez se muestra completamente vacío. Un icono amigable de "Ojos abiertos" se activa en pantalla.
2. **Fase Flash (1000ms - 1500ms):** Las fichas (círculos de colores vivos con sombra suave) aparecen instantáneamente en sus casillas canónicas.
3. **Fase de Ocultamiento:** Las fichas se desvanecen en 100ms. La grilla $2 \times 5$ permanece completamente visible con sus bordes definidos.
4. **Fase de Respuesta:** El teclado táctil se activa inmediatamente.

### 5.2. Teclado Táctil In-App Isomórfico (Nivel 1)
```
┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
│ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │  <- Fila 1 (56x56 px cada botón)
└───┘ └───┘ └───┘ └───┘ └───┘
┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐
│ 6 │ │ 7 │ │ 8 │ │ 9 │ │10 │  <- Fila 2 (56x56 px cada botón)
└───┘ └───┘ └───┘ └───┘ └───┘
```
* **Ventaja ergonómica:** Cero desplazamiento de foco, pulsación única instantánea (*single tap answer*), sin necesidad de presionar "Enter".

### 5.3. Modo "Ver Solución" (Pedagogical Replay)
* Activado opcionalmente por el niño o automáticamente tras 2 intentos fallidos.
* **Secuencia de Animación:**
  1. El marco se vuelve a poblar a velocidad moderada.
  2. La fila superior de 5 emite un resplandor dorado y se rotula sutilmente con la etiqueta "+5".
  3. Las fichas restantes de la fila inferior se iluminan secuencialmente emitiendo notas audibles suaves.
  4. Aparece la descomposición matemática completa (ej. $5 + 3 = 8$).
  5. Botón visible "¡Entendido! Siguiente reto".

---

## 6. Goals vs. Non-Goals Formales

### In-Scope Goals
* Componente `TenFrameGrid` horizontal ($2 \times 5$) con celdas de tamaño proporcional y persistencia de marco vacío.
* Controlador de exposición flash configurable por nivel milimétrico.
* Teclado táctil *in-app* de impacto cero sobre el viewport (sin teclado nativo móvil).
* Disposición isomórfica $2 \times 5$ para Nivel 1 y teclado numérico compacto 0-9 para Niveles 2 y 3.
* Motor pedagógico Make-10 con trasvase animado de tokens entre grillas verticales.
* Sustracción mediante desvanecimiento fantasma (*Ghost Remnants*).
* Botón de rescate lúdico "Espiar de Nuevo" (1 uso por ronda).
* Audio sintetizado procedural mediante Web Audio API y confeti festivo con `canvas-confetti`.

### Out-of-Scope Non-Goals
* Inputs nativos HTML (`<input>`) que activen teclados del sistema operativo.
* Persistencia en bases de datos o almacenamiento en disco (`localStorage`, cookies).
* Reconocimiento de voz o interacción por micrófono.
* Temporizadores de cuenta regresiva estresantes durante la fase de ingreso de respuesta.
* Mecánica de superposición de capas compleja en sustracción inicial.

---

## 7. Riesgos Identificados y Estrategias de Mitigación

| Riesgo Técnico / Pedagógico | Severidad | Mitigación Arquitectónica |
|---|---|---|
| **Pérdida de foco o salto de scroll en iOS Safari** | Bloqueador | Desactivar rebote elástico con `overscroll-behavior: none` en CSS global; botones con `touch-action: manipulation` y `tabindex="-1"`. |
| **Desincronización de timers por cambio de pestaña o lag móvil** | Mayor | Controlar el ciclo de vida del flash con `performance.now()` y `cleanup` riguroso en `useEffect`. |
| **Sobrecarga de estímulos en niños con TDAH o discalculia** | Mayor | Paleta de colores pastel armoniosa, sin parpadeos estroboscópicos ni sonidos estridentes. |
| **Colapso del viewport en pantallas pequeñas (360px de ancho)** | Mayor | Layout basado en CSS Grid / Flexbox con unidades `rem` relativas y altura máxima restringida a `100dvh`. |

---

## 8. Siguientes Pasos (SDD Roadmap)

1. **Fase 2 (Contratos de Interfaz):** Crear `specs/contracts/subitizing.ts` definiendo los tipos estrictos de `TenFrameState`, `FlashConfig`, `LevelMode` y `EngineAction`.
2. **Fase 3 (Especificación Formal EARS):** Redactar `specs/features/subitizacion/spec.md` con requerimientos formales `[REQ-SUB-01]` en adelante.
3. **Fase 4 (Plan Atómico & Criterios BDD):** Elaborar `plan.md` y `validation.md` con escenarios Gherkin para pruebas con Vitest y React Testing Library.
