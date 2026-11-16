# Constitución del Sistema — MathKids Mobile

## 1. Visión y Propósito del Sistema

**MathKids Mobile** es una aplicación web interactiva orientada a dispositivos móviles (smartphones) que busca transformar el aprendizaje y la agilidad del cálculo mental infantil en una experiencia divertida, dinámica y gratificante mediante minijuegos matemáticos de baja complejidad, desafíos contra el reloj, retroalimentación festiva inmediata y mecánicas de rachas de aciertos.

---

## 2. Audiencia Objetivo

- **Usuario Principal:** Niños en edades de 5 a 10 años (niveles de educación inicial y primaria temprana).
- **Entorno de Uso:** Teléfonos inteligentes en orientación vertical (*portrait*), sostenidos con una o dos manos, en trayectos cortos, tiempo libre o apoyo escolar rápido.

---

## 3. Principios Inviolables de Diseño (Core Tenets)

### T1. Simplicidad Cognitiva Extrema
Las reglas de cada minijuego deben entenderse en menos de 3 segundos sin necesidad de leer manuales o instrucciones extensas. Iconos grandes, números gigantes e interfaces autoexplicativas.

### T2. Experiencia Móvil de Primera Clase (Mobile-First)
La app se diseña primordialmente para pantallas móviles compactas (360px a 430px de ancho). Toda la navegación y entrada de respuestas se realiza con botones táctiles generosos accesibles mediante el pulgar (*thumb-zone friendly*), evitando el despliegue del teclado virtual del sistema operativo para evitar saltos o pérdida de área visible.

### T3. Refuerzo Positivo y Gamificación Saludable
El error no penaliza con castigos visuales negativos ni humillaciones. Los aciertos activan animaciones de felicitación inmediatas (confeti, estrellas, rebotes alegres) y las rachas consecutivas potencian el entusiasmo con efectos progresivos de combo.

### T4. Cero Fricción y Estado Efímero (Zero Setup / In-Memory Session)
No existen pantallas de inicio de sesión, registros, contraseñas ni almacenamiento de datos en servidores o bases de datos locales entre sesiones. El usuario entra, juega, se divierte y sale con total privacidad y carga instantánea.

### T5. Rendimiento Fluido y Cero Dependencias Pesadas
La aplicación debe mantener 60 FPS estables incluso en teléfonos inteligentes de gama baja o de entrada. Cero descargas pesadas de audio o texturas 3D.

---

## 4. Alcance y Límites del Sistema (In-Scope vs Out-of-Scope)

### ✅ Dentro del Alcance (In-Scope)
- Catálogo de minijuegos matemáticos de baja complejidad (Sumas rápidas, Restas lúdicas, Mayor/Menor, Multiplicación básica por tablas 1-5 y 10, Conteo visual).
- Modalidad contra el reloj configurable o por rondas rápidas (ej. 30 a 60 segundos por partida).
- Motor de validación de respuestas instantáneo con entrada numérica táctil en pantalla.
- Sistema de animaciones de felicitación por acierto (estrellas, medallas, confeti en pantalla).
- Sistema de rachas de aciertos (*streak tracker*) con multiplicadores de ánimo (x3, x5, x10).
- Contador de aciertos, fallos y tiempo restante exclusivo de la sesión activa en memoria.
- Sonidos sintetizados mediante Web Audio API (activables / silenciables por el usuario).

### ❌ Fuera del Alcance (Out-of-Scope)
- Cuentas de usuario, perfiles, login social o persistencia en bases de datos externas.
- Almacenamiento histórico de mejores puntuaciones (*high scores*) que sobrevivan al cierre o recarga de la pestaña del navegador.
- Compras dentro de la app (*in-app purchases*), monedas de pago o publicidad de terceros.
- Modo multijugador en tiempo real o chat.
- Contenidos matemáticos de alta complejidad (fracciones avanzadas, álgebra, geometría formal o cálculo).
