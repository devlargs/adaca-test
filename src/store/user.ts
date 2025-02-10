import { create } from "zustand";

type UseUserProps = {
  user: null | { username: string; country: string };
  setUser: (user: null | { username: string; country: string }) => void;
  country: string;
  setCountry: (country: string) => void;
};

export const useUser = create<UseUserProps>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  country: "",
  setCountry: (country) => set({ country }),
}));
