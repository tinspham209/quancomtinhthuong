import { Callback, MyProfile } from "@/queries/auth/types";
import { create } from "zustand";

interface Props {
	profile: MyProfile | null;
	onSetProfile: Callback;
}

export const useProfileStore = create<Props>((set) => ({
	profile: null,
	onSetProfile: (_profile) => set({ profile: _profile }),
}));
