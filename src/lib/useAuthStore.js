import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setting: {
        hideDisabledPlayer: false,
      },
      toggleHideDisabledPlayer: () =>
        set((state) => ({
          setting: {
            ...state.setting,
            hideDisabledPlayer: !state.setting.hideDisabledPlayer,
          },
        })),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),
    }),
    {
      name: "uno-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
