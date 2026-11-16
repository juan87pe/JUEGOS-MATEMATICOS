import confetti from 'canvas-confetti';

/**
 * confettiHelper.ts
 * Controlador de partículas no invasivo para recompensas visuales en MathKids Mobile.
 * Cumple con el plan MOD-REWARD (Tarea 2):
 * - Paleta oficial coordinada: ['#E0B342', '#71B1A1', '#FFFFFF']
 * - triggerMiniConfetti: ráfaga central compacta de 25 partículas para aciertos simples y racha x3
 * - triggerStreakConfetti: cañones laterales dobles (60 partículas por lado) para hitos x5 y x10
 */

const PALETTE = ['#E0B342', '#71B1A1', '#FFFFFF', '#FAF4E5'];

export function triggerMiniConfetti() {
  confetti({
    particleCount: 25,
    spread: 45,
    origin: { y: 0.7 },
    colors: PALETTE,
    ticks: 150,
    gravity: 1.1,
    scalar: 0.85,
    disableForReducedMotion: true
  });
}

export function triggerStreakConfetti() {
  // Cañón lateral izquierdo (ángulo 60°)
  confetti({
    particleCount: 60,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.75 },
    colors: PALETTE,
    ticks: 200,
    gravity: 0.95,
    scalar: 1,
    disableForReducedMotion: true
  });

  // Cañón lateral derecho (ángulo 120°)
  confetti({
    particleCount: 60,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.75 },
    colors: PALETTE,
    ticks: 200,
    gravity: 0.95,
    scalar: 1,
    disableForReducedMotion: true
  });
}
