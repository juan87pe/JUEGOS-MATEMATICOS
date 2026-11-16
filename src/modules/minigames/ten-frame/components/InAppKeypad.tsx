import React from 'react';
import { KeypadMode } from '../../../../../specs/contracts/ten-frame.types';

interface InAppKeypadProps {
  mode: KeypadMode;
  disabled: boolean;
  inputBuffer: string;
  onDigit: (digit: number) => void;
  onDelete: () => void;
  onSubmit: () => void;
}

const ISOMORPHIC_KEYS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

/**
 * Teclados táctiles In-App (MG-TF).
 * - IsomorphicKeypad (2x5, <= 328px) para Nivel 1 con envío al toque único.
 * - CompactNumericKeypad (3x4, <= 260px) para Niveles 2 y 3 con visor numérico y botón [✓].
 * Cumple hit targets >= 56x56 px y ausencia total de <input>.
 */
export const InAppKeypad: React.FC<InAppKeypadProps> = ({
  mode,
  disabled,
  inputBuffer,
  onDigit,
  onDelete,
  onSubmit,
}) => {
  const baseButtonClass =
    'min-w-[56px] min-h-[56px] rounded-btn font-heading text-2xl font-bold flex items-center justify-center transition-transform duration-150 select-none touch-manipulation active:scale-95 shadow-cloud-sm';

  if (mode === 'isomorphic-2x5') {
    return (
      <div
        data-testid="inapp-keypad-isomorphic"
        className="w-full max-w-[328px] mx-auto grid grid-cols-5 grid-rows-2 gap-2"
      >
        {ISOMORPHIC_KEYS.map((num) => (
          <button
            key={num}
            type="button"
            disabled={disabled}
            onClick={() => onDigit(num)}
            className={`${baseButtonClass} ${
              disabled
                ? 'bg-cloud-primaryLight text-cloud-muted opacity-50 cursor-not-allowed'
                : 'bg-cloud-surface text-cloud-text border-2 border-cloud-border hover:border-cloud-sage'
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    );
  }

  // Modo compact-3x4: [1-3, ⌫], [4-6, 0], [7-9, ✓]
  return (
    <div
      data-testid="inapp-keypad-compact"
      className="w-full max-w-[260px] mx-auto flex flex-col gap-1.5"
    >
      {/* Visor numérico de 2 dígitos sin <input> */}
      <div
        data-testid="keypad-buffer-display"
        aria-live="polite"
        className="h-10 rounded-btn bg-cloud-surface border-2 border-cloud-border flex items-center justify-center font-heading text-2xl font-bold text-cloud-text tracking-wider"
      >
        {inputBuffer || '—'}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3].map((d) => (
          <button
            key={d}
            type="button"
            disabled={disabled}
            onClick={() => onDigit(d)}
            className={`${baseButtonClass} ${
              disabled
                ? 'bg-cloud-primaryLight text-cloud-muted opacity-50 cursor-not-allowed'
                : 'bg-cloud-surface text-cloud-text border-2 border-cloud-border'
            }`}
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          aria-label="Borrar"
          disabled={disabled || inputBuffer.length === 0}
          onClick={onDelete}
          className={`${baseButtonClass} ${
            disabled || inputBuffer.length === 0
              ? 'bg-cloud-primaryLight text-cloud-muted opacity-50 cursor-not-allowed'
              : 'bg-cloud-errorLight text-cloud-error border-2 border-cloud-error/40'
          }`}
        >
          ⌫
        </button>

        {[4, 5, 6, 0].map((d) => (
          <button
            key={d}
            type="button"
            disabled={disabled}
            onClick={() => onDigit(d)}
            className={`${baseButtonClass} ${
              disabled
                ? 'bg-cloud-primaryLight text-cloud-muted opacity-50 cursor-not-allowed'
                : 'bg-cloud-surface text-cloud-text border-2 border-cloud-border'
            }`}
          >
            {d}
          </button>
        ))}

        {[7, 8, 9].map((d) => (
          <button
            key={d}
            type="button"
            disabled={disabled}
            onClick={() => onDigit(d)}
            className={`${baseButtonClass} ${
              disabled
                ? 'bg-cloud-primaryLight text-cloud-muted opacity-50 cursor-not-allowed'
                : 'bg-cloud-surface text-cloud-text border-2 border-cloud-border'
            }`}
          >
            {d}
          </button>
        ))}
        <button
          type="button"
          aria-label="Confirmar"
          disabled={disabled || inputBuffer.length === 0}
          onClick={onSubmit}
          className={`${baseButtonClass} ${
            disabled || inputBuffer.length === 0
              ? 'bg-cloud-primaryLight text-cloud-muted opacity-50 cursor-not-allowed'
              : 'bg-cloud-sage text-white border-2 border-cloud-sage'
          }`}
        >
          ✓
        </button>
      </div>
    </div>
  );
};
