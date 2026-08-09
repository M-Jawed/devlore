import { create } from "zustand";

type UploadPostStore = {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
};

export const useUploadPostStore = create<UploadPostStore>((set) => ({
  isSubmitting: false,
  setIsSubmitting: (value) => set({ isSubmitting: value }),
}));
