# Especificación de Requerimientos: Visual Rewards & Streaks (`MOD-REWARD`)

## 1. Propósito del Módulo
El módulo **Visual Rewards & Streaks** gestiona el sistema de estímulos visuales y sonoros que celebran el desempeño del niño. Convierte cada respuesta positiva en un momento gratificante y escala la intensidad de las celebraciones cuando el usuario encadena rachas de respuestas correctas (streaks de 3, 5 y 10).

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-REWARD-001]` Animación Festiva y Audio en Respuesta Correcta Simple
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario introduce una respuesta correcta, el sistema deberá teñir el botón o indicador seleccionado en menta salvia (`#71B1A1`), reproducir una animación de rebote alegre en el contenedor del reto, emitir un arpegio pentatónico suave en ondas sinusoidales (`Do5: 523 Hz`, `Mi5: 659 Hz`, `Sol5: 784 Hz`, máx. `-12 dBFS`) y mostrar un mensaje efímero de felicitación ("¡Genial!", "¡Muy bien!", "¡Excelente!").

### `[REQ-REWARD-002]` Activación de Hitos de Racha (Streaks de 3, 5 y 10)
- **Tipo:** Por Evento / Estado
- **Sintaxis EARS:**
  > CUANDO la racha de respuestas correctas consecutivas alcanza el valor de 3, 5 o 10, el sistema deberá desplegar una insignia animada de racha ("¡Racha x3! 🔥", "¡Súper Racha x5! ⚡", "¡Imparable x10! 🏆"), acompañada de una ráfaga de confeti y un acorde triunfal.

### `[REQ-REWARD-003]` Ráfaga Mayor de Confeti en Hito x5 y x10
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO la racha alcanza 5 o 10 aciertos, el sistema deberá invocar el disparador de partículas de `canvas-confetti` proyectando los tonos coordinados de la paleta (`#E0B342` sol, `#71B1A1` salvia y `#FFFFFF` blanco) desde ambos bordes de la pantalla móvil sin obstaculizar la visualización del siguiente reto.

### `[REQ-REWARD-004]` Desvanecimiento y Autolimpieza de Efectos
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá desvanecer y remover automáticamente los elementos visuales de felicitación en un tiempo no mayor a 1.2 segundos para mantener la pantalla limpia y no ralentizar el ritmo del juego contra reloj.

### `[REQ-REWARD-005]` Silenciamiento de Audio Lúdico
- **Tipo:** Opcional
- **Sintaxis EARS:**
  > DONDE la opción de sonido esté desactivada por el usuario, el sistema deberá ejecutar todas las animaciones visuales suprimiendo cualquier emisión sonora de la Web Audio API.

### `[REQ-REWARD-006]` Feedback Compasivo en Error o Reintento
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO se verifique una respuesta incorrecta, el sistema nunca emitirá zumbadores estridentes ni mostrará cruces rojas punitivas; en su lugar, teñirá el elemento en coral amable (`#D98A82` sobre fondo `#FDF1F0`), reproducirá un gong cálido de madera con onda triangular (`Do4: 261 Hz` $\rightarrow$ `Sol3: 196 Hz`, máx. `-12 dBFS`) y mostrará un mensaje constructivo ("Casi casi, ¡prueba a contar otra vez con calma! 🌱").
