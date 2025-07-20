import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'uno-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
