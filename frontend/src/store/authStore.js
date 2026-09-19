import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// A global store any component can read from or write to directly —
// no prop drilling needed. `persist` automatically saves this store's
// state to localStorage and reloads it on refresh, replacing the
// manual JSON.parse/localStorage.setItem calls that used to live in
// App.jsx.
//
// Why Zustand here instead of Context or Redux: Context alone doesn't
// give you persistence or a plain function to call from outside a
// component; Redux is heavier machinery (actions, reducers, a store
// provider) than a small app's auth state needs. Zustand gives a
// simple hook (`useAuthStore`) with almost none of that ceremony —
// the pragmatic real-world choice for state this size.
export const useAuthStore = create(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'metal-tinder-auth' } // localStorage key
  )
);
