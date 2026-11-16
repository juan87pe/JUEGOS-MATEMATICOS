# Stage 7 Critic Review Report: Subitización con Marco de Diez

**Target:** `c:\Users\juan8\antigravity\JUEGOS MATEMATICOS\docs\designs\subitizacion_ten_frame.md` (`Lines 1-295`)
**Document Standard:** `feature-spec-standard`
**Mode:** REVIEW
**Report Destination:** `c:\Users\juan8\antigravity\JUEGOS MATEMATICOS\critic_report.md`

## Reviewer Status

| Reviewer | Status |
| --- | --- |
| `egm-design` | completed |
| `egm-structural` | completed |
| `egm-style` | completed |

## Summary Breakdown
- 🔴 **Blocker**: 3
- 🟡 **Major**: 4
- 🟢 **Nit**: 3
- **Total Findings**: 10

---

## Prioritized Findings (Blockers -> Major -> Nits)

### 1. Colapso y Desbordamiento Vertical en Viewports Móviles de 360px en Niveles 2 y 3 - Severity: Blocker
* **Reviewer Lens:** `egm-design`
* **Affected Scope:** `Lines 86-111` (ASCII Layout), `Lines 124-126` (`StandardNumericKeypad`), `Lines 277-278` (Ergonomics)
* **Discrepancy Description**: 
  En la Sección 1 (Arquitectura de Componentes UI), se reservan entre 180px y 220px para la Zona 4 (Teclado Táctil). Para el Nivel 1, la disposición isomórfica de 2 filas encaja perfectamente ($2 \times 56\text{px} + 12\text{px} = 124\text{px}$). Sin embargo, para los Niveles 2 y 3 se define `StandardNumericKeypad` con dígitos 0-9, botón de borrado y botón de comprobar (12 teclas). Si se organiza en el teclado telefónico/calculadora estándar de 4 filas con las restricciones ergonómicas obligatorias de `AGENTS.md` (altura mínima de $56\text{px}$ y espaciado $\ge 12\text{px}$):
  $$4 \text{ filas} \times 56\text{px} + 3 \text{ espacios} \times 12\text{px} = 224\text{px} + 36\text{px} = 260\text{px} \text{ (más padding} \approx 280\text{px})$$
  Al sumar la Zona 1 (Header: 48px), la Zona 2 con **dos marcos de diez apilados** (240px-280px), la Zona 3 (Feedback: 40px) y el teclado (280px), la altura total requerida supera los **640px**. En dispositivos móviles comunes de 360px de ancho (ej. 360x640px o pantallas con barra de navegación del navegador), el contenido desborda la pantalla verticalmente, violando el principio fundamental de *cero scroll* y estabilidad de viewport (`GOAL-03` y Principio T2 de `constitution.md`).
* **Rationale & Recommendation**: 
  Reestructurar la distribución del `StandardNumericKeypad` para mantener una altura máxima de 140px-160px:
  1. Diseñar el teclado en 2 filas de 6 botones:
     - Fila 1: `[1] [2] [3] [4] [5] [ ⌫ ]`
     - Fila 2: `[6] [7] [8] [9] [0] [ ✓ ]`
  2. Ajustar el dimensionamiento de las fichas de los dos marcos apilados en Niveles 2 y 3 (ej. tokens de 28px en lugar de 36px) para garantizar que ambas grillas ocupen un máximo de 200px verticalmente, asegurando holgura total dentro de `100dvh`.

---

