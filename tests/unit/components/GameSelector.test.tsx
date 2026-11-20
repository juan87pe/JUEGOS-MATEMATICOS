import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../../src/App';

describe('App & GameSelector Integration', () => {
  it('renderiza el catálogo de minijuegos con Marco de Diez disponible', () => {
    render(<App />);
    expect(screen.getByText('MathKids')).toBeInTheDocument();
    expect(screen.getByText('Marco de Diez')).toBeInTheDocument();
    expect(screen.getByText('¡Disponible!')).toBeInTheDocument();
  });

  it('permite seleccionar Marco de Diez y navegar a la pantalla del juego con opción de retorno al menú', () => {
    render(<App />);
    const marcoDiezCard = screen.getByText('Marco de Diez').closest('button');
    expect(marcoDiezCard).toBeInTheDocument();
    
    // Navegar al juego real de Marco de Diez
    fireEvent.click(marcoDiezCard!);
    const backBtn = screen.getByRole('button', { name: 'Volver al menú' });
    expect(backBtn).toBeInTheDocument();
    expect(screen.getByTestId('ten-frame-game-view')).toBeInTheDocument();

    // Regresar al menú
    fireEvent.click(backBtn);
    expect(screen.getByText('MathKids')).toBeInTheDocument();
  });

  it('mantiene deshabilitados los minijuegos en desarrollo', () => {
    render(<App />);
    const sumaCard = screen.getByText('Suma Rápida').closest('button');
    expect(sumaCard).toBeDisabled();
  });
});
