# Especificación de Requerimientos: Core Game Engine (`MOD-CORE`)

## 1. Propósito del Módulo
El módulo **Core Game Engine** gobierna el ciclo de vida de la partida: el temporizador contra el reloj, el despacho de nuevos retos matemáticos, la evaluación instantánea de respuestas, la actualización de rachas en memoria y la emisión de eventos de partida terminada.

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-CORE-001]` Inicio de Ronda y Activación de Temporizador
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario selecciona un minijuego e inicia la partida, el sistema deberá inicializar el contador de aciertos en 0, la racha en 0 y arrancar una cuenta regresiva de 45 segundos con decrementos exactos de 1 segundo.

### `[REQ-CORE-002]` Finalización por Tiempo Agotado
- **Tipo:** Por Estado / Evento
- **Sintaxis EARS:**
  > CUANDO el tiempo restante del temporizador llega a 0 segundos, el sistema deberá cambiar el estado del juego a `time_up`, inhabilitar inmediatamente la entrada de nuevas respuestas y presentar la pantalla de balance de aciertos de la ronda.

### `[REQ-CORE-003]` Evaluación Instantánea de Respuesta Correcta
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario envía una respuesta que coincide con el valor esperado del reto actual, el sistema deberá incrementar el contador de aciertos en 1, incrementar la racha actual en 1, actualizar la racha máxima si corresponde y despachar de inmediato el siguiente reto matemático sin recargar la pantalla.

### `[REQ-CORE-004]` Evaluación Instantánea de Respuesta Incorrecta
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario envía una respuesta que no coincide con el valor esperado del reto actual, el sistema deberá incrementar el contador de errores en 1, reiniciar la racha actual a 0 y presentar una animación sutil de reintento o avanzar al siguiente reto sin penalización de tiempo.

### `[REQ-CORE-005]` Volatilidad de Sesión (In-Memory Only)
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá mantener todas las métricas de aciertos, errores y rachas exclusivamente en la memoria activa del navegador, restableciendo todos los valores a cero al reiniciar la partida o recargar la ventana.

### `[REQ-CORE-006]` Pausa y Reanudación de la Partida
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario pulsa el botón de pausa durante una partida activa, el sistema deberá congelar el temporizador y ocultar el reto actual hasta que el usuario pulse reanudar.
