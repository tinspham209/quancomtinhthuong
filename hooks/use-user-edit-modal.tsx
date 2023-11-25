import { create } from 'zustand';

interface useUserUpdateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useUserUpdateModal = create<useUserUpdateModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
