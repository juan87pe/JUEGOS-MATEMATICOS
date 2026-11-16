import { useState } from 'react';
import { MobileAppLayout } from './components/layout/MobileAppLayout';
import { GameSelector } from './components/GameSelector';
import { MINIGAMES_REGISTRY } from './modules/minigames/registry';
import { TenFrameGameView } from './modules/minigames/ten-frame/TenFrameGameView';

export default function App() {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);

  const activeGame = activeGameId ? MINIGAMES_REGISTRY[activeGameId] : null;

  return (
    <MobileAppLayout>
      {activeGameId === 'marco-diez' ? (
        <TenFrameGameView onExit={() => setActiveGameId(null)} />
      ) : activeGameId && activeGame ? (
        <div className="flex-1 flex flex-col justify-between p-4">
          <header className="flex items-center justify-between py-2 border-b border-cloud-border">
            <button
              type="button"
              onClick={() => setActiveGameId(null)}
              className="min-w-[56px] min-h-[56px] px-3.5 rounded-btn bg-cloud-surface border border-cloud-border text-cloud-text font-semibold text-sm flex items-center gap-1.5 shadow-cloud-sm active:scale-95 transition-transform"
            >
              <span>⬅️</span>
              <span>Menú</span>
            </button>
            <div className="text-right">
              <span className="text-xs text-cloud-muted block">Minijuego</span>
              <span className="font-heading font-bold text-sm text-cloud-text">
                {activeGame.title}
              </span>
            </div>
          </header>

          <main className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
            <div className="w-20 h-20 bg-cloud-sageLight rounded-card flex items-center justify-center text-4xl mb-4 shadow-cloud-md">
              {activeGame.icon}
            </div>
            <h2 className="font-heading text-2xl font-bold text-cloud-text mb-2">
              {activeGame.title}
            </h2>
            <p className="text-sm text-cloud-muted max-w-xs">
              {activeGame.description}
            </p>
          </main>
        </div>
      ) : (
        <GameSelector onSelectGame={(gameId) => setActiveGameId(gameId)} />
      )}
    </MobileAppLayout>
  );
}
