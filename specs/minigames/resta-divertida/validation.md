# Matriz de Validación BDD: Resta Divertida (`MG-SUB`)

---

### Escenario 1: Cero resultados negativos en 100 pruebas
**Trazabilidad:** `[REQ-MG-SUB-001]`
```gherkin
Escenario: Comprobación estricta de no negatividad
  Dado que se solicita la generación de 100 retos consecutivos de "Resta Divertida"
  Cuando se analiza cada reto devuelto
  Entonces en el 100% de los casos el operando A debe ser mayor o igual al operando B
  Y en ningún caso el valor esperado debe ser menor a 0
```

---

### Escenario 2: Soporte para respuesta igual a cero
**Trazabilidad:** `[REQ-MG-SUB-001]` y `[REQ-MG-SUB-004]`
```gherkin
Escenario: Resta de dos números iguales produce cero
  Dado que el reto actual es "9 - 9 = ?"
  Cuando el usuario presiona la tecla "0"
  Entonces la respuesta debe evaluarse como correcta
```
