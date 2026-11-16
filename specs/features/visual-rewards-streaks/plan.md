# Plan de Implementación Técnica: Visual Rewards & Streaks (`MOD-REWARD`)

## 1. Arquitectura Técnica del Módulo
El sistema de recompensas visuales combina componentes CSS con aceleración gráfica GPU, un despachador de confeti no invasivo mediante `canvas-confetti` y un módulo sintetizador de audio puro en TypeScript que interactúa con la `AudioContext` nativa del navegador.

---

## 2. Checklist de Tareas Atómicas

- [x] **Tarea 1: Módulo Sintetizador de Audio (`soundEffects.ts`)**
  - Inicializar `AudioContext` en el primer gesto de usuario y conectar a un `GainNode` maestro que limite la salida general a `-12 dBFS` (`gain.value = 0.251`).
  - Implementar síntesis pura sin librerías externas para:
    - **Acierto simple (`playSuccessSound()`):** arpegio pentatónico con onda sinusoidal (Do5: 523 Hz, Mi5: 659 Hz, Sol5: 784 Hz); cada nota dura 90 ms con desfase de 70 ms y envolvente de decaimiento exponencial (`exponentialRampToValueAtTime(0.001, t + 0.09)`).
    - **Hito de Racha (`playStreakSound(streakLevel)`):** acorde multi-oscilador triunfal (Do5, Mi5, Sol5, Do6) con onda sinusoidal durante 450 ms (ataque 20 ms, decaimiento 400 ms).
    - **Error compasivo (`playSoftGongSound()`):** gong cálido con onda triangular en *glide* continuo de Do4 (261 Hz) $\to$ Sol3 (196 Hz) durante 350 ms con caída suave a 0.001.
    - **Fin de tiempo (`playGameOverSound()`):** campana suave de cierre (Sol4: 392 Hz $\to$ Do5: 523 Hz) durante 500 ms.
  - Añadir bandera de control `isMuted` que suprima el procesamiento en el nodo maestro cuando el usuario active el silencio.

- [x] **Tarea 2: Controlador de Confeti y Partículas (`confettiHelper.ts`)**
  - Configurar llamadas optimizadas a `canvas-confetti` usando la paleta coordinada `['#E0B342', '#71B1A1', '#FFFFFF']`:
    - `triggerMiniConfetti()`: Estallido central compacto de 25 partículas, baja dispersión (spread: 45) para aciertos destacados y racha x3.
    - `triggerStreakConfetti()`: Disparo de cañones laterales dobles (60 partículas por lado, ángulo 60° y 120°) para hitos mayores de racha x5 y x10.
  - Asegurar que el canvas de confeti tenga `pointer-events: none` y `z-index: 50`.

- [ ] **Tarea 3: Componente de Insignias Flotantes de Racha (`StreakBadge.tsx`)**
  - Crear componente reactivo que escuche cambios en `currentStreak`.
  - Aplicar animaciones CSS de escala (`keyframes bounce-in`, `pulse-glow`).
  - Auto-ocultar insignias de celebración tras 1200 ms.

- [ ] **Tarea 4: Pruebas de Integración y Rendimiento de Animaciones**
  - Validar que los triggers de confeti y audio no bloqueen la recepción de toques táctiles del siguiente reto.
  - Verificar que el navegador mantenga 60 FPS durante la explosión de partículas.
