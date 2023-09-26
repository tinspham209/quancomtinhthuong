import { defaultEffects } from './default-effect';
import { EffectConfig } from './types';

export const getLocalEffects = (): EffectConfig => {
  if (typeof window !== 'undefined') {
    const effectLocalStorage = localStorage.getItem('effects');
    if (effectLocalStorage !== null) {
      const localTheme = JSON.parse(effectLocalStorage);
      return localTheme;
    }
    return defaultEffects;
  }
  return defaultEffects;
};

export const setEffectsLocalStorage = (updatedTheme: EffectConfig) => {
  localStorage.setItem('effects', JSON.stringify(updatedTheme));
};
