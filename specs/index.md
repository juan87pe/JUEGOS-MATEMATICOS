# Índice Maestro de Especificaciones y Trazabilidad (SDD)

Este catálogo centraliza todas las especificaciones, decisiones de arquitectura, contratos de dominio, minijuegos independientes y matrices de validación del sistema **MathKids Mobile**.

---

## 1. Módulos Core del Sistema

| ID Módulo | Nombre del Módulo | Descripción | Enlaces |
|---|---|---|---|
| `MOD-CORE` | **Core Game Engine** | Motor central de ciclo de juego: temporizador contra reloj, control de rondas, registro de puntajes y cálculo de estados de partida. | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/core-game-engine/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/core-game-engine/plan.md) · [Validation](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/core-game-engine/validation.md) |
| `MOD-GAMES`| **Minigames Catalog** | Registro y orquestador maestro de minijuegos procedurales infantiles. | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/minigames-catalog/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/minigames-catalog/plan.md) · [Validation](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/minigames-catalog/validation.md) |
| `MOD-REWARD`| **Visual Rewards & Streaks** | Sistema de refuerzo positivo: ráfagas de confeti, animaciones de éxito y medidores de racha (3, 5, 10 aciertos consecutivos). | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/visual-rewards-streaks/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/visual-rewards-streaks/plan.md) · [Validation](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/visual-rewards-streaks/validation.md) |
| `MOD-SHELL` | **Mobile Shell UI** | Interfaz y layout móvil vertical optimizado para smartphone: teclado numérico virtual táctil (Keypad), navegación simple y controles accesibles. | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/mobile-shell-ui/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/mobile-shell-ui/plan.md) · [Validation](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/features/mobile-shell-ui/validation.md) |

---

## 2. Catálogo de Minijuegos (Arquitectura Spec-Anchored)

Cada minijuego funciona como un micro-módulo pedagógico autónomo bajo `specs/minigames/<id>/`:

| ID Minijuego | Nombre | Concepto Matemático | Modo Entrada | Documentación SDD Anclada |
|---|---|---|---|---|
| `MG-ADD` | **Suma Rápida** | Adición básica (1 a 12, resultado $\le 24$) | Teclado Numérico | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/suma-rapida/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/suma-rapida/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/suma-rapida/validation.md) |
| `MG-SUB` | **Resta Divertida** | Sustracción no negativa ($A \ge B \ge 0$) | Teclado Numérico | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/resta-divertida/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/resta-divertida/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/resta-divertida/validation.md) |
| `MG-CMP` | **Mayor o Menor** | Comparación de magnitudes ($<, =, >$) | Selector Símbolos | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/mayor-menor/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/mayor-menor/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/mayor-menor/validation.md) |
| `MG-MUL` | **Multiplicación Mágica** | Tablas infantiles (1, 2, 3, 4, 5 y 10) | Selección Múltiple | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/multiplicacion-magica/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/multiplicacion-magica/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/multiplicacion-magica/validation.md) |
| `MG-CNT` | **Conteo Exprés** | Conteo visual de iconos lúdicos (1 a 12) | Opciones Numéricas | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/conteo-expres/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/conteo-expres/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/conteo-expres/validation.md) |
| `MG-TF` | **Subitización con Marco de Diez** | Subitización base 5, suma Make-10 y resta fantasma | Teclado In-App | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/marco-diez/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/marco-diez/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/marco-diez/validation.md) |
| `MG-TPL` | **Plantilla para Nuevos Juegos** | Guía de creación para extender el catálogo | Variable | [Plantilla](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/template/spec.md) · [Guía](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/README.md) |

---

## 3. Registro de Decisiones de Arquitectura (ADRs)

- [ADR-0001: Stack Tecnológico Web Mobile-First y PWA Ligera](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/adrs/0001-stack-tecnologico-mobile-first.md)
- [ADR-0002: Gestión de Estado Efímero en Memoria sin Persistencia](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/adrs/0002-arquitectura-estado-en-memoria.md)
- [ADR-0003: Motor de Gamificación, Animaciones Ligeras y Audio Sintetizado](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/adrs/0003-motor-gamificacion-y-animaciones-ligeras.md)

---

## 4. Contratos de Datos y Tipos

