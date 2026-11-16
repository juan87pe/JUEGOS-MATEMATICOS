# Matriz de Validación BDD: Visual Rewards & Streaks (`MOD-REWARD`)

---

### Escenario 1: Disparo de animación festiva en respuesta correcta
**Trazabilidad:** `[REQ-REWARD-001]`
```gherkin
Escenario: El usuario responde bien y recibe felicitación visual inmediata
  Dado que el usuario tiene un reto activo en pantalla
  Cuando pulsa la respuesta correcta
  Entonces debe activarse la clase CSS de animación de éxito en la tarjeta
  Y debe aparecer en pantalla un texto aleatorio de ánimo ("¡Genial!" o "¡Muy bien!")
  Y si el sonido está habilitado, debe ejecutarse la nota sintetizada de acierto
```

---

### Escenario 2: Activación de racha x3 y mini estallido de confeti
**Trazabilidad:** `[REQ-REWARD-002]` y `[REQ-REWARD-003]`
```gherkin
Escenario: El usuario alcanza una racha de 3 aciertos seguidos
  Dado que la racha actual del usuario es 2
  Cuando responde correctamente el siguiente reto
  Entonces la racha debe subir a 3
  Y debe mostrarse la insignia "¡Racha x3! 🔥"
  Y debe activarse el mini estallido central de confeti
  Y debe ejecutarse una animación de pulso brillante
```

---

### Escenario 3: Gran racha de 5 aciertos y explosión de confeti
**Trazabilidad:** `[REQ-REWARD-002]` y `[REQ-REWARD-003]`
```gherkin
Escenario: El usuario alcanza una racha de 5 aciertos seguidos
  Dado que la racha actual del usuario es 4
  Cuando responde correctamente el siguiente reto
  Entonces la racha debe subir a 5
  Y debe dispararse el cañón doble de confeti en pantalla
  Y debe emitirse el acorde triunfal de super racha
```

---

### Escenario 4: Modo silencioso respeta preferencia
**Trazabilidad:** `[REQ-REWARD-005]`
```gherkin
Escenario: Animaciones visuales funcionan aún con sonido apagado
  Dado que el usuario desactivó el sonido mediante el botón de la barra superior
  Cuando el usuario responde correctamente un reto o alcanza una racha
  Entonces las animaciones de confeti y estrellas deben mostrarse con normalidad
  Y la Web Audio API no debe emitir ninguna oscilación sonora
```

---

### Escenario 5: Feedback compasivo sin castigo en respuesta incorrecta
**Trazabilidad:** `[REQ-REWARD-006]`
```gherkin
Escenario: El usuario ingresa una respuesta incorrecta y recibe orientación amable
  Dado que el usuario tiene un reto activo en pantalla y el sonido está habilitado
  Cuando pulsa una respuesta incorrecta
  Entonces el botón debe teñirse en coral amable "#D98A82" sobre fondo "#FDF1F0"
  Y no deben mostrarse cruces rojas punitivas ni sonar zumbadores estridentes
  Y debe reproducirse el gong cálido triangular (261 Hz -> 196 Hz) con ganancia máxima de -12 dBFS
  Y debe mostrarse un mensaje constructivo de aliento
```
