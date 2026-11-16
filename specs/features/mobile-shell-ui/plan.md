# Plan de Implementación Técnica: Mobile Shell UI (`MOD-SHELL`)

## 1. Arquitectura Técnica del Módulo
La interfaz móvil utiliza Tailwind CSS configurado para alturas de pantalla dinámica (`h-dvh`), flexbox/grid con prevención de rebote por scroll (`overscroll-behavior: none`), y componentes desacoplados de entrada táctil.

---

## 2. Checklist de Tareas Atómicas

- [x] **Tarea 1: Tokens Centralizados, Tipografía y Tema Tailwind (`src/styles/tokens.json` + `tailwind.config.js`)**
  - Crear archivo centralizado `src/styles/tokens.json` con la siguiente estructura tipada:
    ```json
    {
      "colors": {
        "cloud": {
          "bg": "#F0F2F5",
          "surface": "#FFFFFF",
          "border": "#DEE3E8",
          "primary": "#788B9A",
          "primaryLight": "#EBF0F4",
          "primaryDark": "#556978",
          "sun": "#E0B342",
          "sunLight": "#FAF4E5",
          "sunDark": "#C29424",
          "sage": "#71B1A1",
          "sageLight": "#E8F3F0",
          "error": "#D98A82",
          "errorLight": "#FDF1F0",
          "text": "#29323B",
          "muted": "#667685"
        }
      },
      "borderRadius": {
        "btn": "18px",
        "card": "24px",
        "modal": "32px",
        "pill": "9999px"
      },
      "boxShadow": {
        "cloud-sm": "0 4px 12px -2px rgba(41, 50, 59, 0.05)",
        "cloud-md": "0 12px 24px -4px rgba(41, 50, 59, 0.07)",
        "cloud-lg": "0 20px 35px -5px rgba(41, 50, 59, 0.10)"
      }
    }
    ```
  - Mapear `tokens.json` directamente en `tailwind.config.js`.
  - Configurar estrategia de fuentes locales auto-hospedadas en `public/fonts/` (subconjunto WOFF2 `latin` para `Fredoka-600.woff2`, `Fredoka-700.woff2`, `Quicksand-500.woff2`, `Quicksand-600.woff2` con peso total $\approx 55\text{ KB}$ fuera del bundle JS de `<180 KB`), con pre-carga `<link rel="preload" as="font" type="font/woff2" crossorigin>` y `font-display: swap` en `index.html`.
  - Establecer tamaño tipográfico base global en `18px` (`text-lg`) y `32px+` para números/operaciones.

- [x] **Tarea 2: Shell Principal y Layout Responsivo (`MobileAppLayout.tsx`)**
  - Implementar contenedor `max-w-md mx-auto h-dvh flex flex-col justify-between bg-cloud-bg text-cloud-text select-none`.
  - Asegurar soporte para *safe area insets* en dispositivos con muesca/notch (iPhone / Android modernos con `pb-safe`).

- [ ] **Tarea 3: Componente Header de Partida (`GameHeader.tsx`)**
  - Barra de progreso de tiempo con animación de color según umbrales:
    - Normal (> 30% del tiempo total): `cloud.sage` (`#71B1A1`).
    - Advertencia ($\le$ 30% del tiempo total hasta 10s): `cloud.sun` (`#E0B342`).
    - Crítico (< 10s): `cloud.error` (`#D98A82`) acompañado de animación CSS de pulso suave (`animate-pulse`) en el contador numérico de segundos.
  - Marcador de puntuación actual y píldora de racha con icono dinámico (🔥).
  - Botón de alternancia de sonido (Mute / Unmute) y botón de pausa.

- [ ] **Tarea 4: Componente Teclado Numérico en Pantalla (`VirtualKeypad.tsx`)**
  - Grid de 3x4 columnas con botones de dimensión visual mínima de `56x56 px` y área táctil expandida de `60x60 px` (mediante padding/hit-area transparente) con separación `gap-3` (12 px).
  - Configurar `touch-action: manipulation` para eliminar retardos de 300 ms en dispositivos móviles.
  - Efecto de presión elástica: aplicar `scale(0.94)` en evento `pointerdown` con transición `150ms cubic-bezier(0.34, 1.56, 0.64, 1)` y restaurar a `scale(1)` en eventos `pointerup`, `pointercancel` y `pointerleave`.
  - Lógica de borrado rápido (`⌫`) y botón de confirmación explícita (`✓`), con soporte para despacho directo en retos de un solo toque.

- [x] **Tarea 5: Selector de Minijuegos en Pantalla de Inicio (`GameSelector.tsx`)**
  - Cards redondeadas (`24px`, `cloud-md`) con paleta "Cielo Nublado" y pictogramas claros.
  - Selección con un solo toque y transición directa al juego.

- [ ] **Tarea 6: Pantalla Modal de Fin de Partida (`GameOverModal.tsx`)**
  - Modal centrado (`32px`, `cloud-lg`) con resumen claro: medalla o trofeo, aciertos totales y racha máxima alcanzada.
  - Botones táctiles grandes para reintentar la misma modalidad o regresar al menú.

- [ ] **Tarea 7: Pruebas de Usabilidad Táctil y Compatibilidad de Pantalla**
  - Verificar en resoluciones estándar: 360x640, 390x844 (iPhone 12/13/14/15) y 412x915 (Samsung Galaxy/Pixel).
  - Comprobar que todos los botones cumplan estrictamente: tamaño visual $\ge 56\times 56\text{ px}$, área táctil $\ge 60\times 60\text{ px}$, separación inter-botones $\ge 12\text{ px}$ y tamaño base de texto $\ge 18\text{ px}$.
