/**
 * soundEffects.ts
 * Sintetizador de audio nativo mediante Web Audio API para MathKids Mobile.
 * Cumple con el plan MOD-REWARD (Tarea 1):
 * - Ganancia maestra limitada a -12 dBFS (gain.value = 0.251)
 * - 0 KB en assets de audio externos
 * - Arpegio pentatónico para aciertos (Do5, Mi5, Sol5)
 * - Acorde multi-oscilador triunfal para hitos de racha (Do5, Mi5, Sol5, Do6)
 * - Gong cálido compasivo para errores (Do4 -> Sol3)
 * - Campana de cierre (Sol4 -> Do5)
 * - Bandera reactiva isMuted
 */

class SoundEffectsService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private muted: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        // Límite maestro de -12 dBFS (0.251) para cuidar los oídos de los niños
        this.masterGain.gain.value = this.muted ? 0 : 0.251;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.251, this.ctx.currentTime);
    }
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /**
   * Acierto simple: arpegio pentatónico Do5 (523 Hz), Mi5 (659 Hz), Sol5 (784 Hz).
   * Cada nota dura 90 ms con desfase de 70 ms y decaimiento exponencial.
   */
  public playSuccessSound() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99]; // Do5, Mi5, Sol5
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, index) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + index * 0.07);

      const noteStart = startTime + index * 0.07;
      noteGain.gain.setValueAtTime(0.7, noteStart);
      noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.09);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(noteStart);
      osc.stop(noteStart + 0.09);
    });
  }

  /**
   * Hito de racha: acorde triunfal multi-oscilador (Do5, Mi5, Sol5, Do6)
   * Ataque de 20 ms y decaimiento de 400 ms.
   */
  public playStreakSound(_streakLevel: number = 3) {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // Do5, Mi5, Sol5, Do6
    const startTime = this.ctx.currentTime;

    notes.forEach((freq) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const chordGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Ataque de 20 ms
      chordGain.gain.setValueAtTime(0.001, startTime);
      chordGain.gain.linearRampToValueAtTime(0.5, startTime + 0.02);
      // Decaimiento de 400 ms
      chordGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

      osc.connect(chordGain);
      chordGain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  /**
   * Error compasivo: gong cálido con onda triangular en glide continuo de Do4 (261 Hz) a Sol3 (196 Hz)
   * Caída suave durante 350 ms.
   */
  public playSoftGongSound() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const startTime = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gongGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(261.63, startTime); // Do4
    osc.frequency.exponentialRampToValueAtTime(196.0, startTime + 0.35); // Glide hacia Sol3

    gongGain.gain.setValueAtTime(0.6, startTime);
    gongGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    osc.connect(gongGain);
    gongGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.35);
  }

  /**
   * Fin de tiempo / cierre de ronda: campana suave (Sol4: 392 Hz -> Do5: 523 Hz)
   */
  public playGameOverSound() {
    if (this.muted) return;
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const startTime = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(392.0, startTime);
    osc.frequency.linearRampToValueAtTime(523.25, startTime + 0.15);

    bellGain.gain.setValueAtTime(0.6, startTime);
    bellGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

    osc.connect(bellGain);
    bellGain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.5);
  }
}

export const soundService = new SoundEffectsService();
