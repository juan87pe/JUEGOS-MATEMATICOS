# Matriz de Validación BDD: Conteo Exprés (`MG-CNT`)

---

### Escenario 1: Cantidad de objetos coincide con la respuesta correcta
**Trazabilidad:** `[REQ-MG-CNT-001]` y `[REQ-MG-CNT-004]`
```gherkin
Escenario: Comprobación de conteo exacto
  Dado que se genera un reto para "Conteo Exprés"
  Cuando se analiza la propiedad visuals del reto
  Entonces visuals.count debe estar entre 1 y 12
  Y correctAnswer debe ser exactamente igual a visuals.count
  Y visuals.icon debe ser un emoji reconocido
```

---

### Escenario 2: Opciones numéricas válidas para pulsar
**Trazabilidad:** `[REQ-MG-CNT-004]`
```gherkin
Escenario: El niño pulsa el número que cuenta con sus dedos
  Dado que en pantalla se muestran 7 manzanas (🍎)
  Y las opciones visibles son [5, 6, 7, 8]
  Cuando el niño toca el botón con el número 7
  Entonces el sistema califica el intento como acierto
```