### 2. Discrepancias en la FSM: Activación Manual de "Ver Solución" y Falta de Acciones/Eventos Formales - Severity: Blocker
* **Reviewer Lens:** `egm-structural`
* **Affected Scope:** `Lines 135-155` (Diagrama FSM), `Lines 75-79` (CUJ 4), `Lines 196-217` (`FSMState`)
* **Discrepancy Description**: 
  1. En el diagrama Mermaid, la transición hacia `SOLUTION_REVEAL` sólo existe desde `EVALUATING`:
     `EVALUATING --> SOLUTION_REVEAL : Respuesta Incorrecta (Intento 2) o Pulsa "Ver Solución"`
     Sin embargo, en el CUJ 4 (línea 76) se define explícitamente: *"El niño falla su respuesta o presiona directamente el botón 'Ver Solución'"*. Un niño en estado `AWAITING_INPUT` puede solicitar la solución directamente sin tener que enviar una respuesta errónea. No existe la transición `AWAITING_INPUT --> SOLUTION_REVEAL`.
  2. No se formaliza el bloqueo de interacción (*input-lock*) durante `PRE_FLASH`, `FLASH_ACTIVE` y `PEEK_ACTIVE`. Si el usuario pulsa botones táctiles durante la exposición flash o de peek, el comportamiento no está definido.
  3. La transición `RETRY_HINT --> AWAITING_INPUT : Reintento` carece de disparador temporal o evento explícito. Si `RETRY_HINT` muestra una animación de ayuda o sacudida sutil, debe definirse un timer de salida (ej. `Timer Hint 800ms`).
  4. Los contratos en TypeScript (`ten-frame.types.ts`) especifican los estados (`FSMState`), pero omiten por completo los eventos/acciones (`TenFrameAction`), impidiendo la implementación unívoca del reducer de la FSM.
* **Rationale & Recommendation**: 
  - Añadir en la FSM la transición `AWAITING_INPUT --> SOLUTION_REVEAL : Pulsa "Ver Solución"`.
  - Definir la guarda de bloqueo de teclado durante `FLASH_ACTIVE` y `PEEK_ACTIVE`.
  - Formalizar el tipo discriminated union `TenFrameAction` en `specs/contracts/ten-frame.types.ts` (`START_ROUND`, `FLASH_TIMEOUT`, `TAP_KEY`, `SUBMIT_ANSWER`, `TRIGGER_PEEK`, `REQUEST_SOLUTION`, `NEXT_ROUND`).

---

### 3. Modelo Incompleto de Sustracción Fantasma en Nivel 3 y Ausencia de CUJ Dedicado - Severity: Blocker
* **Reviewer Lens:** `egm-structural`
* **Affected Scope:** `Lines 58-79` (CUJs), `Lines 179-195` (`TenFrameGridState`), `Lines 226-227` (`tenFrameGenerator.ts`)
* **Discrepancy Description**: 
  El documento define el Nivel 3 con minuendo $M \in [5, 15]$ y sustraendo $S \in [1, M]$ mediante la mecánica de *Ghost Remnants*. Sin embargo:
  1. No existe un CUJ para el Nivel 3 (sólo se definieron CUJ 1 para Nivel 1 y CUJ 2 para Nivel 2).
  2. Si $M > 10$ (ej. $14 - 6$), el minuendo requiere dos marcos (`gridA` con 10 y `gridB` con 4). La especificación no explica cómo se distribuyen las celdas fantasma entre ambos marcos ni el orden de remoción (¿se retiran primero las 4 de `gridB` y 2 de `gridA`?).
  3. En `TenFrameGridState` (línea 184), `ghostCells?: number;` no define semánticamente si `filledCells` incluye o excluye las fichas fantasma durante la renderización de `TokenCell`.
  4. No se especifica qué estímulo percibe el niño durante el flash en la resta: si el flash muestra $M$ completo y luego desaparece, el niño no puede deducir la resta salvo que se muestre la expresión matemática en pantalla o las fichas fantasma se muestren traslúcidas durante la fase de respuesta.
* **Rationale & Recommendation**: 
  - Incorporar el **CUJ 5: Sustracción Fantasma en Nivel 3**.
  - Especificar la semántica de tokens: `activeTokens: number`, `ghostTokens: number` y `emptyTokens: number` tal que su suma sea 10 por grilla.
  - Clarificar que tras el flash, las celdas del sustraendo permanecen como siluetas fantasma (`ghost`) con cruz traslúcida y las celdas restantes desaparecen a marco vacío, permitiendo al niño contar o subitizar la diferencia.

