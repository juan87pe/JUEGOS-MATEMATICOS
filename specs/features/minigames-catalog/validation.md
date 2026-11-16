# Matriz de Validación BDD: Catálogo de Minijuegos (`MOD-GAMES`)

---

### Escenario 1: Generación de sumas dentro del rango infantil
**Trazabilidad:** `[REQ-GAMES-001]`
```gherkin
Escenario: El reto de suma contiene números fáciles para niños
  Dado que el minijuego seleccionado es "Suma Rápida"
  Cuando el sistema genera un nuevo reto matemático
  Entonces el operando A debe ser un número entero entre 1 y 12
  Y el operando B debe ser un número entero entre 1 y 12
  Y la respuesta correcta debe ser igual a (A + B) y no superar 24
```

---

### Escenario 2: Restas siempre positivas
**Trazabilidad:** `[REQ-GAMES-002]`
```gherkin
Escenario: Las restas nunca arrojan resultados negativos
  Dado que el minijuego seleccionado es "Resta Divertida"
  Cuando el sistema genera 50 retos de resta consecutivos
  Entonces en todos los casos el minuendo debe ser mayor o igual al sustraendo
  Y la respuesta correcta debe ser siempre un entero mayor o igual a 0
```

---

### Escenario 3: Comparación de magnitudes
**Trazabilidad:** `[REQ-GAMES-003]`
```gherkin
Escenario: Comparación de números con símbolos >, <, =
  Dado que el minijuego seleccionado es "Mayor o Menor"
  Cuando el sistema presenta los números 15 y 22
  Entonces la opción correcta debe ser "<"
  Y las opciones disponibles para el usuario deben ser exactamente "<", "=" y ">"
```

---

### Escenario 4: Multiplicación de tablas elementales
**Trazabilidad:** `[REQ-GAMES-004]`
```gherkin
Escenario: Las multiplicaciones pertenecen solo a tablas básicas
  Dado que el minijuego seleccionado es "Multiplicación Mágica"
  Cuando el sistema genera un nuevo reto
  Entonces al menos uno de los factores debe pertenecer al conjunto [1, 2, 3, 4, 5, 10]
  Y la respuesta correcta debe coincidir con el producto exacto de ambos factores
```

---

### Escenario 5: Conteo de figuras visuales
**Trazabilidad:** `[REQ-GAMES-005]`
```gherkin
Escenario: Cantidad de iconos coincide con la respuesta correcta
  Dado que el minijuego seleccionado es "Conteo Exprés"
  Cuando el sistema renderiza el reto en pantalla
  Entonces el número de iconos visibles debe estar entre 1 y 12
  Y la respuesta correcta requerida debe coincidir exactamente con el conteo de iconos
```
