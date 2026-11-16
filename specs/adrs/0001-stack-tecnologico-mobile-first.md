# ADR-0001: Selección del Stack Tecnológico Web Mobile-First y PWA Ligera

- **Estado:** Aceptado
- **Fecha:** 2026-10-31
- **Decisores:** Equipo de Arquitectura SDD & Experiencia Infantil

---

## 1. Contexto y Planteamiento del Problema

La aplicación está dirigida a niños de 5 a 10 años y debe ejecutarse primordialmente en teléfonos inteligentes con fluidez impecable, baja latencia y alta reactividad visual. Los requisitos imponen minijuegos de baja complejidad, desafíos contra reloj, animaciones festivas y cero configuración previa. 

Se evaluaron tres enfoques arquitectónicos:
1. **App Nativa (Flutter o React Native):** Excelente rendimiento nativo pero requiere compilación de binarios (APK/IPA), tiendas de aplicaciones, fricción de instalación para los padres y mayor costo de mantenimiento.
2. **Web App Tradicional (Multi-Page / SSR con Django/Rails/PHP):** Requiere conexión permanente a internet y genera latencias de recarga de página que destruyen el dinamismo de los juegos contra reloj.
3. **Single Page Application (SPA / PWA) con React + Vite + TypeScript:** Carga en milisegundos mediante cualquier navegador móvil moderno, puede anclarse a la pantalla de inicio del smartphone como una app nativa (PWA), no requiere descargas desde app stores y ofrece renderizado declarativo a 60 FPS.

---

## 2. Decisión

Adoptar una arquitectura **Single Page Application (SPA) Mobile-First desarrollada con React 18/19, TypeScript y Vite**, acompañada de **Tailwind CSS** para un diseño visual atómico y ultra liviano.

### Puntos Clave de la Arquitectura:
- **Build Tool:** Vite garantiza empaquetado optimizado con tamaño de bundle inicial menor a 150 KB gzipped.
- **Enfoque Mobile-First:** El diseño de la interfaz se construye partiendo de un contenedor vertical estricto (`max-w-md mx-auto min-h-screen`) que replica la proporción de pantalla de un smartphone estándar (9:16 / 9:19.5).
- **Entrada Táctil Dedicada:** Se implementa un teclado numérico táctil en pantalla (*Keypad*) dentro de la propia interfaz para evitar que el navegador abra el teclado virtual del sistema operativo, el cual desplazaría la pantalla y provocaría distorsiones visuales.

---

## 3. Consecuencias

### Positivas
- **Cero Fricción:** Los niños o padres solo necesitan abrir un enlace web para empezar a jugar de inmediato.
- **Tipado Estricto con TypeScript:** Previene errores de tipo en tiempo de compilación para la lógica de los minijuegos y los cálculos de tiempo.
- **Rendimiento Excepcional:** Carga instantánea y nulo tiempo de espera entre rondas de preguntas.

### Riesgos y Mitigaciones
- *Riesgo:* Desbordamiento en pantallas móviles muy pequeñas (ej. iPhone SE de 375x667px).
- *Mitigación:* Se implementa un diseño compacto basado en unidades relativas (`vh`, `dvh`, `rem`) y pruebas sistemáticas a partir de 360px de ancho.