---

### 4. Preguntas Abiertas (`Q-01` y `Q-02`) sin Resolver antes de Especificación Formal - Severity: Major
* **Reviewer Lens:** `egm-design`
* **Affected Scope:** `Lines 51-55` (`[Q-01]`, `[Q-02]`), `Line 67` (CUJ 2), `Line 126` (`StandardNumericKeypad`)
* **Discrepancy Description**: 
  Las preguntas abiertas sobre la curva adaptativa del flash (`Q-01`) y el mecanismo de envío en el teclado de Nivel 2 (`Q-02`) quedaron sin resolución formal. Sin embargo, en el CUJ 2 se asume que el niño *"presiona comprobar"*, lo que entra en contradicción con mantener abierta la duda de si se auto-evalúa al segundo dígito.
* **Rationale & Recommendation**: 
  Cerrar y arbitrar ambas decisiones en el documento:
  - **Decisión Q-01:** Mantener el tiempo de flash fijo según la configuración del nivel (1000-1200 ms) para evitar frustración e inconsistencia pedagógica; trasladar la aceleración adaptativa a *Future Improvements* ("Modo Maestría").
  - **Decisión Q-02:** Exigir botón explícito de comprobación (`[ ✓ ]`) con caja de vista previa de 2 dígitos en el `StandardNumericKeypad`. El auto-envío al segundo dígito castigaría severamente errores de pulsación accidental en niños pequeños.

---

### 5. Política de Autoplay de Audio en Navegadores Móviles y Ciclo de Vida del Web Audio API - Severity: Major
* **Reviewer Lens:** `egm-structural`
* **Affected Scope:** `Lines 230-238` (Sección 5: Motor de Síntesis de Sonido), `Lines 61-64` (CUJ 1)
* **Discrepancy Description**: 
  En navegadores móviles (iOS Safari y Android Chrome), el `AudioContext` se inicia en estado `'suspended'` y no emite sonido hasta que ocurre un gesto táctil explícito del usuario (`touchstart` / `pointerdown`).
  En el CUJ 1, el juego entra a `PRE_FLASH` e intenta ejecutar `playAttentionTone()` (330 Hz) de forma autónoma. Si el usuario aún no ha tocado la pantalla en esa sesión, el sonido fallará silenciosamente o disparará advertencias en consola. Asimismo, falta definir el método `cleanup()` o `dispose()` al desmontar la vista para liberar recursos del hardware de audio.
* **Rationale & Recommendation**: 
  - Diseñar la inicialización de `AudioContext` como perezosa (*lazy*), atada al primer toque del niño (ej. botón "¡Jugar!" inicial o selector de nivel).
  - Incluir en `AudioSynth` un método `resumeIfNeeded()` antes de cada emisión sonora y un método `close()` invocado en el `cleanup` de `useEffect` en `TenFrameGameView`.

---

### 6. Estado de Búfer Insuficiente para Entrada Numérica Multidígito en `TenFrameEngineState` - Severity: Major
* **Reviewer Lens:** `egm-structural`
* **Affected Scope:** `Lines 208-217` (`TenFrameEngineState`)
* **Discrepancy Description**: 
  El contrato `TenFrameEngineState` define la propiedad `selectedAnswer: number | null;`.
  En el Nivel 1 esto basta porque el teclado 2x5 opera con envío directo de un solo dígito (1 al 10). Pero en los Niveles 2 y 3, donde las respuestas van de 11 a 20, un estado de tipo `number | null` no permite distinguir entre:
  - Búfer vacío (`""`),
  - Primer dígito ingresado (`"1"` esperando el segundo),
  - El valor numérico `1` como respuesta final.
