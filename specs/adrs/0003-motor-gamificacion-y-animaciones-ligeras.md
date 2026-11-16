# ADR-0003: Motor de Gamificación, Animaciones Ligeras y Audio Sintetizado

- **Estado:** Aceptado
- **Fecha:** 2026-10-31
- **Decisores:** Equipo de Arquitectura SDD & Experiencia Infantil

---

## 1. Contexto y Planteamiento del Problema

El sistema requiere:
- Animaciones de felicitación inmediatas ante respuestas positivas.
- Animaciones reforzadas y dinámicas para rachas de respuestas correctas consecutivas (ej. racha de 3, 5, 10 aciertos).
- Respuesta fluida en smartphones de gama media y baja sin sobrecalentar el dispositivo ni drenar la batería.
- Efectos sonoros alegres e infantiles sin requerir la descarga de pesados archivos MP3/WAV.

---

## 2. Decisión

Implementar un **motor híbrido de recompensas visuales ligeras y síntesis de audio procedural en el cliente**:

### 1. Sistema de Recompensas Visuales
- **Acierto Estándar:**
  - Micro-animación CSS con aceleración por hardware (`transform: scale(1.15)`) en la tarjeta del ejercicio o en el indicador de aciertos.
  - Aparición de insignias flotantes efímeras (+10 pts, "¡Bien hecho!", estrellas brillantes ⭐✨).
- **Rachas Consecutivas (Streaks x3, x5, x10):**
  - **Racha x3:** Efecto de destello solar amarillo y badge "¡En llamas! 🔥".
  - **Racha x5:** Disparo lateral de confeti mediante la librería ultra liviana `canvas-confetti`.
  - **Racha x10:** Ráfaga completa de fuegos artificiales de confeti en pantalla completa (*celebration burst*) con multiplicador visual destacado.

### 2. Audio Sintetizado mediante Web Audio API
- En lugar de cargar archivos de sonido `.mp3` que consumen ancho de banda móvil, se utiliza un generador de tonos en Web Audio API:
  - **Sonido de Acierto:** Arpegio ascendente rápido con oscilador de onda senoidal suave (frecuencias C5 → E5 → G5).
  - **Sonido de Racha:** Acorde triunfal alegre de campana (*chime effect*).
  - **Sonido de Tiempo Agotado:** Melodía suave descendente no punitiva.
- Se incluye un interruptor accesible para silenciar el audio con un solo toque.

---

## 3. Consecuencias

### Positivas
- **Cero Bloqueo de Hilo Principal:** Las animaciones CSS aprovechan la GPU del teléfono inteligente.
- **Tamaño de Descarga Cero para Audio:** La síntesis en Web Audio API ocupa menos de 2 KB de código TypeScript.
- **Estímulo Positivo:** Fomenta la retención y la motivación en niños sin generar sobreestimulación caótica o frustración ante fallos.

### Riesgos y Mitigaciones
- *Riesgo:* Limitaciones de reproducción de audio automático en navegadores móviles (políticas de autoplay de iOS Safari / Chrome Android).
- *Mitigación:* El contexto de audio se desbloquea tras el primer toque intencional del usuario al pulsar el botón "Comenzar" o seleccionar un juego.
