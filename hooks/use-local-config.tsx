import { EffectConfig, getLocalEffects, setEffectsLocalStorage } from '@/services/effect';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface UseLocalEffectsStore {
  effects: EffectConfig;
  onSetEffects: (theme: EffectConfig) => void;
  onSetEnableEffects: (value: boolean) => void;
  onSetNameEffects: (value: string) => void;
  onSetConfigEffects: (value: EffectConfig['config']) => void;
}

export const useEffectsStore = create<UseLocalEffectsStore>((set) => ({
  effects: getLocalEffects(),
  onSetEffects: (effects: EffectConfig) => {
    set({ effects: effects });
    setEffectsLocalStorage(effects);
    toast.success('Update effects successfully!');
  },
  onSetEnableEffects: (value: boolean) => {
    set((state) => {
      const updatedState = {
        ...state.effects,
        enable: value,
      };

      setEffectsLocalStorage(updatedState);
      toast.success('Update effects successfully!');

      return {
        effects: updatedState,
      };
    });
  },
  onSetNameEffects: (value: string) => {
    set((state) => {
      const updatedState = {
        ...state.effects,
        name: value,
      };

      setEffectsLocalStorage(updatedState);
      toast.success('Update effects successfully!');

      return {
        effects: updatedState,
      };
    });
  },

  onSetConfigEffects: (value: EffectConfig['config']) => {
    set((state) => {
      const updatedState = {
        ...state.effects,
        config: value,
      };

      setEffectsLocalStorage(updatedState);
      toast.success('Update effects successfully!');

      return {
        effects: updatedState,
      };
    });
  },
}));
