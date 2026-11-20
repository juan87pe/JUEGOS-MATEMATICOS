# AGENTS.md — Directrices Operativas para Agentes de IA

Este documento establece las reglas fundamentales, restricciones técnicas y metodología de trabajo para cualquier agente de Inteligencia Artificial que participe en el diseño, desarrollo, refactorización o testing del proyecto **Juegos Matemáticos para Niños (MathKids Mobile)**.

---

## 1. Rol y Filosofía de Desarrollo

El agente actúa como un **Ingeniero Frontend Senior especializado en EdTech Infantil y Mobile-First**, operando bajo la metodología estricta de **Spec-Driven Development (SDD)**.

> **Principio Rector:** Ningún archivo de código fuente (`src/`, `tests/`) debe ser creado o modificado sin que su comportamiento esté rigurosamente definido en `specs/` con sintaxis EARS y trazabilidad BDD.

---

## 2. Stack Tecnológico Aprobado

| Capa | Tecnología / Herramienta | Versión / Detalle | Justificación |
|---|---|---|---|
| **Runtime / Build** | Vite + TypeScript | Vite 5.x / TS 5.x | Arranque instantáneo, tipado estricto y bundle ultra liviano. |
| **Framework UI** | React | 18.x / 19.x | Enfoque declarativo de componentes y renderizado eficiente. |
| **Estilos & Diseño** | Tailwind CSS | 3.4+ | Estilos atómicos optimizados para mobile touch y animaciones fluidas. |
| **Efectos Visuales** | Canvas Confetti + CSS Animations | canvas-confetti 1.9+ | Cero impacto de lag en procesadores de gama baja de smartphones. |
| **Efectos de Sonido** | Web Audio API nativo (Sintetizador) | Estándar W3C | Tonos lúdicos generados algorítmicamente (0 KB en assets de audio). |
| **Gestión de Estado** | Estado en Memoria (React Context / Hooks) | In-Memory Puro | Cumple el requisito de sesión volátil (sin persistencia ni DB). |
| **Testing** | Vitest + Testing Library | Vitest 1.x+ | Pruebas unitarias de motores lógicos y pruebas de integración BDD. |

### Tecnologías Estrictamente Prohibidas:
- ❌ Bases de datos locales pesadas (IndexedDB con ORMs complejos, SQLite WASM).
- ❌ Almacenamiento persistente en disco o cookies para puntajes entre sesiones.
- ❌ Librerías de físicas o motores 3D pesados (Three.js, Phaser pesado, Pixi.js completo).
- ❌ Dependencias externas de autenticación o analíticas invasivas.

---

## 3. Protocolo de Ejecución de Tareas

Cada ciclo de desarrollo realizado por un agente debe cumplir rigurosamente el siguiente orden:

1. **Lectura de Especificaciones:**
   - Leer `specs/constitution.md` para entender límites del alcance.
   - Leer `specs/features/<modulo>/spec.md` para identificar los requerimientos formales `[REQ-...]`.
2. **Selección Atómica:**
   - Seleccionar **una única tarea atómica** pendiente en `specs/features/<modulo>/plan.md`.
3. **Implementación Guiada por Contrato:**
   - Verificar y respetar las interfaces definidas en `specs/contracts/`.
   - Escribir código limpio, modular, accesible y optimizado para pantallas táctiles de 360px a 430px de ancho.
4. **Validación y Verificación:**
   - Ejecutar y contrastar los criterios de aceptación especificados en `specs/features/<modulo>/validation.md`.
   - Marcar la tarea completada en `plan.md` únicamente cuando pase todas las verificaciones.

---

## 4. Estándares de Diseño Mobile & Infantil

- **Áreas táctiles (Hit Targets):** Botones numéricos y de opciones con un tamaño mínimo de **56x56 px** y espaciado de al menos 12 px para evitar toques accidentales con dedos de niños.
- **Tipografía:** Legible, redondeada, de alto contraste (mínimo ratio 4.5:1) con números grandes (32px+ en operaciones y dígitos).
- **Feedback Inmediato:** Toda interacción táctil debe responder visualmente en menos de 50 ms.
- **Tolerancia a la Frustración:** Las respuestas incorrectas no deben castigar con sonidos estridentes ni bloquear la pantalla; deben mostrar una animación sutil de reintento o revelar la solución con refuerzo positivo.
- **Botones Puros (Solo Icono o Solo Texto):** Todos los botones de la aplicación deben mostrar únicamente un icono intuitivo (con `aria-label` descriptivo) o únicamente texto claro, evitando combinar icono + texto salvo cuando sea estrictamente necesario. En particular, el botón de retroceso al menú debe ser transversalmente solo un icono intuitivo en toda la aplicación.
