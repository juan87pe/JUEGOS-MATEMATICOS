import { describe, it, expect } from 'vitest';
import tokens from '../../../src/styles/tokens.json';

describe('Design Tokens - Cielo Nublado', () => {
  it('contiene la paleta de colores base requerida', () => {
    expect(tokens.colors.cloud.bg).toBe('#F0F2F5');
    expect(tokens.colors.cloud.surface).toBe('#FFFFFF');
    expect(tokens.colors.cloud.sage).toBe('#71B1A1');
    expect(tokens.colors.cloud.sun).toBe('#E0B342');
    expect(tokens.colors.cloud.error).toBe('#D98A82');
  });

  it('define los radios de borde mínimos para ergonomía táctil infantil', () => {
    expect(tokens.borderRadius.btn).toBe('18px');
    expect(tokens.borderRadius.card).toBe('24px');
  });
});