* **Rationale & Recommendation**: 
  Agregar al estado del motor la propiedad `inputBuffer: string` (ej. `""`, `"1"`, `"14"`). La evaluación final se ejecutará parseando `parseInt(inputBuffer, 10)` cuando se accione el botón de comprobación.

---

### 7. Omisión de Espacio Designado para la Expresión Matemática en el Layout - Severity: Major
* **Reviewer Lens:** `egm-design`
* **Affected Scope:** `Lines 86-111` (Diagrama ASCII), `Line 193` (`RoundChallenge.mathematicalExpression`)
* **Discrepancy Description**: 
  El contrato `RoundChallenge` define `mathematicalExpression: string; // Ej. "5 + 3 = 8" o "8 + 5 = 13"`. Sin embargo, en el diagrama ASCII de 4 zonas (Header, Escenario, Feedback, Teclado) no se asignó un contenedor visual específico para renderizar dicha expresión.
  En operaciones de adición Make-10 y sustracción, mostrar visualmente el planteamiento (ej. "$8 + 5 = \ ?$") es indispensable para orientar al niño una vez que las fichas se ocultan.
* **Rationale & Recommendation**: 
  Ubicar la expresión matemática formalmente dentro de la Zona 3 (Zona de Estado & Feedback) o en un sub-header fijo de 28px entre el Header y el Escenario, evitando saltos de diseño (*layout shifts*) entre niveles.

---

### 8. Caso Límite en Generador de Restas: Resultado Cero - Severity: Nit
* **Reviewer Lens:** `egm-design`
* **Affected Scope:** `Lines 226-227` (`tenFrameGenerator.ts` Nivel 3)
* **Discrepancy Description**: 
  La regla de generación estipula $M \in [5, 15]$ y $S \in [1, M]$, garantizando resultado $\ge 0$. Si $S = M$, el resultado es 0. En niños de educación temprana (5 a 7 años), un marco totalmente vacío tras el flash para representar "0" suele interpretarse como un fallo técnico de carga y carece de valor para la subitización visual.
* **Rationale & Recommendation**: 
  Restringir el sustraendo a $S \in [1, M - 1]$ para asegurar siempre una diferencia positiva visible ($\ge 1$).

---

### 9. Inconsistencias de Notación y Encabezados Bilingües - Severity: Nit
* **Reviewer Lens:** `egm-style`
* **Affected Scope:** `Lines 9-82`, `Lines 296-395`
* **Discrepancy Description**: 
  Se presentan mezclas de títulos estructurales en inglés (`## Overview`, `## The Problem`, `## Technical Plan`, `## Alternatives Considered`, `### Target Files to Create/Modify`) con subtítulos y explicaciones íntegramente en español (`### 1. Arquitectura de Componentes UI`, `### 2. Máquina de Estados Finita`). Asimismo, se alternan notaciones de rango de corchetes ($A \in [6, 9]$) con descripciones verbales ("0 a 10").
* **Rationale & Recommendation**: 
  Homogeneizar los títulos al estándar SDD bilingüe corporativo y estandarizar la notación matemática en todas las secciones.

---

### 10. Transición Global de Reinicio o Cambio de Nivel en la FSM - Severity: Nit
* **Reviewer Lens:** `egm-structural`
* **Affected Scope:** `Lines 135-155` (Diagrama FSM)
* **Discrepancy Description**: 
  La máquina de estados no documenta la transición de cancelación o reinicio cuando el usuario cambia de nivel desde el selector del header en medio de un estado activo (`FLASH_ACTIVE`, `AWAITING_INPUT` o `SOLUTION_REVEAL`).
* **Rationale & Recommendation**: 
  Documentar explícitamente en el diagrama o texto el evento global `CHANGE_LEVEL / RESET` que cancela timers activos y retorna inmediatamente a `PRE_FLASH` con el nuevo nivel configurado.

---
*Reporte generado por EGM Synthesizer Persona*
