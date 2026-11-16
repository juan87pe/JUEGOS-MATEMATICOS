# Matriz de Validación BDD: Multiplicación Mágica (`MG-MUL`)

---

### Escenario 1: Tablas autorizadas en todas las generaciones
**Trazabilidad:** `[REQ-MG-MUL-001]`
```gherkin
Escenario: Solo se generan tablas de multiplicar básicas
  Dado que se generan 50 retos de "Multiplicación Mágica"
  Cuando se inspecciona el factor A de cada reto
  Entonces el factor A siempre debe ser 1, 2, 3, 4, 5 o 10
  Y nunca debe generarse una tabla compleja como 7 u 8
```

---

### Escenario 2: Cuatro opciones de respuesta sin duplicados
**Trazabilidad:** `[REQ-MG-MUL-003]`
```gherkin
Escenario: Comprobación de integridad de las opciones múltiples
  Dado que se genera un reto con la operación "5 × 4 = ?"
  Cuando se evalúan las opciones devueltas
  Entonces deben existir exactamente 4 opciones
  Y el número 20 debe estar incluido dentro de las opciones
  Y ninguna opción debe estar repetida
```
