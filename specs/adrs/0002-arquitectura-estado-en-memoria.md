# ADR-0002: Gestión de Estado Efímero en Memoria sin Persistencia

- **Estado:** Aceptado
- **Fecha:** 2026-10-31
- **Decisores:** Equipo de Arquitectura SDD & Experiencia Infantil

---

## 1. Contexto y Planteamiento del Problema

El requerimiento del usuario establece explícitamente:
> *"no es necesario que se almacenen puntajes entre sesiones"*

Muchos juegos educativos incurren en sobreingeniería al implementar bases de datos remotas (Firebase, Supabase), autenticación obligatoria o almacenamiento local persistente (`localStorage`, `IndexedDB`), lo que genera:
- Problemas de privacidad y cumplimiento con normativas de protección de datos infantiles (COPPA / GDPR-K).
- Fricción de inicio de sesión o perfiles que cansan a niños pequeños.
- Corrupción de datos por sincronizaciones fallidas en conexiones inestables.

---

## 2. Decisión

Implementar una **arquitectura de estado estrictamente efímero en memoria (In-Memory Ephemeral State)** utilizando React Context y Custom Hooks (`useGameEngine`, `useStreakTracker`).

### Reglas de la Arquitectura de Estado:
1. **Volatilidad Absoluta:** Todas las variables de partida (puntaje actual, racha de aciertos, tiempo restante, preguntas contestadas) residen únicamente en la memoria RAM del navegador mientras la pestaña esté abierta.
2. **Ciclo de Vida de Partida:**
   - Al seleccionar un minijuego, se inicializa el estado limpio (`score = 0`, `streak = 0`, `timeLeft = roundDuration`).
   - Al finalizar el tiempo, se muestra un modal o vista de balance de la partida actual.
   - Al pulsar "Jugar de nuevo" o volver al menú principal, el estado se resetea a sus valores por defecto.
   - Si el usuario recarga la página o cierra la pestaña, no queda ningún rastro ni historial residual.
3. **Cero Dependencia de Base de Datos:** No se realizan peticiones HTTP para guardar estados ni se utiliza `localStorage` para registros de ranking.

---

## 3. Consecuencias

### Positivas
- **Máxima Privacidad para Niños:** Cero recolección de telemetría personal o datos de identificación.
- **Simplicidad Arquitectural:** Cero servidores backend, cero APIs de base de datos, cero costos de hosting de base de datos.
- **Rendimiento Instantáneo:** Lectura y mutación de estado síncrona en memoria a velocidad de microsegundos.

### Riesgos y Mitigaciones
- *Riesgo:* Un usuario que cierre accidentalmente el navegador perderá el puntaje de la ronda en curso.
- *Mitigación:* Dado que las partidas son rondas rápidas de 30 a 60 segundos, el costo de perder una sesión es insignificante y no genera frustración.
