import { MinigameDefinition } from '../../../specs/contracts/minigames.types';
import { tenFrameMinigameDefinition } from './ten-frame/tenFrameAdapter';

export interface MinigameCatalogItem extends MinigameDefinition {
  isAvailable: boolean;
  badge?: string;
}

/**
 * Catálogo central de minijuegos matemáticos.
 * Registra 'MG-TF' (Marco de Diez) como activo y los demás como próximos estrenos.
 */
export const MINIGAMES_REGISTRY: Record<string, MinigameCatalogItem> = {
  'marco-diez': {
    ...tenFrameMinigameDefinition,
    isAvailable: true,
    badge: '¡Disponible!',
  },
  'suma-rapida': {
    id: 'suma-rapida',
    title: 'Suma Rápida',
    description: 'Agilidad con operaciones básicas de adición',
    icon: '➕',
    themeColor: 'from-[#E0B342] to-[#C99A27]',
    ageRange: '6 - 9 años',
    isAvailable: false,
    badge: 'Pronto',
    generateChallenge: () => {
      throw new Error('Minijuego en desarrollo');
    }
  },
  'resta-divertida': {
    id: 'resta-divertida',
    title: 'Resta Divertida',
    description: 'Diferencias visuales sin resultados negativos',
    icon: '➖',
    themeColor: 'from-[#D98A82] to-[#C26F67]',
    ageRange: '6 - 9 años',
    isAvailable: false,
    badge: 'Pronto',
    generateChallenge: () => {
      throw new Error('Minijuego en desarrollo');
    }
  },
  'mayor-menor': {
    id: 'mayor-menor',
    title: 'Mayor o Menor',
    description: 'Comparación de magnitudes y cantidades',
    icon: '⚖️',
    themeColor: 'from-[#788B9A] to-[#5C6E7D]',
    ageRange: '5 - 7 años',
    isAvailable: false,
    badge: 'Pronto',
    generateChallenge: () => {
      throw new Error('Minijuego en desarrollo');
    }
  },
  'multiplicacion-magica': {
    id: 'multiplicacion-magica',
    title: 'Tablas Mágicas',
    description: 'Multiplicaciones intuitivas de tablas del 1 al 5 y 10',
    icon: '✖️',
    themeColor: 'from-[#9B89B3] to-[#806B9C]',
    ageRange: '7 - 10 años',
    isAvailable: false,
    badge: 'Pronto',
    generateChallenge: () => {
      throw new Error('Minijuego en desarrollo');
    }
  },
  'conteo-expres': {
    id: 'conteo-expres',
    title: 'Conteo Exprés',
    description: 'Conteo rápido de figuras y objetos simpáticos',
    icon: '🍎',
    themeColor: 'from-[#6EAA8F] to-[#4F8B70]',
    ageRange: '5 - 7 años',
    isAvailable: false,
    badge: 'Pronto',
    generateChallenge: () => {
      throw new Error('Minijuego en desarrollo');
    }
  }
};
