import React, { useEffect, useRef, useState } from 'react';
import {
  TenFrameLevel,
  TenFrameSpeedMode,
} from '../../../../../specs/contracts/ten-frame.types';
import { TEN_FRAME_SPEEDS } from '../useTenFrameEngine';

interface LevelOption {
  level: TenFrameLevel;
  title: string;
  subtitle: string;
}

const LEVEL_OPTIONS: LevelOption[] = [
  {
    level: 1,
    title: 'Nivel 1 · Subitización Base 5',
    subtitle: '1 marco · Cantidades del 1 al 10',
  },
  {
    level: 2,
    title: 'Nivel 2 · Adición Make-10',
    subtitle: '2 marcos · Sumas completando 10',
  },
  {
    level: 3,
    title: 'Nivel 3 · Resta Fantasma',
    subtitle: 'Restas quitando fichas marcadas',
  },
];

const SPEED_ORDER: TenFrameSpeedMode[] = ['steady', 'calm', 'flash', 'turbo'];

interface LevelSpeedDropdownProps {
  level: TenFrameLevel;
  speed: TenFrameSpeedMode;
  onChangeLevel: (level: TenFrameLevel) => void;
  onChangeSpeed: (speed: TenFrameSpeedMode) => void;
}

/**
 * Menú desplegable personalizado con estética "Cielo Nublado" para elegir
 * el nivel matemático y la velocidad de exposición del Marco de Diez.
 */
export const LevelSpeedDropdown: React.FC<LevelSpeedDropdownProps> = ({
  level,
  speed,
  onChangeLevel,
  onChangeSpeed,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const activeSpeed = TEN_FRAME_SPEEDS[speed];

  return (
    <div ref={containerRef} className="flex-1 min-w-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Menú de nivel y velocidad"
        className={`w-full min-h-[56px] px-3 rounded-btn border text-cloud-text font-heading font-semibold text-xs flex items-center justify-between gap-1 shadow-cloud-sm active:scale-95 transition-all ${
          isOpen
            ? 'bg-cloud-sageLight border-cloud-sage'
            : 'bg-cloud-surface border-cloud-border hover:border-cloud-sage/60'
        }`}
      >
        <span className="truncate">
          Nivel {level} · {activeSpeed.label}
        </span>
        <span className="text-[10px] text-cloud-muted shrink-0" aria-hidden="true">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div
          data-testid="level-speed-menu"
          className="absolute left-0 right-0 top-full mt-2 z-30 rounded-card bg-cloud-surface border-2 border-cloud-border shadow-cloud-lg p-3"
        >
          <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-cloud-muted mb-1.5 px-1">
            Elige el nivel
          </p>
          <div className="flex flex-col gap-1.5">
            {LEVEL_OPTIONS.map((opt) => {
              const isSelected = opt.level === level;
              return (
                <button
                  key={opt.level}
                  type="button"
                  onClick={() => {
                    onChangeLevel(opt.level);
                    setIsOpen(false);
                  }}
                  className={`w-full min-h-[56px] px-3 py-2 rounded-btn text-left transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-cloud-sageLight border-2 border-cloud-sage text-cloud-text shadow-cloud-sm'
                      : 'bg-cloud-bg/70 border border-cloud-border text-cloud-text hover:border-cloud-sage/50'
                  }`}
                >
                  <div className="font-heading font-bold text-xs leading-tight">
                    {opt.title}
                  </div>
                  <div className="text-[11px] text-cloud-muted mt-0.5 leading-tight">
                    {opt.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t border-cloud-border my-2.5" />

          <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-cloud-muted mb-1.5 px-1">
            Velocidad del marco
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {SPEED_ORDER.map((spdKey) => {
              const cfg = TEN_FRAME_SPEEDS[spdKey];
              const isSelected = spdKey === speed;
              return (
                <button
                  key={spdKey}
                  type="button"
                  onClick={() => {
                    onChangeSpeed(spdKey);
                    setIsOpen(false);
                  }}
                  className={`min-h-[56px] px-2.5 py-1.5 rounded-btn text-center flex flex-col items-center justify-center transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-cloud-sunLight border-2 border-cloud-sun text-cloud-sunDark shadow-cloud-sm'
                      : 'bg-cloud-bg/70 border border-cloud-border text-cloud-text hover:border-cloud-sun/60'
                  }`}
                >
                  <span className="font-heading font-bold text-xs leading-tight">
                    {cfg.label}
                  </span>
                  <span className="text-[11px] opacity-80 leading-tight mt-0.5">
                    {cfg.timeHint}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
