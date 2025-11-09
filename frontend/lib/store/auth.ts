import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: null,
  setAuth: (token, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
    set({ token, user });
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({ token: null, user: null });
  },
}));
