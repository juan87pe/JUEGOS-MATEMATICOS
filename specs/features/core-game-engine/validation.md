# Matriz de Validación BDD: Core Game Engine (`MOD-CORE`)

Este archivo define los escenarios de prueba en formato Gherkin para la verificación automatizada y manual del motor del juego.

---

### Escenario 1: Inicio de partida y activación del temporizador
**Trazabilidad:** `[REQ-CORE-001]`
```gherkin
Escenario: Inicialización limpia al comenzar un minijuego
  Dado que el usuario se encuentra en el menú principal
  Cuando pulsa sobre el minijuego "Suma Rápida" y presiona "Comenzar"
  Entonces el estado del juego debe ser "playing"
  Y el contador de aciertos debe iniciar en 0
  Y la racha actual debe iniciar en 0
  Y el temporizador debe mostrar 45 segundos e iniciar la cuenta regresiva
```

---

### Escenario 2: Tiempo agotado bloquea entrada y muestra balance
**Trazabilidad:** `[REQ-CORE-002]`
```gherkin
Escenario: Fin de la partida al llegar el temporizador a cero
  Dado que una partida está en curso y el tiempo restante es de 1 segundo
  Cuando transcurre 1 segundo adicional
  Entonces el temporizador debe marcar 0 segundos
  Y el estado del juego debe cambiar a "time_up"
  Y los controles de entrada deben quedar deshabilitados
  Y debe mostrarse la pantalla de balance con el total de aciertos obtenidos
```

---

### Escenario 3: Evaluación de respuesta correcta e incremento de racha
**Trazabilidad:** `[REQ-CORE-003]`
```gherkin
Escenario: Usuario responde correctamente a un reto matemático
  Dado que el reto actual es "4 + 5" cuya respuesta esperada es 9
  Y la racha actual es 2
  Y el contador de aciertos es 5
  Cuando el usuario introduce y envía la respuesta 9
  Entonces el contador de aciertos debe actualizarse a 6
  Y la racha actual debe incrementarse a 3
  Y el sistema debe despachar de inmediato un nuevo reto matemático
```

---

### Escenario 4: Evaluación de respuesta errónea y reseteo de racha
**Trazabilidad:** `[REQ-CORE-004]`
```gherkin
Escenario: Usuario responde incorrectamente a un reto matemático
  Dado que el reto actual es "8 - 3" cuya respuesta esperada es 5
  Y la racha actual es 4
  Cuando el usuario introduce y envía la respuesta 2
  Entonces la racha actual debe reiniciarse a 0
  Y el contador de aciertos debe mantenerse sin cambios
  Y el contador de errores debe incrementarse en 1
```

---

### Escenario 5: Volatilidad de sesión al recargar la página
**Trazabilidad:** `[REQ-CORE-005]`
```gherkin
Escenario: Reinicio absoluto sin persistencia al recargar
  Dado que el usuario completó una partida con 15 aciertos y una racha de 8
  Cuando el usuario recarga la pestaña del navegador o vuelve al menú
  Entonces no debe existir ningún registro persistente de la partida anterior
  Y al iniciar una nueva partida el marcador debe comenzar estrictamente en 0
```
