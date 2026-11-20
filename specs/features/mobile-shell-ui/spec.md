# Especificación de Requerimientos: Mobile Shell UI (`MOD-SHELL`)

## 1. Propósito del Módulo
El módulo **Mobile Shell UI** provee el contenedor de navegación, diseño responsivo vertical (*portrait mobile-first*), selector de minijuegos y el teclado numérico táctil en pantalla (*On-Screen Keypad*), diseñado específicamente para garantizar una interacción ergonómica con los pulgares en smartphones y evitar la apertura del teclado del sistema operativo.

---

## 2. Requerimientos Funcionales en Sintaxis EARS

### `[REQ-SHELL-001]` Teclado Numérico Táctil en Pantalla (Keypad)
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá renderizar un teclado numérico táctil en pantalla con teclas del 0 al 9, botón de borrado (`⌫`) y botón de confirmación (`✓`), con dimensiones táctiles mínimas de 56x56 píxeles por botón, prescindiendo del teclado nativo del sistema operativo móvil.

### `[REQ-SHELL-002]` Contenedor Móvil Vertical Ergonómico
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá confinar la interfaz visual a un contenedor vertical centrado con un ancho máximo de 440 píxeles y altura adaptable a `100dvh` (Dynamic Viewport Height), evitando barras de desplazamiento vertical u horizontal durante la partida.

### `[REQ-SHELL-003]` Barra de Estado Superior en Tiempo Real
- **Tipo:** MIENTRAS [estado]
- **Sintaxis EARS:**
  > MIENTRAS una partida esté activa, el sistema deberá mostrar en la cabecera superior una barra visual de tiempo con cuenta regresiva con transiciones de color semánticas (`cloud.sage` > 30% del tiempo total; `cloud.sun` $\le$ 30% del tiempo restante; `cloud.error` `#D98A82` al restar < 10 segundos con animación de pulso suave en el contador), el contador numérico de aciertos actuales, el fuego o indicador de racha activa y el botón de pausa/menú.

### `[REQ-SHELL-004]` Menú de Selección Rápida de Minijuegos
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario se encuentra en la pantalla principal, el sistema deberá presentar una cuadrícula de tarjetas táctiles grandes y coloridas, cada una identificando un minijuego con su icono, nombre y nivel de dificultad sugerido.

### `[REQ-SHELL-005]` Pantalla de Resumen de Fin de Ronda
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO expira el temporizador de la partida, el sistema deberá presentar una tarjeta modal centrada con el resumen de aciertos, la mejor racha lograda y dos botones destacados de gran tamaño: "Jugar de nuevo" y "Elegir otro juego".

### `[REQ-SHELL-006]` Sistema de Tokens, Paleta "Cielo Nublado" y Tipografía Base
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá aplicar los tokens centralizados (`tokens.json` / tema Tailwind) de la paleta "Cielo Nublado" (`#F0F2F5` fondo, `#FFFFFF` superficie, `#29323B` texto principal con contraste $\ge$ 11:1), radios (`24px` tarjetas, `18px`/`999px` botones, `32px` modales), *Cloud Shadows* (`cloud-sm`, `cloud-md`, `cloud-lg`) y tipografía `Fredoka` (`600`/`700`, $\ge$ `32px` en números) + `Quicksand` (`500`/`600`, tamaño base fijo $\ge$ `18px` en enunciados).

### `[REQ-SHELL-007]` Micro-interacción Táctil Elástica
- **Tipo:** Por Evento
- **Sintaxis EARS:**
  > CUANDO el usuario presione un botón, tarjeta o tecla numérica (`pointerdown`), el sistema deberá aplicar una transformación elástica inmediata (`< 50 ms`) a `scale(0.94)` con transición de `150ms cubic-bezier(0.34, 1.56, 0.64, 1)`.

### `[REQ-SHELL-008]` Regla General de Botones Puros y Retroceso Transversal
- **Tipo:** Universal
- **Sintaxis EARS:**
  > El sistema deberá renderizar los botones de acción con únicamente un icono intuitivo (con `aria-label` accesible) o únicamente texto claro, evitando combinar icono y texto salvo necesidad explícita; en particular, el botón de retroceso hacia el menú principal deberá ser transversalmente solo un icono de retroceso en toda la aplicación.