- [Game Engine Contract](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/game-engine.types.ts): Define estados de partida, temporizador, puntajes efímeros y eventos de acierto.
- [Minigames Contract](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts): Define la estructura abstracta de una pregunta/reto, opciones de respuesta y generadores de dificultad.
- [Ten-Frame Contract](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/ten-frame.types.ts): Define niveles didácticos, tokens, FSM, acciones tipadas y animación Make-10 / sustracción.

---

## 5. Requisitos No Funcionales

- [Rendimiento Móvil, Compatibilidad Táctil y UX Infantil](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/non-functional/performance-and-ux-kids.md)

---

## 6. Matriz de Trazabilidad de Requerimientos EARS

| Código REQ | Resumen del Requerimiento | Sintaxis EARS | Módulo | Validación BDD |
|---|---|---|---|---|
| `[REQ-CORE-001]` | Inicio de partida con cuenta regresiva | Evento | `MOD-CORE` | `Escenario: Inicio de partida y activación del temporizador` |
| `[REQ-CORE-002]` | Conclusión por fin del tiempo | Evento / Estado | `MOD-CORE` | `Escenario: Tiempo agotado bloquea entrada y muestra resumen` |
| `[REQ-CORE-003]` | Evaluación instantánea de respuesta | Evento | `MOD-CORE` | `Escenario: Validación de respuesta de usuario` |
| `[REQ-CORE-004]` | Sesión efímera sin persistencia | Universal | `MOD-CORE` | `Escenario: Reinicio o recarga limpia todas las métricas` |
| `[REQ-MG-ADD-001]`| Rango de operandos en Sumas (1-12) | Universal | `MG-ADD` | `Escenario: Comprobación de límites en retos de suma` |
| `[REQ-MG-SUB-001]`| Restas con resultado siempre $\ge 0$ | Evento | `MG-SUB` | `Escenario: Comprobación estricta de no negatividad` |
| `[REQ-MG-CMP-001]`| Comparación de magnitudes $(<, =, >)$ | Universal | `MG-CMP` | `Escenario: Operando A es mayor que B` |
| `[REQ-MG-MUL-001]`| Tablas de multiplicar básicas ($1, 2, 3, 4, 5, 10$) | Universal | `MG-MUL` | `Escenario: Solo se generan tablas de multiplicar básicas` |
| `[REQ-MG-CNT-001]`| Conteo de figuras visuales (1-12) | Universal | `MG-CNT` | `Escenario: Comprobación de conteo exacto` |
| `[REQ-REWARD-001]`| Celebración, salvia `#71B1A1` y arpegio 523/659/784 Hz | Evento | `MOD-REWARD`| `Escenario: Disparo de animación festiva en respuesta correcta` |
| `[REQ-REWARD-002]`| Activación de Racha (Streaks de 3, 5, 10) | Evento / Estado | `MOD-REWARD`| `Escenario: Incremento de racha y celebración mayor` |
| `[REQ-REWARD-003]`| Confeti coordinado (`#E0B342`, `#71B1A1`, `#FFFFFF`) en hito | Evento | `MOD-REWARD`| `Escenario: Gran racha de 5 aciertos y explosión de confeti` |
| `[REQ-REWARD-004]`| Desvanecimiento y autolimpieza de efectos ($\le$ 1.2s) | Universal | `MOD-REWARD`| `Escenario: Disparo de animación festiva en respuesta correcta` |
| `[REQ-REWARD-005]`| Silenciamiento de audio lúdico | Opcional | `MOD-REWARD`| `Escenario: Animaciones visuales funcionan aún con sonido apagado` |
| `[REQ-REWARD-006]`| Feedback compasivo (`#D98A82`/`#FDF1F0`, gong 261->196 Hz) | Evento | `MOD-REWARD`| `Escenario: Feedback compasivo sin castigo en respuesta incorrecta` |
| `[REQ-SHELL-001]` | Keypad numérico integrado en pantalla | Universal | `MOD-SHELL`| `Escenario: Ingreso de respuestas mediante teclado en pantalla` |
| `[REQ-SHELL-002]` | Layout vertical adaptable a móviles | Universal | `MOD-SHELL`| `Escenario: Renderizado responsivo en pantallas de 360px a 430px` |
| `[REQ-SHELL-003]` | Barra de estado superior en tiempo real y alerta de tiempo | Estado | `MOD-SHELL`| `Escenario: Advertencia visual al restar menos de 10 segundos` |
| `[REQ-SHELL-004]` | Menú de selección rápida de minijuegos | Evento | `MOD-SHELL`| `Escenario: Selección directa de juego desde el menú principal` |
| `[REQ-SHELL-005]` | Pantalla de resumen de fin de ronda | Evento | `MOD-SHELL`| `Escenario: Tiempo agotado bloquea entrada y muestra resumen` |
| `[REQ-SHELL-006]` | Tokens "Cielo Nublado", contraste 11:1 y tipografía base `18px` | Universal | `MOD-SHELL`| `Escenario: Consistencia visual, contraste y tipografía "Cielo Nublado"` |
| `[REQ-SHELL-007]` | Micro-interacción táctil elástica `scale(0.94)` en `pointerdown` | Evento | `MOD-SHELL`| `Escenario: Micro-interacción táctil elástica al pulsar` |
| `[REQ-SHELL-008]` | Botones puros (solo icono o solo texto) y retroceso transversal por icono | Universal | `MOD-SHELL`| `Escenario: Consistencia de botones puros y retroceso por icono` |
| `[REQ-TF-001]`    | Grilla 2x5 continua, bordes gruesos, vértices rectos y fichas al ~78% | Universal | `MG-TF` | `Escenario: Estructura física, bordes gruesos, vértices rectos y proporción de fichas` |
| `[REQ-TF-002]`    | Llenado canónico en base 5 | Universal | `MG-TF` | `Escenario: El generador produce patrones matemáticos válidos en base 5` |
| `[REQ-TF-003]`    | Ventana de exposición por ritmo (`Sin prisa` / `3000ms` / `1800ms` / `1000ms`) | Estado | `MG-TF` | `Escenario: Transición tras la ventana de exposición flash sin perder la grilla` |
| `[REQ-TF-004]`    | Persistencia del marco vacío de 10 casillas | Estado | `MG-TF` | `Escenario: Transición tras la ventana de exposición flash sin perder la grilla` |
| `[REQ-TF-005]`    | Bloqueo táctil durante flash y peek | Evento | `MG-TF` | `Escenario: El teclado ignora pulsaciones mientras la grilla está expuesta` |
| `[REQ-TF-006]`    | Rescate "Espiar de Nuevo" (600ms, 1 por reto) | Evento | `MG-TF` | `Escenario: El niño puede espiar de nuevo una única vez por reto` |
| `[REQ-TF-007]`    | Teclado Isomórfico 2x5 en Nivel 1 | Estado | `MG-TF` | `Escenario: Envío instantáneo a un solo toque en Nivel 1` |
| `[REQ-TF-008]`    | Teclado Compacto 3x4 en Niveles 2 y 3 | Estado | `MG-TF` | `Escenario: Entrada de dos dígitos con visor y botón comprobar` |
| `[REQ-TF-009]`    | Adición con doble marco y Make-10 | Estado | `MG-TF` | `Escenario: Saturación animada de la decena superior en adición` |
| `[REQ-TF-010]`    | Sustracción fantasma con siluetas discontinuas | Estado | `MG-TF` | `Escenario: Resta donde el sustraendo queda en silueta fantasma y la diferencia visible` |
| `[REQ-TF-011]`    | Modo explicativo "Ver Solución" | Evento | `MG-TF` | `Escenario: Revelación explicativa paso a paso con avance manual` |
| `[REQ-TF-012]`    | Web Audio API nativo y tolerancia al error | Universal | `MG-TF` | `Escenario: Ausencia total de campos input y respeto del viewport` |
| `[REQ-TF-013]`    | Menú desplegable estilizado de nivel y velocidad, botones puros y reinicio | Universal / Evento | `MG-TF` | `Escenario: Cambio de nivel y velocidad por menú desplegable estilizado, reinicio y botones puros` |
| `[REQ-TF-014]`    | Explicación resumida contextual del juego | Estado | `MG-TF` | `Escenario: Cambio de nivel por menú desplegable, reinicio del minijuego y botones puros` |
