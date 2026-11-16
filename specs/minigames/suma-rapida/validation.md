# Matriz de Validación BDD: Suma Rápida (`MG-ADD`)

---

### Escenario 1: Generación dentro de límites infantiles
**Trazabilidad:** `[REQ-MG-ADD-001]` y `[REQ-MG-ADD-002]`
```gherkin
Escenario: Comprobación de límites en retos de suma
  Dado que se solicita un reto para el minijuego "Suma Rápida"
  Cuando se genera el reto matemático
  Entonces el operando A debe ser mayor o igual a 1 y menor o igual a 12
  Y el operando B debe ser mayor o igual a 1 y menor o igual a 12
  Y el resultado esperado debe ser estrictamente A + B
  Y el resultado esperado no debe superar 24
```

---

### Escenario 2: Evaluación precisa con entrada por teclado virtual
**Trazabilidad:** `[REQ-MG-ADD-004]`
```gherkin
Escenario: Acierto al ingresar la suma exacta
  Dado que el reto actual es "7 + 5 = ?"
  Cuando el usuario presiona "1" seguido de "2"
  Entonces la respuesta debe evaluarse como correcta
  Y se debe incrementar el puntaje y la racha de aciertos
```
