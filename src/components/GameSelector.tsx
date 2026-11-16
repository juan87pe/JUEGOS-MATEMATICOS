import React from 'react';
import { MINIGAMES_REGISTRY, MinigameCatalogItem } from '../modules/minigames/registry';

interface GameSelectorProps {
  onSelectGame: (gameId: string) => void;
}

/**
 * GameSelector
 * Menú principal de selección de minijuegos con cards táctiles ergonómicas para niños.
 * Cumple con tamaño visual mínimo de 56px, bordes redondeados y feedback táctil inmediato.
 */
export const GameSelector: React.FC<GameSelectorProps> = ({ onSelectGame }) => {
  const gamesList: MinigameCatalogItem[] = Object.values(MINIGAMES_REGISTRY);

  return (
    <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto">
      {/* Encabezado Lúdico */}
      <header className="pt-2 pb-4 text-center">
        <div className="inline-flex items-center gap-2 bg-cloud-sageLight px-4 py-1.5 rounded-pill border border-cloud-sage/30 text-cloud-text text-xs font-semibold mb-2 shadow-cloud-sm">
          <span>✨</span>
          <span>¡Aprende jugando a toda velocidad!</span>
        </div>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-cloud-text">
          MathKids
        </h1>
        <p className="text-cloud-muted text-sm mt-0.5">
          Elige un desafío y pon a prueba tu mente
        </p>
      </header>

      {/* Lista de Minijuegos en Cards */}
      <div className="space-y-3.5 my-auto py-2">
        {gamesList.map((game) => {
          const isEnabled = game.isAvailable;

          return (
            <button
              key={game.id}
              onClick={() => isEnabled && onSelectGame(game.id)}
              disabled={!isEnabled}
              className={`w-full p-4 rounded-card border transition-all duration-150 text-left flex items-center justify-between shadow-cloud-sm ${
                isEnabled
                  ? 'bg-cloud-surface border-cloud-sage hover:border-cloud-sage/80 active:scale-[0.98] cursor-pointer shadow-cloud-md'
                  : 'bg-cloud-surface/60 border-cloud-border/70 opacity-70 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Icono con fondo temático */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${game.themeColor} text-white shadow-sm flex-shrink-0`}
                >
                  {game.icon}
                </div>

                {/* Textos del juego */}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-lg text-cloud-text leading-tight">
                      {game.title}
                    </h3>
                    {game.badge && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-pill ${
                          isEnabled
                            ? 'bg-cloud-sage text-white'
                            : 'bg-cloud-primaryLight text-cloud-muted'
                        }`}
                      >
                        {game.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-cloud-muted mt-0.5 line-clamp-1">
                    {game.description}
                  </p>
                  <span className="inline-block text-[11px] font-semibold text-cloud-primaryDark mt-1">
                    🎯 {game.ageRange}
                  </span>
                </div>
              </div>

              {/* Indicador de acción */}
              <div className="ml-2 flex-shrink-0">
                {isEnabled ? (
                  <span className="w-10 h-10 rounded-full bg-cloud-sageLight text-cloud-sage flex items-center justify-center font-bold text-lg">
                    ➔
                  </span>
                ) : (
                  <span className="text-xs text-cloud-muted px-2 py-1 bg-cloud-bg rounded-lg">
                    🔒
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pie de navegación */}
      <footer className="pt-3 pb-1 text-center">
        <p className="text-[12px] font-medium text-cloud-muted">
          🎨 Diseñado con Metodología Singapur & Base 10
        </p>
      </footer>
    </div>
  );
};
