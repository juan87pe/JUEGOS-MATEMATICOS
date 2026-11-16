# Arquitectura Spec-Anchored para Minijuegos Matemáticos

En **MathKids Mobile**, cada minijuego opera como un **micro-módulo pedagógico independiente**, desacoplado del motor central y anclado a un contrato estricto de interfaz.

---

## 1. ¿Por qué una Estructura Spec-Anchored para cada Minijuego?

El enfoque **Spec-Anchored (Especificación Anclada)** garantiza que:
1. **Aislamiento Pedagógico:** Cada juego tiene reglas matemáticas, restricciones de rango, modos de entrada y tolerancias de error independientes según la edad del niño.
2. **Extensibilidad Infinita:** Cualquier desarrollador o agente de IA puede añadir un nuevo minijuego (ej. fracciones, geometría, patrones) creando una nueva carpeta sin alterar el motor central.
3. **Contrato Inviolable (Anchor):** Todos los minijuegos están anclados al contrato formal [`specs/contracts/minigames.types.ts`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/contracts/minigames.types.ts), asegurando que el motor de rondas y el shell móvil puedan ejecutar cualquier minijuego de manera polimórfica.
4. **Verificación Matemática Automatizada:** Cada juego cuenta con su propia matriz BDD para probar cientos de generaciones procedurales (ej. verificar que nunca salgan números negativos o tablas no autorizadas).

---

## 2. Estructura de un Minijuego

Cada minijuego dentro de `specs/minigames/<id-juego>/` contiene tres artefactos esenciales:

```text
specs/minigames/<id-juego>/
├── spec.md         # Requerimientos EARS (rangos numéricos, restricciones, pedagogía)
├── plan.md         # Tareas atómicas de desarrollo (generador procedural, UI)
└── validation.md   # Escenarios BDD Gherkin de verificación matemática
```

---

## 3. Catálogo de Minijuegos Definidos

| ID | Minijuego | Dominio Matemático | Modo de Entrada | Edad Objetivo | Enlaces |
|---|---|---|---|---|---|
| `MG-ADD` | **Suma Rápida** | Adición básica (1 a 12, sumas $\le 24$) | Keypad Numérico | 5 - 8 años | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/suma-rapida/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/suma-rapida/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/suma-rapida/validation.md) |
| `MG-SUB` | **Resta Divertida** | Sustracción no negativa ($A \ge B$) | Keypad Numérico | 6 - 9 años | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/resta-divertida/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/resta-divertida/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/resta-divertida/validation.md) |
| `MG-CMP` | **Mayor o Menor** | Comparación de magnitudes ($<, =, >$) | Selector de Símbolos | 5 - 8 años | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/mayor-menor/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/mayor-menor/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/mayor-menor/validation.md) |
| `MG-MUL` | **Multiplicación Mágica** | Tablas del 1, 2, 3, 4, 5 y 10 | Selección Múltiple / Keypad | 7 - 10 años | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/multiplicacion-magica/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/multiplicacion-magica/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/multiplicacion-magica/validation.md) |
| `MG-CNT` | **Conteo Exprés** | Correspondencia uno a uno (1 a 12 items) | Opciones Numéricas | 4 - 7 años | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/conteo-expres/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/conteo-expres/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/conteo-expres/validation.md) |
| `MG-TF` | **Subitización con Marco de Diez** | Subitización base 5, suma Make-10 y resta fantasma | Teclado Táctil In-App | 5 - 10 años | [Spec](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/marco-diez/spec.md) · [Plan](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/marco-diez/plan.md) · [BDD](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/marco-diez/validation.md) |

---

## 4. Guía para Crear un Nuevo Minijuego (SDD Template)

Para incorporar un nuevo minijuego:
1. Copiar la carpeta [`specs/minigames/template/`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/minigames/template/) con el nombre del nuevo juego.
2. Definir los requerimientos EARS en `spec.md`.
3. Desglosar las tareas en `plan.md`.
4. Definir las pruebas matemáticas en `validation.md`.
5. Registrar el nuevo juego en el índice maestro [`specs/index.md`](file:///c:/Users/juan8/antigravity/JUEGOS%20MATEMATICOS/specs/index.md).
