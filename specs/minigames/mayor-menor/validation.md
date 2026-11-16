# Matriz de Validación BDD: Mayor o Menor (`MG-CMP`)

---

### Escenario 1: Comparación exacta cuando A es mayor que B
**Trazabilidad:** `[REQ-MG-CMP-001]` y `[REQ-MG-CMP-004]`
```gherkin
Escenario: Operando A es mayor que B
  Dado que el sistema genera un reto con los números 28 y 14
  Cuando se evalúa el reto
  Entonces el prompt debe mostrar "28 [ ? ] 14"
  Y la respuesta correcta esperada debe ser ">"
```

---

### Escenario 2: Comparación cuando los números son iguales
**Trazabilidad:** `[REQ-MG-CMP-002]`
```gherkin
Escenario: Ambos operandos son idénticos
  Dado que el sistema genera un reto con los números 19 y 19
  Cuando se evalúa el reto
  Entonces la respuesta correcta esperada debe ser "="
```

---

### Escenario 3: Selección táctil correcta del símbolo menor
**Trazabilidad:** `[REQ-MG-CMP-004]`
```gherkin
Escenario: El niño pulsa el símbolo menor que
  Dado que el reto actual es "8 [ ? ] 15"
  Cuando el usuario pulsa sobre el botón del símbolo "<"
  Entonces la respuesta debe evaluarse como correcta
```
