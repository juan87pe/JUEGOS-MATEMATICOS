# Matriz de Validación BDD: Subitización con Marco de Diez (`MG-TF`)

---

### Escenario 1: Generación Procedural y Estructura en Base 5 Canónica
**Trazabilidad:** `[REQ-TF-001]`, `[REQ-TF-002]`
```gherkin
Escenario: El generador produce patrones matemáticos válidos en base 5
  Dado que se invoca "generateRound" para cualquier nivel del minijuego
  Cuando se analiza la configuración de las grillas resultantes
  Entonces la fila superior de cada marco debe saturarse con 5 fichas antes de poblar la fila inferior
  Y las casillas pobladas deben ubicarse estrictamente de izquierda a derecha
  Y ninguna grilla debe contener más de 10 fichas
```

### Escenario 1B: Geometría Referencial y Proporción del Marco de Diez
**Trazabilidad:** `[REQ-TF-001]`
```gherkin
Escenario: Estructura física, bordes gruesos, vértices rectos y proporción de fichas
  Dado que se renderiza un componente TenFrameGrid en pantalla
  Cuando se inspeccionan el contenedor, sus celdas 1:1 y las fichas activas o fantasma
  Entonces el contenedor y sus celdas deben presentar vértices rectos sin redondeo ("rounded-none")
  Y los bordes exteriores y divisores internos deben ser gruesos, continuos y de alto contraste
  Y cada círculo u objeto dentro de la celda debe ocupar aproximadamente el 78% del espacio de la celda
```

---

### Escenario 2: Control Temporal del Flash y Anclaje Espacial
**Trazabilidad:** `[REQ-TF-003]`, `[REQ-TF-004]`
```gherkin
Escenario: Transición tras la ventana de exposición flash sin perder la grilla
  Dado que un reto de Nivel 1 entra en el estado "FLASH_ACTIVE" en modo por defecto "Tranquilo"
  Cuando transcurren exactamente 3000 ms de exposición
  Entonces el estado del motor debe cambiar a "AWAITING_INPUT"
  Y las fichas activas deben desvanecerse en 100 ms
  Y las 10 casillas vacías de la grilla 2x5 deben permanecer visibles en pantalla
```

---

### Escenario 3: Bloqueo de Entrada Táctil Durante el Estímulo (Input-Lock)
**Trazabilidad:** `[REQ-TF-005]`
```gherkin
Escenario: El teclado ignora pulsaciones mientras la grilla está expuesta
  Dado que el juego se encuentra en estado "FLASH_ACTIVE" o "PEEK_ACTIVE"
  Cuando el usuario presiona cualquier tecla del teclado táctil in-app
  Entonces el sistema debe ignorar la pulsación
  Y el estado del reto no debe registrar ningún cambio
```

---

### Escenario 4: Activación del Rescate "Espiar de Nuevo"
**Trazabilidad:** `[REQ-TF-006]`
```gherkin
Escenario: El niño puede espiar de nuevo una única vez por reto
  Dado que el juego está en "AWAITING_INPUT" y "peekUsedThisRound" es falso
  Cuando el niño pulsa el botón "Espiar de Nuevo"
  Entonces el estado cambia a "PEEK_ACTIVE" por exactamente 600 ms
  Y las fichas vuelven a mostrarse temporalmente
  Y la bandera "peekUsedThisRound" se establece en verdadero
  Y un segundo intento de pulsar el botón no tiene efecto
```

---

### Escenario 5: Interacción con Teclado Isomórfico en Nivel 1
**Trazabilidad:** `[REQ-TF-007]`
```gherkin
Escenario: Envío instantáneo a un solo toque en Nivel 1
  Dado que el usuario juega en Nivel 1 con respuesta esperada 7
  Y el juego está en estado "AWAITING_INPUT"
  Cuando el niño toca el botón "7" en la segunda fila del teclado 2x5
  Entonces el sistema evalúa inmediatamente la respuesta sin requerir botón confirmar
  Y reproduce la tríada sonora ascendente
  Y suma +1 a la racha
```

---

