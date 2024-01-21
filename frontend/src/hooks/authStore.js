import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: null,
  email: null,
  setUser: (email, token) => set((state) => ({ email, token })),
  removeUser: () => set((state) => ({ email: null, token: null })),
}));
