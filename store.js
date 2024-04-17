import { create } from "zustand";
export const useStore = create((set) => ({
  city: "Dhaka",
  setCity: (name) => set((state) => ({ city: name })),
}));
