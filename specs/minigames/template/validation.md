# Matriz de Validación BDD: [NOMBRE_DEL_JUEGO] (`MG-[ID]`)

---

### Escenario 1: Generación dentro de límites válidos
**Trazabilidad:** `[REQ-MG-[ID]-001]`
```gherkin
Escenario: Parámetros dentro del rango infantil definido
  Dado que se invoca la función generadora del minijuego
  Cuando se evalúa el reto retornado
  Entonces los operandos deben estar dentro del rango permitido
  Y la respuesta correcta debe ser matemáticamente exacta
```

---

### Escenario 2: Prevención de condiciones no deseadas
**Trazabilidad:** `[REQ-MG-[ID]-002]`
```gherkin
Escenario: Ejecución de 100 rondas sin infracciones de dominio
  Dado que se ejecutan 100 llamadas consecutivas al generador
  Cuando se analiza cada reto resultante
  Entonces ninguno debe incumplir las restricciones de seguridad pedagógica
```
