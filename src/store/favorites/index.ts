import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: Dog[];
  addFavorite: (dog: Dog) => void;
  removeFavorite: (dogId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (dog) =>
        set((state) => {
          const exists = state.favorites.some((fav) => fav.id === dog.id);
          if (exists) return state;
          return { favorites: [...state.favorites, dog] };
        }),
      removeFavorite: (dogId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== dogId),
        })),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
