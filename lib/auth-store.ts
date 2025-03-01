// lib/auth-store.ts
import {create} from "zustand";

interface User {
  id: string;
  email: string;
  firstName?: string; // Add firstName
  lastName?: string; // Add lastName
}

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  login: (userData) =>
    set(() => ({ user: userData, loading: false })), // Update user and stop loading
  logout: () => set(() => ({ user: null, loading: false })), // Clear user and stop loading
}));