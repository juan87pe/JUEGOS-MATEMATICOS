# Especificación No Funcional: Rendimiento Móvil, Accesibilidad y UX Infantil

## 1. Objetivos de Nivel de Servicio (SLOs) y Rendimiento Móvil

| Métrica | Objetivo | Método de Medición |
|---|---|---|
| **First Contentful Paint (FCP)** | < 1.0 segundo en red 4G móvil | Auditoría de Lighthouse / DevTools |
| **Time to Interactive (TTI)** | < 1.5 segundos | Carga completa de assets y reactividad lista |
| **Frame Rate durante animaciones** | 60 FPS estables (mínimo 50 FPS en gama baja) | Chrome DevTools Performance Monitor |
| **Tamaño de Bundle Inicial** | < 180 KB comprimido (gzipped) | Análisis de build de Vite |
| **Latencia de respuesta táctil** | < 50 ms entre tap y actualización visual | Eventos `pointerdown` / `touchstart` |
| **Consumo de Memoria RAM** | < 45 MB estables (cero fugas de memoria en loops) | Memory Profiler tras 10 partidas consecutivas |

---

## 2. Directrices de Usabilidad Infantil (Kids UX)

### 1. Dimensiones de Objetivos Táctiles (Hit Targets)
- Todos los botones interactivos (teclas numéricas, selección de opciones, botones de control) deben tener un tamaño visual mínimo de **56x56 px** con área de impacto táctil efectiva de al menos **60x60 px**.
- La separación mínima entre botones adyacentes debe ser de **12 px** para prevenir pulsaciones erróneas por motricidad fina en desarrollo.

### 2. Sistema Visual "Cielo Nublado", Tokens y Tipografía
- **Tokens Centralizados (`tokens.json` / Tailwind Theme):** Todos los colores, tipografías, radios de curvatura y sombras deben centralizarse en una única fuente de verdad para evitar valores dispersos entre minijuegos.
- **Paleta Semántica "Cielo Nublado":**
  - Fondo general (`cloud.bg`): `#F0F2F5` | Superficie tarjetas (`cloud.surface`): `#FFFFFF` | Bordes (`cloud.border`): `#DEE3E8`
  - Primario (`cloud.primary`): `#788B9A` (`-light`: `#EBF0F4`, `-dark`: `#556978`)
  - Sol / Recompensas (`cloud.sun`): `#E0B342` (`-light`: `#FAF4E5`, `-dark`: `#C29424`)
  - Éxito (`cloud.sage`): `#71B1A1` (`-light`: `#E8F3F0`)
  - Error compasivo (`cloud.error`): `#D98A82` (`-light`: `#FDF1F0`)
  - Texto principal (`cloud.text`): `#29323B` (prohibido `#000000` puro) | Texto secundario (`cloud.muted`): `#667685`
- **Contraste:** El texto `#29323B` sobre `#F0F2F5` o `#FFFFFF` garantiza una relación de contraste mínima de **11:1**, superando holgadamente el estándar **WCAG 2.1 AA (4.5:1)**.
- **Tipografía Optimizada (WOFF2 `latin` subset + `font-display: swap`):**
  - **Títulos y Números (`Fredoka`, pesos `600` y `700`):** Tamaño mínimo de `32px` en operaciones y marcadores.
  - **Cuerpo y Enunciados (`Quicksand`, pesos `500` y `600`):** Tamaño base fijo mínimo de `18px` (`text-lg`) en toda la aplicación, sin gating dinámico por niveles, priorizando pictogramas e iconografía sobre bloques de texto. Se omite `JetBrains Mono` para proteger el presupuesto de carga.
- **Radios y Sombras Suaves (*Cloud Shadows*):**
  - Radios: tarjetas `24px`, botones `18px` / píldoras `999px`, modales `32px`.
  - Sombras: `cloud-sm` (`0 4px 12px -2px rgba(41, 50, 59, 0.05)`), `cloud-md` (`0 12px 24px -4px rgba(41, 50, 59, 0.07)`), `cloud-lg` (`0 20px 35px -5px rgba(41, 50, 59, 0.1)`).

### 3. Tolerancia al Error y Prevención de la Frustración
- Los fallos o respuestas incorrectas **nunca** deben generar zumbadores estridentes ni cruces rojas punitivas. En su lugar, el sistema teñirá el elemento en coral amable (`#D98A82` sobre `#FDF1F0`), emitirá un gong cálido de madera (onda triangular `Do4: 261 Hz` $\rightarrow$ `Sol3: 196 Hz`) y mostrará una sugerencia constructiva (ej. *"Casi casi, ¡prueba a contar otra vez con calma! 🌱"*).
- No hay límite de vidas (*game over* por vidas agotadas): el único límite es el tiempo de la ronda, premiando siempre el esfuerzo y la cantidad de aciertos logrados.

### 4. Seguridad Auditiva y Autonomía de los Padres
- Los efectos de audio sintetizados (Web Audio API: arpegio pentatónico sinusoidal `523 Hz / 659 Hz / 784 Hz` en acierto; gong triangular `261 Hz -> 196 Hz` en error) no deben superar los **-12 dBFS** de ganancia máxima.
- El interruptor de volumen / silencio debe permanecer siempre accesible en la esquina superior derecha sin necesidad de navegar a menús secundarios.
