# Matriz de Validación BDD: Mobile Shell UI (`MOD-SHELL`)

---

### Escenario 1: Ingreso de respuestas mediante teclado en pantalla
**Trazabilidad:** `[REQ-SHELL-001]`
```gherkin
Escenario: El niño escribe una respuesta usando el teclado virtual en pantalla
  Dado que el reto actual solicita una respuesta numérica
  Cuando el usuario presiona sucesivamente la tecla "1" y la tecla "4"
  Entonces el campo de respuesta visible debe reflejar el valor "14"
  Y el teclado nativo del teléfono no debe abrirse en ningún momento
  Y al presionar la tecla de borrado "⌫" el valor debe cambiar a "1"
```

---

### Escenario 2: Renderizado responsivo vertical sin scroll en smartphone
**Trazabilidad:** `[REQ-SHELL-002]`
```gherkin
Escenario: La aplicación encaja perfectamente en una pantalla móvil de 390x844 px
  Dado que la aplicación se abre en un navegador móvil en modo vertical
  Cuando se renderiza el área de juego activa con el reto y el teclado táctil
  Entonces todos los elementos deben caber dentro de la altura de la ventana (100dvh)
  Y no debe existir barra de scroll vertical ni horizontal
```

---

### Escenario 3: Cambio visual de la barra de tiempo en estado crítico
**Trazabilidad:** `[REQ-SHELL-003]`
```gherkin
Escenario: Advertencia visual al restar menos de 10 segundos
  Dado que la partida está activa y el tiempo inicial era de 45 segundos
  Cuando el tiempo restante desciende a 9 segundos
  Entonces la barra de tiempo debe cambiar su color a coral amable "#D98A82" (cloud.error)
  Y debe activarse una animación CSS de pulso suave en el contador de segundos
```

---

### Escenario 4: Selección directa de juego desde el menú principal
**Trazabilidad:** `[REQ-SHELL-004]`
```gherkin
Escenario: Acceso instantáneo a un minijuego con un toque
  Dado que el usuario está en la pantalla principal
  Cuando toca la tarjeta del minijuego "Conteo Exprés"
  Entonces la pantalla debe transicionar inmediatamente a la vista de partida de "Conteo Exprés"
  Y el temporizador debe comenzar a correr de inmediato
```

---

### Escenario 5: Consistencia visual, contraste y tipografía "Cielo Nublado"
**Trazabilidad:** `[REQ-SHELL-006]`
```gherkin
Escenario: La interfaz renderiza los tokens de Cielo Nublado y tipografía infantil mínima
  Dado que el usuario visualiza cualquier pantalla o minijuego
  Cuando se inspeccionan los estilos computados de fondo, texto y tarjetas
  Entonces el fondo general debe usar "#F0F2F5", las tarjetas "#FFFFFF" y el texto principal "#29323B"
  Y el tamaño tipográfico base de enunciados debe ser de al menos 18px con familia "Quicksand"
  Y los números y títulos deben usar la familia "Fredoka"
```

---

### Escenario 6: Micro-interacción táctil elástica al pulsar
**Trazabilidad:** `[REQ-SHELL-007]`
```gherkin
Escenario: Respuesta elástica inmediata en menos de 50 ms al presionar un botón
  Dado que el usuario está frente a un botón interactivo o tecla numérica
  Cuando ocurre el evento "pointerdown" sobre el botón
  Entonces el botón debe aplicar la transformación "scale(0.94)" con transición de "150ms cubic-bezier(0.34, 1.56, 0.64, 1)"
  Y la respuesta visual debe iniciarse en menos de 50 ms
```

---

### Escenario 7: Consistencia de Botones Puros y Retroceso Transversal por Icono
**Trazabilidad:** `[REQ-SHELL-008]`
```gherkin
Escenario: Consistencia de botones puros y retroceso por icono
  Dado que el usuario navega por la cabecera o barra de acciones de cualquier minijuego
  Cuando se inspeccionan los botones de acción y navegación
  Entonces cada botón debe mostrar únicamente un icono intuitivo (con "aria-label") o únicamente texto claro
  Y el botón de retroceso hacia el menú principal debe ser transversalmente solo un icono sin texto adjunto
```

---

### Escenario 8: Instalación PWA y modo independiente en smartphone
**Trazabilidad:** `[REQ-SHELL-009]`
```gherkin
Escenario: El usuario instala la aplicación en la pantalla de inicio de su smartphone
  Dado que la aplicación se compila para producción con "npm run build"
  Cuando se inspecciona la salida en "dist/"
  Entonces debe existir un archivo "manifest.webmanifest" con display "standalone", orientación "portrait" e iconos 192x192 y 512x512
  Y debe generarse un Service Worker ("sw.js") para habilitar ejecución offline
```