### Escenario 6: Teclado Compacto $3 \times 4$ con Confirmación en Niveles 2 y 3
**Trazabilidad:** `[REQ-TF-008]`
```gherkin
Escenario: Entrada de dos dígitos con visor y botón comprobar
  Dado que el usuario juega en Nivel 2 con respuesta esperada 13
  Cuando el niño pulsa el botón "1"
  Entonces el visor numérico muestra "1" y el estado se mantiene en "AWAITING_INPUT"
  Cuando el niño pulsa el botón "3"
  Entonces el visor numérico muestra "13"
  Cuando el niño pulsa el botón de confirmación "[ ✓ ]"
  Entonces el sistema evalúa la respuesta "13" como correcta
```

---

### Escenario 7: Trasvase Animado Make-10 en Sumas de Nivel 2
**Trazabilidad:** `[REQ-TF-009]`
```gherkin
Escenario: Saturación animada de la decena superior en adición
  Dado un reto de Nivel 2 con sumandos 8 y 5 (suma 13)
  Cuando se introduce la respuesta correcta o se activa "Ver Solución"
  Entonces el sistema calcula que deben trasladarse exactamente 2 fichas desde el marco B al marco A
  Y las fichas viajan animadamente hasta completar las 10 casillas del marco superior
  Y el marco inferior conserva 3 fichas residuales mostrando "10 + 3 = 13"
```

---

### Escenario 8: Sustracción Fantasma con Preservación de la Diferencia
**Trazabilidad:** `[REQ-TF-010]`
```gherkin
Escenario: Resta donde el sustraendo queda en silueta fantasma y la diferencia visible
  Dado un reto de Nivel 3 con minuendo 14 y sustraendo 5
  Cuando expira el flash de 1200 ms
  Entonces exactamente 5 celdas muestran siluetas fantasma con borde discontinuo
  Y exactamente 9 celdas muestran fichas activas correspondientes a la diferencia
  Y el resultado nunca es menor a 1
```

---

### Escenario 9: Secuencia del Modo "Ver Solución"
**Trazabilidad:** `[REQ-TF-011]`
```gherkin
Escenario: Revelación explicativa paso a paso con avance manual
  Dado que el usuario falla sus 2 intentos o pulsa "Ver Solución"
  Cuando se activa el estado "SOLUTION_REVEAL"
  Entonces el marco repuebla las fichas en pantalla
  Y la fila superior de 5 emite un resplandor dorado con etiqueta "+5"
  Y el sistema permanece en este estado hasta que el usuario pulsa "¡Entendido! Siguiente reto"
```

---

### Escenario 10: Cumplimiento de Restricciones Móviles y Cero Teclado del SO
**Trazabilidad:** `[REQ-TF-012]`
```gherkin
Escenario: Ausencia total de campos input y respeto del viewport
  Dado que la vista "TenFrameGameView" se monta en un viewport móvil de 360px x 640px
  Cuando se inspecciona el DOM de la aplicación
  Entonces no debe existir ningún elemento "<input>" editable
  Y ningún botón táctil debe medir menos de 56x56 px
  Y la altura total renderizada no debe exceder 568px, impidiendo cualquier scroll vertical
```

---

### Escenario 11: Menú Desplegable Estilizado, Botones Puros, Explicación y Reinicio
**Trazabilidad:** `[REQ-TF-013]`, `[REQ-TF-014]`, `[REQ-SHELL-008]`
```gherkin
Escenario: Cambio de nivel y velocidad por menú desplegable estilizado, reinicio y botones puros
  Dado que el usuario está jugando en "TenFrameGameView"
  Cuando abre el menú desplegable de niveles y velocidad en la cabecera
  Entonces debe visualizar las tarjetas de nivel con título y descripción y las 4 velocidades ("Sin prisa", "Tranquilo", "Flash", "Turbo")
  Y los botones de rescate deben mostrar únicamente texto ("Espiar", "Solución") sin mezclar icono y texto
  Y la banda de instrucción debe mostrar una explicación resumida de qué trata el nivel activo
  Cuando selecciona el modo "Sin prisa"
  Entonces las fichas permanecen visibles durante "AWAITING_INPUT" sin ocultarse
  Cuando el niño pulsa el botón de reiniciar minijuego
  Entonces la racha vuelve a 0 y se genera un nuevo reto aleatorio en el nivel actual
```
