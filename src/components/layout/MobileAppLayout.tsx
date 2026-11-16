import React from 'react';

interface MobileAppLayoutProps {
  children: React.ReactNode;
}

/**
 * MobileAppLayout
 * Contenedor maestro responsivo mobile-first optimizado para pantallas compactas de 360px a 430px.
 * Aplica altura dinámica 100dvh, márgenes seguros (safe-area), fondo Cielo Nublado
 * y supresión de scroll/zoom indeseado.
 */
export const MobileAppLayout: React.FC<MobileAppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#DDE3EA] flex items-center justify-center p-0 sm:p-4">
      <main className="w-full max-w-[430px] h-[100dvh] bg-cloud-bg text-cloud-text flex flex-col justify-between overflow-hidden shadow-cloud-lg sm:rounded-[36px] border border-cloud-border select-none relative pb-safe">
        {children}
      </main>
    </div>
  );
};
